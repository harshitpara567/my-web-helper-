import { ValidationChain, body } from "express-validator";

function buildCategoryValidators(partial: boolean): ValidationChain[] {
  const name = body("name");
  const type = body("type");
  return [
    (partial ? name.optional({ values: "falsy" }) : name)
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("Name must be between 2 and 120 characters"),
    (partial ? type.optional({ values: "falsy" }) : type)
      .trim()
      .isIn(["blog", "portfolio"])
      .withMessage("Type must be either blog or portfolio"),
    body("slug").optional({ values: "falsy" }).trim().isLength({ max: 120 }),
    body("description").optional({ values: "falsy" }).trim().isLength({ max: 300 })
  ];
}

export const createCategoryValidator = buildCategoryValidators(false);
export const updateCategoryValidator = buildCategoryValidators(true);

export default createCategoryValidator;
