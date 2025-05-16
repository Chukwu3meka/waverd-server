import passport from "passport";
import twitterPassport from "passport-twitter";
import facebookPassport from "passport-facebook";
import googlePassport from "passport-google-oauth20";

const returnEmail = (profile: any, cb: any) => {
  if (profile.emails) {
    const email = profile.emails[0].value;
    return cb(null, email);
  }
  throw { message: "email not found" };
};

passport.use(
  new facebookPassport.Strategy(
    {
      // proxy: trustProxy,
      profileFields: ["id", "emails", "name"],
      clientID: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}${process.env.STABLE_VERSION}/accounts/facebook/callback`,
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => returnEmail(profile, cb)
  )
);

passport.use(
  new googlePassport.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}${process.env.STABLE_VERSION}/accounts/google/callback`,
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => returnEmail(profile, cb)
  )
);

passport.use(
  new twitterPassport.Strategy(
    {
      // proxy: trustProxy,
      consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
      callbackURL: `${process.env.BASE_URL}${process.env.STABLE_VERSION}/accounts/twitter/callback`,
      userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => returnEmail(profile, cb)
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user: any, cb) => cb(null, user));

export default passport;
