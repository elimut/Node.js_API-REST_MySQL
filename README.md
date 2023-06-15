# Développer une API REST avec Node.js

Développez facilement votre API Rest Node.JS à partir d'un dossier vide, avec Node.JS, Express.js et MySQL.

- Créer votre première API Rest NodeJS rapidement, à partir d'un dossier vide
- Installer et interagir efficacement avec une base de données SQL grâce à l'ORM Sequelize
- Comprendre l'éco-système de NodeJS, des API Rest et du Backend
- Sécuriser votre API Rest avec JWT et l'encryptage des mots de passe
- Ajouter une application Angular, React ou Vue à votre API Rest
- Respecter les bonnes pratiques de développements NodeJS et ExpressJS
- Déployer des API Rest modernes, rapides et scalables sur Heroku

## Présentation de Node.js

Environnement d'exécution pour JS.
Exécute code JS côté serveur et non dans navigateur.

### Environnement informatique

Lieu où le code est exécuté, le code du dévelopeur devient un produit utilisable par tous (site web, appli).

JavaScript => environnement d'éxécution => site

L'environnement d'exécution d'un site web => navigateur.
Le navigateur contient un **moteur** jS pour interpréter JS, chaque navigateur à son propre moteur.

- IE: chakra,
- Mozilla: spider monkey,
- chrome: V8.

=> Si code js est interprété par le navigateur, il peut ne pas fonctionner sur un autre navigateur, mais les technologies modernes permettent de lisser ce comportement.

JS => moteur JS => appli web : Node.js pas dedans car côté naviagteur, Node.js = côté serveur (backend).

**Node.js utilise JS donc mteur JS, ce moteur est inclus dans Node.js = V8 (open source).**

>Environnement web = navigateur + moteur js
>Environnement serveur = Node.js + V8 + modules internes à JS, code JS côté serveur

### Node.js versus JS

Les deux sont associés mais différents:

|JS|Node.js|
|-------|------|
|Langage de programmation|Environnement pour le code|
|Code -> exécution moteur navigateur|JS fonctionne à l'extérieur du navigateur|
|Utilisé pour n'importe quelle action à implémenter dans une application web: navigation, ...|Utilisé pour effectuer des opérations sur n'importe quel OS|
|Intzerprété par moteur du navigateur|Moteur V8 inclus|

### Node.js

- Utilise le langage JS
- Facilite fron/back
- utilise le même gestionnaire de paquet NPM, Node Package Manager. Gestion des dépendances avec Node.js
- Rapide
- **Possède une architecture non bloquante**
- Flexible, léger, peu de fonctionnalités (on y ajoute nos modules)
- Contient un écosystème de librairies Open Source grâce à NPM

Sa philosophie:

Rapidité V8 + architecture non bloquante

V8: outil qui interprète js rapidement, méthode de compilation Just-In-Time = transformation JS en code compris par la machine sans passer par un interpréteur (aucun code intermédiaire).

Module non bloquant: événement et  asynchrone dans Node.js.
**Architecture bloquante** = programme récupère des données depuis un serveur distant pour les afficher à l'utilisateur. Il fauat attendre de récupèrer les données demandées pour continuer le programme.
**Architecture non bloquante** = traitement en fonction des événements qui surviennent, , les traitements asynchrones ne bloquent pas l'exécution du programme.

### Types d'applications pouvant être développées avec Node.js

- Développement d'un site entier:
Dans Node. js, il existe un module HTTP qui permet de développer un serveur HTTP.
Toutes les parties serveur site: connexion BDD, routes navigation, renvoie code HTML/CSS, inclure JS depuis Node.js...
JS tapé pour Node.js sera interprété par V8 (code serveur) et le deuxième retourné dans la page client sera interprété par le moteur du navigateur dans utilisateur.
Node.js est plus réactif dans une application avec front et back séparé.
site web => demande page => envoie serveur
appli web => serveur envoie une seule page pour le site puis JS client prend le relais en affichant masquant les données néessaires.
Donc plus de réactivité, aucun rechargement.

- API REST:
API application programming Interface.
Objectif: gestion des accès BDD, et exposer une API REST aux différentes parties visibles du projet.
On peut, par exemple, récupèrer l'API de l'appli web suite au développement de l'application mobile.
Les opérations sur l'API REST sont **unidirectionnelles** = on envoie d'abord une requête à l'initiative du client puis seulement on attend une réponse.

- Application en temps réel:
Toutes les appliactions qui ont besoin de communqiuer rapidement entre le serveur et le front, comme whatsapp...
Dnas le cas d'une messagerie il faut que les informations soient rapides ( messages reçus,...) => implémenter une communication bidirectionnelle entre le serveur et l'application fontaine.
Cela est possible grâce à Node.js et Socket.io (librairie qui utilise cette communication en temps réel).
**Socket.io** possède deux parties:
bibliothèque côté client qui s'exécute dans le navigateur ou équivalent pour une appli mobile, et côté serveur avec Node.js.

- Scripts:
Node.js est utilisé pour développer des scripts = petits programmes qui peuvent être exécuté sur la machine locale.

### JS ESI ou ECMAScript6

Dernière version standardisée de JS (2015).
Dernières versions de Node.js supportent déjà ce standard.
Donc aucune installation.

node.green => liste toute les fonctionnalités de JS et indique si elles sont disponibles ou non dans telle ou telle version de Node.js.

### Node.js et TypeScript

TypeScript est un langage open source développé par Microsoft et permet d'ajouter le typage au langage JS.
Permet d'indiquer si une variable est de tel type, telle fonction doit renvoyer tel ou tel type.
Plus pertinenet côté front, permet de structurer l'état de la donnée.

Nouvelle façon d'utiliser JS en dehors d'un navigateur pour développer toutes sortes d'application.









