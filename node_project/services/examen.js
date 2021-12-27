const db = require("./db");

module.exports = {
    getExamen: async (nombreExamen) => {
        const query =
            "SELECT nombreExamen, precioConjunto FROM Examen WHERE nombreExamen = ?";
        const examen = await db.query(query, [nombreExamen]);

        return examen[0] || {};
    },
    getExamenes: async () => {
        const query = "SELECT nombreExamen, precioConjunto FROM Examen";
        const examenes = await db.query(query);

        return examenes || [];
    },
    addExamen: async (data) => {
        const query = "INSERT INTO Examen SET ?";
        const result = await db.query(query, [data]);

        return result.affectedRows
            ? "Examen agregado exitosamente."
            : "Error al agregar el examen.";
    },
    updateExamen: async (nombreExamen, data) => {
        const query = "UPDATE Examen SET ? WHERE nombreExamen = ?";
        const result = await db.query(query, [data, nombreExamen]);

        return result.affectedRows
            ? "Examen actualizado exitosamente."
            : "Error actualizando el examen.";
    },
    deleteExamen: async (nombreExamen) => {
        const query = "DELETE FROM Examen WHERE ?";
        const result = await db.query(query, [nombreExamen]);

        return result.affectedRows
            ? `El examnen ${nombreExamen} fue eliminado con exito.`
            : `El examen no existe o se resiste a ser eliminado.`;
    },
};
