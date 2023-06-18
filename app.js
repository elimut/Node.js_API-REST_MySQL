const express = require('express');
//  Récupération du paquet express dans code avec require => récup dépendance dans node modules
const app = express();
// serveur web sur lequel fonctionnera notre API REST
const port = 3000 ;
// port sur lequel nous allons démarrer notre API REST par la suite
let pokemons = require('./mock-pokemon');
// importation du module mock-pokemon, voir fichier mock-pokemon

app.get('/', (req, res) => res.send('Hello express 2'));
// déf du premier endpoint, coeur d'express. 
// Chaque élément est important pour définir un point de terminaison:
// 1- coeur de la requête: get, prend 2 arguments en param => le chemin de la requête, chemin de la route qui va permettre de traiter ce point de terminaison (ici route par défaut) et => fonction qui fournit une réponse à notre client quand point de terminaison est appelé, cette fonction prend également 2 arguments req = récupération de l'objet request qui correspond à la requête reçue en entrée par notre point de terminaison, et res = response objet à renvoyer depuis express au client.
// Ici on utilise méthode send de l'objet response pour renvoyer le msg
app.get('/api/pokemons/:id', (req, res) => {
// ajout valeur dynamique id avec :id, acceptation du paramètre. Express le récupère et le transmets à notre point de terminaison via l'objet req.
    // const id = req.params.id;
    // récupération des paramètres id de l'URL
    const id = parseInt(req.params.id);
    // conversion de la chaîne de caractère en number 
    // res.send(`Vous avez demandé le pokemon n° ${id}`); = message indiquant l'id choisi
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    // constante qui permet de récupèrer dans le fichier pokemon l'objet choisi grâce à l'id
    res.send(`Vous avez choisi: ${pokemon.name}`);
    // message envoyé: nom du pokemon, nam dans objet pokemon suite à la sélection de l'id.
    // message erreur name undefined, méthode find ne renvoie rien.
    // Routeur d'express passe les paramètres sous forme de chaînes de caractères systématiquement, le paramètre id devient une chaîne de caractère => pokemon.id === id => comparaison de deux valeurs non identiques => false, il faut convertir la chaîne de caractère en un nombre => méthode js native parse int
});
// appel nouvelle route dans navigateur => localhost:3000/api/pokemon/1
// nouvel endpoint dans l'API

// Exercice:  création d'un nouvel endpoint renvoie nombre total de pokemon avec méthode get, URL endpoint: /api/pokemons'
app.get('/api/pokemons', (req, res) =>{
    res.send(`il y a ${pokemons.length} au total`);
    // utilisation de la propriété longueur du tableau
});

app.listen(port, () => console.log(`Notre appli Node est démarrée sur : http://localhost: ${port}`));
// démarre API REST sur port 3000
// envoie d'une requête get via API REST, et a retourné une réponse.