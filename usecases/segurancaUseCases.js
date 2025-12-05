const { pool } = require('../config')
const Usuario = require('../entities/usuario')

const autenticaUsuarioDB = async (body) => {
    try {
        const { email, senha } = body
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
            [email, senha]);

        if (results.rowCount == 0) {
            throw "Usuário ou tenha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
}

const cadastraUsuarioDB = async (body) => {
    try {
        const { email, senha, tipo, telefone, nome } = body;
        const results = await pool.query(`INSERT INTO usuarios (email, senha, tipo, telefone, nome) 
                                          VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [email, senha, tipo, telefone, nome]);
        return new Usuario(results.rows[0].email, results.rows[0].tipo, results.rows[0].telefone, results.rows[0].nome);
    } catch (err) {
        throw "Erro ao cadastrar o usuário: " + err;
    }
}

const getUsuarioPorEmail = async (email) => {
    try {
        const result = await pool.query('SELECT email, tipo, telefone, nome FROM usuarios WHERE email = $1', [email]);
        return result.rows[0];
    } catch (err) {
        throw "Erro ao buscar usuário: " + err;
    }
};

const atualizaUsuarioDB = async (usuario) => {
    try {
        const { email, nome, telefone, tipo, senha } = usuario;
        const result = await pool.query(
            `UPDATE usuarios SET nome = $1, telefone = $2, tipo = $3, senha = $4 WHERE email = $5`,
            [nome, telefone, tipo, senha, email]
        );
        return result.rowCount > 0;
    } catch (err) {
        throw "Erro ao atualizar o usuário: " + err;
    }
};

module.exports = {
    autenticaUsuarioDB,
    cadastraUsuarioDB,
    getUsuarioPorEmail,
    atualizaUsuarioDB
}