const { getReceitaDB, addReceitaDB, updateReceitaDB, deleteReceitaDB, getReceitaPorCodigoDB} = require('../usecases/receitaUseCases')

const getReceita = async (request, response) => {
    await getReceitaDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as receitas: ' + err
        }));
}

const addReceita = async (request, response) => {
    await addReceitaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Receita criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateReceita = async (request, response) => {
    await updateReceitaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Receita alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteReceita = async (request, response) => {
    await deleteReceitaDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getReceitaPorCodigo = async (request, response) => {
    await getReceitaPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as receitas: ' + err
        }));
}

module.exports = {
    getReceita, 
    addReceita, 
    updateReceita, 
    deleteReceita, 
    getReceitaPorCodigo
}