const { Router } = require('express');

const { getIngredientes, addIngredientes, updateIngredientes, deleteIngredientes, getIngredientePorCodigo} = require('../controllers/ingredienteController');

const { verificaJWT } = require('../controllers/segurancaController')

const rotasIngredientes = new Router();

rotasIngredientes.route('/ingredientes')
   .get(verificaJWT,getIngredientes)
   .post(verificaJWT,addIngredientes)
   .put(verificaJWT,updateIngredientes)

rotasIngredientes.route('/cozinheiros/:codigo')
   .get(verificaJWT,getIngredientePorCodigo)
   .delete(verificaJWT,deleteIngredientes)

module.exports = { rotasIngredientes };