const { Player, Club, Mass } = require("../models/handler");
const { clubStore, totalClubs } = require("../source/clubStore");
const {
  catchError,
  validateRequestBody,
  sortArr,
  shuffleArray,
  validInputs,
  getRef,
  acceptOffer: acceptOfferServerFunc,
  varReplacer,
} = require("../utils/serverFunctions");
const { playerStore, totalPlayers } = require("../source/playerStore.js");
const { massStore } = require("../source/massStore");

exports.fetchMasses = async (req, res, next) => {
  try {
    const response = await Mass.find({});
    const masses = [];

    for (const { ref, created, unmanaged, season } of Object.values(response)) {
      masses.push({ ref, unmanaged, created, season, sponsor: massStore(ref) });
    }
    return res.status(200).json(masses);
  } catch (err) {
    return catchError({ next, err, message: "unable to locate masses" });
  }
};

exports.fetchMassData = async (req, res, next) => {
  try {
    const { mass } = validateRequestBody(req.body, ["mass"]);

    const clubs = [];
    const { divisions } = await Mass.findOne({ ref: mass });

    for (let clubRef = 1; clubRef <= totalClubs; clubRef++) {
      const ref = getRef("club", clubRef);
      const {
        budget,
        manager,
        // tactics: { squad },
      } = await Club(mass).findOne({ ref });

      clubs.push({
        ref,
        manager,
        budget,
        // squad: squad.map((player) => {
        //   const { name, rating, roles, age } = playerStore(player);
        //   return { name, rating, roles, age };
        // }),
        title: clubStore(ref).title,
        coach: clubStore(ref).coach,
        location: clubStore(ref).location,
      });
    }

    return res.status(200).json({ divisions, clubs });
  } catch (err) {
    return catchError({ next, err, message: "unable to locate masses" });
  }
};

exports.fetchHomeData = async (req, res) => {
  try {
    const { mass, club, division } = validateRequestBody(req.body, ["mass", "club", "division"]);

    const clubData = await Club(mass).findOne({ ref: club });
    if (!clubData) throw "Club not found";

    const massData = await Mass.findOne({ ref: mass });
    if (!massData) throw "Mass not found";

    const clubNews = clubData.reports?.splice(0, 5).map(({ title, image, content }) => ({
      image,
      title: varReplacer(title),
      content: varReplacer(content),
    }));

    const massNews = massData.news.map(({ title, image, content, date }) => ({
      image,
      title: varReplacer(title),
      content: varReplacer(content),
      date: new Date(date).toDateString(),
    }));

    const { table: homeTable, goal: goalTable } = massData[division];

    const table = homeTable?.splice(0, 5).map(({ club, gf, pts }) => ({ club, gf, pts, title: clubStore(club).title }));

    const goal = goalTable?.splice(0, 3).map(({ player, goal, mp, club }) => ({
      mp,
      club,
      goal,
      player,
      name: playerStore(player).name,
    }));

    const myClubCalendar = sortArr(
      [
        massData[division]?.calendar
          .filter((x) => x.home === club || x.away === club)
          ?.map(({ _doc }) => ({ ..._doc, competition: "division" })),
        massData.league.calendar
          .filter((x) => x.home === club || x.away === club)
          ?.map(({ _doc }) => ({ ..._doc, competition: "league" })),
        massData.cup.calendar.filter((x) => x.home === club || x.away === club)?.map(({ _doc }) => ({ ..._doc, competition: "cup" })),
      ],
      "date"
    );
    const nextMatchIndex = myClubCalendar.indexOf(myClubCalendar.find((x) => x.hg === null && x.hg === null));

    const calendar = {
      curMatch: nextMatchIndex !== -1 ? myClubCalendar[nextMatchIndex] : null,
      nextMatch: nextMatchIndex !== -1 ? myClubCalendar[nextMatchIndex + 1] : null,
      lastFiveMatches: clubData.history.lastFiveMatches,
      prevMatch: nextMatchIndex !== -1 ? (nextMatchIndex === 0 ? null : myClubCalendar[nextMatchIndex - 1]) : myClubCalendar[0],
    };

    // reduce size of payload and set title
    for (const [matchType, match] of Object.entries(calendar)) {
      if (matchType !== "lastFiveMatches") {
        const { date, home, hg, ag, away, competition } = match;
        calendar[matchType] = { hg, ag, away, date, home, competition, stadium: clubStore(home).stadium };
      } else {
        calendar[matchType] = match;
      }
    }

    const nextDivisionFixtureIndex = massData[division].calendar.indexOf(
      massData[division].calendar.find((x) => x.hg === null && x.hg === null)
    );

    const nextDivisionFixture =
      nextDivisionFixtureIndex === -1
        ? null
        : massData[division].calendar
            .filter((x) => x.date === massData[division].calendar[nextDivisionFixtureIndex].date)
            .map(({ home, away }) => ({
              home,
              away,
              homeTitle: clubStore(home).title,
              awayTitle: clubStore(away).title,
              stadium: clubStore(home).stadium,
            }));

    const transfer = massData.transfer.slice(0, 5).map(({ from, to, fee, player }) => ({
      to,
      fee,
      from,
      player: playerStore(player).name,
    }));

    res.status(200).json({
      goal,
      table,
      clubNews,
      massNews,
      calendar,
      transfer,
      nextDivisionFixture,
      sponsor: massStore(mass),
    });
  } catch (err) {
    return catchError({ res, err, message: "Issue fetching home calendar" });
  }
};

