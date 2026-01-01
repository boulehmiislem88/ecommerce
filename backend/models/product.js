const db = require('../config/db');

class Product {

    static async create({ name, description, price, quantity }) {
        const sql = 'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [name, description, price, quantity]);
        return result;
    }

    static async getAll() {
        const sql = 'SELECT * FROM products';
        const [rows] = await db.query(sql);
        return rows;
    }

    static async getById(id) {      
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    }

    static async update(id, { name, description, price, quantity }) {
        const sql = 'UPDATE products SET name=?, description=?, price=?, quantity=? WHERE id=?';
        const [result] = await db.query(sql, [name, description, price, quantity, id]);
        return result;
    }

    static async delete(id) {
        const sql = 'DELETE FROM products WHERE id=?';
        const [result] = await db.query(sql, [id]);
        return result;
    }

    static async updateStock(product_id, newQuantity) {
        const sql = 'UPDATE products SET quantity = ? WHERE id = ?';
        const [result] = await db.query(sql, [newQuantity, product_id]);
        return result;
    }
}

module.exports = Product;
