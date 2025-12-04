const { pool } = require('../config');
const Cozinheiros = require('../entities/cozinheiro')

const getCozinheirosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM cozinheiros ORDER BY nome');
        return rows.map((cozinheiro) => new Cozinheiros(cozinheiro.codigo, cozinheiro.nome));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addCozinheirosDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO cozinheiros (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const cozinheiro = results.rows[0];
        return new Cozinheiros(cozinheiro.codigo, cozinheiro.nome); 
    } catch (err) {
        throw "Erro ao inserir o cozinheiro: " + err;
    }    
}


const updateCozinheirosB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE cozinheiros set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const cozinheiro = results.rows[0];
        return new Cozinheiros(cozinheiro.codigo, cozinheiro.nome); 
    } catch (err) {
        throw "Erro ao alterar o cozinehiro: " + err;
    }      
}

const deleteCozinheirosDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM cozinheiros where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Cozinheiro removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o cozinehiro: " + err;
    }     
}

const getCozinheiroPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM cozinheiros where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const cozinheiro = results.rows[0];
            return new Cozinheiros(cozinheiro.codigo, cozinheiro.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar o cozinehiro: " + err;
    }     
}

module.exports = {
    getCozinheirosDB, addCozinheirosDB, updateCozinheirosB, deleteCozinheirosDB, getCozinheiroPorCodigoDB,  
}