-- inserting 2 users and their family recipes
-- Niv
INSERT INTO [dbo].[user] ([user_id], [username], [password], [first_name], [last_name], [country], [email], [image])
VALUES ('51f2a120-a59f-11ea-b43b-2b8d71f22f9e',
        'nivgold',
        '$2y$14$HaqDcyNJh4eS2l7yoaL54e818TU/W7v13tJT2K0sXE1.BEfOh2v/2',
        'Niv',
        'Goldshlager',
        'Israel',
        'nivgold@post.bgu.ac.il',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591191820/samples/people/kitchen-bar.jpg');

-- Ron
INSERT INTO [dbo].[user] ([user_id], [username], [password], [first_name], [last_name], [country], [email], [image])
VALUES ('5b0bbb20-a59f-11ea-b43b-2b8d71f22f9e',
        'ron',
        '$2y$14$1oxoFYre.oL4TVLSBG1d4OxucBAaPleygurRSAESebX3E674Z9WnK',
        'Ron',
        'Israel',
        'Israel',
        'ronisrael@gmail.com',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591191822/samples/people/boy-snow-hoodie.jpg');
