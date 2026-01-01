const db = require('../config/db');

class OrderItem {
    // CREATE order item
    static async create({ order_id, product_id, quantity, price }) {
        const sql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [order_id, product_id, quantity, price]);
        return result;
    }

    // GET all items for an order
    static async getByOrderID(order_id) {
        const sql = 'SELECT * FROM order_items WHERE order_id = ?';
        const [rows] = await db.query(sql, [order_id]);
        return rows;
    }

    // DELETE order item
    static async delete(id) {
        const sql = 'DELETE FROM order_items WHERE id=?';
        const [result] = await db.query(sql, [id]);
        return result;
    }
}

module.exports = OrderItem;
