import cors from "cors";

import personal from "./personal";
import { redirectToWeb } from "../../utils/handlers";

const corsOptions = {
  origin: [/(?:[a-zA-Z0-9]+\.)*localhost:3000/, /(?:[a-zA-Z0-9]+\.)*soccermass/, /(?:[a-zA-Z0-9]+\.)*10\.128\.32\.176:3000/],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export default (app: any) => {
  // ? App-API Request to Personal
  app.use("/api/accounts/personal", cors(corsOptions), personal);
  // app.use("/api/accounts/personal", personal);
  // app.use("/api/accounts/personal", cors(corsOptions), personal);
};
