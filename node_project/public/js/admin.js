const navbarBtn = document.querySelector("nav#admin > div");
const navbar = document.querySelector("nav#admin");
if (navbarBtn) {
    let apachado = true;
    let tamaño = 40;

    navbarBtn.addEventListener("click", () => {
        if (apachado) {
            const interval = setInterval(() => {
                tamaño += 5;
                navbar.style.height = `${tamaño}px`;
                if (tamaño % 40 == 0)
                    navbar.children[tamaño / 40 - 1].style.display = "grid";
                if (tamaño == 200) {
                    clearInterval(interval);
                    apachado = false
                }
            })
        } else {
            const interval = setInterval(() => {
                tamaño -= 5;
                navbar.style.height = `${tamaño}px`;
                if (tamaño % 40 == 0 && tamaño)
                navbar.children[tamaño / 40].style.display = "none";
                if (tamaño == 40) {
                    clearInterval(interval);
                    apachado = true
                }
            })
        }
    })
}

const registrarEmpleado = document.getElementById("registrar-empleado-btn");
if (registrarEmpleado) {
    registrarEmpleado.addEventListener("click", () => {
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
        fetchEmpleados("POST", body);
    });
}

const modificarEmpleado = document.getElementById("modificar-empleado-btn");
if (modificarEmpleado) {
    const selectUsuario = document.getElementById("usuario");
    const cuiInput = document.getElementById("cui");
    const funcionInput = document.getElementById("funcion");
    const usuarioInput = document.getElementById("usuario");
    const nombreInput = document.getElementById("nombre");
    const fechaInput = document.getElementById("fecha");
    const telefonoInput = document.getElementById("telefono");

    getEmpleados();

    selectUsuario.addEventListener("change", async () => {
        try {
            const res = await fetch(`/api/empleado/${selectUsuario.value}`);
            const empleado = await res.json();

            cuiInput.value = empleado.cui;
            funcionInput.value = empleado.funcion;
            usuarioInput.value = empleado.usuario;
            nombreInput.value = empleado.nombreEmpleado;
            fechaInput.value = empleado.fechaNacimiento;
            telefonoInput.value = empleado.telefonoEmpleado || "";

            cuiInput.disabled = false;
            funcionInput.disabled = false;
            usuarioInput.disabled = false;
            nombreInput.disabled = false;
            fechaInput.disabled = false;
            telefonoInput.disabled = false;
        } catch (err) {
            alert(err.message, err.status);
        }
    });

    modificarEmpleado.addEventListener("click", () => {
        const contrasena = document.getElementById("contraseña").value;
        const repeat = document.getElementById("repeat").value;

        if (contrasena && contrasena !== repeat)
            return alert("Las contraseñas no coinciden.");

        const cui = cuiInput.value;
        const funcion = funcionInput.value;
        const usuario = usuarioInput.value;
        const nombreEmpleado = nombreInput.value;
        const fechaNacimiento = fechaInput.value;
        const telefonoEmpleado = telefonoInput.value;

        if (!cui || !funcion || !usuario || !nombreEmpleado || !fechaNacimiento)
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
        fetchEmpleados("PUT", body, `/${selectUsuario.value}`);
    });

    async function fetchEmpleados(method, body, uri = "") {
        try {
            const res = await fetch(`/api/empleado${uri}`, {
                method: method,
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
    }

    async function getEmpleados() {
        const res = await fetch("/api/empleado");
        const empleados = await res.json();

        for (let empleado of empleados) {
            const opt = document.createElement("option");
            opt.value = empleado.usuario;
            opt.textContent = empleado.usuario;

            selectUsuario.appendChild(opt);
        }
    }
}

const eliminarEmpleado = document.getElementById("eliminar-empleado-btn");
if (eliminarEmpleado) {
    const selectUsuario = document.getElementById("usuario");

    getEmpleados();

    eliminarEmpleado.addEventListener("click", async () => {
        try {
            const res = await fetch(`/api/empleado/${selectUsuario.value}`, {
                method: "DELETE",
            });

            alert(await res.text());
        } catch (err) {
            alert(err.message, err.status);
        }
    });

    async function getEmpleados() {
        const res = await fetch("/api/empleado");
        const empleados = await res.json();

        for (let empleado of empleados) {
            const opt = document.createElement("option");
            opt.value = empleado.usuario;
            opt.textContent = empleado.usuario;

            selectUsuario.appendChild(opt);
        }
    }
}
