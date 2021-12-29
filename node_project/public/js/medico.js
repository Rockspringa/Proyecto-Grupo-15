const medicoBtn = document.getElementById("medico-btn");
if (medicoBtn) {
    medicoBtn.addEventListener("click", async () => {
        const colegiado = document.getElementById("colegiado").value;
        const nombreMedico = document.getElementById("nombre").value;
        const direccion = document.getElementById("direccion").value;

        if (!colegiado || !nombre)
            return alert("Llene todos los campos correspondientes.");

        const medico = {
            colegiado,
            nombreMedico,
        };

        if (direccion) medico.direccion = direccion;

        try {
            const res = await fetch("/api/medico", {
                method: "POST",
                body: JSON.stringify(medico),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (data) {
                alert("Se agrego el medico con exito.");
            } else {
                alert("No se pudo agregar al medico, vuelva a intentarlo.");
            }
        } catch (err) {
            alert(err.message, err.status);
        }
    });
}
