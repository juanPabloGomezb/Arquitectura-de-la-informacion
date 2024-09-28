const { parqueaderoConnection } = require('../db');

exports.getNotifications = async (req, res) => {
    try {
        const [rows] = await parqueaderoConnection.query(
            'SELECT * FROM notifications ORDER BY created_at DESC LIMIT 5'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
};