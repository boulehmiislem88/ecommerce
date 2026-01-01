const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    static async create({ nom, prenom, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(sql, [nom, prenom, email, hashedPassword]);
        return result;
    }

    static async getAll() {
        const sql = "SELECT id, nom, prenom, email, created_at, updated_at FROM users";
        const [rows] = await db.query(sql);
        return rows;
    }

    static async getById(id) {
        const sql = "SELECT id, nom, prenom, email, created_at, updated_at FROM users WHERE id = ?";
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    }

    static async update(id, { nom, prenom, email }) {
        const sql = "UPDATE users SET nom=?, prenom=?, email=? WHERE id=?";
        const [result] = await db.query(sql, [nom, prenom, email, id]);
        return result;
    }

    static async delete(id) {
        const sql = "DELETE FROM users WHERE id=?";
        const [result] = await db.query(sql, [id]);
        return result;
    }

    static async findByEmail(email) {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.query(sql, [email]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = User;
