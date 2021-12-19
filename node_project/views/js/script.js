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
    btn.addEventListener("click", async () => {
        let repeat = document.getElementById("repeat").value;
        let body = {
            nombre: document.getElementById("nombre").value,
            correo: document.getElementById("correo").value,
            contraseña: document.getElementById("contraseña").value,
        };

        if (body.nombre || body.correo || body.contraseña) {
            if (body.contraseña === repeat) {
                let res = await fetch(`/users`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                let data = await res.json();
                console.log(data);
            } else {
                alert(
                    `Las contraseñas no coinciden. ${body.contraseña} no es igual a ${repeat}`
                );
            }
        } else {
            document.querySelectorAll(".col > .row").forEach((row) => {
                const input = row.children[0];
                const label = row.children[1];

                doShake(input, label);
            });
        }
    });
}

// funcion para la pagina de login
btn = document.getElementById("login-btn");
if (btn) {
    btn.addEventListener("click", async () => {
        let body = {
            nombre: document.getElementById("nombre").value,
            contraseña: document.getElementById("contraseña").value,
        };

        if (body.nombre || body.contraseña) {
            let res = await fetch(`/users/login`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let data = await res.json();
            console.log(data);
        } else {
            document.querySelectorAll(".col > .row").forEach((row) => {
                const input = row.children[0];
                const label = row.children[1];

                doShake(input, label);
            });
        }
    });
}
