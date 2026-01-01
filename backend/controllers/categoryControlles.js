const Category = require('../models/category');

class CategoryController {
    // CREATE category
    static async create(req, res) {
        try {
            const { name, description } = req.body;
            const result = await Category.create({ name, description });
            res.status(201).json({ message: 'Créé avec succès', id: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur', error: err.message });
        }
    }

    // GET ALL categories
    static async getAll(req, res) {
        try {
            const categories = await Category.getAll();
            res.json(categories);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error: err.message });
        }
    }

    // GET category by ID
    static async getByID(req, res) {
        try {
            const id = req.params.id;
            const category = await Category.getByID(id);
            if (!category) return res.status(404).json({ message: 'Catégorie non trouvée' });
            res.json(category);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie', error: err.message });
        }
    }

    // UPDATE category
    static async update(req, res) {
        try {
            const id = req.params.id;
            const { name, description } = req.body;
            await Category.update(id, { name, description });
            res.status(200).json({ message: 'Modifié avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
        }
    }

    // DELETE category
    static async delete(req, res) {
        try {
            const id = req.params.id;
            await Category.delete(id);
            res.status(200).json({ message: 'Supprimé avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur de suppression', error: err.message });
        }
    }
}

module.exports = CategoryController;
