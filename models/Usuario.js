const {Schema, model} = require('mongoose');

// como queremos q luzca el Schema que es como la informacion que voy a grabar en la base
// esto seria como una tabla de mysql

const UsuarioSchema = Schema({

    // aca es la configuracion del campo
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // de esta manera le estoy diciendo que no puede a ver correos duplicados
    },
    password: {
        type: String,
        required: true,
    },

});

// Usuario es como se va a llamar en otro archivo y el Schema q va a utilizar
module.exports = model('Usuario', UsuarioSchema);