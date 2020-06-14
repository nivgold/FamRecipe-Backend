-- Niv personal 1
INSERT INTO [dbo].[personal_recipe] ([user_id], [image], [title], [ready_in_minutes], [popularity], [vegetarian], [gluten_free], [ingredients_json_array], [instructions_json_array], [meals])
VALUES (
        '51f2a120-a59f-11ea-b43b-2b8d71f22f9e',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591257333/1_v2xpuz.png',
        'Vegetarian chilli',
        32,
        0,
        1,
        0,
        '[{"name":"pack oven-roasted vegetables","amount":400,"unit":"gram"},{"name":"kidney beans in chilli souce","amount":400,"unit":"gram"},{"name":"chopped tomatoes","amount":400,"unit":"gram"},{"name":"ready-to-eat mixed grain pouch","amount":250,"unit":"gram"}]',
        '[{"number":1,"step":"Heat oven to 200C/180C fan/ gas 6. Cook the vegetables in a casserole dish for 15 mins. Tip in the beans and tomatoes, season, and cook for another 10-15 mins until piping hot. Heat the pouch in the microwave on High for 1 min and serve with the chilli."}]',
        2);

-- Niv personal 2
INSERT INTO [dbo].[personal_recipe] ([user_id], [image], [title], [ready_in_minutes], [popularity], [vegetarian], [gluten_free], [ingredients_json_array], [instructions_json_array], [meals])
VALUES (
        '51f2a120-a59f-11ea-b43b-2b8d71f22f9e',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591257641/1_m67i45.png',
        'Salmon & spinach pasta',
        15,
        0,
        0,
        0,
        '[{"name":"penne","amount":200,"unit":"gram"},{"name":"skinless salmon fillet","amount":2,"unit":""},{"name":"sudried tomatoes","amount":60,"unit":"gram"},{"name":"bag spinach","amount":80,"unit":"gram"}]',
        '[{"number":1,"step":"Cook the pasta following pack instructions. Fry the salmon for 4-6 mins with the tomatoes in their oil. Flake the fish in the pan, then add the drained pasta and the spinach. Stir for 1-2 mins until the spinach is wilted and everything is coated."}]',
        2);

-- Niv personal 3
INSERT INTO [dbo].[personal_recipe] ([user_id], [image], [title], [ready_in_minutes], [popularity], [vegetarian], [gluten_free], [ingredients_json_array], [instructions_json_array], [meals])
VALUES (
        '51f2a120-a59f-11ea-b43b-2b8d71f22f9e',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591258255/1_dxyd5y.png',
        'Crispy Greek-style pie',
        40,
        0,
        1,
        0,
        '[{"name":"bag spinach leaves","amount":200,"unit":"gram"},{"name":"jar sundried tomato in oil","amount":175,"unit":"gram"},{"name":"crumbled feta chhese","amount":100,"unit":"gram"},{"name":"egg","amount":2,"unit":""},{"name":"filo pastry","amount":125,"unit":"gram"}]',
        '[{"number":1,"step":"Put the spinach into a large pan. Pour over a couple tbsp water, then cook until just wilted. Tip into a sieve, leave to cool a little, then squeeze out any excess water and roughly chop. Roughly chop the tomatoes and put into a bowl along with the spinach, feta and eggs. Mix well."},{"number":2,"step":"Carefully unroll the filo pastry. Cover with some damp sheets of kitchen paper to stop it drying out. Take a sheet of pastry and brush liberally with some of the sundried tomato oil. Drape oil-side down in a 22cm loosebottomed cake tin so that some of the pastry hangs over the side. Brush oil on another piece of pastry and place in the tin, just a little further round. Keep placing the pastry pieces in the tin until you have roughly three layers, then spoon over the filling. Pull the sides into the middle, scrunch up and make sure the filling is covered. Brush with a little more oil."},{"number":3,"step":"Heat oven to 180C/fan 160C/gas 4. Cook the pie for 30 mins until the pastry is crisp and golden brown. Remove from the cake tin, slice into wedges and serve with salad."}]',
        4);

