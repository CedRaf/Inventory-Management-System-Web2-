-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 05:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `syt-glass`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `home_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerID`, `first_name`, `last_name`, `email_address`, `phone_number`, `home_address`) VALUES
(1, 'Patrick', 'Tiu', 'patrick.tiu@gmail.com', '123-456-7890', '134 Don Mariano Cui St. Cebu'),
(2, 'Steven', 'Tiu', 'steven.tiu@gmail.com', '987-654-3210', '188 Sun Valley Subdivision, Cebu'),
(3, 'Raymund', 'Villoria', 'raymund.villoria@gmail.com', '555-123-4567', '202 Maple Drive, Mountainview'),
(4, 'Tofle', 'Luym', 'tofle.luym@gmail.com', '789-012-3456', '101 Elm Street, Rivertown'),
(5, 'Fons', 'Gruet', 'fonso.gruet@gmail.com', '456-789-0123', '789 Pine Lane, Lakeside');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeID` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `emp_type` varchar(255) NOT NULL,
  `emp_email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeID`, `first_name`, `last_name`, `birth_date`, `address`, `gender`, `phone_number`, `emp_type`, `emp_email`, `password`) VALUES
(1, 'Bob', 'Bobson', '1999-09-18', '123 ABC St.', 'Male', '912346', 'Employee', 'bob.bobson@syt-glass.com', '$2b$10$2CSfiHakoWHyz3H6tB5NEOFR/HWa4t4XBOWPpp76Gcsb7P1ARV0ci'),
(2, 'John', 'Johnson', '2000-02-19', '456 EFG St.', 'Male', '917233', 'Manager', 'john.johnson@syt-glass.com', '$2b$10$mFCh8v3A7xGoBBbFgdnwJeL78Ptemzy4AukExawid45tfLNi55J.a'),
(3, 'Michael', 'Johnson', '1990-03-14', '123 Main St, Cityville', 'Male', '555-1234', 'Employee', 'michael.johnson@syt-glass.com', '$2b$10$sr5.sUp2doyybTOsb29S5uMWYQ4y.ighcNC/4YO8.BVy5.2iYekYS'),
(4, 'Emma', 'Smith', '1985-07-21', '456 Oak Ave, Townsville', 'Female', '555-5678', 'Employee', 'emma.smith@syt-glass.com', '$2b$10$tBwp6PEiJjoB.50IqvjV4eni2BctE08TAPnCLEwlRiNe60nm31Pva'),
(5, 'David', 'Williams', '1993-01-09', '789 Pine Rd, Villagetown', 'Male', '555-9876', 'Employee', 'david.williams@syt-glass.com', '$2b$10$JGGK2SYT73e0jyc83Ugiwe7DXSL9GzEuuPb9CSsKTSgSPAiQjMdbW'),
(6, 'Sophia', 'Brown', '1988-09-04', '101 Cedar Ln, Hamletville', 'Female', '555-5432', 'Employee', 'sophia.brown@syt-glass.com', '$2b$10$aEiVhapGWsWNpgBg6HmPJeX3zaz1WTVrfmOc1nciruCx6x76lwv0W'),
(7, 'Daniel', 'Miller', '1995-04-17', '202 Maple Dr, Boroughburg', 'Male', '555-8765', 'Manager', 'daniel.miller@syt-glass.com', '$2b$10$/C28nKjVPTd4tkSL75xPcOTp22SJO7zOFD/wFOA6kUH8GfcVAMKXW');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  `amount_ordered` int(11) NOT NULL,
  `process_date` date NOT NULL,
  `shipment_date` date NOT NULL,
  `order_status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `customerID`, `productID`, `employeeID`, `amount_ordered`, `process_date`, `shipment_date`, `order_status`) VALUES
(1, 1, 7, 1, 2, '2023-01-10', '2023-01-15', 'completed'),
(2, 2, 5, 4, 7, '2023-02-12', '2023-02-18', 'completed'),
(3, 3, 4, 3, 5, '2023-03-20', '2023-03-25', 'pending'),
(4, 4, 9, 6, 4, '2023-04-05', '2023-04-10', 'completed'),
(5, 5, 7, 5, 1, '2023-05-15', '2023-05-20', 'cancelled'),
(6, 1, 3, 2, 9, '2023-05-12', '2023-05-20', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `thickness` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `product_location` varchar(50) NOT NULL,
  `last_shipment` date NOT NULL,
  `amount_ordered` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `supplierID`, `product_type`, `thickness`, `color`, `product_quantity`, `product_location`, `last_shipment`, `amount_ordered`) VALUES
(1, 1, 'glass', 2, 'Green', 100, 'A1', '2023-08-27', 100),
(2, 2, 'aluminum', 4, 'Black', 120, 'B1', '2023-09-18', 120),
(3, 1, 'glass', 3, 'Yellow', 51, 'C1', '2023-06-18', 65),
(4, 2, 'aluminum', 2, 'White', 95, 'A1', '2023-02-27', 100),
(5, 1, 'glass', 4, 'Orange', 70, 'B1', '2023-05-20', 77),
(6, 2, 'aluminum', 3, 'Purple', 120, 'C1', '2023-10-18', 120),
(7, 1, 'glass', 2, 'Brown', 92, 'A1', '2023-11-18', 95),
(8, 2, 'aluminum', 4, 'Gray', 70, 'B1', '2023-09-27', 70),
(9, 1, 'glass', 3, 'Pink', 86, 'C1', '2023-02-18', 90),
(10, 2, 'aluminum', 2, 'Gold', 100, 'A1', '2023-09-30', 100);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplierID` int(11) NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `bank_acc_no` varchar(255) NOT NULL,
  `delivery_sched` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplierID`, `supplier_name`, `first_name`, `last_name`, `email`, `phone_number`, `bank_acc_no`, `delivery_sched`) VALUES
(1, 'ABC Glass', 'Jason ', 'Black', 'jason.black@abcglass.com', '+1234567890', '1234567890123456', 'Monday'),
(2, 'XYZ Aluminum ', 'Rebecca', 'Green', 'rebecca.green@xyzaluminum.com', '+9876543210', '9876543210987654', 'Tuesday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `customerID` (`customerID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `employeeID` (`employeeID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplierID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `supplier` (`supplierID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
