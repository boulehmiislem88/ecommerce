const db = require('../config/db');

class Cart {

    // GET all cart items for a user
    static async getByUserID(user_id) {
        const sql = `
            SELECT c.id AS cart_id,
                   c.user_id,
                   c.product_id,
                   c.quantity,
                   p.name,
                   p.description,
                   p.price,
                   p.quantity AS stock
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?`;
        const [rows] = await db.query(sql, [user_id]);
        return rows;
    }

    // ADD product to cart
    static async add({ user_id, product_id, quantity }) {
        const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [user_id, product_id, quantity]);
        return result;
    }

    // UPDATE quantity
    static async update(id, quantity) {
        const sql = 'UPDATE cart SET quantity=? WHERE id=?';
        const [result] = await db.query(sql, [quantity, id]);
        return result;
    }

    // DELETE cart by user
    static async delete(user_id) {
        const sql = 'DELETE FROM cart WHERE user_id = ?';
        const [result] = await db.query(sql, [user_id]);
        return result;
    }

    // CLEAR cart by user (même chose que delete, mais séparé si besoin)
    static async clearByUserID(user_id) {
        const sql = 'DELETE FROM cart WHERE user_id = ?';
        const [result] = await db.query(sql, [user_id]);
        return result;
    }
}

module.exports = Cart;
