const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartControlles");
const authMiddleware = require('../middleware/authmMiddleware');

router.post("/add",authMiddleware, CartController.add);
router.get("/:user_id",authMiddleware, CartController.getByUser);
router.put("/:id",authMiddleware, CartController.update);
router.delete("/:id",authMiddleware, CartController.delete);

module.exports = router;
