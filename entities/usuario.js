class Usuario {
    constructor(email, senha, tipo, telefone, nome) { // ⬅️ Adicionando 'senha' ao construtor
        this.email = email;
        this.senha = senha; // ⬅️ Atribuindo a senha
        this.tipo = tipo;
        this.telefone = telefone;
        this.nome = nome;
    }
}

module.exports = Usuario;