import { ValidationChain, body } from "express-validator";
import { toBoolean } from "../utils/sanitize";

function field(name: string, partial: boolean): ValidationChain {
  const chain = body(name);
  return partial ? chain.optional({ values: "falsy" }) : chain;
}

function buildTestimonialValidators(partial: boolean): ValidationChain[] {
  return [
    field("name", partial)
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("Name must be between 2 and 120 characters"),
    field("role", partial)
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("Role must be between 2 and 120 characters"),
    field("company", partial)
      .trim()
      .isLength({ min: 2, max: 160 })
      .withMessage("Company must be between 2 and 160 characters"),
    field("avatar", true).trim().isURL().withMessage("Avatar must be a valid URL"),
    field("quote", partial)
      .trim()
      .isLength({ min: 20, max: 1200 })
      .withMessage("Quote must be between 20 and 1200 characters"),
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be an integer between 1 and 5"),
    body("order").optional().isInt({ min: 0 }).withMessage("Order must be a positive integer"),
    body("featured").optional().customSanitizer(toBoolean).isBoolean().withMessage("Invalid value")
  ];
}

export const createTestimonialValidator = buildTestimonialValidators(false);
export const updateTestimonialValidator = buildTestimonialValidators(true);

export default createTestimonialValidator;
