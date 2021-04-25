CREATE SCHEMA `todo` ;

CREATE TABLE `todo`.`list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `complete` CHAR(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`));

INSERT INTO `todo`.`list` (`description`, `complete`) VALUES ('create database', 'Y');
INSERT INTO `todo`.`list` (`description`) VALUES ('test changes');
INSERT INTO `todo`.`list` (`description`) VALUES ('manipulate database');
INSERT INTO `todo`.`list` (`description`) VALUES ('mark complete');
INSERT INTO `todo`.`list` (`description`) VALUES ('mark many complete');