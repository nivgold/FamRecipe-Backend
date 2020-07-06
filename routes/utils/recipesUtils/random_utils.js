const axios = require('axios');
const api_domain = "https://api.spoonacular.com/recipes";
const recipe_preview_utils = require("./recipe_preview_utils");

async function getRandomRecipes(number){
    let spoonacular_response = (await spooncularRandomRecipes(number)).data.recipes;
    
    // making sure that the returned recipes will have instructions
    while(isInstructionsMissing(spoonacular_response)){
        spoonacular_response = (await spooncularRandomRecipes(number)).data.recipes;
    }

    // extarcting the preview relevant data
    return extractRecipesPreview(spoonacular_response);
}

function extractRecipesPreview(spooncular_recipes){
    let recipes_preview = [];
    spooncular_recipes.map((recipe) => {
        recipes_preview.push(
            recipe_preview_utils.extractPreviewInfo(recipe)
        )
    });

    return recipes_preview; 
}

async function spooncularRandomRecipes(number){
    return await axios.get(`${api_domain}/random?number=${number}`, {
        params: {
          apiKey: process.env.SPOONCULAR_APIKEY
        }
    });
}

function isInstructionsMissing(recipes_array){
    
    let found = recipes_array.find(recipe => recipe.instructions.length == 0 || !recipe.image);

    if (found){
        return true;
    }
    return false;

    // flag = false;
    // recipes_array.forEach((recipe) => {
    //     if(recipe.instructions.length == 0) {
    //         flag = true;
    //         break;
    //     };
    // });
    // return flag;
}

module.exports.getRandomRecipes = getRandomRecipes;