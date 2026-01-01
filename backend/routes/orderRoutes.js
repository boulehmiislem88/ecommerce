const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderControlles");
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authmMiddleware');



router.post("/",authMiddleware, OrderController.create);
router.get("/",adminMiddleware,OrderController.getAll);
router.get("/:id",adminMiddleware, OrderController.getByID);
router.put("/:id",authMiddleware, OrderController.update);
router.delete("/:id",authMiddleware,OrderController.delete);

module.exports = router;
