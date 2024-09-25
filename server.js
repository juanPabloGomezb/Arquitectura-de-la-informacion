const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db');
const authRoutes = require('./routes/auth');
const visitantesRoutes = require('./routes/visitantes'); // Importa las rutas de visitantes

const app = express();
const port = 3000;

// Configuración CORS
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Uso de rutas
app.use('/api', authRoutes);          // Rutas de autenticación
app.use('/api', visitantesRoutes);    // Rutas de visitantes y notificaciones

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
