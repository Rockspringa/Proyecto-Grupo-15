const express = require("express");
const bodyParser = require("body-parser");

// Aqui agregar modulos de la carpeta routes
const examen = require("./routes/examen");
const empleado = require("./routes/empleado");
const solicitud = require("./routes/solicitud");

const app = express();
const PORT = process.env.PORT || 8080;

// poniendo el middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

// Aqui agregar los modulos importados en sus rutas (todos empezaran por en "/api/")
app.use("/api/", examen);
app.use("/api/", empleado);
app.use("/api/", solicitud);

// catch 404 y pasar error al siguiente middleware (error handler)
// app.use((req, res, next) => {
//     var err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });

// error handler
app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  return res.status(err.status || 500).json({'message': err.message});
});

// lanzando el servidor en un puerto
app.listen(PORT, () =>
    console.log("> Server is up and running on port : " + PORT)
);
