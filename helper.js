exports.success = (message, data) => {
    return {
        message, data
    }
}
// méthode success avec deux param pour construire une réponse
// export
// il existe une syntaxe d' ecma 6 permettant de fusionner la prropriété et la valeur d'un objet js s'ils ont le même nom
// exemple:
// const pokemon = { name: name};
// avec raccourci ECMAScript 6: const pokemon ={name};
