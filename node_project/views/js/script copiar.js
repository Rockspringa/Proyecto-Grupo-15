const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const contraInput = document.getElementById("contraseña");
const repeatInput = document.getElementById("repeat");

const cuiClienteInput = document.getElementById("cui");
const deptoClienteInput = document.getElementById("depto");
const nombreClienteInput = document.getElementById("nombre-c");
const apellidoClienteInput = document.getElementById("apellido-c");

const printBtn = document.querySelector(".btn.print");
const printClienteBtn = document.querySelector(".btn.print-cliente");

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

if (printBtn) {
  printBtn.addEventListener("click", () => {
    const nombre = nombreInput.value;
    const contraseña = contraInput.value;

    if (nombre && contraseña) {
      if (correoInput && repeatInput) {
        const correo = correoInput.value;
        const repeat = repeatInput.value;

        if (contraseña === repeat)
          console.log({
            nombre,
            contraseña,
            correo,
            "verificacion contraseña": repeat,
          });
        else {
          repeatInput.value = "";
          alert("las contraseñas no coinciden, vuelva a intentarlo.");
        }
      } else {
        console.log({ nombre, contraseña });
      }
    }

    document.querySelectorAll(".col > .row").forEach((row) => {
      const input = row.children[0];
      const label = row.children[1];

      doShake(input, label);
    });
  });
} else if (printClienteBtn) {
  printClienteBtn.addEventListener("click", () => {
    const nombre = nombreClienteInput.value;
    const apellido = apellidoClienteInput.value;
    const cui = cuiClienteInput.value;
    const departamento = deptoClienteInput.value;

    if (nombre && apellido && cui && departamento) {
      console.log({ nombre, apellido, cui, departamento });
    } else {
      document.querySelectorAll(".col > .row").forEach((row) => {
        const input = row.children[0];
        const label = row.children[1];

        doShake(input, label);
      });
    }
  });
}
