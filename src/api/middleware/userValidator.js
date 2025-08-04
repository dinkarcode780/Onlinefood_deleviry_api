import { body } from "express-validator";

export const userRegisterValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// export const userLoginValidator = [
//   body("").isEmail().withMessage("Enter a valid email"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters"),
// ];
