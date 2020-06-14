const axios = require('axios');
const api_domain = "https://api.spoonacular.com/recipes";

async function getRecipePreview(recipe_id){
    try{
        let spooncular_response = await axios.get(`${api_domain}/${recipe_id}/information`, {
          params:{
            includeNutrition: false,
            apiKey: process.env.SPOONCULAR_APIKEY,
          }
        });
        
        return extractPreviewInfo(spooncular_response.data);
    }
    catch(err) {
        return undefined;
    }
}

function extractPreviewInfo(spooncular_response){
    const {
        id, 
        image, 
        title, 
        readyInMinutes, 
        aggregateLikes, 
        vegetarian, 
        glutenFree} = spooncular_response;

    return {
        id: id,
        image: image,
        title: title,
        ready_in_minutes: readyInMinutes,
        popularity: aggregateLikes,
        vegetarian: vegetarian,
        gluten_free: glutenFree
    }
}

module.exports.getRecipePreview = getRecipePreview;
module.exports.extractPreviewInfo = extractPreviewInfo;