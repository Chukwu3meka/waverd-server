import { codes } from "../utils/codes";
import * as handler from "../handlers/console";
import express, { Request, Response } from "express";

const router = express.Router({ caseSensitive: true, strict: true });

// Routes
router.route("/apihub/endpoints").get(handler.endpoints);
router.route("/apihub/endpoints/:id").get(handler.endpoint);
router.route("/apihub/endpoint-title-exists").post(handler.endpointTitleExists);
router.route("/apihub/compose-api").post(handler.composeEndpoint);

// ? fallback route
router.route("/*").get((req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: new Date().toDateString(), data: codes["Invalid Console Route"] });
});

export default router;
