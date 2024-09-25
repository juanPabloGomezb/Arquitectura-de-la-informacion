const express = require('express');
const authController = require('../controllers/authController'); // Importamos los controladores de autenticación
const router = express.Router();

// Rutas
router.post('/signup', authController.signup); // Ruta de registro
router.post('/login', authController.login);   // Ruta de inicio de sesión

module.exports = router; // Exportamos las rutas
