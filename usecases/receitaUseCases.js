const { pool } = require('../config');
const Receita = require('../entities/receita')

const getReceitaDB = async () => {
    try {    
        const { rows } = await pool.query(`select r.codigo as codigo, r.nome as nome, r.modo_de_preparo as modo_de_preparo, r.tempo_de_preparo as tempo_de_preparo, 
        r.nota as nota, to_char(r.data_cadastro,'YYYY-MM-DD') as data_cadastro, r.cozinheiro as cozinheiro, c.nome as cozinheiro_nome, r.ingredientes as ingredientes,
        i.nome as ingrediente_nome, i.quantidade as ingrediente_quantidade
        from receitas r
        join cozinheiro c on r.cozinheiro = c.codigo
        join ingredientes i on r.ingredientes = i.codigo
        order by r.codigo`);
        return rows.map((receita) => new Receita(receita.codigo, receita.nome, receita.modo_de_preparo, receita.tempo_de_preparo, 
            receita.nota, receita.data_cadastro, receita.cozinheiro, receita.cozinheiro_nome, receita.ingredientes, receita.ingrediente_nome, 
            receita.ingrediente_quantidade));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addReceitaDB = async (body) => {
    try {   
        const { nome, modo_de_preparo, tempo_de_preparo, nota, data_cadastro, cozinheiro, ingredientes} = body; 
        const results = await pool.query(`INSERT INTO produtos (nome, modo_de_preparo, tempo_de_preparo, nota, data_cadastro, cozinheiro, ingredientes) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            returning codigo, nome, modo_de_preparo, tempo_de_preparo, nota, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, cozinheiro, ingredientes`,
        [codigo, nome, modo_de_preparo, tempo_de_preparo, nota, data_cadastro, cozinheiro, ingredientes]);
        const receita = results.rows[0];
        return new Receita(receita.codigo, receita.nome, receita.modo_de_preparo, receita.tempo_de_preparo, receita.nota, 
            receita.data_cadastro, receita.cozinheiro, "", receita.ingredientes, "");
    } catch (err) {
        throw "Erro ao inserir a receita: " + err;
    }    
}

const updateReceitaDB = async (body) => {
    try {   
        const { nome, modo_de_preparo, tempo_de_preparo, nota, data_cadastro, cozinheiro, ingredientes} = body; 
        const results = await pool.query(`UPDATE receitas set nome = $2 , modo_de_preparo = $3, tempo_de_preparo = $4, nota = $5, 
        data_cadastro = $6, cozinheiro = $7, ingredientes = $8 where codigo = $1 
        returning codigo, nome, modo_de_preparo, tempo_de_preparo, nota, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, cozinheiro, ingredientes`,
        [codigo, nome, modo_de_preparo, tempo_de_preparo, nota, data_cadastro, cozinheiro, ingredientes]);       
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const receita = results.rows[0];
        return new Receita(receita.codigo, receita.nome, receita.modo_de_preparo, receita.tempo_de_preparo, receita.nota, 
            receita.data_cadastro, receita.cozinheiro, "", receita.ingredientes, "");
    } catch (err) {
        throw "Erro ao alterar a receita: " + err;
    }      
}

const deleteReceitaDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM receitas where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Receita removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a receita: " + err;
    }     
}

const getReceitaPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select r.codigo as codigo, r.nome as nome, r.modo_de_preparo as modo_de_preparo, r.tempo_de_preparo as tempo_de_preparo, 
        r.nota as nota, to_char(r.data_cadastro,'YYYY-MM-DD') as data_cadastro, r.cozinheiro as cozinheiro, c.nome as cozinheiro_nome, r.ingredientes as ingredientes,
        i.nome as ingrediente_nome, i.quantidade as ingrediente_quantidade
        from receitas r
        join cozinheiro c on r.cozinheiro = c.codigo
        join ingredientes i on r.ingredientes = i.codigo
        where r.codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const receita = results.rows[0];
        return new Receita(receita.codigo, receita.nome, receita.modo_de_preparo, receita.tempo_de_preparo, receita.nota, 
            receita.data_cadastro, receita.cozinheiro, "", receita.ingredientes, "");
        }       
    } catch (err) {
        throw "Erro ao recuperar a receita: " + err;
    }     
}

module.exports = {
    getReceitaDB,
    addReceitaDB,
    updateReceitaDB,
    deleteReceitaDB,
    getReceitaPorCodigoDB
}