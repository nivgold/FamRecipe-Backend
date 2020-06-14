const express = require("express");
const bcrypt = require("bcryptjs");
const db_requests = require("./utils/DB_requests");
const { v1: uuidv1 } = require("uuid");
const router = express.Router();

// register route
router.post("/register", async function (req, res) {
    // getting the user data for the registeration phase
    let user_data = req.body;
    let {username, password, first_name, last_name, country, email, image} = user_data;


    let user = await db_requests.getUserByUsername(username);
    // check username existance in the DB
    if (user){
        // username already register in the system
        res.status(422).send("User is already registered");
    }
    else{
        // creating some random user id for the new registerd user
        const id = uuidv1();
        // adding the user to the DB
        let hash_password = bcrypt.hashSync(password, 14);
        req.body.password = hash_password;
        db_requests.addUser(id, username, hash_password, first_name, last_name, country, email, image)
        res.status(201).send("A new user has been successfully added");
    }
});

// login route
router.post("/login", async function (req, res) {
    // getting the user data for the login phase
    let user_data = req.body;
    let {username, password} = user_data;

    let user = await db_requests.getUserByUsername(username);

    // check if the username exists in the DB and if the given password is correct
    if (user && bcrypt.compareSync(password, user.password)){
        // the username and the password match with exist user in the DB - Authentication successfully
        // TODO - retrieve cookie
        req.session.id = user.user_id;
        res.status(200).send("User authenticated successfully");
    }
    else{
        res.status(401).send("Authentication failed");
    }
});

// logout route
router.get("/logout", function (req, res) {
    // checking that the user has a session
    if (req.session && req.session.id) {
        // reset the session
        req.session.reset();
        // sending OK status for sucessfull logout
        res.status(200).send("Successfull logout");
        // redirect to home page (?)
    }
    else{
        res.status(406).send("Logout not accepted")
    }
});

module.exports = router;