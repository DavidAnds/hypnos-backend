CREATE DATABASE IF NOT EXISTS `hypnos_db`;

USE `hypnos_db`;

CREATE TABLE IF NOT EXISTS `backUsers` (`id` CHAR(36) BINARY ,
 `firstName` VARCHAR(255), `lastName` VARCHAR(255), `email` VARCHAR(255) UNIQUE,
  `password` VARCHAR(255), `role` VARCHAR(255) DEFAULT 'manager', `createdAt` DATETIME NOT NULL,
   `updatedAt` DATETIME NOT NULL, `hotelId` CHAR(36) BINARY, PRIMARY KEY (`id`),
 FOREIGN KEY (`hotelId`) REFERENCES `hotels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;

INSERT INTO `backUsers` (`firstName`, `lastName`,`email`, `password`, `role`, `id`, `updatedAt`, `createdAt` )
VALUES ('Admin', 'Hypnos', 'admin@hypnos.com', '$2b$10$pLL2eE86Tbr/OJ31CQdJ4uFdXkJsQ6hoJjf3LjXLHtcpgzBUGY79y', 'admin', '3adcb4c4-8cfc-4d1b-9ddf-0a9e8e7a8ec9', '2022-04-15 15:32:06', '2022-04-15 15:32:06');