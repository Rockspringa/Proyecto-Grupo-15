const mysql = require("mysql2/promise");
const config = require("../config");
const pool = mysql.createPool(config);

module.exports = {
    query: async (sql, params) => {
        const conn = await pool.getConnection();
        const [results] = await conn.query(sql, params);

        return results;
    },
    queries: async (...jsons) => {
        const conn = await pool.getConnection();
        await conn.query("START TRANSACTION");

        try {
            const resultados = jsons.map(async (json) => {
                const [results] = await conn.query(json.sql, json.params);
                return results;
            });

            await conn.query("COMMIT");
            return resultados;
        } catch (err) {
            await conn.query("ROLLBACK");
            throw err;
        }
    },
};
