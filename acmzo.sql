-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 14, 2022 at 06:52 PM
-- Server version: 10.3.31-MariaDB-0ubuntu0.20.04.1
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acmzo`
--

-- --------------------------------------------------------

--
-- Table structure for table `atendance`
--

CREATE TABLE `atendance` (
  `atendance_id` int(9) NOT NULL,
  `client_id` int(5) NOT NULL,
  `atendance_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `atendance`
--

INSERT INTO `atendance` (`atendance_id`, `client_id`, `atendance_date`) VALUES
(1, 971, '2022-01-14 18:42:19'),
(2, 971, '2022-01-14 18:43:44'),
(3, 971, '2022-01-14 18:46:57');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
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
  `discipline` int(5) NOT NULL,
  `inscription_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_day` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `name`, `ap_pat`, `ap_mat`, `birth_date`, `mail`, `cellphone`, `emergency_contact`, `emergency_cellphone`, `discipline`, `inscription_date`, `payment_day`, `status`) VALUES
(275, 'Rocio Guadalupe', 'Hiriart', 'Ramirez', '1978-12-12', 'rocio_hiriart@gmail.com', '3141478546', 'Sebastian Ochoa', '3141162252', 6, '2022-01-06 06:00:00', '2022-02-14', 1),
(971, 'Eduardo', 'Ochoa', 'Hiriart', '2002-12-30', 'lalo.8a@gmail.com', '3141162252', 'Rocio Hiriart Ramirez', '3141162252', 6, '2022-01-06 06:00:00', '2022-02-06', 1),
(8223, 'Sebastian', 'Ochoa', 'Hiriart', '2000-12-05', 'sebastian.ochoa0512@gmail.com', '3141162252', 'Esly Alejandra Martinez', '3141164009', 6, '2022-01-06 06:00:00', '2022-02-14', 1),
(8423, 'Esly Alejandra', 'Maritinez', 'Castillo', '2002-04-06', 'emartinez@ucol.mx', '3141164009', 'Sebastian Ochoa', '3141162252', 5, '2022-01-06 06:00:00', '2022-02-06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `disciplines`
--

CREATE TABLE `disciplines` (
  `discipline_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `schedule_day` varchar(50) NOT NULL,
  `schedule_time` time NOT NULL,
  `instructor` int(5) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `disciplines`
--

INSERT INTO `disciplines` (`discipline_id`, `name`, `schedule_day`, `schedule_time`, `instructor`, `price`) VALUES
(1, 'Flexor Stretching ', 'Lunes - Viernes', '07:00:00', 1, 499.99),
(2, 'Flexor Stretching', 'Lunes - Viernes', '08:00:00', 1, 499.99),
(3, 'Flexor Stretching ', 'Lunes - Viernes', '09:00:00', 1, 499.99),
(4, 'Flexor Stretching ', 'Lunes - Viernes', '18:00:00', 1, 499.99),
(5, 'Flexor Stretching ', 'Lunes - Viernes', '19:00:00', 1, 499.99),
(6, 'Flexor Stretching ', 'Lunes - Viernes', '20:00:00', 1, 499.99);

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `instructor_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `birth_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`instructor_id`, `name`, `birth_date`) VALUES
(1, 'Manuel Alejandro Calixto Rosemberg', '2022-01-03');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `payment_concept` varchar(70) NOT NULL,
  `payment_amount` float NOT NULL,
  `payement_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `client_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `payment_concept`, `payment_amount`, `payement_date`, `client_id`) VALUES
(1, 'Pago de Membresía', 499.99, '2022-01-15 00:52:01', 275);

-- --------------------------------------------------------

--
-- Table structure for table `program_modules`
--

CREATE TABLE `program_modules` (
  `module_id` int(5) NOT NULL,
  `module_name` varchar(20) NOT NULL,
  `module_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `program_modules`
--

INSERT INTO `program_modules` (`module_id`, `module_name`, `module_status`) VALUES
(1, 'homePage', 1),
(2, 'addUser', 1),
(3, 'modifyUser', 1),
(4, 'deleteUser', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user` varchar(15) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `user`, `password`) VALUES
(1, 'Master User', 'admin', 'admin'),
(2, 'Sebastian Ochoa Hiriart', 'desarrollo', 'Sabo0512$'),
(3, 'Esly Alejandra Martinez Castillo', 'e.martinez', 'test1234'),
(4, 'test', 'test', 'a');

-- --------------------------------------------------------

--
-- Table structure for table `user_privilege`
--

CREATE TABLE `user_privilege` (
  `privilege_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `module_id` int(5) NOT NULL,
  `allow` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_privilege`
--

INSERT INTO `user_privilege` (`privilege_id`, `user_id`, `module_id`, `allow`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `atendance`
--
ALTER TABLE `atendance`
  ADD PRIMARY KEY (`atendance_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD KEY `discipline` (`discipline`);

--
-- Indexes for table `disciplines`
--
ALTER TABLE `disciplines`
  ADD PRIMARY KEY (`discipline_id`),
  ADD KEY `instructor` (`instructor`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`instructor_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `program_modules`
--
ALTER TABLE `program_modules`
  ADD PRIMARY KEY (`module_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_privilege`
--
ALTER TABLE `user_privilege`
  ADD PRIMARY KEY (`privilege_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `module_id` (`module_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `atendance`
--
ALTER TABLE `atendance`
  MODIFY `atendance_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `disciplines`
--
ALTER TABLE `disciplines`
  MODIFY `discipline_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `instructor_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `program_modules`
--
ALTER TABLE `program_modules`
  MODIFY `module_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_privilege`
--
ALTER TABLE `user_privilege`
  MODIFY `privilege_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `atendance`
--
ALTER TABLE `atendance`
  ADD CONSTRAINT `atendance_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`);

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`discipline`) REFERENCES `disciplines` (`discipline_id`);

--
-- Constraints for table `disciplines`
--
ALTER TABLE `disciplines`
  ADD CONSTRAINT `disciplines_ibfk_1` FOREIGN KEY (`instructor`) REFERENCES `instructors` (`instructor_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`);

--
-- Constraints for table `user_privilege`
--
ALTER TABLE `user_privilege`
  ADD CONSTRAINT `user_privilege_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_privilege_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `program_modules` (`module_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
