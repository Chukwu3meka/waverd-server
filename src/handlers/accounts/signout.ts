import { catchError } from "../../utils/handlers";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    return res.status(200).clearCookie("session").clearCookie("session.sig").clearCookie("SoccerMASS").redirect(`http://${process.env.CLIENT_DOMAIN}/`);
  } catch (err: any) {
    return catchError({ res, err });
  }
};