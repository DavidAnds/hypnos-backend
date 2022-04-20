# HYPNOS WEBSITE

## Description
Dans le cadre de l'ECF, une évaluation lors de ma formation de dev Full stack, j'ai réalisé cette application qui permet de réserver des suites à partir des hôtels du groupe hypnos. 
Les données peuvent être ajoutées, modifiées et supprimées à partir de la partie backOffice de l'application.
Il s'agit ici de la partie backEnd de cette application.

## Déploiement en local

Il faut dans un premier temps récupérer le projet. Pour cela dans votre terminal, placez vous dans votre dossier de travail et réaliser les commandes suivantes: 

```
git init
git clone https://github.com/DavidAnds/hypnos-backend.git

```
Il faut d'abord supprimer le fichier Node modules deja présent puis installer toutes les dépendances nécessaires au bon fonctionnement de l'application :

```
npm install

```
Ensuite, il faut créer la base de données, pour cela vous pouvez utiliser votre terminal et vous connecter à mysql.
Ensuite, il vous faut créer une base de données hypnos_db:

```
CREATE DATABASE IF NOT EXISTS `hypnos_db`;

USE `hypnos_db`;

```
Après l'avoir crée, vous pouvez, importer le fichier sql hypnos.sql qui vas vous permettre de créer la table backUser et y insérer un administateur. Vous allez avoir besoin de cette administrateur pour ensuite insérer, grâce à la partie front end (Voir manuel d'utilisation https://github.com/DavidAnds/hypnos-front-end) les valeurs que vous souhaitez à l'application.

```
`hypnos_db` < hypnos.sql

```

Ensuite, il faut connecter votre base de données à notre à notre application pour cela, rendez vous dans components/database/database.js et modifié les valeurs suivantes par vos propres valeurs:

```
const sequelize = new Sequelize('hypnos_db', 'utilisateur', 'mdp', {
    dialect: 'mariadb',
    host: 'localhost',
});

```

Finalement lancer l'application grâce à la commade suivante:

```
npm start

```


