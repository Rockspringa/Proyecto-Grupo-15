const db = require("./db");

module.exports = {
    addMedico: async (medico) => {
        const query = "INSERT INTO Medico SET ?";
        const result = await db.query(query, [medico]);

        return (result.affectedRows);
    }
}