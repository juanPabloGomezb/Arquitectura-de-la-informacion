const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());  // Permite manejar JSON en las solicitudes

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'conjunto_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conexión a la base de datos establecida');
});

// Ruta para insertar un visitante
app.post('/registrar-visitante', (req, res) => {
  const { nombre, documento_identidad, fecha_visita, hora_entrada, vehiculo, destino, observaciones } = req.body;

  const query = `INSERT INTO visitantes (nombre, documento_identidad, fecha_visita, hora_entrada, vehiculo, destino, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [nombre, documento_identidad, fecha_visita, hora_entrada, vehiculo, destino, observaciones], (err, result) => {
    if (err) throw err;
    res.json({ status: 'Visitante registrado' });
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
