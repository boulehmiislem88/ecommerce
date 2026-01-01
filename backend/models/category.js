const db = require('../config/db');

class Category {
    // CREATE category
    static async create({ name, description }) {
        const sql = 'INSERT INTO categories (name, description) VALUES (?, ?)';
        const [result] = await db.query(sql, [name, description]);
        return result;
    }

    // GET ALL categories
    static async getAll() {
        const sql = 'SELECT * FROM categories';
        const [rows] = await db.query(sql);
        return rows;
    }

    // GET category by ID
    static async getByID(id) {
        const sql = 'SELECT * FROM categories WHERE id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    }

    // UPDATE category
    static async update(id, { name, description }) {
        const sql = 'UPDATE categories SET name=?, description=? WHERE id=?';
        const [result] = await db.query(sql, [name, description, id]);
        return result;
    }

    // DELETE category
    static async delete(id) {
        const sql = 'DELETE FROM categories WHERE id=?';
        const [result] = await db.query(sql, [id]);
        return result;
    }
}

module.exports = Category;
