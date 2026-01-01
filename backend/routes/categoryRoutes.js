const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryControlles');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authmMiddleware');



// CREATE category
router.post('/',adminMiddleware,authMiddleware, CategoryController.create);

// GET all categories
router.get('/', CategoryController.getAll);

// GET category by ID
router.get('/:id', CategoryController.getByID);

// UPDATE category
router.put('/:id',adminMiddleware,authMiddleware, CategoryController.update);

// DELETE category
router.delete('/:id',adminMiddleware,authMiddleware, CategoryController.delete);

module.exports = router;