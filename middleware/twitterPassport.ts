import { catchError } from "../utils/helpers";
import { Response, Request, NextFunction } from "express";

// export default async (req: Request, res: Response, next: NextFunction) => {
export default async (req: any, res: Response, next: NextFunction) => {
  try {
    // Solve client visible TypeError: req.session.regenerate is not a function using Passport
    // register regenerate & save after the cookieSession middleware initialization
    if (req.session && !req.session.regenerate) {
      req.session.regenerate = (cb: any) => {
        return cb();
      };
    }
    if (req.session && !req.session.save) {
      req.session.save = (cb: any) => {
        return cb();
      };
    }
    next();
  } catch (err: any) {
    return catchError({ res, err });
  }
};
