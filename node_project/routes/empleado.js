const express = require("express");
const router = express.Router();
const empleadoService = require("../services/empleado");

// login
router.post("/empleado/login", async (req, res, next) => {
    try {
        res.json(await empleadoService.login(req.body.usuario, req.body.contrasena));
    } catch (err) {
        next(err);
    }
});


// sign-up
router.post("/empleado", async (req, res, next) => {
    try {
        res.json(await empleadoService.signUp(req.body));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
