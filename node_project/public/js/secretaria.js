const solicitarBtn = document.getElementById("solicitar-btn");
if (solicitarBtn) {
    solicitarBtn.addEventListener("click", async () => {
        const cui = document.getElementById("cui").value;
        const examen = document.getElementById("examen").value;

        if (!cuiInput || !examenInput)
            return alert("Debe de llenar todos los campos.");

        try {
            const res = await fetch("/api/solicitud", {
                method: "POST",
                body: JSON.stringify({
                    cui,
                    examen
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            const data = await res.json();
    
            if (data) {
                alert("La solicitud fue ingresada al sistema.");
            } else {
                alert("La solicitud no se pudo ingresar al sistema.");
            }
        } catch (err) {
            alert(err.message, err.status);
        }
    })
}