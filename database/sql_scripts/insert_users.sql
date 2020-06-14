-- inserting 2 users and their family recipes
-- Niv
INSERT INTO [dbo].[user] ([user_id], [username], [password], [first_name], [last_name], [country], [email], [image])
VALUES ('51f2a120-a59f-11ea-b43b-2b8d71f22f9e',
        'nivgold',
        '$2a$14$m/6qi.9vvPo5IPb58fbWju3NhFHOicmhYfH.4XcspT/9wn5IuXvDi',
        'Niv',
        'Goldshlager',
        'Israel',
        'nivgold@post.bgu.ac.il',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591191820/samples/people/kitchen-bar.jpg');

-- Ron
INSERT INTO [dbo].[user] ([user_id], [username], [password], [first_name], [last_name], [country], [email], [image])
VALUES ('5b0bbb20-a59f-11ea-b43b-2b8d71f22f9e',
        'ronisrael',
        '$2a$14$7AaV.bDMrbWoijzcnK.zqeTzQBXVTLhwFVySrPb/1iC5e2XlsWBWy',
        'Ron',
        'Israel',
        'Israel',
        'ronisrael@gmail.com',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591191822/samples/people/boy-snow-hoodie.jpg');
