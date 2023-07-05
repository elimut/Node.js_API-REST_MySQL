const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('pokedex', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
// instance user auprès de sequelize
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        // types: pokemon.types.join()
        // retrait join() suite mise en place setter voir models
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
    // méthode hash prend deux paramètres: le mdp en lui même, et un nombre entier le salt rounds = temps nécessaire pour attacher correctement un mdp (plus élevé plus mdp sera difficile à être décrypté mais délai encryptage plus logn)
    .then(hash=> {
      // récup mdp crypté
      User.create({ 
        username: 'pikachu',
        password: hash
        // on pousse en bdd le mdp hashé et pas celui en clair
      }).then(user => console.log(user.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
// initialisation du models



  
module.exports = { 
  initDb, Pokemon, User
}
// export de la fonction initDB qui permet d'initialiser la bdd et model sequelize Pokemon pour s'en servir ailleurs dans le code.




// const {Sequelize, DataTypes} = require('sequelize');
//  La syntaxe {sequelize} extrait la propriété sequelize de l'objet exporté par le module, et l'assigne à une variable locale appelée sequelize. Cela vous permet d'accéder directement à la propriété sequelize sans avoir à référencer l'objet complet à chaque fois. Par exemple, au lieu d'écrire sequelize.method(), vous pouvez simplement écrire method(). En résumé, les accolades {} et la déstructuration permettent d'extraire des valeurs spécifiques d'un objet ou d'un tableau et de les assigner à des variables distinctes. Dans votre code, cela est utilisé pour extraire la propriété sequelize du module sequelize et l'assigner à une variable locale appelée sequelize.
//2- import objet DataTypes (synch bdd) qui contient les types dispo dans Sequelize, pour définir les types de données contenues dans les propriétés des models

// let pokemons = require('./src/db/mock-pokemon');
// importation du module mock-pokemon, voir fichier mock-pokemon

// const sequelize =  new Sequelize(
//     'pokedex',
//     // nom bdd
//     'root',
//     // id
//     'password',
//     // mdp
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         dialectOptions: {
//             timezone: 'Etc/GMT-2'
//         },
//         logging: false
//     }
//     // objet de config, on doit obligatoiremet passer par la clé host qui permet d'indiquer où se trouve la bdd sur la machine, et dialect qui est le nom du driver que ns utilisons pour permettre à Sequelize d'intéragir avec la bdd. timezon et logging  => permettent d'éviter des affichages d'avertissement dans la console plus tard, pas obli.
// );
// // cette instance Sequelize représente la connexion à la bdd, et on va s'en servir ensuite. 4 param au constructeur Sequelize

// const PokemonModel = require('./src/models/pokemons');
// // 1- import models pour synch bdd
// const Pokemon = PokemonModel(sequelize, DataTypes);
// // 3- instanciation du models pokemon, dire à Sequelize de créer la table pokemon associée à ce models.
// sequelize.sync({force: true})
//     .then(_ =>{
//         console.log("synchro ok");
//         pokemons.map(pokemon => {
//         Pokemon.create({
//         // méthode create() avec en paramètre les données que nous voulons pour le premier pokemon en bdd, pas d'id ni date de créa =< Sequelize le demande à la bdd
//             // name: "Bulbizar",
//             name: pokemon.name,
//             // hp: 25,
//             hp: pokemon.hp,
//             // cp: 5,
//             cp: pokemon.hp,
//             // picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
//             picture: pokemon.picture,
//             // types: ["Plante", "Poison"].join()
//             types: pokemon.types.join()
//             // join() => la propriété types est un string en bdd mais sur l'API est un tableau de string, on applique la méthode native join sur le tableau js afin de générer une chaîne de caractères unique pouvant être sauvegard&e en bdd.
//         }).then(bulbizarre => console.log(bulbizarre.toJSON()));
//         // méthode toJSON fournie par Sequelize, recommandée pour afficher correvtement les informations des instances d'un modèle. Sequelize attache un tas de prop et méthode sur les models en interne, ainsi l'on affiche que les valeurs qui nous interresssent 
//         // create retourne une promesse js, nous utlisons donc then, tmt async car sequelize doit effectuer en arrière plan une requête en bdd, attendre sa réponse
//     });
// });
// // synch avec l'état de la bdd avec méthode sync. En arrière plan: synch de tous les models Sequelize de l'API REST avec la bdd
// // force: true permet de supprimer la table associée à chaque modèle avant d'effectuer la synchro, on perd les données de la table à chaque synchro à terme nous nous en débarasserons de l'option force. sert pour le dev, repart sur données neuves à chaque redémarrage.
