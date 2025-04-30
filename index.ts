import { styleText } from "util";

const mongoEnv = ["ACCOUNTS_MONGODB_URI", "APIHUB_MONGODB_URI", "GAMES_MONGODB_URI", "INFO_MONGODB_URI"];
const authEnv = ["JWT_SECRET", "SECRET", "ACCOUNTS_EMAIL", "CONTACT_US_EMAIL", "EMAIL_PASSWORD", "NO_REPLY_EMAIL"];
const coreEnv = ["STABLE_VERSION", "BASE_URL", "CLIENT_URL", "NODE_ENV", "DATA_DELETION_PERIOD", "INACTIVITY_PERIOD", "NODE_VERSION", "NOTICE_PERIOD"];
const oAuthEnv = ["FACEBOOK_CLIENT_ID", "FACEBOOK_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "TWITTER_CONSUMER_KEY", "TWITTER_CONSUMER_SECRET"];

const initServer = async () => {
  console.info(styleText("yellow", "Initializing WaveRD Server..."));
  const envMsg = "Server cannot find Env. Variable for ";
  import("dotenv/config").then(() => {
    try {
      for (const label of [...mongoEnv, ...authEnv, ...coreEnv, ...oAuthEnv]) {
        if (!process.env[label]) throw { message: envMsg + label }; // ? Verify that all env variables exists
      }

      // ?  Run app if .env is valid
      import("./main").then((mod) => mod.default());
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
  });
};

initServer();
