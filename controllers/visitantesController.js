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
