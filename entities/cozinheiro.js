// Cozinheiro.js (Com Valores Padrão)

class Cozinheiro {
    constructor(codigo = 0, nome = "", descricao = "") { // ⬅️ Definindo valores padrão
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
    }
}

module.exports = Cozinheiro;