const axios = require('axios');
const api_domain = "https://api.spoonacular.com/recipes";

async function getRecipeInfo(recipe_id){
    let spooncular_response;
    try{
        spooncular_response = await axios.get(`${api_domain}/${recipe_id}/information`, {
            params: {
              includeNutrition: false,
              apiKey: process.env.SPOONCULAR_APIKEY
            }
        });
    } catch (err){
        return undefined;
    }

    return extractRelevantInfo(spooncular_response.data);
}

function extractRelevantInfo(spooncular_response){
    const {
        image,
        title,
        readyInMinutes,
        aggregateLikes,
        vegetarian,
        glutenFree,
        servings
    } = spooncular_response;

    // extarcting the relevant data from spooncular ingredients response 
    const ingredients = extractIngredients(spooncular_response.extendedIngredients);

    // extracting the relevent data from spooncular analyzed instructions response
    const instructions = extractInstructions(spooncular_response.analyzedInstructions);

    return {
        image: image,
        title: title,
        ready_in_minutes: readyInMinutes,
        popularity: aggregateLikes,
        vegetarian: vegetarian,
        gluten_free: glutenFree,
        ingredients: ingredients,
        instructions: instructions,
        meals: servings
    }
}

function extractIngredients(spooncular_ingredients){
    return spooncular_ingredients.map((ingredient) => {
        return {
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit
        }
    });
}

function extractInstructions(spoonacular_instructions){
    let number = 1;
    let instructions = [];
    spoonacular_instructions.map((obj) => {
        obj.steps.map((step) => {
            instructions.push(
                {
                    number: number,
                    step: step.step
                }
            );
            number = number + 1;
        });
    });

    return instructions;
}

module.exports.getRecipeInfo = getRecipeInfo;