const db = require('../db/db');

// Controlador para obtener la lista de visitantes
exports.getVisitantes = (req, res) => {
    const query = `SELECT nombre, numvivienda, tel, visitante, matricula FROM parqueadero`;

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener los visitantes.' });
        }
        res.status(200).json(results); // Retorna los resultados como JSON
    });
};

// Controlador para registrar un vehículo
exports.registerVehiculo = (req, res) => {
    const { matricula, modelo, visitante, nombre, apellido, numvivienda, telefono } = req.body;

    if (!matricula || !modelo || !nombre || !apellido || !numvivienda || !telefono) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const sql = 'INSERT INTO parqueadero (matricula, modelo, visitante, nombre, apellido, numvivienda, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [matricula, modelo, visitante, nombre, apellido, numvivienda, telefono], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al registrar el vehículo.' });
        }
        res.status(201).json({ message: 'Vehículo registrado correctamente.' });
    });
};


// Controlador para obtener las 5 notificaciones más recientes
exports.getNotifications = (req, res) => {
    const query = `SELECT id, type, message, details, created_at
                   FROM notifications
                   ORDER BY created_at DESC
                   LIMIT 5`;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error en la base de datos:', error);
            return res.status(500).json({ message: 'Error al obtener las notificaciones.' });
        }
        res.status(200).json(results);
    });
};
