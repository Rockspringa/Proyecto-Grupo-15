const express = require("express");
const router = express.Router();
const solicitudService = require("../services/solicitud");

// routes.get('/', );

// ingresar una nueva solicitud de examenes
router.post("/solicitud", async (req, res, next) => {
    try {
        res.json(await solicitudService.addSolicitudExamen(req.body));
    } catch (err) {
        next(err);
    }
});

// routes.put('/', );

// routes.delete('/', );

module.exports = router;
