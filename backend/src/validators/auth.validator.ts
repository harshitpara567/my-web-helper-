import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("A valid email address is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required")
];

export default loginValidator;
