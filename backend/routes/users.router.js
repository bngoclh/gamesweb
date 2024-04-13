var express = require('express');
const controller = require('../controllers/users.controller');

const router = express.Router();

// Définition de l'authMiddleware
const authMiddleware = (req, res, next) => {
  // Vérifiez ici si l'utilisateur est authentifié
  if (req.isAuthenticated()) {
    // Si l'utilisateur est authentifié, appelez next() pour passer à la prochaine fonction middleware ou route
    next();
  } else {
    // Sinon, renvoyez une réponse d'erreur ou redirigez l'utilisateur vers la page de connexion
    res.status(401).json({ message: "Unauthorized" });
  }
};


// Route pour obtenir tous les utilisateurs
router.route("/")
  .get( controller.getUsers) // GET /allUsers - Récupère tous les utilisateurs
  .post( controller.createUser); // POST /allUsers - Crée un nouvel utilisateur

// Paramètre dynamique pour l'ID de l'utilisateur
//router.param('userId', controller.loadUser);


// Route pour obtenir un utilisateur spécifique
router.route('/:userId')
  .get( controller.getUser) // GET /:userId - Récupère un utilisateur spécifique
  .put( controller.updateUser) // PUT /:userId - Met à jour un utilisateur spécifique
  .delete( controller.deleteUser); // DELETE /:userId - Supprime un utilisateur spécifique


  // Route pour vérifier si l'utilisateur est déjà enregistré
  router.route('/checkUserExistence')
    .post(controller.verifyUser); // POST /checkUser - Vérifie si l'utilisateur est déjà enregistré


// Exportez le module router
module.exports = router;
