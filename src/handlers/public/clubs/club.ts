import { NextFunction, Request, Response } from "express";

import { CLUBS } from "../../../models/apihub";
import { catchError, requestHasBody } from "../../../utils/handlers";
// import { isValidObjectId } from "mongoose";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    requestHasBody({ body: req.params, required: ["id"] });
    const { id } = req.params;

    // await CLUBS.deleteMany();
    // await CLUBS.insertMany(a);

    // // 63e54d3215e0ae5734cce9bc
    // const isClubIDValid = isValidObjectId(id);
    // if (!isClubIDValid) throw { message: `Invalid Club ID provided`, sendError: true };

    // return await CLUBS.findById(id)
    //   .then((clubData) => {
    //     if (!clubData) throw { message: `No club was located with the ID: '${id}'.` };

    //     const data = { success: true, message: `Club data for ${clubData.title} found}`, data: clubData };
    //     return res.status(200).json(data);
    //   })
    //   .catch(() => {
    //     throw { message: `The club with ID: '${id}' may have been deleted or may not exist.` };
    //   });

    // const a = await CLUBS.deleteMany(clubs);

    res.status(200).json("a");
  } catch (err: any) {
    return catchError({ res, err });
  }
};

//  await CLUBS.insertMany(clubs);
//  await CLUBS.deleteMany(clubs);


