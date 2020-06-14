
IF OBJECT_ID('dbo.personal_recipe', 'U') IS NOT NULL
    DROP TABLE [dbo].[personal_recipe];

IF OBJECT_ID('dbo.family_recipe', 'U') IS NOT NULL
    DROP TABLE [dbo].[family_recipe];

IF OBJECT_ID('dbo.user', 'U') IS NOT NULL
    DROP TABLE [dbo].[user];

CREATE TABLE [dbo].[user](
    [user_id] [varchar](250) NOT NULL PRIMARY KEY,
    [username] [varchar](30) NOT NULL UNIQUE,
    [password] [varchar](300) NOT NULL,
    [first_name] [varchar](30) NOT NULL,
    [last_name] [varchar](30) NOT NULL,
    [country] [varchar](30) NOT NULL,
    [email] [varchar](30) NOT NULL,
    [image] [varchar](1000) NOT NULL,
    [favorite_recipes_json_array] [varchar](2500) NOT NULL DEFAULT '[]',
    [watched_recipes_json_array] [varchar](2500) NOT NULL DEFAULT '[]'
);

CREATE TABLE [dbo].[personal_recipe](
    [recipe_id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [user_id] [varchar](250) NOT NULL,
    CONSTRAINT FK_PersonalRecipe_User FOREIGN KEY (user_id) REFERENCES [dbo].[user] (user_id),
    [image] [varchar](1000) NOT NULL,
    [title] [varchar](50) NOT NULL,
    [ready_in_minutes] [int] NOT NULL,
    [popularity] [int] NOT NULL DEFAULT 0,
    [vegetarian] [BIT] NOT NULL DEFAULT 0,
    [gluten_free] [BIT] NOT NULL DEFAULT 0,
    [ingredients_json_array] [varchar](2500) NOT NULL,
    [instructions_json_array] [varchar](2000) NOT NULL,
    [meals] [int] NOT NULL
);

CREATE TABLE [dbo].[family_recipe](
    [recipe_id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [user_id] [varchar](250) NOT NULL,
    CONSTRAINT FK_FamilyRecipe_User FOREIGN KEY (user_id) REFERENCES [dbo].[user] (user_id),
    [owner_name] [varchar](30) NOT NULL,
    [timing] [varchar](100) NOT NULL,
    [ingredients_json_array] [varchar](2500) NOT NULL,
    [instructions] [varchar](2000) NOT NULL,
    [image] [varchar](1000) NOT NULL
);