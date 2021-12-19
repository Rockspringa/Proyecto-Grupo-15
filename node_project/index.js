"use strict";

// const Usuario = require("./model.js");
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8080;

const dirBase = `${__dirname}/views`;

// app.use(bodyParser.urlencoded({ extended: false })); // aun no se hace uso de json
// app.use(bodyParser.json());

app.use(express.static(dirBase));
app.use("./css", express.static(`${dirBase}/css`));
app.use("./js", express.static(`${dirBase}/js`));

// app.post("/users", (req, res) => {
//     // Actualizar funcion
// });

// app.post("/users/login", (req, res) => {
//     // Actualizar funcion
// });

app.listen(port, () =>
    console.log("> Server is up and running on port : " + port)
);
