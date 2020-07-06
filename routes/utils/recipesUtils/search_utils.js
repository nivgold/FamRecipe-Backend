const axios = require('axios');
const api_domain = "https://api.spoonacular.com/recipes";


function extractSearchParams(query_params){
    const query = query_params.text;
    const number = query_params.quantity;
    const {cuisine, diet, intolerance} = query_params;
    // creating the params object for the spooncular search
    const search_query_params = {};
    search_query_params.params = new Object();
  
    // setting the user's query
    search_query_params.params.query = query;
    // setting the user's number of results
    search_query_params.params.number = number;
  
    // checking if the user set the cuisine parameter
    if (cuisine) search_query_params.params.cuisine = cuisine;
    // checking if the user set the diet parameter
    if (diet) search_query_params.params.diet = diet;
    // checking if the user set the intolerance parameter
    if (intolerance) search_query_params.params.intolerance = intolerance;
  
    // setting the spoon culer API key
    search_query_params.params.apiKey = process.env.SPOONCULAR_APIKEY;
  
    // setting the instructionsRequired to be true in order to find recipes with instructions
    search_query_params.params.instructionsRequired = true;

    return search_query_params;
}

async function searchRecipes(search_params){
    let spooncular_response = (await axios.get(`${api_domain}/search`, search_params)).data;
    
    let result_ids = extractSearchResultsIDs(spooncular_response.results);

    let search_recipes_info = await getRecipesInfo(result_ids);

    return search_recipes_info;
}

function extractSearchResultsIDs(serach_results){
    result_ids = [];
    serach_results.map((recipe) => {
        result_ids.push(recipe.id);
    });
    return result_ids;
}

async function getRecipesInfo(recipes_ids){
    promise_array = [];
    recipes_ids.map((id) => 
        promise_array.push(axios.get(`${api_domain}/${id}/information?apiKey=${process.env.SPOONCULAR_APIKEY}`))
    );

    let info_response = await Promise.all(promise_array);
    
    let search_response_data = extarctRecipeInfoData(info_response);

    return search_response_data;
}

function extarctRecipeInfoData(info_response){
    let relevant_info = [];
    info_response.map((recipe_info) => {
        const{
            id,
            image,
            title,
            readyInMinutes,
            aggregateLikes,
            vegetarian,
            vegan,
            glutenFree
        } = recipe_info.data;

        let recipe = new Object();

        recipe[id] = {
            image: image,
            title: title,
            ready_in_minutes: readyInMinutes,
            popularity: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            gluten_free: glutenFree
        }

        relevant_info.push(recipe);
    });

    return relevant_info;
}


module.exports.extractSearchParams = extractSearchParams;
module.exports.searchRecipes = searchRecipes;
module.exports.getRecipesInfo = getRecipesInfo;