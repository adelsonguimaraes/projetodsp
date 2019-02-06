-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.21-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para projetodsp
CREATE DATABASE IF NOT EXISTS `projetodsp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `projetodsp`;

-- Copiando estrutura para tabela projetodsp.local
CREATE TABLE IF NOT EXISTS `local` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `idspirit` int(11) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela projetodsp.local: ~1 rows (aproximadamente)
DELETE FROM `local`;
/*!40000 ALTER TABLE `local` DISABLE KEYS */;
INSERT INTO `local` (`id`, `descricao`, `idspirit`, `datacadastro`, `dataedicao`) VALUES
	(1, 'Empresa01', NULL, '2019-01-30 11:03:34', NULL);
/*!40000 ALTER TABLE `local` ENABLE KEYS */;

-- Copiando estrutura para tabela projetodsp.pessoa
CREATE TABLE IF NOT EXISTS `pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idlocal` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `ativo` enum('SIM','NAO') NOT NULL DEFAULT 'SIM',
  `idspirit` int(11) NOT NULL,
  `datacadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pessoa_local` (`idlocal`),
  CONSTRAINT `FK_pessoa_local` FOREIGN KEY (`idlocal`) REFERENCES `local` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela projetodsp.pessoa: ~1 rows (aproximadamente)
DELETE FROM `pessoa`;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` (`id`, `idlocal`, `nome`, `cpf`, `senha`, `ativo`, `idspirit`, `datacadastro`, `dataedicao`) VALUES
	(2, 1, 'Charles Emanuel', '51812789220', 'ea6b2efbdd4255a9f1b3bbc6399b58f4', 'SIM', 0, '2019-01-30 11:04:16', NULL);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;

-- Copiando estrutura para tabela projetodsp.tipovisita
CREATE TABLE IF NOT EXISTS `tipovisita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela projetodsp.tipovisita: ~2 rows (aproximadamente)
DELETE FROM `tipovisita`;
/*!40000 ALTER TABLE `tipovisita` DISABLE KEYS */;
INSERT INTO `tipovisita` (`id`, `descricao`, `datacadastro`, `dataedicao`) VALUES
	(1, 'Prestador de Serviço', '2019-02-06 16:03:36', NULL),
	(2, 'Particular', '2019-02-06 16:14:41', NULL),
	(3, 'Comercial', '2019-02-06 16:14:53', NULL);
/*!40000 ALTER TABLE `tipovisita` ENABLE KEYS */;

-- Copiando estrutura para tabela projetodsp.visita
CREATE TABLE IF NOT EXISTS `visita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpessoa` int(11) DEFAULT NULL,
  `idtipovisita` int(11) DEFAULT NULL,
  `idlocal` int(11) DEFAULT NULL,
  `idvisitante` int(11) DEFAULT NULL,
  `idspirit` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__visitante` (`idvisitante`),
  KEY `FK_visita_pessoa` (`idpessoa`),
  KEY `FK_visita_tipovisita` (`idtipovisita`),
  KEY `FK_visita_local` (`idlocal`),
  CONSTRAINT `FK__visitante` FOREIGN KEY (`idvisitante`) REFERENCES `visitante` (`id`),
  CONSTRAINT `FK_visita_local` FOREIGN KEY (`idlocal`) REFERENCES `local` (`id`),
  CONSTRAINT `FK_visita_pessoa` FOREIGN KEY (`idpessoa`) REFERENCES `pessoa` (`id`),
  CONSTRAINT `FK_visita_tipovisita` FOREIGN KEY (`idtipovisita`) REFERENCES `tipovisita` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela projetodsp.visita: ~0 rows (aproximadamente)
DELETE FROM `visita`;
/*!40000 ALTER TABLE `visita` DISABLE KEYS */;
/*!40000 ALTER TABLE `visita` ENABLE KEYS */;

-- Copiando estrutura para tabela projetodsp.visitante
CREATE TABLE IF NOT EXISTS `visitante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `documento` varchar(20) DEFAULT NULL,
  `idspirit` int(11) DEFAULT NULL,
  `datcadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela projetodsp.visitante: ~0 rows (aproximadamente)
DELETE FROM `visitante`;
/*!40000 ALTER TABLE `visitante` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitante` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
