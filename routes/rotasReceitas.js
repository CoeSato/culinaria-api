const { Router } = require('express');

const { getReceita, addReceita, updateReceita, deleteReceita, getReceitaPorCodigo } = require('../controllers/receitaController');

const { verificaJWT } = require('../controllers/segurancaController')

const rotasReceitas = new Router();

rotasReceitas.route('/receitas')
   .get(verificaJWT,getReceita)
   .post(verificaJWT,addReceita)
   .put(verificaJWT,updateReceita)

rotasReceitas.route('/receitas/:codigo')
   .get(verificaJWT,getReceitaPorCodigo)
   .delete(verificaJWT,deleteReceita)

module.exports = { rotasReceitas };