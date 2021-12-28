const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        const empleado = {
            usuario: document.getElementById("usuario").value,
            contrasena: document.getElementById("contrasena").value,
        };

        if (!empleado.usuario || !empleado.contrasena)
            return alert("Llene todos los campos.");

        try {
            const res = await fetch("/api/empleado/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(empleado),
            });

            const getted = await res.json();
            if (getted) {
                window.location.replace(getted);
            } else {
                alert(
                    "El usuario o la contraseña no coinciden, intentelo de nuevo."
                );
            }
        } catch (err) {
            alert(err.message, err.status);
        }
    });
}
