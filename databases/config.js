// aca esta toda la configuracion para conectarme a la base de datos
// para instalarlo npm i mongoose

const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        // process.env.DB_CNN hace referencia a una de las variables de entorno (evn) dond esta el link a la base
       await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos')
    }

}

// exportamos la funcion
module.exports = {
    dbConnection
}