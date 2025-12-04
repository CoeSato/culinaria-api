const { getIngredientePorCodigoDB, getIngredientesDB, addIngredientesDB, updateIngredientesDB, deleteIngredientesDB} = require('../usecases/ingredienteUseCases')

const getIngredientes = async (request, response) => {
    await getIngredientesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os ingredientes: ' + err
        }));
}

const addIngredientes = async (request, response) => {
    await addIngredientesDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Ingrediente criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateIngredientes = async (request, response) => {
    await updateIngredientesDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Ingrediente alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteIngredientes = async (request, response) => {
    await deleteIngredientesDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getIngredientePorCodigo = async (request, response) => {
    await getIngredientePorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os ingredientes: ' + err
        }));
}

module.exports = {
    getIngredientes, 
    addIngredientes, 
    updateIngredientes, 
    deleteIngredientes, 
    getIngredientePorCodigo
}