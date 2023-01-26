import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import passport from "./utils/passport";
import appRoutes from "./routes"; // enable app access database
import mongoose from "./utils/mongoose"; // enable app access database

import envInitialized from "./utils/envInitialized";
import subDomainHandler from "./libs/sub_domain_handler";

// import subDomainHandler from "./libs/sub_domain_handler";

const server = async () => {
  try {
    envInitialized(); // detect app access env;
    await mongoose.config(); // enable app access database

    const app = express(),
      port = process.env.PORT || 5000;

    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: "7mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieSession({ secret: process.env.SECRET }));

    app.use(passport.initialize());
    app.use(passport.session());

    subDomainHandler(app);

    appRoutes(app);

    app.listen(port, () => console.log(`SoccerMASS:::listening on port ${port}`));
  } catch (error: any) {
    console.log("SoccerMASS Server Error", (process.env.NODE !== "production" && (error.message as string)) || error);
  }
};

server();
