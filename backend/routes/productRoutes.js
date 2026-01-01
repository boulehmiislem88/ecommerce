const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productControlles');
const authMiddleware = require('../middleware/authmMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');



// CREATE product
router.post('/',authMiddleware ,adminMiddleware,ProductController.create);

// GET all products
router.get('/', ProductController.getAll);

// GET product by ID
router.get('/:id', ProductController.getByID);

// UPDATE product
router.put('/:id',authMiddleware, adminMiddleware,ProductController.update);

// DELETE product
router.delete('/:id',authMiddleware,adminMiddleware, ProductController.delete);

module.exports = router;
  