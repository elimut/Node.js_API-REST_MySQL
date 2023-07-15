const { Pokemon } = require('../db/sequelize')
const auth = require("../auth/auth");
const { Op } = require('sequelize');
  
module.exports = (app) => {
  app.get('/api/pokemons' ,(req, res) => {
    // passer middleware auth en deuxième argument de la route pour sécurisation
    if(req.query.name) {
      const name = req.query.name;
      // const limitUser = parseInt(req.query.limit);
      // (limitUser != 5)? limitUser : limitUser = 5;

      if(name.length < 2){
        const message = "Le terme de la recherche doit contenir au moins deux caractères. Réessayez.";
        res.status(400).json({ message});
      }
      const limitUser = parseInt(req.query.limit) || 5; //tuto, vérifier ternaire
      // req.query.name => indique à express que l'on souhaite extraire le paramètre de requête name del'URL. On passe par la requête req fournie par Express.
      // return Pokemon.findAll({ where: { 
      //   name: { //name est la propriété du models pokemon
      //     // [Op.eql]: name //name est le critère de la recherche
      //     // opérateur Op.eql. Paritcularité de syntaxe, il faut importer les op de sequelize que l'on souhaite utiliser. crochet autour de l'op: obligation arbitraire de Sequelize.
      //     [Op.like]: `%${name}%` 
      //     // % pour indiquer où effectuer la recherche dans le nom d'un pokémon
      //   }
      // },
      // limit: 5
        // limite de résultats
      return Pokemon.findAndCountAll({ where: { 
        // va chercher 2 infos en bdd: nombre total et résultats demandés
        name: { 
          [Op.like]: `%${name}%` 
        }
      },
      order: ['name'],
      // nous passons un tableau contenant deux informations: la prop du models Sequelize, sur laquelle on souhaite ordonner les résultats et l'ordre croissant ou décroissant, par défaut croissant
      limit: limitUser
    })
      // .then(pokemons => {
      //   const message =  (pokemons.length > 1)? `Il y a ${pokemons.length} pokémon qui correspondent au terme de recherche ${name}` : `Il y a ${pokemons.length} pokémon qui correspond au terme de recherche ${name}` ;
      //   res.json({ message, data: pokemons});
      // });
      .then(({count, rows}) => {
        const message =  `Il ya ${count} pokémons qui correpondent au terme de la recherche ${name}`;
        res.json({ message, data: rows});
      });
      // on récupère les deux informations retournées par la méthode. Paramètres imposés par findAndCountAll, on récupère donc les var count et rows à la place de pokémons.
    }
    Pokemon.findAll({ order: ['name'] })
    // findAll retourne une promesse = requête que Sequelize va effectuer à la bdd => échoue ou réussit
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons });
      })
      .catch(error => {
        const message = "La liste des pokémons n'a pas pu être chargée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error});
      });
      // interception des erreurs avec la méthode catch des promesses de JS. Une fois capturée il reste à retourner un message d'erreur 
  })
}
// définition d'un point de terminaison complet dans son propre module js
// l1 import du models pokemon de sequelize
// l3 export de la fonction qui prend en paramètre l'application express entière, permet de définir les routes dans l'appli avec des points de terminaison séparés dans des modules distincts
// l5 retourne promesse avecx la liste de tous les pokemons
// l8 plus besoin de méthode success, on retourne directement la réponse dans res.json
// contient route et tmt associé
// il faut relier ce endpoint au syst de route express dans app.js