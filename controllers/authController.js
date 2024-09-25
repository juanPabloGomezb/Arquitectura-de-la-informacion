const db = require('../db/db');
const bcrypt = require('bcrypt');

// Registro de usuario
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hash], (error, results) => {
            if (error) {
                return res.status(400).json({ error: 'Error al registrar el usuario.' });
            }

            res.status(201).json({ message: 'Usuario registrado.' });
        });
    });
};

// Inicio de sesión
exports.login = (req, res) => {
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
};
