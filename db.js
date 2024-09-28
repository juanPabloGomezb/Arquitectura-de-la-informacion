const mysql = require('mysql2/promise');

// Conexión a la base de datos sofcompus
const sofcompusConnection = mysql.createPool({
  host: process.env.MYSQL_SOF_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Conexión a la base de datos parqueadero_db
const parqueaderoConnection = mysql.createPool({
  host: process.env.MYSQL_PARKING_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_PARKING_DATABASE
});

module.exports = {
  sofcompusConnection,
  parqueaderoConnection
};
