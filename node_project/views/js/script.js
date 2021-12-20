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
let btn = document.getElementById("sign-up-btn");
if (btn) {
    console.log([
        "No debe de existir el usuario que se creara.",
        "El administrador debe de haberse identificado con anterioridad",
    ]);
}

btn = document.getElementById("solicitar-btn");
if (btn) {
    console.log([
        "La secretaria debe de estar identificada.",
        "El usuario debe de haberse registrado con anterioridad.",
        "El paciente ya tiene sus muestras",
    ]);
}

btn = document.getElementById("ingresar-resultado-btn");
if (btn) {
    console.log([
        "La laboratorista debe de estar identificado.",
        "Ya se debe de tener el archivo de los resultados de la muestra.",
    ]);

    let fileInput = document.getElementById("resultado");

    document
        .getElementById("redirect-resultado")
        .addEventListener("click", () => {
            fileInput.click();
        });
}

// funcion para la pagina de registro
btn = document.getElementById("descargar-reportes-btn");
if (btn) {
    console.log(["El administrador debe de estar identificado."]);
}

// funcion para la pagina de registro
btn = document.getElementById("ingresar-paciente-btn");
if (btn) {
    console.log([
        "La secretaria debe de estar identificada.",
        "El usuario no debe de existir.",
    ]);

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

// funcion para la pagina de login
// btn = document.getElementById("login-btn");
// if (btn) {
//     este no es un caso de uso pero es indispensable para la seguridad
//     console.log([
//         "El usuario a ingresar debe de existir en el sistema.",
//         "No debe de estar ningun usuario identificado en el dispositivo desde el cual ingresa",
//     ]);
// }

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
    const hrElementSNone = document.createElement("hr");
    let noExamen = 2;

    hrElement.classList.add("mitad");
    hrElementSNone.classList.add("mitad", "s-none");

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
        last.parentElement.insertBefore(
            hrElementSNone.cloneNode(),
            last.nextElementSibling
        );
        noExamen++;
    });
}
