const { body, validationResult } = require("express-validator");

const validateOrder = [
  body("nic").trim().notEmpty().withMessage("NIC is required").escape(),
  body("phone")
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Phone must be 10 digits")
    .escape(),
  body("address").trim().notEmpty().withMessage("Address is required").escape(),

  body("deliveryDate")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value) => {
      const date = new Date(value);
      if (date < new Date().setHours(0, 0, 0, 0)) {
        throw new Error("Delivery date cannot be in the past");
      }
      if (date.getDay() === 0) {
        throw new Error("Delivery not allowed on Sundays");
      }
      return true;
    }),
  body("deliveryTime").notEmpty().withMessage("Delivery time is required").escape(),
  body("deliveryLocation").trim().notEmpty().withMessage("Delivery location is required").escape(),


  body("cardDetails.type").optional().trim().notEmpty().withMessage("Card type is required").escape(),
  body("cardDetails.nameOnCard").optional().trim().notEmpty().withMessage("Name on card is required").escape(),
  body("cardDetails.lastFourDigits")
    .optional()
    .trim()
    .isLength({ min: 4, max: 4 })
    .withMessage("Card last 4 digits invalid")
    .escape(),
  body("cardDetails.expiry")
    .optional()
    .trim()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .withMessage("Invalid expiry format")
    .escape(),
  body("cardDetails.cvv")
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("CVV must be 3 digits")
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = validateOrder;
