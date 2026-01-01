const express = require("express");
const router = express.Router();
const OrderItemController = require("../controllers/orderitemControlles");
const authMiddleware = require('../middleware/authmMiddleware');


router.post("/",authMiddleware, OrderItemController.create);
router.get("/:order_id", OrderItemController.getByOrder);
router.delete("/:id",authMiddleware, OrderItemController.delete);

module.exports = router;
