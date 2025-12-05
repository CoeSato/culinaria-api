const { pool } = require('../config');
const Usuario = require('../entities/usuario') // Supondo que a classe está corrigida para receber 5 parâmetros

const autenticaUsuarioDB = async (body) => {
    try {
        const { email, senha } = body;
        
        // 1. Consulta SQL Simples (Didática): Senha em texto puro
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
        [email, senha]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou senha inválidos";
        }
        
        const usuario = results.rows[0];
        
        // 2. ✅ CORREÇÃO: Mapeamento da classe Usuario
        // Lembre-se, a ordem do construtor na sua classe Usuario é: 
        // constructor(email, senha, tipo, telefone, nome)
        
        return new Usuario(
            usuario.email, 
            usuario.senha, // Retornando a senha (texto puro)
            usuario.tipo, 
            usuario.telefone, 
            usuario.nome
        );
        
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
}

module.exports = {
    autenticaUsuarioDB
}