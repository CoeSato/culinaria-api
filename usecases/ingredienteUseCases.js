const { pool } = require('../config');
const Ingrediente = require('../entities/ingrediente')

const getIngredientesDB = async () => {
    try {
        // ✅ Corrigido: Selecionando todos os campos, incluindo 'unidade_medida'
        const { rows } = await pool.query('SELECT codigo, nome, unidade_medida FROM ingredientes ORDER BY nome');
        
        // ✅ Corrigido: Mapeando com a unidade_medida
        return rows.map((ingrediente) => new Ingrediente(
            ingrediente.codigo, 
            ingrediente.nome,
            ingrediente.unidade_medida
        )); 
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addIngredientesDB = async (body) => {
    try { 
        // ✅ Corrigido: Incluindo 'unidade_medida' no body
        const { nome, unidade_medida } = body; 
        const results = await pool.query(`
            INSERT INTO ingredientes (nome, unidade_medida) 
            VALUES ($1, $2)
            returning codigo, nome, unidade_medida`, // ⬅️ Retornando a unidade
        [nome, unidade_medida]);
        
        const ingrediente = results.rows[0];
        return new Ingrediente(ingrediente.codigo, ingrediente.nome, ingrediente.unidade_medida); 
    } catch (err) {
        // ❌ CORRIGIDO: Mensagem de erro referenciando 'ingrediente'
        throw "Erro ao inserir o ingrediente: " + err; 
    } 
}


const updateIngredientesDB = async (body) => {
    try { 
        // ✅ Corrigido: Incluindo 'unidade_medida' no body
        const { codigo, nome, unidade_medida } = body; 
        const results = await pool.query(`
            UPDATE ingredientes set nome = $2, unidade_medida = $3 where codigo = $1 
            returning codigo, nome, unidade_medida`, // ⬅️ Incluindo a unidade
        [codigo, nome, unidade_medida]); 
        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const ingrediente = results.rows[0];
        return new Ingrediente(ingrediente.codigo, ingrediente.nome, ingrediente.unidade_medida); 
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
        // ✅ Corrigido: Selecionando todos os campos
        const results = await pool.query(`SELECT codigo, nome, unidade_medida FROM ingredientes where codigo = $1`,
        [codigo]);
        
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const ingrediente = results.rows[0];
            return new Ingrediente(ingrediente.codigo, ingrediente.nome, ingrediente.unidade_medida); 
        } 
    } catch (err) {
        throw "Erro ao recuperar o ingrediente: " + err;
    } 
}

module.exports = {
    getIngredientePorCodigoDB, deleteIngredientesDB, updateIngredientesDB, addIngredientesDB, getIngredientesDB, 
}