exports.success = (message, data) => {
    return {
        message, data
    }
}
// méthode success avec deux param pour construire une réponse
// export
// il existe une syntaxe d' ecma 6 permettant de fusionner la propriété et la valeur d'un objet js s'ils ont le même nom
// exemple:
// const pokemon = { name: name};
// avec raccourci ECMAScript 6: const pokemon ={name};

// ajout méthode pour id
exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id);
    // transfo tableau des pokemons en un tableau d'id des pokemons. méthode map comme for mais en retournant un nv tableau
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
    // méthode js native reduce qui permet de comparer les éléments deux à deux dans un tableau 
    const uniqueId = maxId +1;
    return uniqueId;
}
