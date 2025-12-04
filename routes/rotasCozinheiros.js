const { Router } = require('express');

const { getCozinheiros, addCozinheiros, updateCozinheiros, deleteCozinheiros, getCozinheiroPorCodigo} = require('../controllers/cozinheiroController');

const { verificaJWT } = require('../controllers/segurancaController')

const rotasCozinheiros = new Router();

rotasCozinheiros.route('/cozinheiros')
   .get(verificaJWT,getCozinheiros)
   .post(verificaJWT,addCozinheiros)
   .put(verificaJWT,updateCozinheiros)

rotasCozinheiros.route('/cozinheiros/:codigo')
   .get(verificaJWT,getCozinheiroPorCodigo)
   .delete(verificaJWT,deleteCozinheiros)

module.exports = { rotasCozinheiros };