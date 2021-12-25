const db = require("./db");

module.exports = {
    getExamenes: async () => {
        const query = "SELECT nombreExamen, precioConjunto FROM EXAMEN";

        const rows = await db.query(query);

        return { data: rows || [] };
    },
};
