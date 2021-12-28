const rojoPalido = "#dc7c7c";
const blue = "#104080";

function doShake(input, label) {
    if (!input.value) {
        if (label.classList.contains("required")) {
            label.style.color = rojoPalido;

            input.classList.add("rotate");
        }
    }
}

document.querySelectorAll(".col .cell, .double-col .cell").forEach((row) => {
    const input = row.children[0];
    const label = row.children[1];

    if (!input) return;

    input.addEventListener("blur", () => {
        if (input.value) {
            if (label.classList.contains("required")) {
                label.style.color = blue;

                input.classList.remove("rotate");
            }
        } else {
            doShake(input, label);
        }
    });
});


// funcion para la pagina de registro
btn = document.getElementById("ingresar-paciente-btn");
if (btn) {
    document.getElementById("ref-bool").addEventListener("change", (event) => {
        let input = document.getElementById("referido");
        let label = document.querySelector("#referido + label");

        if (event.target.checked) {
            input.required = true;
            input.disabled = false;
            label.classList.add("required");
        } else {
            input.required = false;
            input.disabled = true;
            label.classList.remove("required");
            label.style.color = "dimgray";
        }
    });
}

let addBtn = document.querySelector("#add-btn .btn");
if (addBtn) {
    document.getElementById("cui").addEventListener("change", () => {
        // verificar existencia del CUI
        document.querySelectorAll(".deshidden").forEach((element) => {
            element.classList.remove("s-none");
            element.classList.remove("hidden");
            element.classList.remove("deshidden");
        });
    });

    const hrElement = document.createElement("hr");
    let noExamen = 2;

    hrElement.classList.add("mitad");

    addBtn.addEventListener("click", () => {
        let newExam = document.createElement("div");
        let newPrice = document.createElement("div");
        let last = document.getElementById("last");

        newExam.classList.add("cell");
        newExam.innerHTML = `
            <select name="examen-${noExamen}" id="examen-${noExamen}">
                <option value="" disabled selected>Escoja un tipo de examen</option>
                <option value="sangre">Hematologia</option>
                <option value="heces">Coprocultivo</option>
                <option value="microbio">Microbiologia</option>
            </select>
            <label for="examen-${noExamen}" class="required">Tipo de examen</label>
        `;

        newPrice.id = "last";
        newPrice.classList.add("col", "fill");
        newPrice.innerHTML = `
            <p class="bg-purple pill">
                Fecha de entrega:
                <span id="entrega-examen-${noExamen}">21/12/2021 12:00</span>
            </p>
            <p class="bg-purple pill">
                Codigo de muestra:
                <span id="codigo-examen-1">Q7F3CO0</span>
            </p>
            <p class="bg-purple pill">
                Precio:
                <span id="precio-examen-${noExamen}">Q0.00</span>
            </p>
        `;

        last.id = "";
        last.parentElement.insertBefore(newPrice, last.nextElementSibling);
        last.parentElement.insertBefore(newExam, last.nextElementSibling);
        last.parentElement.insertBefore(
            hrElement.cloneNode(),
            last.nextElementSibling
        );
        noExamen++;
    });
}
