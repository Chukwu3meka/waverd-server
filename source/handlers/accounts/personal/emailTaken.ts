import { v4 } from "uuid";
import { NextFunction, Request, Response } from "express";
// import { accountsModel } from "../../../utils/models";

import { catchError, requestHasBody } from "../../../utils/handlers";
import validator from "../../../utils/validator";

// const PROFILE = accountsModel.personalProfileModel;

import PersonalProfileModel from "../../../schema/accounts/personal/profile";
import PersonalSessionModel from "../../../schema/accounts/personal/session";

export const emailExistsFn = async (email: string) => {
  validator({ type: "email", value: email });

  const dbResponse = await PersonalProfileModel.findOne({ email });

  return !!dbResponse;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    requestHasBody({ body: req.body, required: ["email"] });
    const { email } = req.body;

    const emailExists = await emailExistsFn(email);

    const data = { success: true, message: null, payload: { emailTaken: emailExists } };

    res.status(200).json(data);
  } catch (err: any) {
    return catchError({ res, err, status: err.status, message: err.message });
  }
};