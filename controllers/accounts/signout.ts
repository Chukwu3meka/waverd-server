import { Request, Response } from "express";

import { catchError } from "../../utils/helpers";
import { CLIENT_COOKIES_OPTION } from "../../utils/constants";

export default async (req: Request, res: Response) => {
  try {
    // res.clearCookie("session").clearCookie("session.sig").clearCookie("SSID").redirect(302, `${process.env.BASE_URL}/accounts/signin`);
    // res.clearCookie("session").clearCookie("session.sig").clearCookie("SSID").redirect(302, `/accounts/signin`);

    // res.clearCookie("session").clearCookie("session.sig").clearCookie("SSID").redirect(302, `${process.env.CLIENT_URL}/accounts/signin`);

    res.clearCookie("SSID", CLIENT_COOKIES_OPTION).redirect(302, `${process.env.CLIENT_URL}/accounts/signin`);
  } catch (err: any) {
    return catchError({ res, err });
  }
};
