const db = require("../../database/DBUtils");

const getUserByUsername = async function(username) {
    // check that username contains only characters - prevent SQL Injection
    let db_response = await db.executeQuery(`select * from [dbo].[user] where username = '${username}'`);
    if (db_response.length == 0 ){
        return undefined;
    }
    return db_response[0];
};

const getUserByID = async function (user_id){
    // check that there is a user with the given `user_id`
    let db_response = await db.executeQuery(`select * from [dbo].[user] where user_id = '${user_id}'`);
    if (db_response.length == 0){
        return undefined;
    }
    return db_response[0];
};

const getUserRecipesInfo = async function(user_id, ids){
    const query = `select favorite_recipes_json_array AS favorites, watched_recipes_json_array AS watched 
                   from [dbo].[user] where user_id = '${user_id}'`;
    db_response = await db.executeQuery(query);
    // parsing the list of the favorite recipes and the watched recipes as object
    return {favorites: JSON.parse(db_response[0].favorites), watched: JSON.parse(db_response[0].watched)};
};

const getPersonalRecipes = async function (user_id){
    const query = `select [dbo].[personal_recipe].recipe_id AS id,
                          [dbo].[personal_recipe].image,
                          [dbo].[personal_recipe].title,
                          [dbo].[personal_recipe].ready_in_minutes,
                          [dbo].[personal_recipe].popularity,
                          [dbo].[personal_recipe].vegetarian,
                          [dbo].[personal_recipe].gluten_free
                   from [dbo].[personal_recipe] INNER JOIN [dbo].[user]
                   ON [dbo].[personal_recipe].user_id = [dbo].[user].user_id
                   where [dbo].[user].user_id = '${user_id}'`;
    let db_response = await db.executeQuery(query);
    if (db_response.length == 0){
        return undefined;
    }
    return db_response;
};

const getFavoriteRecipes = async function (user_id){
    const query = `select favorite_recipes_json_array as favorites 
                   from [dbo].[user]
                   where [dbo].[user].user_id = '${user_id}'`;
    let db_response = await db.executeQuery(query);
    
    let favorite_recipes = JSON.parse(db_response[0].favorites)

    if (favorite_recipes.length == 0){
        return undefined;
    }
    return favorite_recipes;
}

const getFamilyRecipes = async function (user_id){
    const query = `select [dbo].[family_recipe].recipe_id AS id,
                          [dbo].[family_recipe].owner_name AS owner,
                          [dbo].[family_recipe].image,
                          [dbo].[family_recipe].timing
                    from [dbo].[family_recipe] INNER JOIN [dbo].[user]
                    ON [dbo].[family_recipe].user_id = [dbo].[user].user_id
                    where [dbo].[user].user_id = '${user_id}'`;
    let db_response = await db.executeQuery(query);
    if (db_response.length == 0){
        return undefined;
    }
    return db_response;
};

const getPersonalRecipeID = async function (user_id, personal_recipe_id){
    const query = `select [dbo].[personal_recipe].image,
                          [dbo].[personal_recipe].title,
                          [dbo].[personal_recipe].ready_in_minutes,
                          [dbo].[personal_recipe].popularity,
                          [dbo].[personal_recipe].vegetarian,
                          [dbo].[personal_recipe].gluten_free,
                          [dbo].[personal_recipe].ingredients_json_array AS ingredients,
                          [dbo].[personal_recipe].instructions_json_array AS instructions,
                          [dbo].[personal_recipe].meals 
                    from [dbo].[personal_recipe] 
                    where [dbo].[personal_recipe].user_id = '${user_id}' AND [dbo].[personal_recipe].recipe_id = ${personal_recipe_id}`;
    let db_response = await db.executeQuery(query);
    if (db_response.length == 0){
        return undefined;
    }
    return db_response[0];
};

const getLastWatchedRecipes = async function (user_id){
    const query = `select watched_recipes_json_array as watched 
                   from [dbo].[user]
                   where [dbo].[user].user_id = '${user_id}'`;
    let db_response = (await db.executeQuery(query))[0].watched;
    let last_watched_recipes = JSON.parse(db_response);

    if (last_watched_recipes.length == 0){
        return undefined;
    }

    return last_watched_recipes;
}

