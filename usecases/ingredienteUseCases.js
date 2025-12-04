const { pool } = require('../config');
const Ingrediente = require('../entities/ingrediente')

const getIngredientesDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM ingredientes ORDER BY nome');
        return rows.map((Ingrediente) => new Ingrediente(Ingrediente.codigo, Ingrediente.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addIngredientesDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO ingredientes (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const ingrediente = results.rows[0];
        return new Ingrediente(ingrediente.codigo, ingrediente.nome); 
    } catch (err) {
        throw "Erro ao inserir o cozinehiro: " + err;
    }    
}


const updateIngredientesDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE ingredientes set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const ingrediente = results.rows[0];
        return new Ingrediente(ingrediente.codigo, ingrediente.nome); 
    } catch (err) {
        throw "Erro ao alterar o ingrediente: " + err;
    }      
}

const deleteIngredientesDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM ingredientes where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Ingrediente removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o ingrediente: " + err;
    }     
}

const getIngredientePorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM ingredientes where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const ingrediente = results.rows[0];
            return new Ingrediente(ingrediente.codigo, ingrediente.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar o ingrediente: " + err;
    }     
}

module.exports = {
    getIngredientePorCodigoDB, deleteIngredientesDB, updateIngredientesDB, addIngredientesDB, getIngredientesDB,  
}