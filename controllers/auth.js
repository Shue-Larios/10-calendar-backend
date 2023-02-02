

// esto no vuelve hacer la carga sino q usa la libreria ya cargada
const { response } = require('express');
// libreria para encriptar contraseña npm i bcryptjs
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


// para instalar express validator (npm i express-validator) un middlewares q me ayuda con las validaciones


// la res es lo q nosotros respondemos
// la req es lo q le persona solicita
// hay q enfocarse en el body de la req
const crearUsuario = async (req, res = response) => {

    // traigo del req.body lo que necesito es lo q ingresa el usuario
    const { email, password } = req.body;


    try {
        // validacion de email repetido
        let usuario = await Usuario.findOne({ email });
        // si el arreglo de usuarios esta lleno es xk hay repetido sino regresa null
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya existe'
            })
        }
        // sino hay repetido hace esto
        // me creo una nueva instancia del usuario
        // como este Usuario tiene los campos de arriba x eso le arego lo del body
        usuario = new Usuario(req.body);

        // encriptar la contraseña
        // para encriptarla se ocupan dos cosas 
        // 1) generar un salt q es un numero aleatorio 
        const salt = bcrypt.genSaltSync();
        // 2) reemplazamos por la contraseña encriptada
        usuario.password = bcrypt.hashSync(password, salt);

        // si lo quiero guardar en la base
        await usuario.save();

        // Generar nuestro jsonwebtoken
        const token = await generarJWT(usuario.id, usuario.name);


        // cuando alguien solicite esto q es lo q voy a responder
        // este codigo dice q se creo correctamente
        res.status(201).json({
            ok: true,
            // aca pongo las credenciales del usuario q vienen de usuario
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {
        console.log(error);
        // status 500 como un error interno 
        res.status(500).json({
            ok: false,
            msg: 'Pongase en contacto con el administrador'
        })
    }


}

const loginUsuario = async (req, res = response) => {
    // traigo del req.body lo que necesito
    const { email, password } = req.body;


    try {

        // hay q confirmar si tenemos un usuario con ese correo
        // validacion si existe el correo
        const usuario = await Usuario.findOne({ email });
        // si el correo no existe
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        // confirmar las contraseñas
        // recibe dos argumento el password que ingresa el usuario y lo compara contra el q sta en la base
        // esto regresa un true si es verdadero y false si no
        const validPassword = bcrypt.compareSync(password, usuario.password);
        // si el password no es valido
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar nuestro jsonwebtoken
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            // aca pongo las credenciales del usuario q vienen de usuario
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        // status 500 como un error interno 
        res.status(500).json({
            ok: false,
            msg: 'Pongase en contacto con el administrador'
        })
    }

}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    // Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);
    // cuando alguien solicite esto q es lo q voy a responder
    res.json({
        ok: true,
        // esto es del token
        token
    });
}



// la exportacion se hace asi en node
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};
