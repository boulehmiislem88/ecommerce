const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require('../config/db');


class AuthController {

    // ✅ REGISTER
    static async register(req, res) {
        try {
            const { nom, prenom, email, password } = req.body;

            if (!nom || !prenom || !email || !password) {
                return res.status(400).json({ message: "Tous les champs sont requis" });
            }

            // ✅ Vérifier si email existe
            const existingUser = await User.findByEmail(email);
            if (existingUser) { 
                return res.status(400).json({ message: "Email déjà utilisé" });
            }

            // ✅ Création utilisateur (hachage géré dans le modèle)
            const result = await User.create({
                nom,
                prenom,
                email,
                password  // ne pas hasher ici
            });

            res.status(201).json({
                message: "Inscription réussie",
                user_id: result.insertId
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur serveur",
                error: error.message
            });
        }
    }

    // ✅ LOGIN
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email et mot de passe requis" });
            }

            // ✅ Vérifier user
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "Email incorrect" });
            }

            // ✅ Comparaison bcrypt
            const bcrypt = require('bcryptjs');
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            // ✅ Générer JWT
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: "Connexion réussie",
                token,
                user: {
                    id: user.id,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur serveur",
                error: error.message
            });
        }
    }
    static async logout(req, res) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(400).json({ message: "Token manquant" });
            }

            // vérifier que le token est bien formé
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                return res.status(401).json({ message: "Token invalide ou expiré", error: err.message });
            }

            // ajouter à la blacklist
            await db.query(
                "INSERT INTO token_blacklist (token, expires_at) VALUES (?, FROM_UNIXTIME(?))",
                [token, decoded.exp]
            );

            return res.status(200).json({ message: "Logout réussi" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur serveur", error: error.message });
        }
    }
}
module.exports = AuthController;
