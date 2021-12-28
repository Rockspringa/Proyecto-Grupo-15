const express = require("express");
const router = express.Router();
const empleadoService = require("../services/empleado");

// obtener lista de empleados
router.get("/empleado", async (req, res, next) => {
    try {
        res.json(await empleadoService.getEmpleados());
    } catch (err) {
        next(err);
    }
});

// obtener lista de empleados
router.get("/empleado/:usuario", async (req, res, next) => {
    const { usuario } = req.params;
    try {
        res.json(await empleadoService.getEmpleado(usuario));
    } catch (err) {
        next(err);
    }
});

// login
router.post("/empleado/login", async (req, res, next) => {
    try {
        const empleado = await empleadoService.login(
            req.body.usuario,
            req.body.contrasena
        );
        if (empleado.coinciden) {
            if (empleado.funcion == 1)
                res.status(301).json("/secretaria/registro-paciente.html");
            else if (empleado.funcion == 2)
                res.status(301).json("/laboratorista/ingresar-resultados.html");
            else res.status(301).json("/administrador/registro-empleados.html");
        } else {
            res.json(empleado.coinciden);
        }
    } catch (err) {
        next(err);
    }
});

// sign-up
router.post("/empleado", async (req, res, next) => {
    try {
        res.json(await empleadoService.addEmpleado(req.body));
    } catch (err) {
        if (err.message.includes("Duplicate"))
            res.send("El nombre de usuario ya existe, utilice otro.");
        else next(err);
    }
});

// modificar usuario
router.put("/empleado/:usuario", async (req, res, next) => {
    const { usuario } = req.params;

    try {
        res.json(await empleadoService.updateEmpleado(usuario, req.body));
    } catch (err) {
        if (err.message.includes("Duplicate"))
            res.send("El nombre de usuario ya existe, utilice otro.");
        else next(err);
    }
});

// eliminar usuario
router.delete("/empleado/:usuario", async (req, res, next) => {
    const { usuario } = req.params;

    try {
        res.json(await empleadoService.deleteEmpleado(usuario));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
