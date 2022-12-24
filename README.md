# SoccerMASS Server ✨

**SoccerMASS**: No. 1 free online football manager for advanced soccer management. The title of manager is almost exclusively used in British football. In most other European countries in which professional football is played, the person responsible for the direction of a team is awarded the position of coach or "trainer"<br/>
This app was built to meet a true soccer management system where the developers and contributors also play the game.<br/>
I've always had the goal to build a free online soccer app that can compete with **PES** and **FIFA**, but then what really pushed/motivated me to start the development of SoccerMASS, was a question asked on another football manager platform, and the user goes like this '**Does the developers of this game even play it or knows what it looks like?**'<br/>
Initially, **SoccerMASS** was a closed source app, but my mentor who's a lover of Open Source Community influnced my decision to make it public; such that it will really benefit the software developers community, in a way that new developers and experienced developers can fork the project, tweak it and experiment new features with it.<br/>
That being said **PERMISSION IN NOT GRANTED TO CLONE THIS APP FOR ANY COMMERCIAL GAIN IN ANY FORM NOR DEVATE FROM IT'S ORIGINAL PURPOSE, NEITHER IS ANYONE ALLOWED TO USE PART/FULL CODEBASE ON ANOTHER PLATFORM WITHOUT EXPLICIT AUTHORISATION FROM ME**

## About SoccerMASS Server

SoccerMASS Server holds the code neccessary for the backend of [SoccerMASS](https://www.soccermass.com), which is an online Soccer Manager App with the main of building an engaging online soccer game with peoples satisfaction as our goal. What motivated me to build SoccerMASS was the inability for existing Online Manger games to give what we really want in a soccer manager app, after sending mails most platform on how to improve the game, without response, i can accross one post where a user asked 'Do the developers of this game even play it, or are they just there for money'.

## NPM Packages && Services

All packages installed are key to this app running smoothly and we graciously thank the group of developers maintaining those packages. Currently our server is running on a free tier hosted on **RENDER** formerly on _Heroku_ before it's free plan was cancelled and we are working on raisng funds to upgrade our server. The following in no particular order executes a very important task on our server.

1. https://kaffeine.herokuapp.com: Since we run our app on a free tier, Kaffeine helps to keep our app awake 24hrs.

2. Having our app awake 24hrs, we use node-cron to keep our Tasks up and running which is crucial to the game. such as generating match scores, automatically accepting and sending bids from unmanaged clubs, injuries and fitness, etc.

3. We would be considered greedy and selfish if we fail to mention MongoDB, what is game without a database, and not just a database, a powerful NoSQL Database.

## Authors

- Chukwuemeka Maduekwe [@Twitter](https://www.twitter.com/Chukwu3meka) [@GitHub](https://github.com/Chukwu3meka)

> To learn more about this project, kindly contact the developer [😎 ChukwuEmeka Maduekwe](https://www.linkedin.com/in/chukwu3meka/):

## 💰 Support Me 👋

<p align="center">
<a href="https://www.buymeacoffee.com/chukwuemeka" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="70" ></a>
</p>

## Getting Started

1. _Fork_ **SoccerMASS Server** [here](https://github.com/Chukwu3meka/SoccerMASS-Server.git)
2. Now clone your remote branch, and run `npm install` or `npm i` for short; to install all packages
3. If you don't have a gitignore file, create one and [run](https://sigalambigha.home.blog/2020/03/11/how-to-refresh-gitignore/) `git rm -r --cached .` to ensure git is tracking the right file, i.e files not listed in the new _.gitignore_
4. In development we run a few command to reflect changes on file change, and to keep our app running all the time
   > `npm run tsc`: to compile our typescript files in the source folder
   > `npm run dev`: to start our development server in the dist folder
5. You don't need to install any project management such as nodemnon or pm2 as Node.js 18 now comes witth and inbuilt watch mode
6. ...