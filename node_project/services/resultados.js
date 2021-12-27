const db = require("./db");

module.exports = {
    getResultadosPorEstado: async (estado) => {
        const query =
            "SELECT idReporte, idPaciente, nit, fechaEmision, idTurnoEmpleado," +
            " estado, idMedico, fechaEntregado FROM Reporte WHERE estado = ?";

        const reportes = await db.query(query, [estado]);

        return reportes || [];
    },
    getCamposPorIdReporte: async (idReporte) => {
        const query =
            "SELECT rc.idReporte, rc.nombreExamen, rc.nombreCampo, rc.precio, rc.resultados," +
            " ce.unidad FROM Resultado_Campo rc JOIN Campo_Examen ce ON ce.nombreCampo =" +
            " rc.nombreCampo WHERE idReporte = ?";

        const campos = await db.query(query, [idReporte]);

        return campos || [];
    },
};
