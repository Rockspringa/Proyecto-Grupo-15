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
  precioConjunto DECIMAL(5, 2) NOT NULL,
  PRIMARY KEY (nombreExamen)
);


-- -----------------------------------------------------
-- Table Empleado
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Empleado (
  usuario VARCHAR(30) NOT NULL,
  contrasena CHAR(60) NOT NULL,
  funcion ENUM("1", "2", "3") NOT NULL,
  nombreEmpleado VARCHAR(50) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  cui CHAR(13) NOT NULL,
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
  idTurnoEmpleado INT AUTO_INCREMENT,
  usuario VARCHAR(30) NOT NULL,
  idTurno INT NOT NULL,
  idSucursal INT NOT NULL,
  PRIMARY KEY (idTurnoEmpleado),
  CONSTRAINT FK_TURNO_TURNO_EMPLEADO
    FOREIGN KEY (idTurno)
    REFERENCES Turno (idTurno),
  CONSTRAINT FK_SUCURSAL_TURNO_EMPLEADO
    FOREIGN KEY (idSucursal)
    REFERENCES Sucursal (idSucursal),
  CONSTRAINT FK_EMPLEADO_TURNO_EMPLEADO
    FOREIGN KEY (usuario)
    REFERENCES Empleado (usuario)
);


-- -----------------------------------------------------
-- Table Paciente
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Paciente (
  cui CHAR(13) NOT NULL,
  nombrePaciente VARCHAR(50) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  sexo BOOLEAN NOT NULL,
  observaciones VARCHAR(1000) NULL,
  telefonoPaciente VARCHAR(15) NULL,
  PRIMARY KEY (cui)
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
-- Table Reporte
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Reporte (
  idReporte INT NOT NULL AUTO_INCREMENT,
  idPaciente CHAR(13) NOT NULL,
  nit VARCHAR(20) NOT NULL,
  fechaEmision DATETIME NOT NULL,
  idTurnoEmpleado INT NOT NULL,
  estado ENUM("1", "2", "3") NOT NULL,
  idMedico INT NULL,
  fechaEntregado DATETIME NULL,
  PRIMARY KEY (idReporte),
  CONSTRAINT FK_CLIENTE_REPORTE
    FOREIGN KEY (nit)
    REFERENCES Cliente (nit),
  CONSTRAINT FK_TURNO_EMPLEADO_REPORTE
    FOREIGN KEY (idTurnoEmpleado)
    REFERENCES Turno_de_Empleado (idTurnoEmpleado),
  CONSTRAINT FK_PACIENTE_REPORTE
    FOREIGN KEY (idPaciente)
    REFERENCES Paciente (cui),
  CONSTRAINT FK_MEDICO_REPORTE
    FOREIGN KEY (idMedico)
    REFERENCES Medico (colegiado)
);


-- -----------------------------------------------------
-- Table Campo_Examen
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Campo_Examen (
  nombreExamen VARCHAR(50) NOT NULL,
  nombreCampo VARCHAR(50) NOT NULL,
  precio DECIMAL(5, 2) NOT NULL,
  valorNormal VARCHAR(100) NOT NULL,
  listoEn INT NOT NULL,
  unidad VARCHAR(15) NOT NULL,
  PRIMARY KEY (nombreExamen, nombreCampo),
  CONSTRAINT FK_EXAMEN_CAMPO_EXAMEN
    FOREIGN KEY (nombreExamen)
    REFERENCES Examen (nombreExamen)
);


-- -----------------------------------------------------
-- Table Resultado_Campo
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Resultado_Campo (
  idReporte INT NOT NULL,
  nombreExamen VARCHAR(50) NOT NULL,
  nombreCampo VARCHAR(50) NOT NULL,
  precio DECIMAL(5, 2) NOT NULL,
  resultados VARCHAR(40) NULL,
  PRIMARY KEY (idReporte, nombreExamen, nombreCampo),
  CONSTRAINT FK_CAMPO_EXAMEN_RESULTADO_CAMPO
    FOREIGN KEY (nombreExamen , nombreCampo)
    REFERENCES Campo_Examen (nombreExamen , nombreCampo),
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


-- -----------------------------------------------------
-- Ingreso de informacion
-- -----------------------------------------------------
INSERT INTO `Paciente` (`cui`,`nombrePaciente`,`fechaNacimiento`,`sexo`)
VALUES
  (123,"Dylan","1999-09-28",1);

INSERT INTO `Cliente` (`nit`,`nombreCliente`)
VALUES
  (123,"Dylan");

INSERT INTO `Sucursal` (`idSucursal`,`nombreSucursal`,`ubicacionSucursal`)
VALUES
  (123,"Patito","calle falsa 123");

INSERT INTO `Turno` (`horaInicio`,`horaSalida`)
VALUES
  ("07:00","13:00");

INSERT INTO `Empleado` (`usuario`,`contrasena`,`funcion`,`nombreEmpleado`,`fechaNacimiento`,`cui`)
VALUES
  ("rocks","$2a$10$Evo3p8C9JwnbRv3iN/6j6.Dv4.jVwmqoKDrfWhsf1ocMu3g6bnM1K",3,"Dylan","1999-09-28",123);

INSERT INTO `Turno_de_Empleado` (`usuario`,`idTurno`,`idSucursal`)
VALUES
  ("rocks",1,123);

INSERT INTO `Examen` (`nombreExamen`,`precioConjunto`)
VALUES
  ("Hematologia",73),
  ("Heces",25),
  ("Orina",50);

INSERT INTO `Campo_Examen` (`nombreExamen`,`precio`,`nombreCampo`,`valorNormal`,`listoEn`,`unidad`)
VALUES
  ("Hematologia",12.50,"Hemoglobina","inferior 4.69, superior 6.13","48","g/dL"),
  ("Hematologia",10,"Globulos Blancos","inferior 14.10, superior  18.10","48","miles/uL"),
  ("Heces",5,"Consistencia","inferior 14.10, superior 18.10","48",""),
  ("Heces",15,"Color","","48",""),
  ("Heces",10,"Restos Alimenticios","","48",""),
  ("Orina",20,"Color","","48",""),
  ("Orina",20,"Aspecto","","48",""),
  ("Orina",20,"Olor","","48","");

INSERT INTO `Reporte` (`idPaciente`,`nit`,`fechaEmision`,`idTurnoEmpleado`)
VALUES
  (123,123,"2021-12-28 17:00:00",1),
  (123,123,"2021-12-28 12:00:00",1);

INSERT INTO `Resultado_Campo` (`idReporte`,`nombreExamen`,`nombreCampo`,`precio`)
VALUES
  (1,"Hematologia","Hemoglobina",12),
  (1,"Hematologia","Globulos Blancos",12),
  (1,"Heces","Consistencia",12),
  (1,"Heces","Color",12),
  (1,"Heces","Restos Alimenticios",12),
  (2,"Hematologia","Hemoglobina",12),
  (2,"Hematologia","Globulos Blancos",12),
  (2,"Orina","Color",12),
  (2,"Orina","Aspecto",12),
  (2,"Heces","Restos Alimenticios",12);


