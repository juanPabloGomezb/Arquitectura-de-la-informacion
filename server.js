const express = require('express');
const cors = require('cors');

const authController = require('./controllers/authController');
const parkingController = require('./controllers/parkingController');
const notificationController = require('./controllers/notificationController');

const app = express();
const port = 3000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],  // Permite ambos orígenes
}));


app.use(express.json());

// Maneja solicitudes preflight OPTIONS
app.options('*', cors());  // Esto permite solicitudes preflight desde cualquier origen

// Rutas de autenticación
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

// Rutas del parqueadero
app.post('/api/parking/addVehicle', parkingController.addVehicle);
app.get('/api/parking/getVehicles', parkingController.getVehicles);

// Ruta para obtener las notificaciones
app.get('/api/notifications', notificationController.getNotifications);

// Ruta para crear una notificación desde el formulario
app.post('/api/notifications/create', notificationController.createNotification);


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
