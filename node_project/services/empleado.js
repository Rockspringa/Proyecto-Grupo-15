const bcrypt = require("bcryptjs");
const moment = require("moment");
const db = require("./db");

const saltTimes = 10;

module.exports = {
    getEmpleados: async () => {
        const query =
            "SELECT usuario, funcion, nombreEmpleado, fechaNacimiento, cui, " +
            "telefonoEmpleado FROM Empleado WHERE contrasena != 'no encriptado'";

        const empleados = await db.query(query);

        for (let empleado of empleados)
            empleado.fechaNacimiento = moment(empleado.fechaNacimiento).format(
                "YYYY-MM-DD"
            );

        return empleados || [];
    },
    getEmpleado: async (usuario) => {
        const query =
            "SELECT usuario, funcion, nombreEmpleado, fechaNacimiento," +
            " cui, telefonoEmpleado FROM Empleado WHERE usuario = ?";

        const empleado = await db.query(query, [usuario]);
        empleado[0].fechaNacimiento = moment(
            empleado[0].fechaNacimiento
        ).format("YYYY-MM-DD");

        return empleado[0] || {};
    },
    login: async (usuario, contrasena) => {
        const query = "SELECT contrasena FROM Empleado WHERE usuario = ?";
        const user = await db.query(query, [usuario]);
        const coinciden = await bcrypt.compare(contrasena, user[0].contrasena);

        return coinciden;
    },
    addEmpleado: async (empleado) => {
        const query = "INSERT INTO Empleado SET ?";

        empleado.contrasena = await bcrypt.hash(empleado.contrasena, saltTimes);

        const results = await db.query(query, [empleado]);

        return results.affectedRows
            ? "El empleado se registro con exito."
            : "No se pudo ingresar al empleado.";
    },
    updateEmpleado: async (usuario, empleado) => {
        const query = "UPDATE Empleado SET ? WHERE usuario = ?";

        if (empleado.contrasena)
            empleado.contrasena = await bcrypt.hash(
                empleado.contrasena,
                saltTimes
            );

        const results = await db.query(query, [empleado, usuario]);

        return results.affectedRows
            ? "El empleado se actualizo con exito."
            : "No se pudo actualizar al empleado.";
    },
    deleteEmpleado: async (usuario) => {
        const query =
            "UPDATE Empleado SET contrasena = 'no encriptado' WHERE usuario = ?";

        const results = await db.query(query, [usuario]);

        return results.affectedRows
            ? "El empleado ya no tiene acceso al sistema."
            : "El empleado se resiste a irse de la empresa.";
    },
};
