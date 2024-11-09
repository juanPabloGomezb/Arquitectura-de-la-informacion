const { parqueaderoConnection } = require('../db');

// Método para obtener las notificaciones
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

// Método para crear una nueva notificación
exports.createNotification = async (req, res) => {
    const { matricula, modelo, visitante, nombre, apellido, numvivienda, tel } = req.body;

    // Define los valores que se almacenarán en la notificación
    const type = 'request';
    const message = 'Nuevo vehículo registrado';
    const details = `Vehículo matriculado con número ${matricula}, modelo ${modelo}, registrado por ${nombre} ${apellido}.`;
    const user_id = null; // Define el ID del usuario si está disponible

    try {
        // Inserta la nueva notificación en la base de datos
        await parqueaderoConnection.query(
            'INSERT INTO notifications (type, message, details, user_id) VALUES (?, ?, ?, ?)',
            [type, message, details, user_id]
        );
        res.status(200).json({ message: 'Notificación creada con éxito' });
    } catch (error) {
        console.error('Error al crear notificación:', error);
        res.status(500).json({ error: 'Error al crear la notificación' });
    }
};
