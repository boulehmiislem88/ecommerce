const db = require('../config/db');

class Order {
    // CREATE order
    static async create({ user_id, total_amount, status }) {
        const sql = 'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [user_id, total_amount, status]);
        return result;
    }

    // GET all orders
    static async getAll() {
        const sql = 'SELECT * FROM orders';
        const [rows] = await db.query(sql);
        return rows;
    }

    // GET order by ID
    static async getById(id) {
        const sql = 'SELECT * FROM orders WHERE id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    }

    // UPDATE order
    static async update(id, { status, total_amount }) {
        const sql = 'UPDATE orders SET status=?, total_amount=? WHERE id=?';
        const [result] = await db.query(sql, [status, total_amount, id]);
        return result;
    }

    // DELETE order
    static async delete(id) {
        const sql = 'DELETE FROM orders WHERE id=?';
        const [result] = await db.query(sql, [id]);
        return result;
    }

    // UPDATE stock (optional, si tu veux gérer directement depuis Order)
    static async updateStock(product_id, newQuantity) {
        const sql = 'UPDATE products SET quantity=? WHERE id=?';
        const [result] = await db.query(sql, [newQuantity, product_id]);
        return result;
    }
}

module.exports = Order;
