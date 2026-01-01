function adminMiddleware(req, res, next) {
    // req.user doit être défini par authMiddleware
    if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé : Admin uniquement' });
    }

    next(); // utilisateur est admin → continue vers la route
}

module.exports = adminMiddleware;