-- Ron personal 1
INSERT INTO [dbo].[personal_recipe] ([user_id], [image], [title], [ready_in_minutes], [popularity], [vegetarian], [gluten_free], [ingredients_json_array], [instructions_json_array], [meals])
VALUES (
        '5b0bbb20-a59f-11ea-b43b-2b8d71f22f9e',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591258327/1_d4nrl0.png',
        'Smoked salmon & pea frittata',
        50,
        0,
        0,
        0,
        '[{"name":"new potatos","amount":500,"unit":"gram"},{"name":"pack smoked salmon","amount":200,"unit":"gram"},{"name":"large egg","amount":8,"unit":""},{"name":"chopped dill","amount":2,"unit":"tbsp"},{"name":"frozed petits pois","amount":100,"unit":"gram"}]',
        '[{"number":1,"step":"Thickly slice the potatoes and cook in a pan of boiling salted water until just tender, about 10 minutes. Drain well and leave to cool slightly."},{"number":2,"step":"Cut the salmon into wide strips. Crack the eggs into a bowl, beat with a fork until lightly foamy, then stir in the smoked salmon, dill, peas and plenty of salt and pepper. Finally, stir in the potatoes."},{"number":3,"step":"Heat 3 tablespoons of olive oil in a large non-stick frying pan, carefully pour in the egg mixture and cook over a fairly low heat for 10-15 minutes, until the egg is starting to set just under the surface."},{"number":4,"step":"Put a plate that is slightly larger than the top of the pan on top and invert the frittata onto it. Slide it back into the pan and cook for a further 5 minutes to brown the underside. Slide on to a plate and leave to cool for 5 minutes before cutting into wedges. A tomato and chive salad tastes very fresh with this."}]',
        4);

-- Ron personal 2
INSERT INTO [dbo].[personal_recipe] ([user_id], [image], [title], [ready_in_minutes], [popularity], [vegetarian], [gluten_free], [ingredients_json_array], [instructions_json_array], [meals])
VALUES (
        '5b0bbb20-a59f-11ea-b43b-2b8d71f22f9e',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591258554/1_yjybuf.png',
        'Easy risotto with bacon & peas',
        45,
        0,
        0,
        0,
        '[{"name":"onion","amount":1,"unit":""},{"name":"olive oil","amount":2,"unit":"tbsp"},{"name":"butter","amount":2,"unit":"tbsp"},{"name":"chopped rachers steaky bacon","amount":6,"unit":""},{"name":"risotto rice","amount":300,"unit":"gram"},{"name":"hot vegetable","amount":250,"unit":"gram"},{"name":"frozen peas","amount":100,"unit":"gram"},{"name":"parmesan","amount":50,"unit":"gram"}]',
        '[{"number":1,"step":"Finely chop 1 onion. Heat 2 tbsp olive oil and a knob of butter in a pan, add the onions and fry until lightly browned (about 7 minutes)."},{"number":2,"step":"Add 6 chopped rashers streaky bacon and fry for a further 5 minutes, until it starts to crisp."},{"number":3,"step":"Add 300g risotto rice and 1l hot vegetable stock, and bring to the boil. Stir well, then reduce the heat and cook, covered, for 15-20 minutes until the rice is almost tender."},{"number":4,"step":"Stir in 100g frozen peas, add a little salt and pepper and cook for a further 3 minutes, until the peas are cooked."},{"number":5,"step":"Serve sprinkled with freshly grated parmesan and freshly ground black pepper."}]',
        4);

-- Ron personal 3
INSERT INTO [dbo].[personal_recipe] ([user_id], [image], [title], [ready_in_minutes], [popularity], [vegetarian], [gluten_free], [ingredients_json_array], [instructions_json_array], [meals])
VALUES (
        '5b0bbb20-a59f-11ea-b43b-2b8d71f22f9e',
        'https://res.cloudinary.com/dxeniml9z/image/upload/v1591258912/1_jbvzqa.png',
        'Asparagus cream pasta',
        40,
        0,
        1,
        0,
        '[{"name":"bunch asparagus","amount":1,"unit":""},{"name":"tub double cream","amount":142,"unit":"ml"},{"name":"peeled garlic cloves","amount":2,"unit":""},{"name":"parmesan","amount":50,"unit":"gram"},{"name":"tagliatelle","amount":250,"unit":"gram"}]',
        '[{"number":1,"step":"To prepare the asparagus, cut off and discard the woody ends, then neatly cut the tips away from the stalks. Keep the tips and stalks separate. In a small saucepan bring the cream and garlic to the boil. Take off the heat, remove the garlic, then set the pan aside."},{"number":2,"step":"Cook the stalks in boiling salted water for about 4-5 mins until tender, drain, then tip into the cream with the grated parmesan. Blitz with a hand blender until smooth."},{"number":3,"step":"Cook the pasta according to pack instructions, then throw in the tips 2 mins before the end of cooking time. Gently reheat the cream, drain pasta, then tip into a bowl with the cream. Toss, divide into pasta bowls, top with parmesan shavings and serve."}]',
        2);