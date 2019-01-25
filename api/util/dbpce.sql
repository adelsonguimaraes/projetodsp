-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.21-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para dbpce
CREATE DATABASE IF NOT EXISTS `dbpce` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dbpce`;

-- Copiando estrutura para tabela dbpce.aluno
CREATE TABLE IF NOT EXISTS `aluno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpessoafisica` int(11) DEFAULT NULL,
  `idcolegio` int(11) DEFAULT NULL,
  `serie` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `turno` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aluno_pessoafisica` (`idpessoafisica`),
  KEY `FK_aluno_colegio` (`idcolegio`),
  CONSTRAINT `FK_aluno_colegio` FOREIGN KEY (`idcolegio`) REFERENCES `colegio` (`id`),
  CONSTRAINT `FK_aluno_pessoafisica` FOREIGN KEY (`idpessoafisica`) REFERENCES `pessoafisica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.aluno: ~1 rows (aproximadamente)
DELETE FROM `aluno`;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` (`id`, `idpessoafisica`, `idcolegio`, `serie`, `turno`, `datacadastro`, `dataedicao`) VALUES
	(1, 7, 1, '5a Série', 'Matutino', '2017-05-30 18:51:02', '2017-05-31 21:25:01'),
	(2, 9, 1, '5a Série', 'Matutino', '2017-05-31 10:14:38', '2017-06-14 00:45:25'),
	(3, 9, 1, 'Game of Thrones', 'Noturno', '2017-06-13 17:10:24', '2017-06-14 00:26:18'),
	(4, 6, 1, 'asdasd', 'asdasda', '2017-06-14 16:19:31', '2017-06-14 23:27:25');
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.alunoinadimplencia
CREATE TABLE IF NOT EXISTS `alunoinadimplencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idaluno` int(11) DEFAULT NULL,
  `idcolegiousuario` int(11) DEFAULT NULL,
  `periodo` varchar(100) DEFAULT NULL,
  `datainclusao` date DEFAULT NULL,
  `dataexclusao` date DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT 'SIM',
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_alunoinadiplemcia_aluno` (`idaluno`),
  KEY `FK_alunoinadiplemcia_colegiousuario` (`idcolegiousuario`),
  CONSTRAINT `FK_alunoinadiplemcia_aluno` FOREIGN KEY (`idaluno`) REFERENCES `aluno` (`id`),
  CONSTRAINT `FK_alunoinadiplemcia_colegiousuario` FOREIGN KEY (`idcolegiousuario`) REFERENCES `colegiousuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.alunoinadimplencia: ~1 rows (aproximadamente)
DELETE FROM `alunoinadimplencia`;
/*!40000 ALTER TABLE `alunoinadimplencia` DISABLE KEYS */;
INSERT INTO `alunoinadimplencia` (`id`, `idaluno`, `idcolegiousuario`, `periodo`, `datainclusao`, `dataexclusao`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 2, 'jan/2017 - março/2017', '2017-05-30', '0000-00-00', 'SIM', '2017-05-30 18:51:03', '2017-05-31 21:25:01'),
	(2, 2, 2, '0', '2010-07-22', NULL, 'SIM', '2017-05-31 10:14:38', '2017-06-14 00:45:25'),
	(3, 3, 2, 'janeiro/2017 - fevereiro/2017', '2017-06-13', NULL, 'SIM', '2017-06-13 17:10:24', '2017-06-14 00:26:18'),
	(4, 4, 2, '01/2017 à 07/2017', '2017-06-14', NULL, 'SIM', '2017-06-14 16:19:31', '2017-06-14 23:27:25');
/*!40000 ALTER TABLE `alunoinadimplencia` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.alunoresponsavel
CREATE TABLE IF NOT EXISTS `alunoresponsavel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idaluno` int(11) DEFAULT NULL,
  `idresponsavel` int(11) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_alunoresponsavel_aluno` (`idaluno`),
  KEY `FK_alunoresponsavel_responsavel` (`idresponsavel`),
  CONSTRAINT `FK_alunoresponsavel_aluno` FOREIGN KEY (`idaluno`) REFERENCES `aluno` (`id`),
  CONSTRAINT `FK_alunoresponsavel_responsavel` FOREIGN KEY (`idresponsavel`) REFERENCES `responsavel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Copiando dados para a tabela dbpce.alunoresponsavel: ~1 rows (aproximadamente)
DELETE FROM `alunoresponsavel`;
/*!40000 ALTER TABLE `alunoresponsavel` DISABLE KEYS */;
INSERT INTO `alunoresponsavel` (`id`, `idaluno`, `idresponsavel`, `datacadastro`, `dataedicao`) VALUES
	(3, 1, 1, '2017-05-30 18:51:02', '2017-05-31 00:00:00'),
	(4, 2, 2, '2017-05-31 10:14:38', '2017-06-14 00:00:00'),
	(5, 3, 3, '2017-06-13 17:10:24', '2017-06-14 00:00:00'),
	(6, 4, 4, '2017-06-14 16:19:31', '2017-06-14 00:00:00');
