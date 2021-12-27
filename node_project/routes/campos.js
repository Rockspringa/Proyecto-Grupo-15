const express = require("express");
const router = express.Router();
const resultadosService = require("../services/resultados");

router.get("/:idReporte/campos", async (req, res, next) => {
    const { idReporte } = req.params;

    try {
        res.json(await resultadosService.getCamposPorIdReporte(idReporte));
    } catch (err) {
        next(err);
    }
});

router.put("/:idReporte/campos", async (req, res, next) => {
    const { idReporte, examenes } = req.body;

    try {
        res.json(await resultadosService.updateResultadosDeSolicitud(idReporte, examenes));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
