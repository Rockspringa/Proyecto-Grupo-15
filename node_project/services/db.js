const mysql = require("mysql2/promise");
const config = require("../config");
const pool = mysql.createPool(config.db);

module.exports = {
    query: async (sql, params) => {
        const conn = await pool.getConnection();
        const [results] = await conn.query(sql, params);

        return results;
    },
    queries: async (...jsons) => {
        const conn = await pool.getConnection();
        await conn.query("START TRANSACTION");
        if (Array.isArray(jsons[0])) jsons = jsons[0];

        try {
            const data = await Promise.all(
                jsons.map(async (json) => {
                    const [results] = await conn.query(json.sql, json.params);
                    return results;
                })
            );

            await conn.query("COMMIT");
            return data;
        } catch (err) {
            await conn.query("ROLLBACK");
            throw err;
        }
    },
};
