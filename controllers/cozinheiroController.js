const { getCozinheirosDB, getCozinheiroPorCodigoDB, addCozinheirosDB, updateCozinheirosB, deleteCozinheirosDB} = require('../usecases/cozinheiroUseCases')

const getCozinheiros = async (request, response) => {
    await getCozinheirosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os cozinheiros: ' + err
        }));
}

const addCozinheiros = async (request, response) => {
    await addCozinheirosDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Cozinheiro criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateCozinheiros = async (request, response) => {
    await updateCozinheirosDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Cozinheiro alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteCozinheiros = async (request, response) => {
    await deleteCozinheirosDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getCozinheiroPorCodigo = async (request, response) => {
    await getCozinheiroPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os cozinheiros: ' + err
        }));
}

module.exports = {
    getCozinheiros, 
    addCozinheiros, 
    updateCozinheiros, 
    deleteCozinheiros, 
    getCozinheiroPorCodigo
}