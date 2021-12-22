"use strict";

// const Usuario = require("model");
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.port || 8080;

// app.use(bodyParser.urlencoded({ extended: false })); // aun no se hace uso de json
// app.use(bodyParser.json());

app.use(express.static(`${__dirname}/views`));
app.use(express.static(`${__dirname}/public`));
// app.post("/users", (req, res) => {
//     // Actualizar funcion
// });

// app.post("/users/login", (req, res) => {
//     // Actualizar funcion
// });

app.listen(port, () =>
    console.log("> Server is up and running on port : " + port)
);