/*!40000 ALTER TABLE `alunoresponsavel` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.colegio
CREATE TABLE IF NOT EXISTS `colegio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpessoajuridica` int(11) DEFAULT NULL,
  `representante` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_colegio_pessoajuridica` (`idpessoajuridica`),
  CONSTRAINT `FK_colegio_pessoajuridica` FOREIGN KEY (`idpessoajuridica`) REFERENCES `pessoajuridica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Copiando dados para a tabela dbpce.colegio: ~0 rows (aproximadamente)
DELETE FROM `colegio`;
/*!40000 ALTER TABLE `colegio` DISABLE KEYS */;
INSERT INTO `colegio` (`id`, `idpessoajuridica`, `representante`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 'Miguel de Padua 2a', '2017-05-22 18:51:43', '2017-05-27 00:45:09');
/*!40000 ALTER TABLE `colegio` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.colegiousuario
CREATE TABLE IF NOT EXISTS `colegiousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcolegio` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_colegiousuario_colegio` (`idcolegio`),
  KEY `FK_colegiousuario_usuario` (`idusuario`),
  CONSTRAINT `FK_colegiousuario_colegio` FOREIGN KEY (`idcolegio`) REFERENCES `colegio` (`id`),
  CONSTRAINT `FK_colegiousuario_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Copiando dados para a tabela dbpce.colegiousuario: ~2 rows (aproximadamente)
DELETE FROM `colegiousuario`;
/*!40000 ALTER TABLE `colegiousuario` DISABLE KEYS */;
INSERT INTO `colegiousuario` (`id`, `idcolegio`, `idusuario`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 2, '2017-05-24 18:46:21', '2017-05-27 00:45:10'),
	(2, 1, 3, '2017-05-25 17:52:15', '2017-05-27 00:45:10');
/*!40000 ALTER TABLE `colegiousuario` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.menu
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.menu: ~9 rows (aproximadamente)
DELETE FROM `menu`;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`id`, `nome`, `href`, `arrow`, `icon`, `sub`, `class`, `datacadastro`, `dataedicao`) VALUES
	(1, 'CADASTROSGERAIS', 'cadastro', 'fa arrow', 'fa fa-table', 0, NULL, '2017-05-09 21:17:54', NULL),
	(2, 'AUTENTICACAO', 'auth', 'fa arrow', 'fa fa-lock', 0, NULL, '2017-05-09 21:20:10', NULL),
	(3, 'CADASTROSADMINISTRATIVOS', 'admin', 'fa arrow', 'fa fa-suitcase', 0, NULL, '2017-05-09 21:20:52', NULL),
	(4, 'UTILITARIOS', 'util', 'fa arrow', 'fa fa-cog', 0, NULL, '2017-05-09 21:21:21', NULL),
	(5, 'RELATORIOS', 'relatorio', 'fa arrow', 'fa fa-copy', 0, NULL, '2017-05-09 21:21:56', NULL),
	(6, 'COLEGIO', 'admin/colegio', '', '', 3, NULL, '2017-05-10 10:43:16', NULL),
	(7, 'ALUNOS', 'cadastro/aluno', '', '', 1, NULL, '2017-05-10 16:28:24', NULL),
	(8, 'PERFIL', 'auth/perfil', '', '', 2, NULL, '2017-05-11 18:02:05', NULL),
	(9, 'USUARIO', 'auth/usuario', '', '', 2, NULL, '2017-05-11 18:20:51', NULL),
	(10, 'BUSCA', 'util/busca', '', '', 4, NULL, '2017-06-02 12:09:26', NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.perfil
CREATE TABLE IF NOT EXISTS `perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8_bin NOT NULL,
  `ativo` enum('SIM','NAO') COLLATE utf8_bin NOT NULL DEFAULT 'SIM',
  `datacadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Copiando dados para a tabela dbpce.perfil: ~0 rows (aproximadamente)
DELETE FROM `perfil`;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` (`id`, `nome`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 'admin', 'SIM', '2017-05-18 18:13:28', '0000-00-00 00:00:00'),
	(2, 'colegio', 'SIM', '2017-05-19 12:06:36', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.permissoes
CREATE TABLE IF NOT EXISTS `permissoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idmenu` int(11) NOT NULL,
  `idperfil` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_permissoes_menu` (`idmenu`),
  KEY `FK_permissoes_perfil` (`idperfil`),
  CONSTRAINT `FK_permissoes_menu` FOREIGN KEY (`idmenu`) REFERENCES `menu` (`id`),
  CONSTRAINT `FK_permissoes_perfil` FOREIGN KEY (`idperfil`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.permissoes: ~12 rows (aproximadamente)
DELETE FROM `permissoes`;
/*!40000 ALTER TABLE `permissoes` DISABLE KEYS */;
INSERT INTO `permissoes` (`id`, `idmenu`, `idperfil`) VALUES
	(12, 1, 1),
	(13, 2, 1),
	(14, 3, 1),
	(15, 4, 1),
	(16, 5, 1),
	(17, 6, 1),
	(18, 7, 1),
	(19, 8, 1),
	(20, 9, 1),
	(21, 1, 2),
	(22, 7, 2),
	(23, 10, 1);
