import { body } from "express-validator";

export const createEnquiryValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage("Name must be between 2 and 120 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email address is required")
    .isLength({ max: 160 })
    .withMessage("Email is too long")
    .normalizeEmail(),
  body("company")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 160 })
    .withMessage("Company must be at most 160 characters"),
  body("phone")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 40 })
    .withMessage("Phone must be at most 40 characters")
    .matches(/^[+()\-\s\d]*$/)
    .withMessage("Enter a valid phone number"),
  body("service")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 120 })
    .withMessage("Service must be at most 120 characters"),
  body("budget")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 80 })
    .withMessage("Budget must be at most 80 characters"),
  body("message")
    .trim()
    .isLength({ min: 20, max: 4000 })
    .withMessage("Message must be between 20 and 4000 characters")
];

export const updateEnquiryStatusValidator = [
  body("status")
    .trim()
    .isIn(["new", "read", "in-progress", "closed"])
    .withMessage("Invalid status value")
];

export default createEnquiryValidator;
