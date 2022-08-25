-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema crudloja
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema crudloja
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `crudloja` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `crudloja` ;

-- -----------------------------------------------------
-- Table `crudloja`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crudloja`.`compras` (
  `idcompras` INT NOT NULL AUTO_INCREMENT,
  `valortotal` DOUBLE NULL DEFAULT NULL,
  `dta_compra_cad` DATE NULL DEFAULT NULL,
  `tipo_pagamento` VARCHAR(45) NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcompras`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `crudloja`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crudloja`.`produtos` (
  `idprodutos` INT NOT NULL AUTO_INCREMENT,
  `nme_produto` VARCHAR(45) NOT NULL,
  `dsc_produto` VARCHAR(200) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `dta_produto_cad` DATETIME NULL DEFAULT NULL,
  `dta_produto_mod` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idprodutos`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `crudloja`.`ta_compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crudloja`.`ta_compras` (
  `cod_idprodutos` INT NOT NULL,
  `cod_idcompras` INT NOT NULL,
  PRIMARY KEY (`cod_idprodutos`, `cod_idcompras`),
  INDEX `fk_produtos_has_compras_compras1_idx` (`cod_idcompras` ASC) VISIBLE,
  INDEX `fk_produtos_has_compras_produtos_idx` (`cod_idprodutos` ASC) VISIBLE,
  CONSTRAINT `fk_produtos_has_compras_produtos`
    FOREIGN KEY (`cod_idprodutos`)
    REFERENCES `crudloja`.`produtos` (`idprodutos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produtos_has_compras_compras1`
    FOREIGN KEY (`cod_idcompras`)
    REFERENCES `crudloja`.`compras` (`idcompras`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
