const User = require('../models/User');
const { sendMail } = require('../services/mailServises');
const crypto = require('crypto');

class UserController {
    static async create(req, res) {
        try {
          const { nom, prenom, email, password } = req.body;
    
          // 1️⃣ create user
          const result = await User.create({ nom, prenom, email, password });
    
          // 2️⃣ generate verification code
          const verificationCode = crypto.randomInt(100000, 999999);
    
          // (اختياري) خزّن verificationCode في DB مع user
    
          // 3️⃣ send welcome email
          await sendMail(
            email,
            'Bienvenue 👋',
            'Merci pour votre inscription',
            `<h2>Bienvenue ${prenom}</h2>
             <p>Votre compte a été créé avec succès.</p>`
          );
    
          // 4️⃣ send verification email
          await sendMail(
            email,
            'Vérification de compte',
            `Votre code est : ${verificationCode}`,
            `<h2>Code de vérification</h2><b>${verificationCode}</b>`
          );
    
          // 5️⃣ response
          res.status(201).json({
            message: 'Utilisateur créé + mails envoyés ✅',
            id: result.insertId
          });
    
        } catch (err) {
          console.error(err);
          res.status(500).json({
            message: 'Erreur',
            error: err.message
          });
        }
    }
    

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await User.delete(id);
            res.status(200).json({ message: 'Supprimé avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur de suppression', error: err.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const { nom, prenom, email } = req.body;
            await User.update(id, { nom, prenom, email });
            res.status(200).json({ message: 'Modifié avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
        }
    }

    static async getAll(req, res) {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.getById(id);
            if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la récupération de l’utilisateur', error: err.message });
        }
    }
}

module.exports = UserController;
