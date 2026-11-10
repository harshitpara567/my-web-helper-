import { ValidationChain, body } from "express-validator";
import { toArray } from "../utils/sanitize";

function field(name: string, partial: boolean): ValidationChain {
  const chain = body(name);
  return partial ? chain.optional({ values: "falsy" }) : chain;
}

function buildBlogValidators(partial: boolean): ValidationChain[] {
  return [
    field("title", partial)
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage("Title must be between 3 and 200 characters"),
    field("excerpt", partial)
      .trim()
      .isLength({ min: 10, max: 400 })
      .withMessage("Excerpt must be between 10 and 400 characters"),
    field("content", partial)
      .trim()
      .isLength({ min: 50 })
      .withMessage("Content must be at least 50 characters"),
    field("coverImage", true)
      .trim()
      .isURL()
      .withMessage("Cover image must be a valid URL"),
    field("category", true).trim().isLength({ max: 120 }).withMessage("Category is too long"),
    field("author", partial)
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("Author is required"),
    field("status", true).trim().isIn(["draft", "published"]).withMessage("Invalid status"),
    field("slug", true).trim().isLength({ max: 200 }).withMessage("Slug is too long"),
    body("tags").optional().customSanitizer(toArray),
    body("seo.keywords").optional().customSanitizer(toArray)
  ];
}

export const createBlogValidator = buildBlogValidators(false);
export const updateBlogValidator = buildBlogValidators(true);

export default createBlogValidator;
