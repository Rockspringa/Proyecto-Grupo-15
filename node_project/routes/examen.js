const express = require("express");
const router = express.Router();
const examenService = require("../services/examen");

// regresar todos los tipos de examenes
router.get("/examenes", async (req, res, next) => {
    try {
        res.json(await examenService.getExamenes());
    } catch (err) {
        next(err);
    }
});


// añadir un examen a la db
router.post("/examenes", async (req, res, next) => {
    try {
        res.json(await examenService.addExamen(req.body));
    } catch (err) {
        next(err);
    }
});

// regresar un tipo de examen
router.get("/examenes/:nombreExamen", async (req, res, next) => {
    try {
        res.json(await examenService.getExamen(req.params.nombreExamen));
    } catch (err) {
        next(err);
    }
});

// ruta para modificar un tipo de examen por su nombre
router.put("/examenes/:nombreExamen", async (req, res, next) => {
    try {
        res.json(await examenService.updateExamen(req.params.nombreExamen, req.body));
    } catch (err) {
        next(err);
    }
})

// ruta para eliminar un tipo de examen por su nombre
router.delete("/examenes/:nombreExamen", async (req, res, next) => {
    try {
        res.json(await examenService.deleteExamen(req.params.nombreExamen));
    } catch (err) {
        next(err);
    }
})

module.exports = router;
