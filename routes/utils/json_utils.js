function makeRecipeInfoJSON (favorites_watched, req_ids){
    let result = {};
    let {favorites, watched} = favorites_watched;
    req_ids.map(id => {
        result[id] = {
            watched: (watched!=null) ? watched.includes(id) : false,
            favorite: (favorites) ? favorites.includes(id) : false
        }
    })
    return result;
};

module.exports.makeRecipeInfoJSON = makeRecipeInfoJSON;