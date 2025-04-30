import { Request, Response } from "express";
import pushMail from "../../utils/pushMail";
import validate from "../../utils/validate";
import { ACCOUNTS_PROFILE } from "../../models/accounts.model";
import { catchError, generateSession, requestHasBody } from "../../utils/helpers";

export default async (req: Request, res: Response) => {
  // ?? Always return true whether successful or failed
  const data = { success: true, message: "Password reset has been initialized. Please check your email for further instructions.", data: null };

  try {
    requestHasBody({ body: req.body, required: ["email"] });
    const { email } = req.body;

    // Validate request body before processing request
    validate({ type: "email", value: email });

    const profile = await ACCOUNTS_PROFILE.findOne({ email });
    if (!profile || !profile.auth || !profile.auth.otp) throw { message: "Email does not exists" }; // <= verify that account exist, else throw an error

    // if (profile.auth.otp.purpose === "password reset") {
    //   const hoursElapsed = hourDiff(profile.auth.otp.time);
    //   if (hoursElapsed <= 1) throw { message: "Password reset link sent recently", sendError: true };
    // }

    const otp = { time: new Date(), purpose: "password reset", code: generateSession(profile.id) };

    await ACCOUNTS_PROFILE.findByIdAndUpdate(profile.id, { $set: { ["auth.otp"]: otp } }).then(async () => {
      await pushMail({
        account: "accounts",
        template: "initiatePasswordReset",
        address: email,
        subject: "WaveRD Password Reset Request",
        data: {
          activationLink: `${process.env.CLIENT_URL}/accounts/password-reset/${otp.code}`,
          name: profile.name,
        },
      });
    });

    res.status(200).json(data);
  } catch (err: any) {
    if (!err.sendError) {
      res.status(200).json(data);
      err.respond = false;
    }

    return catchError({ res, err });
  }
};
