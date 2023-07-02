const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
  })
}
// définition d'un point de terminaison complet dans son propre module js
// l1 import du models pokemon de sequelize
// l3 export de la fonction qui prend en paramètre l'application express entière, permet de définir les routes dans l'appli avec des points de terminaison séparés dans des modules distincts
// l5 retourne promesse avecx la liste de tous les pokemons
// l8 plus besoin de méthode success, on retourne directement la réponse dans res.json
// contient route et tmt associé
// il faut relier ce endpoint au syst de route express dans app.js