/*!40000 ALTER TABLE `permissoes` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.pessoa
CREATE TABLE IF NOT EXISTS `pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` enum('PF','PJ') CHARACTER SET utf8 COLLATE utf8_bin DEFAULT 'PF',
  `cep` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `endereco` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `numero` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `complemento` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `bairro` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `telefone` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `fax` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `celular` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `email1` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `email2` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `site` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.pessoa: ~9 rows (aproximadamente)
DELETE FROM `pessoa`;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` (`id`, `tipo`, `cep`, `endereco`, `numero`, `complemento`, `bairro`, `telefone`, `fax`, `celular`, `email1`, `email2`, `site`, `datacadastro`, `dataedicao`) VALUES
	(1, 'PF', '', '', '', '', '', '', '', '92515464646', 'priscila@teste', '', '', '2017-05-19 08:35:33', '2017-05-27 01:04:30'),
	(2, 'PJ', '69000000', 'Rua da Nova Eslovenia', '852', '', 'Cidade Velha', '92000000000', '', '82222222222', 'administracao@escolinhadentepodre.com.br', '', 'escolinhadentepodre.com.br', '2017-05-22 18:51:43', '2017-05-27 00:45:09'),
	(3, 'PF', '', '', '', '', '', '92990000000', '', '', 'august@tretalong.com.br', '', '', '2017-05-22 18:51:43', '2017-05-27 00:45:09'),
	(4, 'PF', '', '', '', '', '', '9200000', '', '', 'joao@escola.com.br', '', '', '2017-05-25 17:52:14', '2017-05-27 00:45:10'),
	(22, 'PF', '', '', '', '', '', '', '', '92981805855', 'josue@escola', '', '', '2017-05-26 18:29:35', '2017-05-27 01:05:35'),
	(23, 'PF', '', '', '', '', '', '', '', '', '', '', '', '2017-05-30 18:51:02', '2017-06-14 23:27:25'),
	(24, 'PF', '', '', '', '', '', '', '', '', '', '', '', '2017-05-30 18:51:02', '2017-05-31 21:25:01'),
	(25, 'PF', '', '', '', '', '', '', '', '', '', '', '', '2017-05-31 10:14:38', '2017-06-14 00:45:25'),
	(26, 'PF', '', '', '', '', '', '', '', '', '', '', '', '2017-05-31 10:14:38', '2017-06-14 00:45:25'),
	(27, 'PF', '', '', '', '', '', '', '', '', '', '', '', '2017-06-14 16:19:30', '2017-06-14 23:27:25');
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.pessoafisica
CREATE TABLE IF NOT EXISTS `pessoafisica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpessoa` int(11) NOT NULL,
  `nome` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `cpf` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `datanascimento` datetime NOT NULL,
  `datacadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `FK_pessoafisica_pessoa` (`idpessoa`),
  CONSTRAINT `FK_pessoafisica_pessoa` FOREIGN KEY (`idpessoa`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.pessoafisica: ~8 rows (aproximadamente)
DELETE FROM `pessoafisica`;
/*!40000 ALTER TABLE `pessoafisica` DISABLE KEYS */;
INSERT INTO `pessoafisica` (`id`, `idpessoa`, `nome`, `cpf`, `datanascimento`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 'Priscila Renata', '', '0000-00-00 00:00:00', '2017-05-19 08:35:48', '2017-05-27 01:04:30'),
	(2, 3, 'Mario Renato August', '', '0000-00-00 00:00:00', '2017-05-22 18:51:43', '2017-05-27 00:45:09'),
	(3, 4, 'João Nascimento', '', '0000-00-00 00:00:00', '2017-05-25 17:52:14', '2017-05-27 00:45:10'),
	(5, 22, 'Josué Camara', '', '0000-00-00 00:00:00', '2017-05-26 18:29:35', '2017-05-27 01:05:35'),
	(6, 23, 'Maria da Fé', '45778278080', '2017-05-31 00:00:00', '2017-05-30 18:51:02', '2017-06-14 23:27:25'),
	(7, 24, 'Marcos Joaquim', '68527341026', '2017-05-30 22:51:01', '2017-05-30 18:51:02', '2017-05-31 21:25:01'),
	(8, 25, 'João das Neves', '27535189040', '0000-00-00 00:00:00', '2017-05-31 10:14:38', '2017-06-14 00:45:25'),
	(9, 26, 'Marcos Joaquim Romeu', '68527341026', '2017-05-31 00:00:00', '2017-05-31 10:14:38', '2017-06-14 00:45:25'),
	(10, 27, 'Mario Renato August', '07909409060', '0000-00-00 00:00:00', '2017-06-14 16:19:30', '2017-06-14 23:27:25');
