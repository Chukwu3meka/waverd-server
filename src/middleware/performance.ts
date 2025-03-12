import { formatDistanceToNow } from "date-fns";
import { catchError } from "../utils/handlers";
import { Request, Response, NextFunction } from "express";

async function performanceMonitor(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const durationDesc = formatDistanceToNow(start, {
      addSuffix: true,
      includeSeconds: true,
    });

    console.log(`Request to ${req.path} executed ${durationDesc}`);
  });

  return next();
}

export default performanceMonitor;
