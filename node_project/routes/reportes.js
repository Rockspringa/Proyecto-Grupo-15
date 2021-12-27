const express = require("express");
const router = express.Router();
const campos = require("./campos");
const resultadosService = require("../services/resultados");

router.use("/reportes", campos);

router.get("/reportes", async (req, res, next) => {
    const { estado } = req.query;

    try {
        if (estado && 0 < estado && estado < 4) {
            res.json(await resultadosService.getResultadosPorEstado(estado));
        } else {
            const err = new Error(
                "No se recibio un valor de estado o no cumple el rango."
            );
            err.status = 400;

            throw err;
        }
    } catch (err) {
        next(err);
    }
});

router.get("/reportes/:idReporte", async (req, res, next) => {
    const { idReporte } = req.params;

    try {
        const data = await resultadosService.getResultadoPorId(idReporte);

        if (data && data.hasOwnProperty()) {
            res.json(data);
        } else {
            const err = new Error(
                `No se encontro el reporte ${idReporte || ""}`
            );
            err.status = 404;
            next(err);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
