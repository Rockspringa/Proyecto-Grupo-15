const rojoPalido = "#dc7c7c";
const white = "#ffffff";

function doShake(input, label) {
    if (!input.value) {
        if (label.classList.contains("required")) {
            label.style.color = rojoPalido;

            input.classList.add("rotate");
        }
    }
}

document.querySelectorAll(".col > .row").forEach((row) => {
    const input = row.children[0];
    const label = row.children[1];

    input.addEventListener("blur", () => {
        if (input.value) {
            label.classList.remove("animated-up");

            if (label.classList.contains("required")) {
                label.style.color = white;

                input.classList.remove("rotate");
            }
        } else {
            if (!label.classList.contains("animated-up")) {
                label.classList.add("animated-up");
            }

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

// funcion para la pagina de registro
let btn = document.getElementById("ingresar-btn");
if (btn) {
    console.log([
        "La secretaria debe de estar identificada.",
        "El usuario no debe de existir.",
    ]);
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
