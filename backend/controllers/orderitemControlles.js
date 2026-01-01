const OrderItem = require("../models/orderitem");

class OrderItemController {
    static async create(req, res) {
        try {
            const { product_id, quantity, price, order_id } = req.body;

            if (!order_id || !product_id || !quantity || !price) {
                return res.status(400).json({ message: "order_id, product_id, quantity et price requis" });
            }

            const result = await OrderItem.create({ order_id, product_id, quantity, price });
            res.status(201).json({ message: "Item ajouté", id: result.insertId });
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async getByOrder(req, res) {
        try {
            const order_id = req.params.order_id;
            const items = await OrderItem.getByOrderID(order_id);
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            await OrderItem.delete(req.params.id);
            res.json({ message: "Item supprimé" });
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }
}

module.exports = OrderItemController;
