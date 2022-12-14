const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response) =>{

    const { email, password} = req.body;

    try{
        // VERIFICAR EMAIL
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // VERIFICAR CONTRASEÑA
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // GENERAR TOKEN - JWT   
        const token = await generarJWT( usuarioDB.id )
        
        res.json({
            ok: true,
            token
        });

     }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}


module.exports = {
    login
}