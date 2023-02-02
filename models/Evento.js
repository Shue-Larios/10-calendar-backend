const { Schema, model } = require('mongoose');

// como queremos q luzca el Schema que es como la informacion que voy a grabar en la base
// esto seria como una tabla de mysql
const EventoSchema = Schema({

    // aca es la configuracion del campo diseño de la base
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        // le dice a moogose que haga una referencia 
        type: Schema.Types.ObjectId,
        //    asi hacemos la referencia y ese q ponemos ahi es el nombre del otro Schema
        ref: 'Usuario',
        required: true,
    },
});


// escribo como ese toJSON quiero q funciones (como modificar los campos default de mongo)
EventoSchema.method('toJSON', function () {
    // de esta forma tengo todo el objeto q se esta serializando
 const { __v, _id, ...object } = this.toObject();

//  hacemos un reemplazo en el object
object.id= _id;
return object;
});




// Evento es como se va a llamar en otro archivo y el Schema q va a utilizar
module.exports = model('Evento', EventoSchema);