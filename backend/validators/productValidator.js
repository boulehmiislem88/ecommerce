const { body } = require('express-validator');

exports.createProductValidator = [
    body('name').notEmpty().withMessage('Name required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be > 0'),
    body('category').notEmpty().withMessage('Category required')
];
