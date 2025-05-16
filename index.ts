import "dotenv/config";
import express from "express";
import { styleText } from "util";

const authEnv = ["JWT_SECRET", "SECRET", "ACCOUNTS_EMAIL", "CONTACT_US_EMAIL", "EMAIL_PASSWORD", "NO_REPLY_EMAIL"];
const uriEnv = ["ACCOUNTS_MONGODB_URI", "APIHUB_MONGODB_URI", "GAMES_MONGODB_URI", "INFO_MONGODB_URI", "FOUNDERS_EMAIL"];
const coreEnv = ["STABLE_VERSION", "BASE_URL", "CLIENT_URL", "NODE_ENV", "DATA_DELETION_PERIOD", "INACTIVITY_PERIOD", "NODE_VERSION", "NOTICE_PERIOD"];
const oAuthEnv = ["FACEBOOK_CLIENT_ID", "FACEBOOK_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "TWITTER_CONSUMER_KEY", "TWITTER_CONSUMER_SECRET"];

const initServer = async () => {
  console.info(styleText("yellow", "Initializing WaveRD Server..."));
  const envMsg = "Server cannot find Env. Variable for ";
  try {
    for (const label of [...uriEnv, ...authEnv, ...coreEnv, ...oAuthEnv]) {
      if (!process.env[label]) throw { message: envMsg + label }; // ? Verify that all env variables exists
    }

    const app = express(),
      routeHandlers = await import("./routes").then((res) => res.default),
      logger = await import("./middleware/logger").then((res) => res.default),
      header = await import("./middleware/header").then((res) => res.default),
      cookieParser = await import("cookie-parser").then((res) => res.default),
      cookieSession = await import("cookie-session").then((res) => res.default),
      passport = await import("./middleware/passport").then((res) => res.default),
      performanceMonitor = await import("./middleware/performance").then((res) => res.default),
      twitterPassport = await import("./middleware/twitterPassport").then((res) => res.default);

    app.use([
      header, // Add no index for search engines
      performanceMonitor,
      express.json({ limit: "1mb" }), // for parsing application/json
      express.urlencoded({ extended: true }), // for parsing application/x-www-form-urlencoded
      cookieParser(process.env.SECRET!),
      cookieSession({ secret: process.env.SECRET! }),
      passport.initialize(),
      passport.session(),
      twitterPassport, //fix error with twitter passport
      logger, //Application logger
    ]);

    routeHandlers(app);

    app.listen(process.env.PORT || 5000, () => {
      console.info(styleText("cyan", "Server is ready at"), styleText("green", process.env.BASE_URL!));
    });
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production") console.info(styleText("red", error?.message as string));

    if (typeof error?.message === "string" && !error?.message.includes(envMsg)) {
      import("./models/info.model").then(async (mod) => {
        await mod.INFO_ALL_FAILED_REQUESTS.create({
          error: error || null,
          date: new Date(),
          request: process.env.NODE_ENV || "undefined",
          data: (error.message as string) || "not available",
        });
      });
    }
  }
};

initServer();
