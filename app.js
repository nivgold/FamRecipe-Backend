const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const session = require("client-sessions");

// ---------App Configurations------------

// routers
const auth_route = require("./routes/auth");
const users_route = require("./routes/users");
const recipes_route = require("./routes/recipes");

const app = express();
const port = process.env.PORT || 8080;

// letting all origins
app.use(cors());

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// logger middleware
app.use(morgan('dev'));

// ---------App Configurations------------

// settings coockie middleware
app.use(
    session({
        cookieName: "session",
        secret: process.env.COOKIE_SECRET,
        duration: 10 * 60 * 1000,
        activeDuration: 0,
		cookie: {
			httpOnly: false
		}
    })
);

// -----------ROUTES------------------

// users route
app.use("/users", users_route);

// recipes route
app.use("/recipes", recipes_route);

// auth route
app.use(auth_route);

// -----------ROUTES------------------


// default route
app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log("Listening on port: "+port);
});