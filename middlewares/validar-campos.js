// este es middleeware encargador de validar los campos
    // es una funcion para todos las validaciones

const { response } = require('express');
const { validationResult } = require('express-validator');

// next se llama si todo se ejecuta bien
const validarCampos = (req, res = response, next) => {
    //    manejo de errores linea para obtener los errores
    const errors = validationResult(req);
    // si hay errores
    if (!errors.isEmpty()) {
        // .status(400) es para devolver un codigo de error en el thunder Client
        return res.status(400).json({
            ok: false,
            // aca tengo todos los errores serializados en un objeto
            errors: errors.mapped()
        })
    }
    next()
}

module.exports = {
    validarCampos
}