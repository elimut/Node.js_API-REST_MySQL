const express = require('express');
//  Récupération du paquet express dans code avec require => récup dépendance dans node modules
const morgan = require('morgan');
// import morgan et utilisation à la place du logger,utilisation dans le code
const favicon = require ('serve-favicon');
// dépendance favicon
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
// récup par module sequelize


const app = express();
// serveur web sur lequel fonctionnera notre API REST
const port = 3000 ;
// port sur lequel nous allons démarrer notre API REST par la suite


// const helper = require('./helper.js');
// const {success, getUniqueId} = require('./helper'); devenue inutile car en bdd if unique défini
// récup seulement de success
// affectation destructurée, fonction success plutôt que helper


// const logger = (req, res, next) => {
//     console.log(`URL: ${req.url}`);
//     next();
// }
// middleware logger, 3 paramètres
//  la req http reçue en entrée , la réponse http qui va être exposée au client, la méthode next fournie par Express qui ndique que le traitement est terminé.
// loggue l'URL des points de terminaison appelée par les consommateurs de notre API REST.
// l'on peut supprimer la var intermédiaire , plus concis


// app.use(logger);
// utilisation du nouveau middleware dans l'application express grâce à use
// après suppression de la var intermédiaire:
// app.use((req, res, next)=> {
//     console.log(`URL: ${req.url}`);
//      next();
// });



app
    .use(favicon(__dirname + '/favicon.ico'))                                                                                                                           
    .use(morgan('dev'))
    .use(bodyParser.json());
// combi des middleware, bien télécharger favicon
// appel de la méthode use autant de fois que l'on a de middlewares à implémenter
// on peut les chaîner les uns à la suite des autres afin d'établir un ordre en eux
// __dirname est une variable d'environnement qui vous indique le chemin absolu du répertoire contenant le fichier en cours d'exécution.

sequelize.initDb();

// ici nous placerons nos futurs points de terminaison:

require('./src/routes/findAllPokemons')(app);
// ajout endpoint du module, on ne côte plus le traitement  du endpoint et la route directement dans app.js mais dans module dédié.
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);


// app.use(morgan('dev'));
//attacher middleware dans l'API REST avec express, on peut paramètrer le message affiché


app.listen(port, () => console.log(`Notre appli Node est démarrée sur : http://localhost: ${port}`));
// démarre API REST sur port 3000





// Effacé car ne concernait qu'une liste statique
// envoi d'une requête get via API REST, et a retourné une réponse 
// app.get('/', (req, res) => res.send('Hello express 2'));
// // déf du premier endpoint, coeur d'express. 
// // Chaque élément est important pour définir un point de terminaison:
// // 1- coeur de la requête: get, prend 2 arguments en param => le chemin de la requête, chemin de la route qui va permettre de traiter ce point de terminaison (ici route par défaut) et => fonction qui fournit une réponse à notre client quand point de terminaison est appelé, cette fonction prend également 2 arguments req = récupération de l'objet request qui correspond à la requête reçue en entrée par notre point de terminaison, et res = response objet à renvoyer depuis express au client.
// // Ici on utilise méthode send de l'objet response pour renvoyer le msg

