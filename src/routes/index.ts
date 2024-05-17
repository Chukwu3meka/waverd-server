import { Application } from "express";

import hub from "./hub";
import cors from "cors";
import info from "./info";
import apihub from "./apihub";
import console from "./console";
import accounts from "./accounts";
import hubGuard from "../middleware/hubGuard";
import corsOptions from "../utils/corsOptions";
import consoleGuard from "../middleware/consoleGuard";

export default (app: Application) => {
  app.use(`/${process.env.API_VERSION}/info/`, cors(corsOptions), info);
  app.use(`/${process.env.API_VERSION}/apihub/`, cors(corsOptions), apihub);
  app.use(`/${process.env.API_VERSION}/accounts/`, cors(corsOptions), accounts);
  app.use(`/${process.env.API_VERSION}/hub/`, cors(corsOptions), hubGuard, hub);
  app.use(`/${process.env.API_VERSION}/console/`, cors(corsOptions), consoleGuard, console);

  // app.use("/api/v1/console/", cors(corsOptions.accounts), console);
  // app.use("/api/v1/accounts/", cors(corsOptions.accounts), accounts); // <= public console

  // app.use("*", createProxyMiddleware({ target: "http://localhost:3000", changeOrigin: true })); // ? Fallback URL redirects to client (web page)
  // app.use("*", createProxyMiddleware({ target: "localhost:3000", changeOrigin: true })); // ? Fallback URL redirects to client (web page)
};