/*!40000 ALTER TABLE `pessoafisica` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.pessoajuridica
CREATE TABLE IF NOT EXISTS `pessoajuridica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpessoa` int(11) DEFAULT NULL,
  `razaosocial` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cnpj` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `inscricaoestadual` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pessoajuridica_pessoa` (`idpessoa`),
  CONSTRAINT `FK_pessoajuridica_pessoa` FOREIGN KEY (`idpessoa`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Copiando dados para a tabela dbpce.pessoajuridica: ~1 rows (aproximadamente)
DELETE FROM `pessoajuridica`;
/*!40000 ALTER TABLE `pessoajuridica` DISABLE KEYS */;
INSERT INTO `pessoajuridica` (`id`, `idpessoa`, `razaosocial`, `cnpj`, `inscricaoestadual`, `datacadastro`, `dataedicao`) VALUES
	(1, 2, 'Escola Dentinho Podre', '07740204000108', '042166456', '2017-05-22 18:51:43', '2017-05-27 00:45:09');
/*!40000 ALTER TABLE `pessoajuridica` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.responsavel
CREATE TABLE IF NOT EXISTS `responsavel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpessoafisica` int(11) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_responsavel_pessoafisica` (`idpessoafisica`),
  CONSTRAINT `FK_responsavel_pessoafisica` FOREIGN KEY (`idpessoafisica`) REFERENCES `pessoafisica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Copiando dados para a tabela dbpce.responsavel: ~3 rows (aproximadamente)
DELETE FROM `responsavel`;
/*!40000 ALTER TABLE `responsavel` DISABLE KEYS */;
INSERT INTO `responsavel` (`id`, `idpessoafisica`, `datacadastro`, `dataedicao`) VALUES
	(1, 6, '2017-05-30 18:51:02', '2017-05-31 21:25:01'),
	(2, 8, '2017-05-31 10:14:38', '2017-06-14 00:45:25'),
	(3, 9, '2017-06-13 17:10:24', '2017-06-14 00:26:18'),
	(4, 10, '2017-06-14 16:19:31', '2017-06-14 23:27:25');
