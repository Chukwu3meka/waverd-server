import express from "express";
import { styleText } from "util";
import bodyParser from "body-parser";
import routeHandlers from "./routes";
import logger from "./middleware/logger";
import header from "./middleware/header";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import passport from "./middleware/passport";
import twitterPassport from "./middleware/twitterPassport";
import performanceMonitor from "./middleware/performance";

export default async function main() {
  const APP = express(),
    PORT = process.env.PORT!,
    BASE_URL = process.env.BASE_URL!,
    SECRET_KEY = process.env.SECRET!;

  APP.use([cookieParser(SECRET_KEY), cookieSession({ secret: SECRET_KEY })]);
  APP.use([bodyParser.json({ limit: "1mb" }), bodyParser.urlencoded({ extended: true })]);
  APP.use([twitterPassport /*fix error with twitter passport*/, passport.initialize(), passport.session()]);
  APP.use([header, /*Add no index for search engines*/ logger /*Application logger*/, performanceMonitor]);

  routeHandlers(APP);

  APP.listen(PORT, () => {
    console.info(styleText("cyan", "Server is ready at"), styleText("green", BASE_URL));
  });
}
