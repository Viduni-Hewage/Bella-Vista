const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('title').trim().notEmpty().withMessage('Title is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required').escape(),
  body('image').trim().notEmpty().withMessage('Image URL is required').escape(),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('category').trim().notEmpty().withMessage('Category is required').escape(),
  body('type').trim().notEmpty().withMessage('Type is required').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = validateProduct;
