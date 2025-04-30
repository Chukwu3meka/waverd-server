import { styleText } from "util";

const initServer = async () => {
  console.info(styleText("yellow", "Initializing WaveRD Server..."));
  const envMsg = "Server cannot find Env. Variable for ";
  import("dotenv/config").then(() => {
    try {
      /* Verify that all env variables exists */
      for (const label of REQUIRED_VARIABLES) if (!process.env[label]) throw { message: envMsg + label };
      import("./main").then((mod) => mod.default()); //  Run app if .env is valid
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

const REQUIRED_VARIABLES = [
  "ACCOUNTS_EMAIL",
  "ACCOUNTS_MONGODB_URI",
  "APIHUB_MONGODB_URI",
  "CONTACT_US_EMAIL",
  "DATA_DELETION_PERIOD",
  "EMAIL_PASSWORD",
  "FACEBOOK_CLIENT_ID",
  "FACEBOOK_CLIENT_SECRET",
  "GAMES_MONGODB_URI",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "INACTIVITY_PERIOD",
  "INFO_MONGODB_URI",
  "JWT_SECRET",
  "NO_REPLY_EMAIL",
  "NODE_VERSION",
  "NOTICE_PERIOD",
  "SECRET",
  "STABLE_VERSION",
  "TWITTER_CONSUMER_KEY",
  "TWITTER_CONSUMER_SECRET",
  "BASE_URL",
  "CLIENT_URL",
  "NODE_ENV",
];
