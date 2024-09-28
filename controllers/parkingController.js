const { parqueaderoConnection } = require('../db');

// Controlador para agregar un vehículo
exports.addVehicle = async (req, res) => {
  const { matricula, modelo, visitante, nombre, apellido, numvivienda, telefono } = req.body;

  try {
    // Insertar el vehículo en la base de datos
    const [result] = await parqueaderoConnection.execute(
      'INSERT INTO parqueadero (matricula, modelo, visitante, nombre, apellido, numvivienda, tel) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [matricula, modelo, visitante, nombre, apellido, numvivienda, telefono]
    );

    // Verificar si se insertó un registro
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Vehículo agregado correctamente' });
    } else {
      res.status(400).json({ message: 'No se pudo agregar el vehículo' });
    }
  } catch (error) {
    console.error('Error al agregar vehículo:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    // Consulta para obtener todos los vehículos
    const [rows] = await parqueaderoConnection.execute(
      'SELECT matricula, modelo, nombre, apellido, numvivienda, tel as telefono, visitante FROM parqueadero'
    );

    // Convertir el campo 'visitante' a booleano
    const vehicles = rows.map(vehicle => ({
      ...vehicle,
      visitante: vehicle.visitante === 1
    }));

    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};