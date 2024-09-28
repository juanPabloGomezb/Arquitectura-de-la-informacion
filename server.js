const express = require('express');
const cors = require('cors');

const authController = require('./controllers/authController');
const parkingController = require('./controllers/parkingController');
const notificationController = require('./controllers/notificationController');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

// Rutas del parqueadero
app.post('/api/parking/addVehicle', parkingController.addVehicle);
app.get('/api/parking/getVehicles', parkingController.getVehicles);

// Ruta para notificaciones
app.get('/api/notifications', notificationController.getNotifications);

// Ruta para verificar el estado del servidor
app.get('/api/status', (req, res) => {
    res.status(200).json({ message: "Servidor funcionando correctamente" });
});
// Después de definir todas tus rutas
console.log('Rutas cargadas:', app._router.stack.filter(r => r.route).map(r => r.route.path));
// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});