import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError";

/** Collects express-validator results and throws a 400 ApiError with field details. */
export function runValidation(req: Request, _res: Response, next: NextFunction): void {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
    return;
  }

  const errors = result.array().map((error) =>
    error.type === "field"
      ? { field: error.path, message: String(error.msg) }
      : { field: "unknown", message: String(error.msg) }
  );

  next(ApiError.badRequest("Validation failed", errors));
}

export default runValidation;
