-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.6.28-log - MySQL Community Server (GPL)
-- ОС Сервера:                   Win64
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры базы данных skyeng_test
CREATE DATABASE IF NOT EXISTS `skyeng_test` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `skyeng_test`;


-- Дамп структуры для таблица skyeng_test.learners
CREATE TABLE IF NOT EXISTS `learners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `birthday` date DEFAULT NULL,
  `email` tinytext,
  `level` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы skyeng_test.learners: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `learners` DISABLE KEYS */;
/*!40000 ALTER TABLE `learners` ENABLE KEYS */;


-- Дамп структуры для таблица skyeng_test.levels
CREATE TABLE IF NOT EXISTS `levels` (
  `id` tinytext,
  `name` tinytext,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы skyeng_test.levels: ~6 rows (приблизительно)
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` (`id`, `name`, `description`) VALUES
	('A1', 'Breakthrough or beginner', '- Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type.\r\n- Can introduce him/herself and others and can ask and answer questions about personal details such as where he/she lives, people he/she knows and things he/she has.\r\n- Can interact in a simple way provided the other person talks slowly and clearly and is prepared to help.'),
	('A2', 'Way stage or elementary', '- Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. very basic personal and family information, shopping, local geography, employment).\r\n- Can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters.\r\n- Can describe in simple terms aspects of his/her background, immediate environment and matters in areas of immediate need.'),
	('B1', 'Threshold or intermediate', '- Can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc.\r\n- Can deal with most situations likely to arise while travelling in an area where the language is spoken.\r\n- Can produce simple connected text on topics that are familiar or of personal interest.\r\n- Can describe experiences and events, dreams, hopes and ambitions and briefly give reasons and explanations for opinions and plans.'),
	('B2', 'Vantage or upper intermediate', '- Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in his/her field of specialization.\r\n- Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party.\r\n- Can produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.'),
	('C1', 'Effective operational proficiency or advanced', '- Can understand a wide range of demanding, longer texts, and recognize implicit meaning.\r\n- Can express ideas fluently and spontaneously without much obvious searching for expressions.\r\n- Can use language flexibly and effectively for social, academic and professional purposes.\r\n- Can produce clear, well-structured, detailed text on complex subjects, showing controlled use of organizational patterns, connectors and cohesive devices.'),
	('C2', 'Mastery or proficiency', '- Can understand with ease virtually everything heard or read.');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;


-- Дамп структуры для таблица skyeng_test.relations
CREATE TABLE IF NOT EXISTS `relations` (
  `teacher_id` int(10) unsigned NOT NULL,
  `learner_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы skyeng_test.relations: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `relations` ENABLE KEYS */;


-- Дамп структуры для таблица skyeng_test.teachers
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `sex` smallint(5) unsigned DEFAULT NULL,
  `phone` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы skyeng_test.teachers: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
