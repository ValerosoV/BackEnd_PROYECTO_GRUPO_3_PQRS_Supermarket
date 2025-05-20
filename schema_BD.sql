-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS pqrs_supermarket;
USE pqrs_supermarket;

-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_identificacion ENUM('CC', 'TI', 'CE', 'NIT') NOT NULL,
    numero_identificacion VARCHAR(20) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    telefono_movil VARCHAR(15),
    contrasena VARCHAR(255) NOT NULL -- sera crifrada con bycrypt
);

-- Tabla de radicados (PQRS)
CREATE TABLE radicados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_radicado VARCHAR(20) UNIQUE NOT NULL,
    fecha_radicado DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_radicado ENUM('Petición', 'Queja', 'Reclamo', 'Sugerencia') NOT NULL,
    comentarios TEXT,
    anexo VARCHAR(255), -- ruta al archivo PDF
    estado ENUM('Nuevo', 'En proceso', 'Resuelto', 'Rechazado') DEFAULT 'Nuevo',
    justificacion_estado TEXT,
    cliente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabla de usuarios (Gestores de PQRS)
DROP TABLE IF EXISTS usuarios;

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL -- cifrada
);
