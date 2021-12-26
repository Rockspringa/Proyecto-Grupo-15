const moment = require("moment");
const db = require("./db");

// const

module.exports = {
    addSolicitudExamen: async (solicitud) => {
        let reporte = {
            nit: solicitud.nit,
            estado: 1,
            idPaciente: parseInt(solicitud.idPaciente),
            fechaEmision: moment().format("YYYY-MM-DD HH:mm:ss"),
            idTurnoEmpleado: parseInt(solicitud.idTurnoEmpleado),
        };
        if (solicitud.idMedico) reporte.idMedico = solicitud.idMedico;

        const result = await db.query("INSERT INTO Reporte SET ?", [reporte]);
        if (!result.affectedRows)
            throw new Error("No se pudo crear el reporte.");

        let jsons = [];

        for (let examen of solicitud.examenes) {
            for (let nombreCampo of examen.campos) {
                const precios = await db.query(
                    "SELECT precio FROM Campo_Examen WHERE nombreCampo = ? AND nombreExamen = ?",
                    [nombreCampo, examen.nombreExamen]
                );
                const idReportes = await db.query(
                    "SELECT idReporte FROM Reporte WHERE fechaEmision = ?",
                    [reporte.fechaEmision]
                );

                jsons.push({
                    sql: "INSERT INTO Resultado_Campo SET ?",
                    params: {
                        idReporte: idReportes[0].idReporte,
                        nombreExamen: examen.nombreExamen,
                        nombreCampo,
                        precio: precios[0].precio,
                    },
                });
            }
        }

        try {
            const results = await db.queries(jsons);
            if (results.every((result) => result.affectedRows))
                return "Se creo correctamente el paquete de resultados";
            return "No se pudo ingresar la orden completa de resultados.";
        } catch (err) {
            await db.query("DELETE FROM Reporte WHERE fechaEmision = ?", [
                reporte.fechaEmision,
            ]);
            throw err;
        }
    },
};
