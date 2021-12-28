const reporteSelect = document.getElementById("reporte");
if (reporteSelect) {
    const body = {};

    document
        .getElementById("ingresar-resultado-btn")
        .addEventListener("click", async () => {
            try {
                const inputs = document.querySelectorAll("input:not(.btn)");
                for (let input of inputs) if (!input.value) return;

                const res = await fetch(
                    `/api/reportes/${body.idReporte}/campos`,
                    {
                        method: "PUT",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await res.json();
                alert(data);
                
                const inputs = document.querySelectorAll("input:not(.btn)");
                for (let input of inputs) input.value = "";
            } catch (err) {
                alert(err.message, err.status);
            }
        });

    reporteSelect.addEventListener("change", async () => {
        const examenesCol = document.getElementById("examenes");

        while (examenesCol.firstChild) {
            examenesCol.removeChild(examenesCol.firstChild);
        }

        body.idReporte = reporteSelect.value;
        body.examenes = [];

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
                let m = -1;

                for (let examen of examenes) {
                    const examTitle = document.createElement("h2");
                    examTitle.classList.add("title", "text-blue", "fit-top");
                    examTitle.textContent = examen.nombreExamen;
                    let n = -1;
                    m++;

                    const exam = {
                        nombreExamen: examen.nombreExamen,
                        campos: [],
                    };

                    examenesCol.appendChild(examTitle);

                    for (let campo of examen.campos) {
                        const dato = campo.nombreCampo;
                        const campoCell = document.createElement("div");
                        campoCell.classList.add("cell", "unidad");
                        n++;

                        exam.campos.push({ nombreCampo: dato });

                        campoCell.innerHTML = `
                            <input onchange="addValue(this)" type="text"
                             name="${`${m}-${n}`}" id="${`${m}-${n}`}">
                            <label for="${`${m}-${n}`}" class="required">Resultado de ${dato}</label>`;

                        if (campo.unidad)
                            campoCell.innerHTML += `
                                <div class="center-child text-blue bg-purple">
                                <span>${campo.unidad}</span></div>`;

                        examenesCol.appendChild(campoCell);
                    }

                    body.examenes.push(exam);
                }
            }
        } catch (err) {
            alert(err.message, err.status);
        }
    });

    fetchReports();

    function addValue(node) {
        const [m, n] = node.id.split("-");
        body.examenes[m].campos[n].resultados = node.value;
    }

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
