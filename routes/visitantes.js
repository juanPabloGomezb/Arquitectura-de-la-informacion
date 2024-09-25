const express = require('express');
const visitantesController = require('../controllers/visitantesController'); // Importa el controlador
const router = express.Router();

// Ruta para obtener la lista de visitantes
router.get('/visitantes', visitantesController.getVisitantes);

// Ruta para obtener las 5 notificaciones más recientes
router.get('/notifications', visitantesController.getNotifications);

module.exports = router;
