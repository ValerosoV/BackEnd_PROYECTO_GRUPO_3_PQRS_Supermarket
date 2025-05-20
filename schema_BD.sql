-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2025 a las 19:07:54
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pqrs_supermarket`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'prueba1', '$2b$10$UuCJuAxbIOvqmh1QN6gWrOBvNtDefPr6V7Nx.cWi3MLjwOcgm8yHK');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `tipo_identificacion` enum('CC','TI','CE','NIT') NOT NULL,
  `numero_identificacion` varchar(20) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `telefono_movil` varchar(15) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `tipo_identificacion`, `numero_identificacion`, `nombre_completo`, `correo_electronico`, `telefono_movil`, `contrasena`) VALUES
(2, 'CC', '1234567890', 'Juan Pérez', 'juan.perez@example.com', '3001234567', '$2b$10$eWCUT3h.7dbeb7cNYZVWEOFNteWOHs/iur35zGxGv9Nsm/FzH4Kbe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `radicados`
--

CREATE TABLE `radicados` (
  `id` int(11) NOT NULL,
  `numero_radicado` varchar(20) NOT NULL,
  `fecha_radicado` datetime DEFAULT current_timestamp(),
  `tipo_radicado` enum('Peticion','Queja','Reclamo','Sugerencia') NOT NULL,
  `comentarios` text DEFAULT NULL,
  `anexo` varchar(255) DEFAULT NULL,
  `estado` enum('Nuevo','En proceso','Resuelto','Rechazado') DEFAULT 'Nuevo',
  `justificacion_estado` text DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `radicados`
--

INSERT INTO `radicados` (`id`, `numero_radicado`, `fecha_radicado`, `tipo_radicado`, `comentarios`, `anexo`, `estado`, `justificacion_estado`, `cliente_id`) VALUES
(4, 'RAD-40891739', '2025-05-19 23:45:30', 'Queja', 'Actualización de los comentarios.', 'nuevo_archivo.pdf', 'En proceso', 'Ya se busc solicionar el problem', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_identificacion` (`numero_identificacion`);

--
-- Indices de la tabla `radicados`
--
ALTER TABLE `radicados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_radicado` (`numero_radicado`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `radicados`
--
ALTER TABLE `radicados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `radicados`
--
ALTER TABLE `radicados`
  ADD CONSTRAINT `radicados_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
