const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControlles');
const authMiddleware = require('../middleware/authmMiddleware');



router.post('/',authMiddleware, UserController.create);


router.get('/', authMiddleware,UserController.getAll);


router.get('/:id',authMiddleware, UserController.getById);


router.put('/:id',authMiddleware, UserController.update);


router.delete('/:id',authMiddleware, UserController.delete);

module.exports = router;
