var express = require("express");
var router = express.Router();

// -----------------------------utils------------------------------------
const search_utils = require("./utils/recipesUtils/search_utils");
const recipe_info_utils = require("./utils/recipesUtils/recipe_info_utils");
const recipe_preview_utils = require("./utils/recipesUtils/recipe_preview_utils");
const random_utils = require("./utils/recipesUtils/random_utils");
// -----------------------------utils------------------------------------

// search route
router.get('/search', async (req, res) => {
    // extracting the search query parameters
    const search_query_params = search_utils.extractSearchParams(req.query);
  
    // calling the search_utils to handle the request with the search params
    let search_results = await search_utils.searchRecipes(search_query_params);

    // checking that the requested search has content
    if (search_results.length == 0){
      res.sendStatus(204);
    }
    else{
      res.status(200).json(search_results);
    }
});

// recipeID route
router.get('/recipeID/:recipeID', async (req, res) => {
    // extracting the recipe id
    const recipe_id = req.params.recipeID;

    // calling the recipe_info_utils to handle the recipe information request
    let recipeInfo = await recipe_info_utils.getRecipeInfo(recipe_id);
    
    // checking that the requested reipce id is exists
    if (recipeInfo){
      res.status(200).json(recipeInfo);
    }
    else{
      res.status(404).send("Recipe not found");
    }
});

// recipeID preview route
router.get('/recipeID/:recipeID/preview', async (req, res) => {
    // extracting the recipe id from the request params
    let recipe_id = req.params.recipeID;

    // calling the recipe_preview_utils to handle the recipe preveiew request
    let recipe_preview = await recipe_preview_utils.getRecipePreview(recipe_id);

    // checking that the requested recipe id is exists
    if (recipe_preview){
      res.status(200).json(recipe_preview);
    }
    else{
      res.status(404).send("Recipe not found");
    }
    
});

// random recipes route
router.get('/random/number/:num', async (req, res) => {
    // calling the random _utils to handle the random request
    let random_recipes = await random_utils.getRandomRecipes(req.params.num);
    
    res.status(200).json(random_recipes);
});

module.exports = router;