const { pool } = require('../config');
// Requerindo a classe Cozinheiro (plural no require é incomum, mas mantido)
const Cozinheiros = require('../entities/cozinheiro') 

const getCozinheirosDB = async () => {
    try {
        // ✅ Corrigido: Selecionando todos os campos, incluindo 'descricao'
        const { rows } = await pool.query('SELECT codigo, nome, descricao FROM cozinheiros ORDER BY nome'); 
        
        return rows.map((cozinheiro) => new Cozinheiros(
            cozinheiro.codigo, 
            cozinheiro.nome, 
            cozinheiro.descricao // ⬅️ Incluindo 'descricao'
        ));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addCozinheirosDB = async (body) => {
    try { 
        // ✅ Corrigido: Incluindo 'descricao' no body
        const { nome, descricao } = body; 
        const results = await pool.query(`
            INSERT INTO cozinheiros (nome, descricao) 
            VALUES ($1, $2)
            returning codigo, nome, descricao`, // ⬅️ Retornando 'descricao'
        [nome, descricao]);
        
        const cozinheiro = results.rows[0];
        return new Cozinheiros(cozinheiro.codigo, cozinheiro.nome, cozinheiro.descricao); // ⬅️ Incluindo 'descricao'
    } catch (err) {
        throw "Erro ao inserir o cozinheiro: " + err;
    } 
}


const updateCozinheirosDB = async (body) => { // ⬅️ CORRIGIDO: Nome da função de 'updateCozinheirosB' para 'updateCozinheirosDB'
    try {
        // ✅ Corrigido: Incluindo 'descricao' no body
        const { codigo, nome, descricao } = body; 
        const results = await pool.query(`
            UPDATE cozinheiros set nome = $2, descricao = $3 where codigo = $1 
            returning codigo, nome, descricao`, // ⬅️ Incluindo 'descricao'
        [codigo, nome, descricao]);        
        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const cozinheiro = results.rows[0];
        return new Cozinheiros(cozinheiro.codigo, cozinheiro.nome, cozinheiro.descricao); // ⬅️ Incluindo 'descricao'
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
        // ✅ Corrigido: Selecionando todos os campos, incluindo 'descricao'
        const results = await pool.query(`SELECT codigo, nome, descricao FROM cozinheiros where codigo = $1`,
        [codigo]);
        
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const cozinheiro = results.rows[0];
            return new Cozinheiros(cozinheiro.codigo, cozinheiro.nome, cozinheiro.descricao); // ⬅️ Incluindo 'descricao'
        }
    } catch (err) {
        throw "Erro ao recuperar o cozinehiro: " + err;
    }
}

module.exports = {
    getCozinheirosDB, 
    addCozinheirosDB, 
    updateCozinheirosDB, // ⬅️ CORRIGIDO: Nome da função exportada
    deleteCozinheirosDB, 
    getCozinheiroPorCodigoDB,
}