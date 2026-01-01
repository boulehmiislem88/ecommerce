const Cart = require("../models/cart");

class CartController {
    static async add(req, res) {
        try {
            const { product_id, quantity } = req.body;
            const user_id = req.user.id; // <-- prendre depuis le token

            if (!product_id || !quantity) {
                return res.status(400).json({ message: "Produit et quantité requis" });
            }

            const result = await Cart.add({ user_id, product_id, quantity });
            res.status(201).json({ message: "Ajouté au panier", id: result.insertId });
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async getByUser(req, res) {
        try {
            const items = await Cart.getByUserID(req.params.user_id);
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const { quantity } = req.body;
            await Cart.update(id, quantity);
            res.json({ message: "Panier modifié" });
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            await Cart.delete(req.params.id);
            res.json({ message: "Supprimé du panier" });
        } catch (err) {
            res.status(500).json({ message: "Erreur", error: err.message });
        }
    }
}

module.exports = CartController;