const a = [
  { division: "tour001_one", title: "Manchester City", ref: "club00001" },
  { division: "tour001_one", title: "Liverpool", ref: "club00002" },
  { division: "tour001_one", title: "Arsenal", ref: "club00003" },
  { division: "tour001_one", title: "Manchester United", ref: "club00004" },
  { division: "tour001_one", title: "Tottenham Hotspur", ref: "club00005" },
  { division: "tour001_one", title: "Newcastle United", ref: "club00006" },
  { division: "tour001_one", title: "Chelsea", ref: "club00007" },
  { division: "tour001_one", title: "Aston Villa", ref: "club00008" },
  { division: "tour001_one", title: "West Ham United", ref: "club00009" },
  { division: "tour001_one", title: "Everton", ref: "club00010" },
  { division: "tour001_one", title: "Wolverhampton Wanderers", ref: "club00011" },
  { division: "tour001_one", title: "Fulham", ref: "club00012" },
  { division: "tour001_one", title: "Brighton & Hove Albion", ref: "club00013" },
  { division: "tour001_one", title: "Brentford", ref: "club00014" },
  { division: "tour001_one", title: "Nottingham Forest", ref: "club00015" },
  { division: "tour001_one", title: "Crystal Palace", ref: "club00016" },
  { division: "tour001_one", title: "AFC Bournemouth", ref: "club00017" },
  { division: "tour001_one", title: "Burnley", ref: "club00018" },
  { division: "tour001_one", title: "Luton Town", ref: "club00019" },
  { division: "tour001_one", title: "Sheffield United", ref: "club00020" },
  //
  { division: "tour001_two", title: "Leicester City", ref: "club00021" },
  { division: "tour001_two", title: "Southampton", ref: "club00022" },
  { division: "tour001_two", title: "Leeds United", ref: "club00023" },
  { division: "tour001_two", title: "Norwich City", ref: "club00024" },
  { division: "tour001_two", title: "Watford", ref: "club00025" },
  { division: "tour001_two", title: "West Bromwich Albion", ref: "club00026" },
  { division: "tour001_two", title: "Middlesbrough", ref: "club00027" },
  { division: "tour001_two", title: "Millwall", ref: "club00028" },
  { division: "tour001_two", title: "Coventry City", ref: "club00029" },
  { division: "tour001_two", title: "Stoke City", ref: "club00030" },
  { division: "tour001_two", title: "Blackburn Rovers", ref: "club00031" },
  { division: "tour001_two", title: "Preston North End", ref: "club00032" },
  { division: "tour001_two", title: "Hull City", ref: "club00033" },
  { division: "tour001_two", title: "Swansea City", ref: "club00034" },
  { division: "tour001_two", title: "Cardiff City", ref: "club00035" },
  { division: "tour001_two", title: "Bristol City", ref: "club00036" },
  { division: "tour001_two", title: "Queens Park Rangers", ref: "club00037" },
  { division: "tour001_two", title: "Sunderland", ref: "club00038" },
  { division: "tour001_two", title: "Birmingham City", ref: "club00039" },
  { division: "tour001_two", title: "Sheffield Wednesday", ref: "club00040" },
  { division: "tour001_two", title: "Ipswich Town", ref: "club00041" },
  { division: "tour001_two", title: "Huddersfield Town", ref: "club00042" },
  { division: "tour001_two", title: "Rotherham United", ref: "club00043" },
  { division: "tour001_two", title: "Plymouth Argyle", ref: "club00044" },
  //
  { division: "tour002_one", title: "Real Madrid", ref: "club00045" },
  { division: "tour002_one", title: "FC Barcelona", ref: "club00046" },
  { division: "tour002_one", title: "Atlético de Madrid", ref: "club00047" },
  { division: "tour002_one", title: "Sevilla FC", ref: "club00048" },
  { division: "tour002_one", title: "Real Betis Balompié", ref: "club00049" },
  { division: "tour002_one", title: "Real Sociedad", ref: "club00050" },
  { division: "tour002_one", title: "Villarreal CF", ref: "club00051" },
  { division: "tour002_one", title: "Athletic Club de Bilbao", ref: "club00052" },
  { division: "tour002_one", title: "CA Osasuna", ref: "club00053" },
  { division: "tour002_one", title: "RC Celta de Vigo", ref: "club00054" },
  { division: "tour002_one", title: "Rayo Vallecano", ref: "club00055" },
  { division: "tour002_one", title: "Getafe CF", ref: "club00056" },
  { division: "tour002_one", title: "Girona FC", ref: "club00057" },
  { division: "tour002_one", title: "RCD Mallorca", ref: "club00058" },
  { division: "tour002_one", title: "UD Almería", ref: "club00059" },
  { division: "tour002_one", title: "Cádiz CF", ref: "club00060" },
  { division: "tour002_one", title: "Valencia CF", ref: "club00061" },
  { division: "tour002_one", title: "UD Las Palmas", ref: "club00062" },
  { division: "tour002_one", title: "Granada CF", ref: "club00063" },
  { division: "tour002_one", title: "Deportivo Alavés", ref: "club00064" },
  //
  { division: "tour002_two", title: "RCD Espanyol", ref: "club00065" },
  { division: "tour002_two", title: "Real Valladolid", ref: "club00066" },
  { division: "tour002_two", title: "Elche CF", ref: "club00067" },
  { division: "tour002_two", title: "SD Eibar", ref: "club00068" },
  { division: "tour002_two", title: "Levante UD", ref: "club00069" },
  { division: "tour002_two", title: "CD Tenerife", ref: "club00070" },
  { division: "tour002_two", title: "Real Oviedo", ref: "club00071" },
  { division: "tour002_two", title: "Real Zaragoza", ref: "club00072" },
  { division: "tour002_two", title: "Burgos CF", ref: "club00073" },
  { division: "tour002_two", title: "Real Sporting de Gijón", ref: "club00074" },
  { division: "tour002_two", title: "Albacete Balompié", ref: "club00075" },
  { division: "tour002_two", title: "CD Leganés", ref: "club00076" },
  { division: "tour002_two", title: "FC Cartagena", ref: "club00077" },
  { division: "tour002_two", title: "SD Huesca", ref: "club00078" },
  { division: "tour002_two", title: "Racing de Santander", ref: "club00079" },
  { division: "tour002_two", title: "FC Andorra", ref: "club00080" },
  { division: "tour002_two", title: "Racing de Ferrol", ref: "club00081" },
  { division: "tour002_two", title: "CD Eldense", ref: "club00082" },
  { division: "tour002_two", title: "SD Amorebieta", ref: "club00083" },
  { division: "tour002_two", title: "AD Alcorcón", ref: "club00084" },
  { division: "tour002_two", title: "Villarreal B", ref: "club00085" },
  { division: "tour002_two", title: "CD Mirandés", ref: "club00086" },
  //
  { division: "tour003_one", title: "Bayern München", ref: "club00087" },
  { division: "tour003_one", title: "Borussia Dortmund", ref: "club00088" },
  { division: "tour003_one", title: "RB Leipzig", ref: "club00089" },
  { division: "tour003_one", title: "Bayer 04 Leverkusen", ref: "club00090" },
  { division: "tour003_one", title: "Eintracht Frankfurt", ref: "club00091" },
  { division: "tour003_one", title: "TSG 1899 Hoffenheim", ref: "club00092" },
  { division: "tour003_one", title: "VfL Wolfsburg", ref: "club00093" },
  { division: "tour003_one", title: "SC Freiburg", ref: "club00094" },
  { division: "tour003_one", title: "1. FC Union Berlin", ref: "club00095" },
  { division: "tour003_one", title: "Borussia M'gladbach", ref: "club00096" },
  { division: "tour003_one", title: "1. FSV Mainz 05", ref: "club00097" },
  { division: "tour003_one", title: "Werder Bremen", ref: "club00098" },
  { division: "tour003_one", title: "FC Augsburg", ref: "club00099" },
  { division: "tour003_one", title: "VfB Stuttgart", ref: "club00100" },
  { division: "tour003_one", title: "1. FC Köln", ref: "club00101" },
  { division: "tour003_one", title: "VfL Bochum", ref: "club00102" },
  { division: "tour003_one", title: "1. FC Heidenheim", ref: "club00103" },
  { division: "tour003_one", title: "SV Darmstadt 98", ref: "club00104" },
  //
  { division: "tour003_two", title: "Hertha BSC", ref: "club00105" },
  { division: "tour003_two", title: "Hamburger SV", ref: "club00106" },
  { division: "tour003_two", title: "FC Schalke 04", ref: "club00107" },
  { division: "tour003_two", title: "Hannover 96", ref: "club00108" },
  { division: "tour003_two", title: "Fortuna Düsseldorf", ref: "club00109" },
  { division: "tour003_two", title: "1. FC Kaiserslautern", ref: "club00110" },
  { division: "tour003_two", title: "SC Paderborn 07", ref: "club00111" },
  { division: "tour003_two", title: "Karlsruher SC", ref: "club00112" },
  { division: "tour003_two", title: "FC St. Pauli", ref: "club00113" },
  { division: "tour003_two", title: "1. FC Nürnberg", ref: "club00114" },
  { division: "tour003_two", title: "Hansa Rostock", ref: "club00115" },
  { division: "tour003_two", title: "1. FC Magdeburg", ref: "club00116" },
  { division: "tour003_two", title: "Holstein Kiel", ref: "club00117" },
  { division: "tour003_two", title: "SpVgg Greuther Fürth", ref: "club00118" },
  { division: "tour003_two", title: "Eintracht Braunschweig", ref: "club00119" },
  { division: "tour003_two", title: "VfL Osnabrück", ref: "club00120" },
  { division: "tour003_two", title: "SV Elversberg", ref: "club00121" },
  { division: "tour003_two", title: "SV Wehen Wiesbaden", ref: "club00122" },
  //
  { division: "tour004_one", title: "Inter", ref: "club00123" },
  { division: "tour004_one", title: "Napoli", ref: "club00124" },
  { division: "tour004_one", title: "Juventus", ref: "club00125" },
  { division: "tour004_one", title: "Milan", ref: "club00126" },
  { division: "tour004_one", title: "Lazio", ref: "club00127" },
  { division: "tour004_one", title: "Roma", ref: "club00128" },
  { division: "tour004_one", title: "Atalanta", ref: "club00129" },
  { division: "tour004_one", title: "Fiorentina", ref: "club00130" },
  { division: "tour004_one", title: "Bologna", ref: "club00131" },
  { division: "tour004_one", title: "Sassuolo", ref: "club00132" },
  { division: "tour004_one", title: "AC Monza", ref: "club00133" },
  { division: "tour004_one", title: "Torino", ref: "club00134" },
  { division: "tour004_one", title: "Udinese", ref: "club00135" },
  { division: "tour004_one", title: "Salernitana", ref: "club00136" },
  { division: "tour004_one", title: "Empoli", ref: "club00137" },
  { division: "tour004_one", title: "Hellas Verona", ref: "club00138" },
  { division: "tour004_one", title: "Genoa", ref: "club00139" },
  { division: "tour004_one", title: "Lecce", ref: "club00140" },
  { division: "tour004_one", title: "Cagliari", ref: "club00141" },
  { division: "tour004_one", title: "Frosinone", ref: "club00142" },
  //
  { division: "tour004_two", title: "La Spezia", ref: "club00143" },
  { division: "tour004_two", title: "Cremonese", ref: "club00144" },
  { division: "tour004_two", title: "Parma", ref: "club00145" },
  { division: "tour004_two", title: "Venezia", ref: "club00146" },
  { division: "tour004_two", title: "Palermo", ref: "club00147" },
  { division: "tour004_two", title: "Pisa", ref: "club00148" },
  { division: "tour004_two", title: "FORMER Borgocalcio", ref: "club00220" },
  { division: "tour004_two", title: "Sampdoria", ref: "club00149" },
  { division: "tour004_two", title: "Como", ref: "club00150" },
  { division: "tour004_two", title: "Bari", ref: "club00151" },
  { division: "tour004_two", title: "Ascoli", ref: "club00152" },
  { division: "tour004_two", title: "Ternana", ref: "club00153" },
  { division: "tour004_two", title: "Modena", ref: "club00154" },
  { division: "tour004_two", title: "Südtirol", ref: "club00155" },
  { division: "tour004_two", title: "Catanzaro", ref: "club00156" },
  { division: "tour004_two", title: "Cosenza", ref: "club00157" },
  { division: "tour004_two", title: "Reggiana", ref: "club00158" },
  { division: "tour004_two", title: "Feralpisalò", ref: "club00159" },
  { division: "tour004_two", title: "Cittadella", ref: "club00160" },
  { division: "tour004_two", title: "Brisigonza", ref: "club00161" },

  //
  { division: "tour005_one", title: "Paris Saint-Germain	France", ref: "club00162" },
  { division: "tour005_one", title: "Olympique de Marseille	France", ref: "club00163" },
  { division: "tour005_one", title: "Stade Rennais	France", ref: "club00164" },
  { division: "tour005_one", title: "AS Monaco	France", ref: "club00165" },
  { division: "tour005_one", title: "OGC Nice	France", ref: "club00166" },
  { division: "tour005_one", title: "Olympique Lyonnais	France", ref: "club00167" },
  { division: "tour005_one", title: "LOSC Lille	France", ref: "club00168" },
  { division: "tour005_one", title: "RC Lens	France", ref: "club00169" },
  { division: "tour005_one", title: "Montpellier HSC	France", ref: "club00170" },
  { division: "tour005_one", title: "Stade de Reims	France", ref: "club00171" },
  { division: "tour005_one", title: "RC Strasbourg	France", ref: "club00172" },
  { division: "tour005_one", title: "FC Nantes	France", ref: "club00173" },
  { division: "tour005_one", title: "FC Lorient	France", ref: "club00174" },
  { division: "tour005_one", title: "Stade Brestois 29	France", ref: "club00175" },
  { division: "tour005_one", title: "Toulouse FC	France", ref: "club00176" },
  { division: "tour005_one", title: "Clermont Foot	France", ref: "club00177" },
  { division: "tour005_one", title: "FC Metz	France", ref: "club00178" },
  { division: "tour005_one", title: "Le Havre AC	France", ref: "club00179" },
  //
  { division: "tour005_two", title: "Angers SCO", ref: "club00180" },
  { division: "tour005_two", title: "AS Saint-Étienne", ref: "club00181" },
  { division: "tour005_two", title: "Girondins de Bordeaux", ref: "club00182" },
  { division: "tour005_two", title: "SM Caen", ref: "club00183" },
  { division: "tour005_two", title: "ESTAC Troyes", ref: "club00184" },
  { division: "tour005_two", title: "AC Ajaccio", ref: "club00185" },
  { division: "tour005_two", title: "AJ Auxerre", ref: "club00186" },
  { division: "tour005_two", title: "Paris FC", ref: "club00187" },
  { division: "tour005_two", title: "Stade Lavallois MFC", ref: "club00188" },
  { division: "tour005_two", title: "Amiens SC", ref: "club00189" },
  { division: "tour005_two", title: "Grenoble Foot 38", ref: "club00190" },
  { division: "tour005_two", title: "En Avant Guingamp", ref: "club00191" },
  { division: "tour005_two", title: "Pau FC", ref: "club00192" },
  { division: "tour005_two", title: "AC Beauruelle", ref: "club00193" },
  { division: "tour005_two", title: "SC Bastia", ref: "club00194" },
  { division: "tour005_two", title: "Valenciennes FC", ref: "club00195" },
  { division: "tour005_two", title: "Quevilly Rouen Métropole", ref: "club00196" },
  { division: "tour005_two", title: "Rodez Aveyron Football", ref: "club00197" },
  { division: "tour005_two", title: "USL Dunkerque", ref: "club00198" },
  { division: "tour005_two", title: "US Concarneau", ref: "club00199" },
  //
  { division: "tour006_one", title: "Athletico Paranaense", ref: "club00203" },
  { division: "tour006_one", title: "Atlético Goianiense", ref: "club00202" },
  { division: "tour006_one", title: "Atlético Mineiro", ref: "club00200" },
  { division: "tour006_one", title: "Botafogo FR", ref: "club00201" },
  { division: "tour006_one", title: "Corinthians", ref: "club00204" },
  { division: "tour006_one", title: "Criciúma EC", ref: "club00205" },
  { division: "tour006_one", title: "Cruzeiro", ref: "club00206" },
  { division: "tour006_one", title: "Cuiabá EC", ref: "club00207" },
  { division: "tour006_one", title: "EC Bahia", ref: "club00208" },
  { division: "tour006_one", title: "EC Vitória", ref: "club00209" },
  { division: "tour006_one", title: "Flamengo", ref: "club00210" },
  { division: "tour006_one", title: "Fluminense", ref: "club00211" },
  { division: "tour006_one", title: "Fortaleza EC", ref: "club00212" },
  { division: "tour006_one", title: "Grêmio", ref: "club00213" },
  { division: "tour006_one", title: "Juventude", ref: "club00214" },
  { division: "tour006_one", title: "Palmeiras", ref: "club00215" },
  { division: "tour006_one", title: "RB Bragantino", ref: "club00216" },
  { division: "tour006_one", title: "São Paulo FC", ref: "club00217" },
  { division: "tour006_one", title: "SC Internacional", ref: "club00218" },
  { division: "tour006_one", title: "Vasco da Gama", ref: "club00219" },
  //
  { division: "tour007_one", title: "FC Porto", ref: "club00228" },
  { division: "tour007_one", title: "Benfica", ref: "club00229" },
  { division: "tour007_one", title: "Sporting CP", ref: "club00230" },
  { division: "tour007_one", title: "Braga", ref: "club00231" },
  { division: "tour007_one", title: "Casa Pia", ref: "club00232" },
  { division: "tour007_one", title: "Vitória de Guimarães", ref: "club00233" },
  { division: "tour007_one", title: "Famalicão", ref: "club00234" },
  { division: "tour007_one", title: "Rio Ave", ref: "club00235" },
  { division: "tour007_one", title: "Estoril", ref: "club00236" },
  { division: "tour007_one", title: "Arouca", ref: "club00237" },
  { division: "tour007_one", title: "Boavista", ref: "club00238" },
  { division: "tour007_one", title: "Portimonense", ref: "club00239" },
  { division: "tour007_one", title: "Moreirense", ref: "club00240" },
  { division: "tour007_one", title: "Estrela Amadora", ref: "club00241" },
  { division: "tour007_one", title: "Vizela", ref: "club00242" },
  { division: "tour007_one", title: "Chaves", ref: "club00243" },
  { division: "tour007_one", title: "Farense", ref: "club00244" },
  { division: "tour007_one", title: "Gil Vicente FC", ref: "club00245" },
  //
  { division: "tour008_one", title: "Ajax", ref: "club00246" },
  { division: "tour008_one", title: "PSV", ref: "club00247" },
  { division: "tour008_one", title: "Feyenoord", ref: "club00248" },
  { division: "tour008_one", title: "AZ", ref: "club00249" },
  { division: "tour008_one", title: "FC Utrecht", ref: "club00250" },
  { division: "tour008_one", title: "FC Twente", ref: "club00251" },
  { division: "tour008_one", title: "NEC Nijmegen", ref: "club00252" },
  { division: "tour008_one", title: "sc Heerenveen", ref: "club00253" },
  { division: "tour008_one", title: "Fortuna Sittard", ref: "club00254" },
  { division: "tour008_one", title: "Sparta Rotterdam", ref: "club00255" },
  { division: "tour008_one", title: "Vitesse", ref: "club00256" },
  { division: "tour008_one", title: "Go Ahead Eagles", ref: "club00257" },
  { division: "tour008_one", title: "Heracles Almelo", ref: "club00258" },
  { division: "tour008_one", title: "PEC Zwolle", ref: "club00259" },
  { division: "tour008_one", title: "RKC Waalwijk", ref: "club00260" },
  { division: "tour008_one", title: "FC Volendam", ref: "club00261" },
  { division: "tour008_one", title: "Excelsior", ref: "club00262" },
  { division: "tour008_one", title: "Almere City FC", ref: "club00263" },
  //
  { division: "tour009_one", title: "Al Ittihad", ref: "club00264" },
  { division: "tour009_one", title: "Al Nassr", ref: "club00265" },
  { division: "tour009_one", title: "Al Hilal", ref: "club00266" },
  { division: "tour009_one", title: "Al Ahli", ref: "club00267" },
  { division: "tour009_one", title: "Al Fateh", ref: "club00268" },
  { division: "tour009_one", title: "Al Ettifaq", ref: "club00269" },
  { division: "tour009_one", title: "Al Shabab", ref: "club00270" },
  { division: "tour009_one", title: "Al Taawoun", ref: "club00271" },
  { division: "tour009_one", title: "Al Fayha", ref: "club00272" },
  { division: "tour009_one", title: "Damac FC", ref: "club00273" },
  { division: "tour009_one", title: "Al Khaleej", ref: "club00274" },
  { division: "tour009_one", title: "Abha Club", ref: "club00275" },
  { division: "tour009_one", title: "Al Wehda", ref: "club00276" },
  { division: "tour009_one", title: "Al Tai", ref: "club00277" },
  { division: "tour009_one", title: "Al Okhdood", ref: "club00278" },
  { division: "tour009_one", title: "Al Raed", ref: "club00279" },
  { division: "tour009_one", title: "Al Hazem", ref: "club00280" },
  { division: "tour009_one", title: "Al Riyadh", ref: "club00281" },
  //
  { division: "tour010_one", title: "Celtic", ref: "club00282" },
  { division: "tour010_one", title: "Rangers", ref: "club00283" },
  { division: "tour010_one", title: "Heart of Midlothian", ref: "club00284" },
  { division: "tour010_one", title: "Aberdeen", ref: "club00285" },
  { division: "tour010_one", title: "Hibernian", ref: "club00286" },
  { division: "tour010_one", title: "Livingston", ref: "club00287" },
  { division: "tour010_one", title: "St. Johnstone", ref: "club00288" },
  { division: "tour010_one", title: "St. Mirren", ref: "club00289" },
  { division: "tour010_one", title: "Kilmarnock", ref: "club00290" },
  { division: "tour010_one", title: "Ross County", ref: "club00291" },
  { division: "tour010_one", title: "Motherwell", ref: "club00292" },
  { division: "tour010_one", title: "Dundee FC", ref: "club00293" },
  //
  { division: "tour011_one", title: "Galatasaray", ref: "club00294" },
  { division: "tour011_one", title: "Fenerbahçe", ref: "club00295" },
  { division: "tour011_one", title: "Beşiktaş", ref: "club00296" },
  { division: "tour011_one", title: "Trabzonspor", ref: "club00297" },
  { division: "tour011_one", title: "Istanbul Başakşehir FK", ref: "club00298" },
  { division: "tour011_one", title: "Adana Demirspor", ref: "club00299" },
  { division: "tour011_one", title: "Antalyaspor", ref: "club00300" },
  { division: "tour011_one", title: "MKE Ankaragücü", ref: "club00301" },
  { division: "tour011_one", title: "Alanyaspor", ref: "club00302" },
  { division: "tour011_one", title: "Samsunspor", ref: "club00303" },
  { division: "tour011_one", title: "Konyaspor", ref: "club00304" },
  { division: "tour011_one", title: "Gaziantep FK", ref: "club00305" },
  { division: "tour011_one", title: "Hatayspor", ref: "club00306" },
  { division: "tour011_one", title: "Sivasspor", ref: "club00227" },
  { division: "tour011_one", title: "Fatih Karagümrük S.K.", ref: "club00226" },
  { division: "tour011_one", title: "Kayserispor", ref: "club00225" },
  { division: "tour011_one", title: "Pendikspor", ref: "club00224" },
  { division: "tour011_one", title: "Kasımpaşa", ref: "club00223" },
  { division: "tour011_one", title: "Çaykur Rizespor", ref: "club00222" },
  { division: "tour011_one", title: "İstanbulspor", ref: "club00221" },
];

// <!-- <option value="13">England Premier League (1)</option>
// <option value="14">England Championship (2)</option>
// <option value="53">Spain Primera División (1)</option>
// <option value="54">Spain Segunda División (2)</option>
// <option value="19">Germany 1. Bundesliga (1)</option>
// <option value="20">Germany 2. Bundesliga (2)</option>
// <option value="31">Italy Serie A (1)</option>
// <option value="32">Italy Serie B (2)</option>
// <option value="16">France Ligue 1 (1)</option>
// <option value="17">France Ligue 2 (2)</option>
// <option value="1003">CONMEBOL Libertadores</option>
// <option value="308">Portugal Primeira Liga (1)</option>
// <option value="10">Holland Eredivisie (1)</option>
// <option value="350">Saudi Pro League (1)</option>
// <option value="50">Scotland Premiership (1)</option>
// <option value="68">Turkey Süper Lig (1)</option> -->
