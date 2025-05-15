import { CookieOptions } from "express";
import { PushMail } from "../interface/pushMail-handlers-interface";
import { add } from "date-fns";

// const PORT = process.env.PORT || 5000;
const PROD_ENV = process.env.NODE_ENV === "production";

export const CLIENT_COOKIES_OPTION: CookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "strict",
  secure: PROD_ENV ? true : false,
  domain: PROD_ENV ? ".waverd.com" : `.localhost`,
  // domain: PROD_ENV ? ".waverd.com" : `localhost`,
  // domain: PROD_ENV ? ".waverd.com" : `localhost:${PORT}`,
  expires: add(new Date(), { months: 6 }),
};

export const THEMES = ["dark", "light", "system"];

export const CONTACT_PREFERENCES = ["email", "whatsapp"];

export const SIZES = [10, 20, 50, 75, 100];

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

export const DIVISIONS = ["one", "two"];

export const SINGLE_DIVISION = ["tour006", "tour007", "tour008", "tour009", "tour010", "tour011"];

// Divsions with both _one_diviosn and _two_division
export const DOUBLE_DIVISIONS = ["tour001", "tour002", "tour003", "tour004", "tour005"];

export const TOTAL_CLUBS = 306;
// competition

export const QUALIFICATION = {
  tier1: {
    tour001: 4, // England
    tour002: 4, // Spain
    tour003: 4, // Germany
    tour004: 4, // Italy
    tour005: 3, // France
    tour006: 2, // Brazil
    tour007: 3, // Portugal
    tour008: 3, // Holland
    tour009: 2, // Saudi
    tour010: 1, // Scotland
    tour011: 2, // Turkey
  },
  tier2: {
    tour001: 3, // England
    tour002: 3, // Spain
    tour003: 3, // Germany
    tour004: 3, // Italy
    tour005: 3, // France
    tour006: 3, // Brazil
    tour007: 3, // Portugal
    tour008: 3, // Holland
    tour009: 3, // Saudi
    tour010: 2, // Scotland
    tour011: 3, // Turkey
  },
};

export const EMAIL_ENUM: { [key in PushMail["account"]]: string } = {
  noreply: "NO_REPLY_EMAIL",
  accounts: "ACCOUNTS_EMAIL",
  founder: "FOUNDER_EMAIL",
  contactus: "CONTACT_US_EMAIL",
};