/*!40000 ALTER TABLE `responsavel` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.serie
CREATE TABLE IF NOT EXISTS `serie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `sub` int(11) DEFAULT NULL,
  `datcadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.serie: ~0 rows (aproximadamente)
DELETE FROM `serie`;
/*!40000 ALTER TABLE `serie` DISABLE KEYS */;
INSERT INTO `serie` (`id`, `descricao`, `sub`, `datcadastro`, `dataedicao`) VALUES
	(1, 'Educação Infantil', NULL, '2017-06-14 17:59:02', NULL),
	(2, 'Ensino Fundamental I e II', NULL, '2017-06-14 17:59:10', NULL),
	(3, 'Ensino Médio', NULL, '2017-06-14 17:59:18', NULL),
	(4, 'Maternal 1', 1, '2017-06-14 17:59:31', NULL),
	(5, 'Maternal 2', 1, '2017-06-14 17:59:40', NULL),
	(6, '1 período', 1, '2017-06-14 17:59:58', NULL),
	(7, '2 período', 1, '2017-06-14 18:00:09', NULL),
	(8, '1o ano', 2, '2017-06-14 18:00:24', NULL),
	(9, '2o ano', 2, '2017-06-14 18:00:31', NULL),
	(10, '3o ano', 2, '2017-06-14 18:00:40', NULL),
	(11, '4o ano', 2, '2017-06-14 18:00:51', NULL),
	(12, '5o ano', 2, '2017-06-14 18:00:58', NULL),
	(13, '6o ano', 2, '2017-06-14 18:01:06', NULL),
	(14, '7o ano', 2, '2017-06-14 18:01:22', NULL),
	(15, '8o ano', 2, '2017-06-14 18:01:30', NULL),
	(16, '9o ano', 2, '2017-06-14 18:01:36', NULL),
	(17, '1o ano', 3, '2017-06-14 18:01:50', NULL),
	(18, '2o ano', 3, '2017-06-14 18:01:56', NULL),
	(19, '3o ano', 3, '2017-06-14 18:02:15', NULL);
/*!40000 ALTER TABLE `serie` ENABLE KEYS */;

-- Copiando estrutura para tabela dbpce.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpessoafisica` int(11) DEFAULT NULL,
  `idperfil` int(11) DEFAULT NULL,
  `usuario` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `senha` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT 'SIM',
  `datacadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuario_pessoafisica` (`idpessoafisica`),
  KEY `FK_usuario_perfil` (`idperfil`),
  CONSTRAINT `FK_usuario_perfil` FOREIGN KEY (`idperfil`) REFERENCES `perfil` (`id`),
  CONSTRAINT `FK_usuario_pessoafisica` FOREIGN KEY (`idpessoafisica`) REFERENCES `pessoafisica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela dbpce.usuario: ~4 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `idpessoafisica`, `idperfil`, `usuario`, `senha`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 1, 1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'SIM', '2017-05-19 08:36:07', '2017-05-27 01:04:30'),
	(2, 2, 2, 'mario', '202cb962ac59075b964b07152d234b70', 'SIM', '2017-05-22 18:51:43', '2017-05-27 00:45:10'),
	(3, 3, 2, 'joao', '202cb962ac59075b964b07152d234b70', 'SIM', '2017-05-25 17:52:14', '2017-05-27 00:45:10'),
	(11, 5, 1, 'josue', '202cb962ac59075b964b07152d234b70', 'SIM', '2017-05-26 18:29:35', '2017-05-27 01:05:35');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Copiando estrutura para view dbpce.view_pessoa
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `view_pessoa` (
	`idpjpf` INT(11) NOT NULL,
	`nome` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`cpfcnpj` VARCHAR(50) NULL COLLATE 'utf8_bin',
	`datanascimento` VARCHAR(19) NOT NULL COLLATE 'utf8mb4_general_ci',
	`inscricaoestadual` VARCHAR(50) NULL COLLATE 'utf8_bin',
	`id` INT(11) NOT NULL,
	`tipo` VARCHAR(2) NULL COLLATE 'utf8_bin',
	`cep` VARCHAR(8) NULL COLLATE 'utf8_bin',
	`endereco` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`numero` VARCHAR(50) NULL COLLATE 'utf8_bin',
	`complemento` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`bairro` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`telefone` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`fax` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`celular` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`email1` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`email2` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`site` VARCHAR(100) NULL COLLATE 'utf8_bin',
	`datacadastro` TIMESTAMP NULL,
	`dataedicao` TIMESTAMP NULL
) ENGINE=MyISAM;

-- Copiando estrutura para view dbpce.view_pessoa
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `view_pessoa`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `view_pessoa` AS SELECT pf.id AS 'idpjpf', pf.nome, pf.cpf AS 'cpfcnpj', pf.datanascimento, '' AS 'inscricaoestadual', p.*
FROM pessoa p
INNER JOIN pessoafisica pf ON pf.idpessoa = p.id
UNION
SELECT pj.id AS 'idpfpj', pj.razaosocial AS 'nome', pj.cnpj AS 'cpfcnpj', '' AS 'datanascimento', pj.inscricaoestadual, p.*
FROM pessoa p
INNER JOIN pessoajuridica pj ON pj.idpessoa = p.id ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
