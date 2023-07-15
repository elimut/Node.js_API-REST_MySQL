const { Pokemon } = require('../db/sequelize')
const auth = require("../auth/auth");
  
module.exports = (app) => {
  app.get('/api/pokemons',auth ,(req, res) => {
    // passer middleware auth en deuxième argument de la route pour sécurisation
    if(req.query.name) {
      const name = req.query.name;
      // req.query.name => indique à express que l'on souhaite extraire le paramètre de requête name del'URL. On passe par la requête req fournie par Express.
      return Pokemon.findAll({ where: { name: name}})
      // clause where en param de la méthode findAll de Sequelize, cette méthode estune fonctionnalité puissante proposée par Sequelize pour récup des données dans la BDD. Grâce à elle on peut trier les ressources en fonction de telles ou telles critères. rquête sur mesure. 
      // if pour séparer  deux cas disctincts dans le endpoint: recherche d'un Pokémon si oui alors le paramètre de requête name exite sinon il veut la liste.
      .then(pokemons => {
        const message =  (pokemons.length > 1)? `Il y a ${pokemons.length} qui correspondent au terme de recherche ${name}` : `Il y a ${pokemons.length} qui correspond au terme de recherche ${name}` ;
        res.json({ message, data: pokemons});
      });
    }
    Pokemon.findAll()
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