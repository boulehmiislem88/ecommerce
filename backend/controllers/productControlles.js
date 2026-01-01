const Product = require('../models/product');
const cloudinary = require('../config/cloudinary'); 

class ProductController {
     // CREATE product (avec image)
     static async create(req, res) {
        try {
            const { name, description, price, quantity } = req.body;

            let imageUrl = null;

            // upload image to cloudinary if exists
            if (req.file) {
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                imageUrl = uploadResult.secure_url;
            }

            const result = await Product.create({
                name,
                description,
                price,
                quantity,
                image: imageUrl
            });

            res.status(201).json({
                message: 'Produit créé avec succès',
                id: result.insertId,
                image: imageUrl
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Erreur serveur',
                error: err.message
            });
        }
    }

    // GET ALL products
    static async getAll(req, res) {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: err.message });
        }
    }

    // GET product by ID
    static async getByID(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.getByID(id);
            if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
            res.json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la récupération du produit', error: err.message });
        }
    }

    // UPDATE product
    static async update(req, res) {
        try {
            const id = req.params.id;
            const { name, description, price, quantity } = req.body;
            await Product.update(id, { name, description, price, quantity });
            res.status(200).json({ message: 'Modifié avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
        }
    }

    // DELETE product
    static async delete(req, res) {
        try {
            const id = req.params.id;
            await Product.delete(id);
            res.status(200).json({ message: 'Supprimé avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur de suppression', error: err.message });
        }
    }
}

module.exports = ProductController;
