-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-01-2022 a las 18:02:13
-- Versión del servidor: 10.6.5-MariaDB-1:10.6.5+maria~buster
-- Versión de PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `acmzo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `client_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ap_pat` varchar(30) NOT NULL,
  `ap_mat` varchar(30) NOT NULL,
  `birth_date` date NOT NULL,
  `mail` varchar(60) NOT NULL,
  `cellphone` varchar(10) NOT NULL,
  `emergency_contact` varchar(70) NOT NULL,
  `emergency_cellphone` varchar(10) NOT NULL,
  `discipline` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disciplines`
--

CREATE TABLE `disciplines` (
  `discipline_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `schedule_day` varchar(50) NOT NULL,
  `schedule_time` time NOT NULL,
  `instructor` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `disciplines`
--

INSERT INTO `disciplines` (`discipline_id`, `name`, `schedule_day`, `schedule_time`, `instructor`) VALUES
(1, 'Flexor Stretching ', 'Lunes - Viernes', '07:00:00', 1),
(2, 'Flexor Stretching', 'Lunes - Viernes', '08:00:00', 1),
(3, 'Flexor Stretching ', 'Lunes - Viernes', '09:00:00', 1),
(4, 'Flexor Stretching ', 'Lunes - Viernes', '18:00:00', 1),
(5, 'Flexor Stretching ', 'Lunes - Viernes', '19:00:00', 1),
(6, 'Flexor Stretching ', 'Lunes - Viernes', '20:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instructors`
--

CREATE TABLE `instructors` (
  `instructor_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `birth_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `instructors`
--

INSERT INTO `instructors` (`instructor_id`, `name`, `birth_date`) VALUES
(1, 'Manuel Alejandro Calixto Rosemberg', '2022-01-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `program_modules`
--

CREATE TABLE `program_modules` (
  `module_id` int(5) NOT NULL,
  `module_name` varchar(20) NOT NULL,
  `module_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `program_modules`
--

INSERT INTO `program_modules` (`module_id`, `module_name`, `module_status`) VALUES
(1, 'homePage', 1),
(2, 'addUser', 1),
(3, 'modifyUser', 1),
(4, 'deleteUser', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user` varchar(15) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `user`, `password`) VALUES
(1, 'Master User', 'admin', 'admin'),
(2, 'Sebastian Ochoa Hiriart', 'desarrollo', 'Sabo0512$'),
(3, 'Esly Alejandra Martinez Castillo', 'e.martinez', 'test1234'),
(4, 'test', 'test', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_privilege`
--

CREATE TABLE `user_privilege` (
  `privilege_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `module_id` int(5) NOT NULL,
  `allow` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_privilege`
--

INSERT INTO `user_privilege` (`privilege_id`, `user_id`, `module_id`, `allow`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD KEY `discipline` (`discipline`);

--
-- Indices de la tabla `disciplines`
--
ALTER TABLE `disciplines`
  ADD PRIMARY KEY (`discipline_id`),
  ADD KEY `instructor` (`instructor`);

--
-- Indices de la tabla `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`instructor_id`);

--
-- Indices de la tabla `program_modules`
--
ALTER TABLE `program_modules`
  ADD PRIMARY KEY (`module_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `user_privilege`
--
ALTER TABLE `user_privilege`
  ADD PRIMARY KEY (`privilege_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `module_id` (`module_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `disciplines`
--
ALTER TABLE `disciplines`
  MODIFY `discipline_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `instructors`
--
ALTER TABLE `instructors`
  MODIFY `instructor_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `program_modules`
--
ALTER TABLE `program_modules`
  MODIFY `module_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user_privilege`
--
ALTER TABLE `user_privilege`
  MODIFY `privilege_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`discipline`) REFERENCES `disciplines` (`discipline_id`);

--
-- Filtros para la tabla `disciplines`
--
ALTER TABLE `disciplines`
  ADD CONSTRAINT `disciplines_ibfk_1` FOREIGN KEY (`instructor`) REFERENCES `instructors` (`instructor_id`);

--
-- Filtros para la tabla `user_privilege`
--
ALTER TABLE `user_privilege`
  ADD CONSTRAINT `user_privilege_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_privilege_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `program_modules` (`module_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
