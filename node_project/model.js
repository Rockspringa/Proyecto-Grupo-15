'use strict';

module.exports = class Usuario {

    constructor(_nombre, _correo, _contraseña) {
        this.nombre = _nombre;
        this.correo = _correo;
        this.contraseña = _contraseña; // encriptar contraseña
    }
    
}
