CREATE SCHEMA IF NOT EXISTS LaboratorioPatito ;
USE LaboratorioPatito ;

-- CREATE USER IF NOT EXISTS 'grupo-15'@'localhost' IDENTIFIED BY 'web-app';
-- GRANT ALL PRIVILEGES ON LaboratorioPatito.* TO 'grupo-15'@'localhost' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Table Cliente
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Cliente (
  nit VARCHAR(20) NOT NULL,
  nombreCliente VARCHAR(50) NOT NULL,
  direccion VARCHAR(60) NULL,
  telefonoCliente VARCHAR(15) NULL,
  email VARCHAR(45) NULL,
  PRIMARY KEY (nit)
);


-- -----------------------------------------------------
-- Table Examen
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Examen (
  nombreExamen VARCHAR(50) NOT NULL,
  precioConjunto DECIMAL NOT NULL,
  PRIMARY KEY (nombreExamen)
);


-- -----------------------------------------------------
-- Table Empleado
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Empleado (
  usuario VARCHAR(30) NOT NULL,
  contrasena VARCHAR(45) NOT NULL,
  funcion ENUM("1", "2", "3") NOT NULL,
  nombreEmpleado VARCHAR(50) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  cui INT NOT NULL,
  telefonoEmpleado VARCHAR(15) NULL,
  PRIMARY KEY (usuario)
);


-- -----------------------------------------------------
-- Table Turno
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Turno (
  idTurno INT NOT NULL AUTO_INCREMENT,
  horaInicio TIME NOT NULL,
  horaSalida TIME NOT NULL,
  PRIMARY KEY (idTurno)
);


-- -----------------------------------------------------
-- Table Sucursal
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Sucursal (
  idSucursal INT NOT NULL AUTO_INCREMENT,
  nombreSucursal VARCHAR(50) NOT NULL,
  ubicacionSucursal VARCHAR(75) NOT NULL,
  PRIMARY KEY (idSucursal)
);


-- -----------------------------------------------------
-- Table Turno_de_Empleado
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Turno_de_Empleado (
  usuario VARCHAR(30) NOT NULL,
  idTurno INT NOT NULL,
  idSucursal INT NOT NULL,
  PRIMARY KEY (usuario, idTurno, idSucursal),
  CONSTRAINT FK_TURNO_TURNO_EMPLEADO
    FOREIGN KEY (idTurno)
    REFERENCES Turno (idTurno),
  CONSTRAINT FK_SUCURSAL_TURNO_EMPLEADO
    FOREIGN KEY (idSucursal)
    REFERENCES Sucursal (idSucursal),
  CONSTRAINT FK_USUARIO_TURNO_EMPLEADO
    FOREIGN KEY (usuario)
    REFERENCES Empleado (usuario)
);


-- -----------------------------------------------------
-- Table Paciente
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Paciente (
  cui INT NOT NULL,
  nombrePaciente VARCHAR(50) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  sexo BOOLEAN NOT NULL,
  observaciones VARCHAR(1000) NULL,
  telefonoPaciente VARCHAR(15) NULL,
  PRIMARY KEY (cui)
);


-- -----------------------------------------------------
-- Table Reporte
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Reporte (
  idReporte INT NOT NULL AUTO_INCREMENT,
  idPaciente INT NOT NULL,
  nit VARCHAR(20) NOT NULL,
  fechaEmision DATETIME NOT NULL,
  idSucursal INT NOT NULL,
  fechaEntregado DATETIME NULL,
  Reportecol VARCHAR(45) NULL,
  PRIMARY KEY (idReporte),
  CONSTRAINT FK_CLIENTE_REPORTE
    FOREIGN KEY (nit)
    REFERENCES Cliente (nit),
  CONSTRAINT FK_SUCURSAL_REPORTE
    FOREIGN KEY (idSucursal)
    REFERENCES Sucursal (idSucursal),
  CONSTRAINT FK_PACIENTE_REPORTE
    FOREIGN KEY (idPaciente)
    REFERENCES Paciente (cui)
);


-- -----------------------------------------------------
-- Table Campo_Examen
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Campo_Examen (
  nombreExamen VARCHAR(50) NOT NULL,
  nombreCampo VARCHAR(50) NOT NULL,
  precio DECIMAL NOT NULL,
  valorNormal VARCHAR(100) NOT NULL,
  listoEn TIME NOT NULL,
  unidad VARCHAR(15) NOT NULL,
  PRIMARY KEY (nombreExamen, nombreCampo),
  CONSTRAINT FK_EXAMEN_CAMPO_EXAMEN
    FOREIGN KEY (nombreExamen)
    REFERENCES Examen (nombreExamen)
);


-- -----------------------------------------------------
-- Table Medico
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Medico (
  colegiado INT NOT NULL,
  nombreMedico VARCHAR(50) NOT NULL,
  direccion VARCHAR(75) NULL,
  PRIMARY KEY (colegiado)
);


-- -----------------------------------------------------
-- Table Resultado_Campo
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Resultado_Campo (
  idReporte INT NOT NULL,
  nombreExamen VARCHAR(50) NOT NULL,
  nombreCampo VARCHAR(50) NOT NULL,
  precio DECIMAL NOT NULL,
  estado ENUM("1", "2", "3") NOT NULL,
  resultados VARCHAR(40) NULL,
  idMedico INT NULL,
  PRIMARY KEY (idReporte, nombreExamen, nombreCampo),
  CONSTRAINT FK_CAMPO_EXAMEN_RESULTADO_CAMPO
    FOREIGN KEY (nombreExamen , nombreCampo)
    REFERENCES Campo_Examen (nombreExamen , nombreCampo),
  CONSTRAINT FK_MEDICO_RESULTADO_CAMPO
    FOREIGN KEY (idMedico)
    REFERENCES Medico (colegiado),
  CONSTRAINT FK_REPORTE_RESULTADO_CAMPO
    FOREIGN KEY (idReporte)
    REFERENCES Reporte (idReporte)
);


-- -----------------------------------------------------
-- Table Telefono_de_Sucursal
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Telefono_de_Sucursal (
  idSucursal INT NOT NULL,
  telefonoSucursal VARCHAR(15) NOT NULL,
  PRIMARY KEY (telefonoSucursal),
  CONSTRAINT FK_SUCURSAL_TELEFONO_SUCURSAL
    FOREIGN KEY (idSucursal)
    REFERENCES Sucursal (idSucursal)
);
