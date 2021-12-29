const express = require("express");
const router = express.Router();
const medicoService = require("../services/medico");

// ruta para agregar un nuevo medico
router.post("/medico", async (req, res, next) => {
    try {
        res.send(await medicoService.addMedico(req.body));
    } catch (err) {
        next(err);
    }
})

// importante exportarlo xd
module.exports = router;