// app.get('/api/pokemons/:id', (req, res) => {
// // ajout valeur dynamique id avec :id, acceptation du paramètre. Express le récupère et le transmets à notre point de terminaison via l'objet req.
//     // const id = req.params.id;
//     // récupération des paramètres id de l'URL
//     const id = parseInt(req.params.id);
//     // conversion de la chaîne de caractère en number 
//     // res.send(`Vous avez demandé le pokemon n° ${id}`); = message indiquant l'id choisi
//     const pokemon = pokemons.find(pokemon => pokemon.id === id);
//     // constante qui permet de récupèrer dans le fichier pokemons l'objet choisi grâce à l'id
//     // res.send(`Vous avez choisi: ${pokemon.name}`);
//     // message envoyé: nom du pokemon, nam dans objet pokemon suite à la sélection de l'id.
//     // message erreur name undefined, méthode find ne renvoie rien.
//     // Routeur d'express passe les paramètres sous forme de chaînes de caractères systématiquement, le paramètre id devient une chaîne de caractère => pokemon.id === id => comparaison de deux valeurs non identiques => false, il faut convertir la chaîne de caractère en un nombre => méthode js native parse int
//     // res.json(pokemon);
//     // on place dans le corps de la réponse http, un objet js = pokemon
//     // retour d'une réponse http grâce à res au format json avec la méthode json(), renvoie d'info grâce à la var pokemon
//     const message = ("Un pokemon a bien été trouvé");
//     // res.json(helper.success(message, pokemon));
//     // utilise méthode success pour retourner une réponse structurée
//     res.json(success(message, pokemon));
//     // avec affectation destructurée, utilisation de la méthode success sans appeler la méthode success.
// });
// // appel nouvelle route dans navigateur => localhost:3000/api/pokemons/1
// // nouvel endpoint dans l'API

// // Exercice:  création d'un nouvel endpoint renvoie nombre total de pokemon avec méthode get, URL endpoint: /api/pokemons'
// // app.get('/api/pokemons', (req, res) =>{
// //     res.send(`il y a ${pokemons.length} au total`);
//     // utilisation de la propriété longueur du tableau
// // });

// // Exercice 2:
// // Ajouter un endpoint qui renvoie la liste complète des pokemons au format json, avec un message. Cahier des charges:
// // - reprendre la route api/pokemons pour avoir la totalité des pokemons,
// // - retourner les 12 pokemons,
// // - un message indiquant que l'on retourne les 12 pokemons,
// // - format json.
// app.get('/api/pokemons', (req, res) => {
//     // const pokemon1 = pokemons.findAll(pokemon1 => pokemon1);
//     const messageExo = ("Voici la liste des pokemons:");
//     res.json(success(messageExo, pokemons));
// });

// // Ajout d'un nouveau pokemon:
// // construire un nouvel endpoint qui acceptera la requête http: 
// //   - action http post,
// //   - URL de la ressource, ressource sur laquelle l'on souhaite intervenir = /api/pokemons, (collections de ressources),
// //   - les données du pokemon, au formaj json.
// app.post('/api/pokemons', (req, res) =>{
//     // post auprès d'express avec url associée
//     const id = getUniqueId(pokemons);
//     // définition id arbitraire, doit être unique pour générer url unique. On ne peut pas deviner un id déjà pris,  c'est la bdd de déterminer les id uniques, elle seule a accès à l'ensemble des pokemons existants. usage méthode dans helper
//     const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
//     // fusion des données du pokemon reçues via la requête http entrantes avec l'id unique généré + date de création
//     pokemons.push(pokemonCreated);
//     // ajout à la liste existante
//     const message1 = `le pokemon ${pokemonCreated.name} a bien été créé`;
//     res.json(success(message1, pokemonCreated));
//     // => renvoie d'une chaîne de caractère,
//     // il faut utiliser un middleware pour convertir en json.
// });

// // modification d'un pokemon, avec action http put, nouveau point de terminaison dans notr point d'entrée app.js
// app.put('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemonUpdated = {...req.body, id: id};
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon;
//     })
//     // traitement de la modification du pokemon. Il faut mettre à jour la liste globale de pokemon en remplaçant l'ancien par le nouveau modifié avec méthode map. Retour du même pokemon sauf s'il s'agit du pokemon à modifier. On obtient ainsi la liste des pokemon à jour avec la modif demandée par le client.
//     const message3 = `Le pokemon ${pokemonUpdated.name} a bien été modifié`;
//     res.json(success(message3, pokemonUpdated));
// });

// // suppression avec delete
// app.delete('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
//     pokemons.filter(pokemon => pokemon.id !== id);
//     // méthode js native filter => nouvelle liste sans le pokemon supprimé. L'on retourne le pokemon supprimé au client
//     const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`;
//     res.json(success(message, pokemonDeleted));
// });



