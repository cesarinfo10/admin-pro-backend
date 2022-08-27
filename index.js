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
//Base de datos
dbConnection();


//console.log( process.env );
// rutas
app.get( '/', (req, res) => {

    res.json({
        ok:true,
        msg: "Hola CASV"
    })

});


app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el pueroto ${process.env.PORT}`);
})