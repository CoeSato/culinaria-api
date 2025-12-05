const { Router } = require('express');

const { rotasCozinheiros }= require('./rotasCozinheiros');
const { rotasIngredientes }= require('./rotasIngredientes');
const { rotasReceitas }= require('./rotasReceitas');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasCozinheiros);
rotas.use(rotasIngredientes);
rotas.use(rotasReceitas);
rotas.route("/login")
   .post(login)  

module.exports = rotas;