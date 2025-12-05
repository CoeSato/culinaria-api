const { Router } = require('express');

const { rotasCozinheiros }= require('./rotasCozinheiros');
const { rotasIngredientes }= require('./rotasIngredientes');
const { rotasReceitas }= require('./rotasReceitas');
const { getUsuario, atualizaUsuario } = require('../controllers/usuarioController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasCozinheiros);
rotas.use(rotasIngredientes);
rotas.use(rotasReceitas);

rotas.route("/login")
   .post(login) 
rotas.route("/cadastro") // rota para cadastro de usuário
   .post(cadastro)
rotas.route("/usuario")
   .get(verificaJWT, getUsuario)
   .put(verificaJWT, atualizaUsuario);

module.exports = { rotas };