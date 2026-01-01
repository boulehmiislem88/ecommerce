const Order = require("../models/order");
const Cart = require("../models/cart");
const OrderItem = require("../models/orderItem"); // ✅ Import manquant
const Product = require("../models/product");  

class OrderController {
    static async create(req, res) {
        try {
            const user_id = req.user.id || req.params.user_id || req.body.user_id;
            if (!user_id) {
                return res.status(400).json({ message: "User ID manquant" });
            }

            // 🛒 Récupérer les produits du panier
            const cartItems = await Cart.getByUserID(user_id);
            if (!cartItems || cartItems.length === 0) {
                return res.status(400).json({ message: "Panier vide" });
            }

            let total = 0;

            // 📦 Vérifier stock + calculer total
            for (const item of cartItems) {
                const product = await Product.getById(item.product_id);

                if (!product) {
                    return res.status(400).json({ message: `Produit ${item.product_id} introuvable` });
                }

                if (item.quantity > product.quantity) {
                    return res.status(400).json({ message: `Stock insuffisant pour ${product.name}` });
                }

                total += product.price * item.quantity;
            }

            // 🧾 Créer la commande
            const orderResult = await Order.create({
                user_id,
                total_amount: total,
                status: "en cours",
                created_at: new Date()
            });

            const order_id = orderResult.insertId;

            // 📦 Créer chaque order_item + mettre à jour stock
            for (const item of cartItems) {
                const product = await Product.getById(item.product_id);

                await OrderItem.create({
                    order_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: product.price
                });

                await Product.updateStock(item.product_id, product.quantity - item.quantity);
            }

            // 🧹 Vider le panier
            await Cart.clearByUserID(user_id);

            res.status(201).json({
                message: "Commande créée avec succès ✅",
                order_id,
                total_amount: total
            });

        } catch (err) {
            console.error("[❌ ERROR CREATE ORDER]:", err);
            res.status(500).json({
                message: "Erreur création order",
                error: err.message
            });
        }
    }
    

    static async getAll(req, res) {
        try {
            const orders = await Order.getAll();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async getByID(req, res) {
        try {
            const order = await Order.getByID(req.params.id);
            if (!order) return res.status(404).json({ message: "Order non trouvée" });
            res.json(order);
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const { status, total_amount } = req.body;
            await Order.update(id, { status, total_amount });
            res.json({ message: "Order modifiée" });
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            await Order.delete(req.params.id);
            res.json({ message: "Order supprimée" });
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }
}

module.exports = OrderController;
