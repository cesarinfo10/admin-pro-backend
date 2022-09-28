//variables de entorno
require('dotenv').config()
const express = require('express');

//Cors
const cors = require('cors')

//importa dcConnection
const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();


//console.log( process.env );
// rutas
app.use( '/api/usuarios', require( './routes/usuarios' ));
app.use( '/api/login', require( './routes/auth' ))

app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el pueroto ${process.env.PORT}`);
})