exports.fetchTournament = async (req, res, next) => {
  try {
    const { mass } = validateRequestBody(req.body, ["mass"]);

    const massData = await Mass.findOne({ ref: mass });
    if (!massData) throw "Mass not found";

    const tournament = {
      cup: { ...massData.cup, calendar: sortArr(massData.cup.calendar, "date") },
      league: { ...massData.league, calendar: sortArr(massData.league.calendar, "date") },
      divisionOne: massData.divisionOne,
      divisionTwo: massData.divisionTwo,
      divisionFour: massData.divisionFour,
      divisionThree: massData.divisionThree,
    };

    res.status(200).json(tournament);
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.sendOffer = async (req, res, next) => {
  try {
    const { mass, player, club, to, fee } = validateRequestBody(req.body, ["mass", "player", "club", "to", "fee"]);

    // _______________________________ check if Transfer period
    if (![0, 6, 7].includes(new Date().getMonth()) && to !== "club000000") throw "Not yet Transfer period";

    const playerData = await Player(mass).findOne({ ref: player });
    if (!playerData) throw "Player not found";

    const clubData = await Club(mass).findOne({ ref: club });
    if (!clubData) throw "Club not found";

    // _______________________________check if club has enough fund for max player
    if (fee > clubData.budget) throw "Insuffucent Funds";

    // _______________________________check if club will exceed salary cap after
    if (
      [...clubData.tactics.squad, player].reduce((total, cur) => total + (10 / 100) * playerStore(cur).value, 0) > process.env.SALARY_CAP
    )
      throw "Salary Cap will be exceeded after signing";

    //  _____________________________Club already sent
    if (playerData.transfer.offers.includes(club)) throw "Previous Offer not attended to";

    //  _____________________________ Player transfer ban
    if (playerData.transfer.locked) throw "Player currently suspended from transfer";

    // add to mass offers
    await Mass.updateOne(
      { ref: mass },
      {
        $push: {
          offer: {
            $each: [{ to, fee, from: club, player }],
            $position: 0,
          },
        },
      }
    );

    // add to player offers
    await Player(mass).updateOne({ ref: player }, { $addToSet: { "transfer.offers": club } });

    res.status(200).json("success");
  } catch (err) {
    if (
      [
        "Insuffucent Funds",
        "Previous Offer not attended to",
        "Player currently suspended from transfer",
        "Salary Cap will be exceeded after signing",
      ].includes(err)
    )
      res.status(400).json(err);

    return catchError({ res, err, message: "unable to send offer" });
  }
};

exports.fetchOffers = async (req, res, next) => {
  try {
    const { mass, club } = validateRequestBody(req.body, ["mass", "club"]);

    const massData = await Mass.findOne({ ref: mass });
    if (!massData) throw "Club not found";

    res.status(200).json(massData.offer.filter((offer) => offer.to === club || offer.from === club));
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.callOffOffer = async (req, res) => {
  try {
    const { mass, player, from, to } = validateRequestBody(req.body, ["mass", "player", "from", "to"]);

    const massData = await Mass.findOne({ ref: mass });
    if (!massData) throw "Mass not found";

    if (!massData.offer.find((x) => x.player === player && x.from === from && x.to === to)) throw "Offer not found";

    await Mass.updateOne({ ref: mass }, { $pull: { offer: { from, player, to } } });

    // remove club from clubsInContact
    await Player(mass).updateOne({ ref: player }, { $pull: { "transfer.offers": from } });

    res.status(200).json("success");
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.acceptOffer = async (req, res) => {
  try {
    const { mass, player, from, to } = validateRequestBody(req.body, ["mass", "player", "from", "to"]);

    // _______________________________ check if Transfer period
    if (![0, 6, 7].includes(new Date().getMonth()) && to !== "club000000") throw "Not yet Transfer period";

    // _______________________________ check length of club squad
    const massData = await Mass.findOne({ ref: mass });
    if (!massData) throw "Mass not found";

    const offerData = massData.offer.filter((x) => x.player === player && x.from === from && x.to === to);
    if (!offerData[0]) throw "Offer not found";

    await acceptOfferServerFunc({
      mass,
      Mass,
      Club,
      Player,
      to: offerData[0].to,
      fee: offerData[0].fee,
      from: offerData[0].from,
      player: offerData[0].player,
      ackMsg: `@(club,${from},title) has completed the signing of @(player,${player},name) from @(club,${to},title) for a fee rumored to be in the range of $${offerData[0].fee}m. Our sources tells us that his Medicals will be completed in the next few hours.`,
    });

    res.status(200).json("success");
  } catch (err) {
    if (["Illegal Transaction", "Insufficient Funds", "Max Squad limit reached", "Min Squad limit reached"].includes(err))
      return res.status(400).json(err);
    return catchError({ res, err, message: "unable to accept offer" });
  }
};

exports.fetchTransfers = async (req, res, next) => {
  try {
    const { mass, club } = validateRequestBody(req.body, ["mass", "club"]);

    const massData = await Mass.findOne({ ref: mass });
    if (!massData) throw "Mass not found";

    res.status(200).json(massData.transfer);
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.starter = async (req, res) => {
  try {
    const { mass, club } = validateRequestBody(req.body, ["mass", "club"]);

    const massData = await Mass.findOne({ ref: mass });
    if (!massData) throw "Club not found";
    const clubData = await Club(mass).findOne({ ref: club });
    if (!clubData) throw "Club not found";

    console.log(clubData);

    res.status(200).json("success");
  } catch (err) {
    return catchError({ res, err, message: "error occured" });
  }
};
