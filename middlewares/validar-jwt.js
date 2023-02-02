// este es middleeware encargador de validar 

const { response } = require('express');
const { validationResult, header } = require('express-validator');
 const jwt = require('jsonwebtoken');

// next se llama si todo se ejecuta bien
const validarJWT = (req, res = response, next) => {

    // como recibimos el JWT en x-token headers

    // para leer el header en el campo x-token
    const token = req.header('x-token');

 
    // la manera d leer el token es la misma en la q lo generamos
    // si el token viene vacio
    if (!token) {
        // status(401) es q no esta autenticado
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }


   // validar el token
    try {
        const {uid, name} = jwt.verify(
            token,
            // esta es una variable de entorno q es la frase d la firma dl jwt
            process.env.SECRET_JWT_SEED
        );

        req.uid= uid;
        req.name= name;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next()
}

module.exports = {
    validarJWT
}

