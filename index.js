// para ejecutar en node es node index.js
// para ser mas eficientes instalar nodemon

// configuracion basica de express para instalarlo es npm i express
const express = require('express');
const { dbConnection } = require('./databases/config');

// El Intercambio de Recursos de Origen Cruzado (CORS (en-US)) es un mecanismo que utiliza cabeceras HTTP adicionales para permitir que un user agent (en-US) obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece
const cors = require('cors')
// para tener habilitadas las variables de entorno
require('dotenv').config();
//  un log de todos los procesos q tengo corriendo
// console.log( process.env.PORT );

// crear el servidor de express
const app = express();


// Base de datos
dbConnection();

// para instalar npm install cors
app.use(cors());


// para mostrar el directorio publico
// use en express es conocido como un mildeware
app.use( express.static('public') );

// Lectura y parseo del body
// las peticiones q vengan en formato json las voy a procesar y extraer el contenido
app.use( express.json() );



// configuracion de las rutas
//TODO: auth // crear, login, renew
// tengo que especificar la ruta en la cual quiero q este hbailitado este endpoint
// en teoria todo lo q el archivo require ('./routes/auth') vaya a exportar lo va habilitar en esa ruta '/api/auth'
app.use( '/api/auth', require ('./routes/auth') );



//TODO: CRUD: eventos
app.use( '/api/events', require ('./routes/events') );


// exencion que no es a las otras rutas
app.get('*', (req, res) =>{
    // regreso el archivo index
    res.sendFile( __dirname +'/public/index.html')
})



// escuchar peticiones
// primer argumento es el puerto en el q quiero q este corriendo
// el collback se vaa a ejecutar cuando el servidor este arriba
app.listen( process.env.PORT, () =>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
} );
