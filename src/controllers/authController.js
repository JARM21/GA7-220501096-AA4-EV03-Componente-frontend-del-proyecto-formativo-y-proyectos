const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const verifyToken = require('./verifyToken')
const path = require('path');



//Rutan la cual se utiliza para que los usuarios se registren
router.post('/signup', async (req, res, next) => {
    const {username, email, password} = req.body;
    const user = new User ({
        username,
        email,
        password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60
    })
    res.redirect('/registration-success.html');


})

//Ruta a la cual se accede cuando se inicia seseión
router.get('/profile', verifyToken, async (req, res, next) => {

    const user = await User.findById(req.userId, {password: 0});
    if(!user){
        return res.status(404).send('No se encontro el usuario');
    }
})

// con verifyToken podemos proteger muchas rutas con la misma logica
//sin tener que agregar mas lineas de codigo ejemplo:

router.get('/dashboard', verifyToken,(req, res) => {
    res.json('dashboard');
})

//Ruta para que los usuarios puedan iniciar sesión
router.post('/signin', async(req, res, next) => {
    const {email, password } = req.body;
    console.log(email, password)
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).json({message: 'El email no existe', auth: false, token: null});
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword){
       return res.status(401).json({message: 'La contraseña es incorrecta', auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60
    })
    res.redirect('/profile.html');

});

module.exports = router;