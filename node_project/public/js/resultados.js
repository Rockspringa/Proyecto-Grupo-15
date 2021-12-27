const reporteSelect = document.getElementById("reporte");
if (reporteSelect) {
    document.getElementById("ingresar-resultado-btn").addEventListener("click", async () => {
        if (document.querySelectorAll("input").every((input) => input.value)) {
            const res = await fetch("/api")
        }
    })

    reporteSelect.addEventListener("change", async () => {
        const examenesCol = document.getElementById("examenes");

        try {
            const res = await fetch(
                `/api/reportes/${reporteSelect.value}/campos`
            );
            const campos = await res.json();

            if (!campos || !campos.length) {
                alert(
                    "No hay ningun examen agregado a la solicitud del reporte."
                );
            } else {
                const examenes = formatExams(campos);

                for (let examen of examenes) {
                    const examTitle = document.createElement("h2");
                    examTitle.classList.add("title", "text-blue", "fit-top");
                    examTitle.textContent = examen.nombreExamen;

                    examenesCol.appendChild(examTitle);

                    for (let campo of examen.campos) {
                        const dato = campo.nombreCampo;
                        const campoCell = document.createElement("div");
                        campoCell.classList.add("cell", "unidad");

                        campoCell.innerHTML = `
                            <input type="text" name="${dato}" id="${dato}">
                            <label for="${dato}" class="req">Resultado de ${dato}</label>`;

                        if (campo.unidad)
                            campoCell.innerHTML += `
                                <div class="center-child text-blue bg-purple">
                                <span>${campo.unidad}</span></div>`;

                        examenesCol.appendChild(campoCell);
                    }
                }
            }
        } catch (err) {
            alert(err.message, err.status);
        }
    });

    fetchReports();

    async function fetchReports() {
        try {
            const res = await fetch("/api/reportes?estado=1");
            const reportes = await res.json();

            if (!reportes || !reportes.length) {
                alert(
                    "No hay ninguna solicitud de examenes pendiente, intente mas tarde."
                );
            }

            for (let reporte of reportes) {
                const opt = document.createElement("option");

                opt.value = reporte.idReporte;
                opt.textContent = `Reporte No.${reporte.idReporte}`;

                reporteSelect.appendChild(opt);
            }
        } catch (err) {
            alert(err.message, err.status);
        }
    }

    function formatExams(campos) {
        const examenes = [];
        for (let campo of campos) {
            if (
                examenes.some(
                    (examen) => examen.nombreExamen === campo.nombreExamen
                )
            ) {
                const index = examenes.findIndex(
                    (examen) => examen.nombreExamen === campo.nombreExamen
                );

                examenes[index].campos.push({
                    nombreCampo: campo.nombreCampo,
                    resultados: null,
                    unidad: campo.unidad,
                });
            } else {
                examenes.push({
                    nombreExamen: campo.nombreExamen,
                    campos: [
                        {
                            nombreCampo: campo.nombreCampo,
                            resultados: null,
                            unidad: campo.unidad,
                        },
                    ],
                });
            }
        }

        return examenes;
    }
}
