const bcrypt = require("bcryptjs");
const db = require("./db");

const saltTimes = 10;

module.exports = {
    login: async (usuario, contrasena) => {
        const query = "SELECT contrasena FROM Empleado WHERE usuario = ?";
        const user = await db.query(query, [usuario]);
        const coinciden = await bcrypt.compare(contrasena, user[0].contrasena);

        return coinciden;
    },
    signUp: async (empleado) => {
        const query = "INSERT INTO Empleado SET ?";

        empleado.contrasena = await bcrypt.hash(empleado.contrasena, saltTimes);

        const results = await db.query(query, [empleado]);

        return results.affectedRows
            ? "El empleado se registro con exito."
            : "No se pudo ingresar al empleado.";
    },
};
