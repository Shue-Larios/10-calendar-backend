// asegurarme q sea una fecha valida instalar npm i moment
const moment = require("moment");



const isDate = (value) => {

    // si el value no existiera
    if (!value) {
        return false;
    }

    // indica si es una fecha correcta o no
    const fecha = moment ( value );
    if (fecha.isValid()){
        return true;
    }else{
        return false;
    }

}


module.exports = isDate