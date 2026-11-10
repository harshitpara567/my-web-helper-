import { ValidationChain, body } from "express-validator";
import { toArray, toBoolean } from "../utils/sanitize";

function field(name: string, partial: boolean): ValidationChain {
  const chain = body(name);
  return partial ? chain.optional({ values: "falsy" }) : chain;
}

function buildPortfolioValidators(partial: boolean): ValidationChain[] {
  return [
    field("title", partial)
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage("Title must be between 3 and 200 characters"),
    field("slug", true).trim().isLength({ max: 200 }).withMessage("Slug is too long"),
    field("client", partial)
      .trim()
      .isLength({ min: 2, max: 160 })
      .withMessage("Client must be between 2 and 160 characters"),
    field("summary", partial)
      .trim()
      .isLength({ min: 10, max: 400 })
      .withMessage("Summary must be between 10 and 400 characters"),
    field("description", partial)
      .trim()
      .isLength({ min: 20 })
      .withMessage("Description must be at least 20 characters"),
    field("coverImage", true)
      .trim()
      .isURL()
      .withMessage("Cover image must be a valid URL"),
    field("category", partial)
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("Category must be between 2 and 120 characters"),
    field("year", true).isInt({ min: 2000, max: 2100 }).withMessage("Year must be a valid year"),
    field("liveUrl", true).trim().isURL().withMessage("Live URL must be a valid URL"),
    body("images").optional().customSanitizer(toArray),
    body("technologies").optional().customSanitizer(toArray),
    body("results").optional().customSanitizer(toArray),
    body("featured").optional().customSanitizer(toBoolean).isBoolean().withMessage("Invalid value")
  ];
}

export const createPortfolioValidator = buildPortfolioValidators(false);
export const updatePortfolioValidator = buildPortfolioValidators(true);

export default createPortfolioValidator;
