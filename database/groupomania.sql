-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : Dim 11 avr. 2021 à 16:48
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `postId` smallint(5) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `commentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comment_postId` (`postId`),
  KEY `fk_comment_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `name`, `postId`, `comment`, `commentDate`) VALUES
(23, 32, 'jean', 31, 'Commentaire 1', '2021-04-07 08:31:45'),
(24, 31, 'admin', 32, 'Commentaire 1', '2021-04-07 08:32:51'),
(25, 33, 'eve', 31, 'Commentaire 2', '2021-04-07 08:36:53'),
(37, 33, 'eve', 34, 'commentaire 1', '2021-04-08 17:44:53'),
(38, 33, 'eve', 32, 'commentaire 2', '2021-04-08 17:45:09');

-- --------------------------------------------------------

--
-- Structure de la table `opinion`
--

DROP TABLE IF EXISTS `opinion`;
CREATE TABLE IF NOT EXISTS `opinion` (
  `opinion_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `opinion_userId` mediumint(8) UNSIGNED NOT NULL,
  `opinion_postId` smallint(5) UNSIGNED NOT NULL,
  `votes` smallint(6) DEFAULT '0',
  PRIMARY KEY (`opinion_id`),
  KEY `fk_postId` (`opinion_postId`),
  KEY `fk_userId` (`opinion_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `opinion`
--

INSERT INTO `opinion` (`opinion_id`, `opinion_userId`, `opinion_postId`, `votes`) VALUES
(116, 32, 31, 1),
(117, 33, 31, -1),
(118, 33, 32, 1),
(119, 35, 32, 1),
(121, 32, 34, 1);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` mediumint(8) UNSIGNED NOT NULL,
  `postContent` text NOT NULL,
  `postDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) NOT NULL,
  `postUrl` varchar(255) DEFAULT NULL,
  `likes` smallint(6) UNSIGNED NOT NULL DEFAULT '0',
  `dislikes` smallint(6) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_post_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `userId`, `postContent`, `postDate`, `name`, `postUrl`, `likes`, `dislikes`) VALUES
(31, 31, 'Publication 1', '2021-04-07 08:26:13', 'admin', NULL, 1, 1),
(32, 32, 'Publication 2', '2021-04-07 08:27:49', 'jean', NULL, 2, 0),
(33, 33, 'Publication 3', '2021-04-07 08:36:22', 'eve', 'https://www.francetvinfo.fr/sante/maladie/coronavirus/confinement/covid-19-il-est-essentiel-que-les-salles-de-classe-rouvrent-le-26-avril-assure-emmanuel-macron_4362527.html', 0, 0),
(34, 35, 'Publication différente pour la barre de recherche', '2021-04-07 08:41:54', 'paul', NULL, 2, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `admin` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `admin`) VALUES
(31, 'admin', 'admin@admin.fr', '$2b$10$iVpdaduZAWF0PNzQs8iC7O8fUX2xau/eu11cm2SojvNHZ9nUK9wZi', 1),
(32, 'jean', 'jean@jean.fr', '$2b$10$satLjXAD.hsY6FHBoHDg5uJMLzSqyutgsRg9Zjuxwn15CL7Kk/q/W', 0),
(33, 'eve', 'eve@eve.fr', '$2b$10$Rq7UIPpY/CYF.pPis2VckekjU3sPU8rZH1qPCALL8/IWkFz5Bgy9O', 0),
(35, 'paul', 'paul@paul.fr', '$2b$10$nbRJS5yY0VFAV7b5JJdbQOz9CSNn9kmk8zTojtSo/2OeHo91E1/vS', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comment_postId` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comment_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `fk_postId` FOREIGN KEY (`opinion_postId`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`opinion_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
