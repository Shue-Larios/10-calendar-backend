// comentario para saber cual es la ruta de aca
/*
        RUTAS DE USUARIOS / AUTH
        HOST + /api/auth
*/


const { Router } = require('express');
const router = Router();
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
// check es el middleware que se va a encargar de validar un campo a la ves
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



// .POST es la peticion que stoy esperando
// este es para crear nuevo usuario 
// [] coleccion de middlewares que sirven para la validacion los campos aca son obligatorios 
router.post('/new',
        [  // primer argumento es el campo q quiero evaluar
                // segundo msj de error
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El correo es obligatorio').isEmail(), // si esto no es un email
                check('password', 'Debe ingresar una contraseña de 6 caracteres').isLength({ min: 6 }), //digo q el minimo de caracteres es 6
                // es una funcion para todos las validaciones
                validarCampos
        ],
        crearUsuario);

// hace un posteo directo al /auth
// para hacer un login
router.post('/',
        [  // primer argumento es el campo q quiero evaluar
                // segundo msj de error
                check('email', 'El correo es obligatorio').isEmail(), // si esto no es un email
                check('password', 'Debe ingresar una contraseña de 6 caracteres').isLength({ min: 6 }), //digo q el minimo de caracteres es 6
                validarCampos
        ],
        loginUsuario);

// para hacer el json web token del usuario
// permitira mantener autenticado a nuestros usuarios de forma pasiva
router.get('/renew', validarJWT, revalidarToken);








// la exportacion se hace asi en node
module.exports = router;