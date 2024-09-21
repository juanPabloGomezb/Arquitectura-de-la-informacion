// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambia si es necesario
    user: 'root', // Tu usuario
    password: '1234', // Tu contraseña
    database: 'sofcompus'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
});

// Registro de usuario
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Validar que todos los campos estén presentes
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hash], (error, results) => {
            if (error) {
                return res.status(400).json({ error: 'Error al registrar el usuario. Tal vez el email ya esté en uso.' });
            }

            res.status(201).json({ message: 'Usuario registrado.' });
        });
    });
});


// Inicio de sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (error, results) => {
        if (error || results.length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
            }

            res.status(200).json({ message: 'Inicio de sesión exitoso.' });
        });
    });
});

// Registro de vehículo
app.post('/api/parqueadero', (req, res) => {
    const { matricula, modelo, visitante, nombre, apellido, numvivienda, telefono } = req.body;

    // Validar que todos los campos estén presentes
    if (!matricula || !modelo || !nombre || !apellido || !numvivienda || !telefono) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const sql = 'INSERT INTO parqueadero (matricula, modelo, visitante, nombre, apellido, numvivienda, tel) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [matricula, modelo, visitante, nombre, apellido, numvivienda, telefono], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al registrar el vehículo.' });
        }

        res.status(201).json({ message: 'Vehículo registrado exitosamente.' });
    });
});


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
