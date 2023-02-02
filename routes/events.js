// aca vamos a crear todo lo q es el CRUD
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


// los 4 endpoint de mi CRUD

// comentario para saber cual es la ruta de aca
/*
      Events / Routes
        HOST + /api/events
*/

// todas tienen que pasar por la validacion de JWT
// al hacer esto le digo q cualquier peticion que se encuentre justo abajo d el va a tener el token
router.use(validarJWT);


// Obtener eventos
router.get('/', getEvento);



// crear un nuevo evento
router.post('/',
  // validamos los campos con el check de express-validator
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    // isDate es una funcion para validar las fechas
    check('start', 'Fecha inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),

    // es una funcion para todos las validaciones
    validarCampos


  ],
  crearEvento);

// Fin crear un nuevo evento


// Actualizar nuevo evento
router.put(
  '/:id', 
  [
      check('title','El titulo es obligatorio').not().isEmpty(),
      check('start','Fecha de inicio es obligatoria').custom( isDate ),
      check('end','Fecha de finalización es obligatoria').custom( isDate ),
      validarCampos
  ],
  actualizarEvento 
);



// borrar evento
router.delete('/:id', eliminarEvento);



module.exports = router;
