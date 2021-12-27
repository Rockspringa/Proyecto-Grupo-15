const db = require("./db");

module.exports = {
    getResultadosPorEstado: async (estado) => {
        const query =
            "SELECT idReporte, idPaciente, nit, fechaEmision, idTurnoEmpleado," +
            " estado, idMedico, fechaEntregado FROM Reporte WHERE estado = ?";

        const reportes = await db.query(query, [estado]);

        return reportes || [];
    },
    getResultadoPorIdReporte: async (idReporte) => {
        const query =
            "SELECT idReporte, idPaciente, nit, fechaEmision, idTurnoEmpleado," +
            " estado, idMedico, fechaEntregado FROM Reporte WHERE idReporte = ?";

        const reporte = await db.query(query, [idReporte]);

        return reporte || {};
    },
    getCamposPorIdReporte: async (idReporte) => {
        const query =
            "SELECT rc.idReporte, rc.nombreExamen, rc.nombreCampo, rc.precio, rc.resultados," +
            " ce.unidad FROM Resultado_Campo rc JOIN Campo_Examen ce ON ce.nombreCampo =" +
            " rc.nombreCampo AND ce.nombreExamen = rc.nombreExamen WHERE idReporte = ?";

        const campos = await db.query(query, [idReporte]);

        return campos || [];
    },
    updateResultadosDeSolicitud: async (idReporte, examenes) => {
        const jsons = [];
        const sql =
            "UPDATE Resultado_Campo SET resultados = ? WHERE idReporte = ? AND nombreCampo = ?";

        for (let examen of examenes) {
            for (let campo of examen.campos) {
                jsons.push({
                    sql,
                    params: [
                        campo.resultados,
                        parseInt(idReporte),
                        campo.nombreCampo,
                    ],
                });
            }
        }
        jsons.push({
            sql: "UPDATE Reporte SET estado = 2 WHERE idReporte = ?",
            params: [idReporte],
        });

        const results = await db.queries(jsons);
        if (results.every((result) => result.affectedRows))
            return "Se actualizaron los resultados del reporte.";
        return "Puede que no se hayan actualizado todos los resultados.";
    },
};
