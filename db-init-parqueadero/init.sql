CREATE DATABASE IF NOT EXISTS parqueadero_db;

USE parqueadero_db;

CREATE TABLE IF NOT EXISTS parqueadero (
    id_parqueadero INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(100),
    modelo VARCHAR(100),
    visitante BOOL,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    numvivienda VARCHAR(255),
    tel CHAR(10)
);
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('comment', 'request', 'like', 'other') NOT NULL,
    message VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    INDEX (user_id),
    INDEX (created_at)
);
INSERT INTO notifications (type, message, details, user_id, is_read)
VALUES 
    ('comment', 'Nuevo comentario en tu publicación', 'Juan ha comentado en tu publicación sobre el parqueadero', 1, FALSE),
    ('request', 'Nueva solicitud de parqueo', 'María ha solicitado un espacio de parqueo para mañana', 2, FALSE),
    ('like', 'A alguien le gusta tu publicación', 'A Carlos le gusta tu publicación sobre las nuevas reglas de parqueo', 1, FALSE),
    ('other', 'Mantenimiento programado', 'El parqueadero estará cerrado por mantenimiento el próximo sábado', NULL, FALSE),
    ('comment', 'Respuesta a tu comentario', 'Ana ha respondido a tu comentario sobre los horarios de parqueo', 3, FALSE);