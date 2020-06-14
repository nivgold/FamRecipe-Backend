var express = require("express");
var router = express.Router();
var db_requests = require("./utils/DB_requests");
var json_utils = require("./utils/json_utils");
const recipes_search_utils = require("./utils/recipesUtils/search_utils")

// check the authntication of all incoming requests
router.use(async (req, res, next) => {
    // checking if even has `session` key and `id` key in `session`
    if (req.session && req.session.id) {
        // the request has the `session` key and the `id` key in the request body
        const id = req.session.id;
        const user = await db_requests.getUserByID(id);// need to check user in DB

        // checking if the retrieved user exists in the DB
        if (user){
            req.user = user;
            next();
        }
        else{
            res.sendStatus(401);
        }
    }
    // didnt authenticate successfully so returns 401 - un authnticated status code
    else{
        res.sendStatus(401);
    }
});

// persoanlDetauls route
router.get("/personalDetails", function (req, res) {
    // retrieve the user data
    let user = req.user;

    // extracting the user's personal data
    res.status(200).json({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        email: user.email,
        image: user.image
    });
});

// recipeInfo route
router.get("/recipesInfo/:ids", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // extracting the ids from the request
    let req_ids = req.params.ids;

    // parsign the stringed array to javascript array
    let recipe_ids = JSON.parse(req_ids);

    // getting the user's favorite recipes and his watched recipes list
    let user_favorites_watched = await db_requests.getUserRecipesInfo(user.user_id);

    // creating the response according to the FamRecipe API
    let recipesInfo_response = json_utils.makeRecipeInfoJSON(user_favorites_watched, recipe_ids);

    res.status(200).json(recipesInfo_response);
});

// addWatchedRecipe route
router.post("/addWatchedRecipe", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // extracting the id of the watched recipe
    let watched_recipe_id = parseInt(req.body.recipeID);

    // adding the watched recipe to the user watched recipes list in the DB
    await db_requests.addWatchedRecipe(user.user_id, watched_recipe_id);

    res.status(200).send("Recipe added successfully to user's watched recipes");
});

// lastWatchedRecipes route
router.get("/lastWatchedRecipes", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // getting the last watched recipes of the user
    let last_watched_recipes = await db_requests.getLastWatchedRecipes(user.user_id);

    // checking that the user has last watched recipes
    if (last_watched_recipes){
        res.status(200).json(last_watched_recipes);
    }
    else{
        res.sendStatus(204);
    }
});

// addFavoriteRecipe route
router.post("/addFavoriteRecipe", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // extracting the id of the favorite recipe
    let favorite_recipe_id = parseInt(req.body.recipeID);

    // adding the favorite recipe to the user favorite recipes list in the DB
    await db_requests.addFavoriteRecipe(user.user_id, favorite_recipe_id);

    res.status(200).send("Recipe added successfully to user's favorite recipes");
});

// favoriteRecipes
router.get("/favoriteRecipes", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // retrieving all of the favorite recipes of the user
    let favorite_recipes = await db_requests.getFavoriteRecipes(user.user_id);

    // checking that the user has favorite recipes
    if (favorite_recipes){
        // getting the preview information
        let favorite_recipes_preview = await recipes_search_utils.getRecipesInfo(favorite_recipes);

        res.status(200).json(favorite_recipes_preview);
    }
    else{
        res.sendStatus(204);
    }
});

// removeFavoriteRecipe route
router.delete("/removeFavoriteRecipe/recipeID/:id", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // extract the id of the recipe the user want to remove from his favorite
    let remove_id = parseInt(req.params.id);

    // removing the recipe from the user's favorite recipes
    let is_found = await db_requests.removeFavoriteRecipe(user.user_id, remove_id);

    // checking that the given recipe id was indeed in the user's favorite recipes
    if (is_found != 0){
        res.status(200).send("Reicipe successfully removed");
    }
    else{
        res.status(404).send("Recipe not found");
    }
});

// personalRecipes route
router.get("/personalRecipes", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // retrieving all of the personal recipes of the user
    let personal_recipes = await db_requests.getPersonalRecipes(user.user_id);

    // check if the user has personal recipes
    if (personal_recipes){
        res.status(200).json(personal_recipes);
    }
    else{
        res.sendStatus(204);
    }
});

// personalRecipe route
router.get("/personalRecipe/recipeID/:id", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // extracting the id of the personal recipe
    let personal_recipe_id = req.params.id;

    // retrieving the personal recipe of the user from the DB
    let personal_recipe = await db_requests.getPersonalRecipeID(user.user_id, personal_recipe_id);

    // checking that the user's has the given personal recipe
    if (personal_recipe){
        personal_recipe.ingredients = JSON.parse(personal_recipe.ingredients);
        personal_recipe.instructions = JSON.parse(personal_recipe.instructions);
        res.status(200).send(personal_recipe);
    }
    else{
        res.status(404).send("Recipe not found");
    }
});

// createPersonalRecipe route
router.post("/createPersonalRecipe", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // extracting the personal recipe creating from the POST request body
    let user_data = req.body;
    let new_personal_recipe = {
        image: user_data.image,
        title: user_data.title,
        ready_in_minutes: user_data.ready_in_minutes,
        popularity: user_data.popularity,
        vegetarian: user_data.vegetarian,
        gluten_free: user_data.gluten_free,
        ingredients: user_data.ingredients,
        instructions: user_data.instructions,
        meals: user_data.meals
    }

    // adding the new user's personal recipe to the DB
    await db_requests.addPersonalRecipe(user.user_id, new_personal_recipe);

    res.status(201).send("Personal recipe created successfully");
});

// deletePersonalRecipe route
router.delete("/deletePersonalRecipe/recipeID/:id", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // extract the id of the recipe the user want to remove from his personal recipes
    let removed_personal_recipe = parseInt(req.params.id);

    // removing the recipe from the user's favorite recipes
    let is_found = await db_requests.removePersonalRecipe(user.user_id, removed_personal_recipe);

    // checking if the given id was personal recipe of the user
    if (is_found == 1){
        res.status(200).send("Personal recipe successfully removed");
    }
    else{
        res.status(404).send("Personal recipe not found");
    }
});

// familyRecipes route
router.get("/familyRecipes", async (req, res) => {
    // retrieve the user data
    let user = req.user;

    // retrieving all of the family recipes of the user
    let family_recipes = await db_requests.getFamilyRecipes(user.user_id);

    // checking that the user habve family recipes
    if(family_recipes){
        res.status(200).json(family_recipes);
    }
    else{
        res.sendStatus(204);
    }
});

module.exports = router;