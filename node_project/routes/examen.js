const express = require("express");
const router = express.Router();
const examenService = require("../services/examen");

// routes.get('/', );

// regresar todos los tipos de examenes
router.get('/examenes', async (req, res, next) => {
    try {
        res.json(await examenService.getExamenes());
    } catch (err) {
        next(err);
    }
});

// routes.put('/', );

// routes.delete('/', );


module.exports = router;