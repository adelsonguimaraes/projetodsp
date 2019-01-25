-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.25 - MySQL Community Server (GPL)
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para dbspe
CREATE DATABASE IF NOT EXISTS `dbspe` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dbspe`;

-- Copiando estrutura para tabela dbspe.aluno
CREATE TABLE IF NOT EXISTS `aluno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcolegio` int(11) NOT NULL,
  `cpfaluno` varchar(14) NOT NULL,
  `nomealuno` varchar(150) NOT NULL,
  `cpfresponsavel` varchar(14) NOT NULL,
  `nomeresponsavel` varchar(150) NOT NULL,
  `serie` varchar(50) NOT NULL,
  `periodoinadimplencia` varchar(50) NOT NULL,
  `datainclusao` date NOT NULL,
  `dataexclusao` date NOT NULL,
  `ativo` enum('SIM','NAO') NOT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aluno_colegio` (`idcolegio`),
  CONSTRAINT `FK_aluno_colegio` FOREIGN KEY (`idcolegio`) REFERENCES `colegio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbspe.aluno: ~0 rows (aproximadamente)
DELETE FROM `aluno`;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;

-- Copiando estrutura para tabela dbspe.colegio
CREATE TABLE IF NOT EXISTS `colegio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(14) DEFAULT NULL,
  `razao` varchar(150) DEFAULT NULL,
  `CEP` varchar(9) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(150) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `celular` varchar(50) DEFAULT NULL,
  `email1` varchar(150) DEFAULT NULL,
  `email2` varchar(150) DEFAULT NULL,
  `site` varchar(150) DEFAULT NULL,
  `representante` varchar(100) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbspe.colegio: ~0 rows (aproximadamente)
DELETE FROM `colegio`;
/*!40000 ALTER TABLE `colegio` DISABLE KEYS */;
/*!40000 ALTER TABLE `colegio` ENABLE KEYS */;

-- Copiando estrutura para tabela dbspe.colegiousuario
CREATE TABLE IF NOT EXISTS `colegiousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcolegio` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_colegiousuario_colegio` (`idcolegio`),
  KEY `FK_colegiousuario_usuario` (`idusuario`),
  CONSTRAINT `FK_colegiousuario_colegio` FOREIGN KEY (`idcolegio`) REFERENCES `colegio` (`id`),
  CONSTRAINT `FK_colegiousuario_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbspe.colegiousuario: ~0 rows (aproximadamente)
DELETE FROM `colegiousuario`;
/*!40000 ALTER TABLE `colegiousuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `colegiousuario` ENABLE KEYS */;

-- Copiando estrutura para tabela dbspe.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `href` varchar(50) NOT NULL,
  `arrow` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `sub` int(11) NOT NULL,
  `class` varchar(50) DEFAULT NULL,
  `datacadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbspe.menu: ~0 rows (aproximadamente)
DELETE FROM `menu`;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`id`, `nome`, `href`, `arrow`, `icon`, `sub`, `class`, `datacadastro`, `dataedicao`) VALUES
	(1, 'CADASTROSGERAIS', 'cadastro', 'fa arrow', 'fa fa-table', 0, NULL, '2017-05-09 21:17:54', NULL),
	(2, 'AUTENTICACAO', 'auth', 'fa arrow', 'fa fa-lock', 0, NULL, '2017-05-09 21:20:10', NULL),
	(3, 'CADASTROSADMINISTRATIVOS', 'admin', 'fa arrow', 'fa fa-suitcase', 0, NULL, '2017-05-09 21:20:52', NULL),
	(4, 'UTILITARIOS', 'util', 'fa arrow', 'fa fa-cog', 0, NULL, '2017-05-09 21:21:21', NULL),
	(5, 'RELATORIOS', 'relatorio', 'fa arrow', 'fa fa-copy', 0, NULL, '2017-05-09 21:21:56', NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Copiando estrutura para tabela dbspe.perfil
CREATE TABLE IF NOT EXISTS `perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `ativo` enum('SIM','NAO') NOT NULL,
  `datacadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbspe.perfil: ~1 rows (aproximadamente)
DELETE FROM `perfil`;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` (`id`, `nome`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 'administrador', 'SIM', '2017-05-09 19:56:52', NULL);
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;

-- Copiando estrutura para tabela dbspe.permissoes
CREATE TABLE IF NOT EXISTS `permissoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idmenu` int(11) NOT NULL,
  `idperfil` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_permissoes_menu` (`idmenu`),
  KEY `FK_permissoes_perfil` (`idperfil`),
  CONSTRAINT `FK_permissoes_menu` FOREIGN KEY (`idmenu`) REFERENCES `menu` (`id`),
  CONSTRAINT `FK_permissoes_perfil` FOREIGN KEY (`idperfil`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbspe.permissoes: ~0 rows (aproximadamente)
DELETE FROM `permissoes`;
/*!40000 ALTER TABLE `permissoes` DISABLE KEYS */;
INSERT INTO `permissoes` (`id`, `idmenu`, `idperfil`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 3, 1),
	(4, 4, 1),
	(5, 5, 1);
/*!40000 ALTER TABLE `permissoes` ENABLE KEYS */;

-- Copiando estrutura para tabela dbspe.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idperfil` int(11) NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `usuario` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(30) DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `FK_usuario_perfil` (`idperfil`),
  CONSTRAINT `FK_usuario_perfil` FOREIGN KEY (`idperfil`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbspe.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `idperfil`, `nome`, `senha`, `usuario`, `email`, `telefone`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', '@', '@', 'SIM', '2017-05-09 19:57:17', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
