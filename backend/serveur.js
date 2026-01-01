const express = require('express');
const app = express();
require('dotenv').config(); // Charge les variables depuis .env

console.log(process.env.PORT);        // 3000
console.log(process.env.JWT_SECRET);  // monSuperSecret123


const cors = require('cors');

app.use(cors({
  origin: '*', // مؤقت للتست
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Middleware global
app.use(express.json()); // Pour parser le JSON

// Import des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderitemRoutes');

// Utilisation des routes
app.use('/auth', authRoutes);        // /auth/register, /auth/login
app.use('/users', userRoutes);       // CRUD utilisateurs
app.use('/products', productRoutes); // CRUD produits
app.use('/categories', categoryRoutes); // CRUD catégories
app.use('/cart', cartRoutes);        // Panier (user connecté)
app.use('/orders', orderRoutes);     // Commandes (user connecté)
app.use('/order-items', orderItemRoutes);

// Middleware d'erreur global (optionnel)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
