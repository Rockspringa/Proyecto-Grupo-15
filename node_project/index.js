"use strict";

const Usuario = require("./model.js");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8080;

const dirBase = `${__dirname}/views`;
const userList = []; // temporal - cambiar por base de datos

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(dirBase));
app.use("./css", express.static(`${dirBase}/css`));
app.use("./js", express.static(`${dirBase}/js`));

app.post("/users", (req, res) => {
    let { nombre, correo, contraseña } = req.body;

    let exists = userList.find(
        (user) => user.nombre === nombre && user.contraseña === contraseña
    );
    if (!exists) {
        userList.push(new Usuario(nombre, correo, contraseña));
        res.status(200).send({ usuario: nombre, estado: "registrado" });
    } else {
        res.status(400).send("El usuario ya esta registrado.");
    }
});

app.post("/users/login", (req, res) => {
    let { nombre, contraseña } = req.body;
    console.log(userList);
    let exists = userList.find(
        (user) => user.nombre === nombre && user.contraseña === contraseña
    );
    res.send(exists !== undefined);
});

app.listen(port, () =>
    console.log("> Server is up and running on port : " + port)
);
