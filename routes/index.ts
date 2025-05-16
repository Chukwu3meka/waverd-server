import { Application } from "express";
import { codes } from "../utils/codes";
import { INFO_ALL_FAILED_REQUESTS } from "../models/info.model";

import cors from "cors";
import infoRoute from "./info";
import gamesRoute from "./games";
import publicRoute from "./public";
import apihubRoute from "./apihub";
import consoleRoute from "./console";
import accountsRoute from "./accounts";
import { Request, Response } from "express";
import corsOptions from "../utils/corsOptions";
import routeGuard from "../middleware/routeGuard";
import publicGuard from "../middleware/publicGuard";
import consoleGuard from "../middleware/consoleGuard";
import { format } from "date-fns";

const fallbackRoute = async (req: Request, res: Response) => {
  await INFO_ALL_FAILED_REQUESTS.create({
    error: "Invalid route",
    date: format(new Date(), "yyyy-MM-dd"),
    data: codes["Route not Found"],
    request: { body: JSON.stringify(req.body), headers: JSON.stringify(req.headers) },
  });

  res.status(404).json({ success: false, message: "Route not found", data: codes["Route not Found"] });
};

export default (app: Application) => {
  app.use(`${process.env.STABLE_VERSION}/info`, cors(corsOptions), infoRoute);
  app.use(`${process.env.STABLE_VERSION}/apihub`, cors(corsOptions), apihubRoute);
  app.use(`${process.env.STABLE_VERSION}/accounts`, cors(corsOptions), accountsRoute);
  app.use(`${process.env.STABLE_VERSION}/games`, cors(corsOptions), routeGuard, gamesRoute);
  app.use(`${process.env.STABLE_VERSION}/public`, cors(corsOptions), publicGuard, publicRoute);
  app.use(`${process.env.STABLE_VERSION}/console`, cors(corsOptions), consoleGuard, consoleRoute);
  // ? fallback route
  app.use("{*not-found}", cors(corsOptions), fallbackRoute);
};
