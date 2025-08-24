-- CreateTable
CREATE TABLE `Product` (
    `productID` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierID` INTEGER NOT NULL,
    `product_type` VARCHAR(255) NOT NULL,
    `thickness` INTEGER NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `product_quantity` INTEGER NOT NULL,
    `product_location` VARCHAR(50) NOT NULL,
    `last_shipment` DATETIME(3) NOT NULL,
    `amount_ordered` DATETIME(3) NOT NULL,

    PRIMARY KEY (`productID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `supplierID` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_name` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(50) NOT NULL,
    `bank_acc_no` VARCHAR(255) NOT NULL,
    `delivery_sched` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`supplierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `employeeID` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(50) NOT NULL,
    `emp_type` VARCHAR(255) NOT NULL,
    `emp_email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`employeeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `customerID` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email_address` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(50) NOT NULL,
    `home_address` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`customerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `orderID` INTEGER NOT NULL AUTO_INCREMENT,
    `customerID` INTEGER NOT NULL,
    `productID` INTEGER NOT NULL,
    `employeeID` INTEGER NOT NULL,
    `amount_ordered` INTEGER NOT NULL,
    `process_date` DATETIME(3) NOT NULL,
    `shipment_date` DATETIME(3) NOT NULL,
    `order_status` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`orderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplierID_fkey` FOREIGN KEY (`supplierID`) REFERENCES `Supplier`(`supplierID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_employeeID_fkey` FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`employeeID`) ON DELETE RESTRICT ON UPDATE CASCADE;
