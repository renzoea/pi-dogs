const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temperament}= require('../db')
const {dogsInfo, DogsParams, CreateDog} = require('../controller/dogsControllers')
const {getTemp} = require ('../controller/temperamentControllers')
const axios = require ('axios');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', dogsInfo)
router.get('/dogs/:id', DogsParams)
router.get('/temperaments', getTemp)
router.post('/dogs', CreateDog)

module.exports = router;
