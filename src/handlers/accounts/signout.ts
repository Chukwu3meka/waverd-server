import { Request, Response } from "express";

import { catchError } from "../../utils/handlers";

export default async (req: Request, res: Response) => {
  try {
    return res.clearCookie("session").clearCookie("session.sig").clearCookie("SSID").redirect(302, `${process.env.CLIENT_DOMAIN}/accounts/signin`);
  } catch (err: any) {
    return catchError({ res, err });
  }
};
