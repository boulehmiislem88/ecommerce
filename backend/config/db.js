// db.js
const mysql = require('mysql2/promise'); // ✅ version promise
require('dotenv').config(); // Charger les variables depuis .env

// Créer un pool de connexions (meilleure pratique)
const db = mysql.createPool({
  host: process.env.DB_HOST,       // exemple: localhost
  user: process.env.DB_USER,       // exemple: root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Vérifier la connexion au démarrage
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connexion à la base de données réussie');
    connection.release(); // libérer la connexion après test
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // arrêter le serveur si impossible de se connecter
  }
})();

module.exports = db; // on exporte le pool
