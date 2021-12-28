const registrarEmpleado = document.getElementById("registrar-empleado-btn");
if (registrarEmpleado) {
    registrarEmpleado.addEventListener("click", async () => {
        const contrasena = document.getElementById("contraseña").value;
        const repeat = document.getElementById("repeat").value;

        if (contrasena !== repeat)
            return alert("Las contraseñas no coinciden.");

        const cui = document.getElementById("cui").value;
        const funcion = document.getElementById("funcion").value;
        const usuario = document.getElementById("usuario").value;
        const nombreEmpleado = document.getElementById("nombre").value;
        const fechaNacimiento = document.getElementById("fecha").value;
        const telefonoEmpleado = document.getElementById("telefono").value;

        if (
            !cui ||
            !funcion ||
            !contrasena ||
            !usuario ||
            !nombreEmpleado ||
            !fechaNacimiento
        )
            return alert("Llene todos los campos obligatorios.");

        const body = {
            usuario,
            contrasena,
            funcion,
            nombreEmpleado,
            fechaNacimiento,
            cui,
        };

        if (telefonoEmpleado) body.telefonoEmpleado = telefonoEmpleado;

        try {
            const res = await fetch("/api/empleado", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            alert(await res.text());

            const inputs = document.querySelectorAll("input:not(.btn)");
            for (let input of inputs) input.value = "";
        } catch (err) {
            alert(err.message, err.status);
        }
    });
}

const modificarEmpleado = document.getElementById("modificar-empleado-btn");
if (modificarEmpleado) {
    modificarEmpleado.addEventListener("click", async () => {
        const contrasena = document.getElementById("contraseña").value;
        const repeat = document.getElementById("repeat").value;

        if (!contrasena || contrasena !== repeat)
            return alert("Llene todos los campos obligatorios.");

        const cui = document.getElementById("cui").value;
        const funcion = document.getElementById("funcion").value;
        const usuario = document.getElementById("usuario").value;
        const nombreEmpleado = document.getElementById("nombre").value;
        const fechaNacimiento = document.getElementById("fecha").value;
        const telefonoEmpleado = document.getElementById("telefono").value;

        if (
            !cui ||
            !funcion ||
            !usuario ||
            !nombreEmpleado ||
            !fechaNacimiento
        )
            return alert("Llene todos los campos obligatorios.");

        const body = {
            usuario,
            contrasena,
            funcion,
            nombreEmpleado,
            fechaNacimiento,
            cui,
        };

        if (telefonoEmpleado) body.telefonoEmpleado = telefonoEmpleado;

        try {
            const res = await fetch("/api/empleado", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            alert(await res.text());

            const inputs = document.querySelectorAll("input:not(.btn)");
            for (let input of inputs) input.value = "";
        } catch (err) {
            alert(err.message, err.status);
        }
    });
}
