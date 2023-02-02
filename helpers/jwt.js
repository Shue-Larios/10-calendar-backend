// una funcion encargada de generar nuestro json web token
// hay q instalar npm i jsonwebtoken
const jwt = require('jsonwebtoken');


const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        // creamos el payload
        const payload = { uid, name };
        // para firmar un token
        // se ocupa el payload
        // SECRET_JWT_SEED es una variable de entorno
        // y la duracion del jwt
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h' // dice que expira en dos horas
            // esto x si no se podria firmar x alguna razon
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }
            resolve(token);
        })
    })
}

module.exports = {
    generarJWT
}