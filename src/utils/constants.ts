import { CookieOptions } from "express";
import { calcFutureDate } from "./handlers";

// const PORT = process.env.PORT || 5000;
const PROD_ENV = process.env.NODE_ENV === "production";

export const CLIENT_COOKIES_OPTION: CookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "strict",
  secure: PROD_ENV ? true : false,
  domain: PROD_ENV ? ".soccermass.com" : `.localhost`,
  // domain: PROD_ENV ? ".soccermass.com" : `localhost`,
  // domain: PROD_ENV ? ".soccermass.com" : `localhost:${PORT}`,
  expires: calcFutureDate({ context: "days", interval: 180 }),
};

export const THEMES = ["dark", "light"];

export const CONTACT_PREFERENCES = ["email", "whatsapp"];

export const SIZES = [10, 20, 50, 75, 100];

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