const addUser = async function(user_id, username, password, first_name, last_name, country, email, image){
    const query = `insert into [dbo].[user] (user_id, username, password, first_name, last_name, country, email, image) 
    values ('${user_id}', '${username}', '${password}', '${first_name}', '${last_name}', '${country}', '${email}', '${image}')`;
    await db.executeUpdate(query);
};  

const addWatchedRecipe = async function(user_id, watched_id){
    const find_query = `select watched_recipes_json_array AS watched from [dbo].[user] 
                        where user_id = '${user_id}'`;
    let watched_list = JSON.parse((await db.executeQuery(find_query))[0].watched);
    let index = watched_list.indexOf(watched_id);
    if(index != -1) {
        // the recipe is already in the user's last watched recipes --> update its position
        watched_list.splice(index, 1);
    }
    watched_list.unshift(watched_id);
    const insert_query = `update [dbo].[user]
    set watched_recipes_json_array = '${JSON.stringify(watched_list)}'
    where user_id = '${user_id}'`;
    await db.executeUpdate(insert_query);
};

const addFavoriteRecipe = async function(user_id, favorite_id){
    const find_query = `select favorite_recipes_json_array AS favorites from [dbo].[user]
                        where user_id = '${user_id}'`;
    let favorite_list = JSON.parse((await db.executeQuery(find_query))[0].favorites);
    if(!favorite_list.includes(favorite_id)){
        favorite_list.push(favorite_id);
        const insert_query = `update [dbo].[user]
                              set favorite_recipes_json_array = '${JSON.stringify(favorite_list)}'
                              where user_id = '${user_id}'`;
        await db.executeUpdate(insert_query);
    }
};

const addPersonalRecipe = async function (user_id, personal_recipe){
    let {image, title, ready_in_minutes, popularity, vegetarian, gluten_free, ingredients, instructions, meals} = personal_recipe;
    const insert_query = `insert into [dbo].[personal_recipe]
                          (user_id, image, title, ready_in_minutes, popularity, vegetarian, gluten_free, ingredients_json_array, instructions_json_array, meals)
                          values ('${user_id}', '${image}', '${title}', ${ready_in_minutes}, '${popularity}', '${vegetarian}', '${gluten_free}', '${JSON.stringify(ingredients)}', '${JSON.stringify(instructions)}', ${meals});`;
    await db.executeUpdate(insert_query);
};

const removeFavoriteRecipe = async function (user_id, removed_id){
    const find_query = `select favorite_recipes_json_array AS favorites from [dbo].[user]
                        where user_id = '${user_id}'`;

    let favorite_list = JSON.parse((await db.executeQuery(find_query))[0].favorites);
    let removed_recipe_index = favorite_list.indexOf(removed_id);
    if (removed_recipe_index != -1){
        // removing the recipe from the favorite recipes list
        favorite_list.splice(removed_recipe_index, 1);
        const remove_query = `update [dbo].[user]
                              set favorite_recipes_json_array = '${JSON.stringify(favorite_list)}'
                              where user_id = '${user_id}'`;
        return await db.executeUpdate(remove_query);
    }
    else{
        return 0;
    }
};

const removePersonalRecipe = async function (user_id, removed_personal_recipe){
    const delete_query = `delete from [dbo].[personal_recipe]
                          where user_id = '${user_id}' AND recipe_id = '${removed_personal_recipe}'`;

    // returns the nubmer of rows affected
    return await db.executeUpdate(delete_query);
};

module.exports.getUserByUsername = getUserByUsername;
module.exports.getUserByID = getUserByID;
module.exports.getUserRecipesInfo = getUserRecipesInfo;
module.exports.getPersonalRecipes = getPersonalRecipes;
module.exports.getFavoriteRecipes = getFavoriteRecipes;
module.exports.getFamilyRecipes = getFamilyRecipes;
module.exports.getPersonalRecipeID = getPersonalRecipeID;
module.exports.getLastWatchedRecipes = getLastWatchedRecipes;
module.exports.addUser = addUser;
module.exports.addWatchedRecipe = addWatchedRecipe;
module.exports.addFavoriteRecipe = addFavoriteRecipe;
module.exports.addPersonalRecipe = addPersonalRecipe;
module.exports.removeFavoriteRecipe = removeFavoriteRecipe;
module.exports.removePersonalRecipe = removePersonalRecipe;