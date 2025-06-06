import validate from "../../../utils/validate";

import { ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";
import { Request, Response } from "express";
import { APIHUB_ENDPOINTS } from "../../../models/apihub.model";
import { catchError, requestHasBody } from "../../../utils/helpers";

export default async (req: Request, res: Response) => {
  try {
    requestHasBody({ body: req.body, required: ["id"], sendError: true });

    const id = req.body.id;
    validate({ value: id, type: "comment", sendError: true, label: "ID" });

    const validId = new ObjectId(id);
    if (!isValidObjectId(validId)) throw { sendError: true, message: "Specified Endpoint ID is invalid" };

    const endpointData = await APIHUB_ENDPOINTS.findById(id);

    if (!endpointData) throw { sendError: true, message: "Endpoint has no data" };
    if (endpointData.id !== id) throw { sendError: true, message: "Endpoint data mismatch" };
    if (typeof endpointData.visibility !== "boolean") throw { sendError: true, message: "Endpoint Visibility not set" };

    const isVisibile = !endpointData.visibility;
    await APIHUB_ENDPOINTS.findByIdAndUpdate(id, { $set: { visibility: isVisibile } });

    const data = {
      success: true,
      data: `Endpoint visibility updated successfully for this ID: ${id}`,
      message: `Endpoint is now ${isVisibile ? "visible to" : "hidden from"} the entire public`,
    };

    res.status(id === "new" ? 201 : 200).json(data);
  } catch (err: any) {
    if (err.sendError && err.type === "validate") {
      const data = { success: false, message: err.description && err.description.message, data: null };
      res.status(400).json(data);
    }

    return catchError({ res, err });
  }
};
