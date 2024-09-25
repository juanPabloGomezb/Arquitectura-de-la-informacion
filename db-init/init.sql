drop database sofcompus;
CREATE DATABASE sofcompus;

USE sofcompus;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
CREATE TABLE parqueadero (
    id_parqueadero INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(100),
    modelo VARCHAR(100),
    visitante bool,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    numvivienda VARCHAR(255),
    tel char(10)
);
CREATE TABLE notifications (
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
INSERT INTO notifications (type, message, details, user_id) VALUES
('comment', 'Santiago Martinez ha comentado en el foro', 'Nuevo comentario en el tema: Bienvenida', 1),
('request', 'Juan Pablo Gómez te ha enviado una solicitud', 'Solicitud de amistad pendiente', 2),
('like', 'Linda Caicedo dio like a tu publicación', 'Like en la publicación: Nuevas normas de la comunidad', 3),
('other', 'Esteban Parra', 'Quiero hacer una reservación', 4),
('comment', 'María López respondió a tu comentario', 'Respuesta en el tema: Mantenimiento de áreas comunes', 1);
select * from notifications