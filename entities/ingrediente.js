// Ingrediente.js (Com Valores Padrão)

class Ingrediente {
    constructor(codigo = 0, nome = "", unidade_medida = "") { // ⬅️ Definindo valores padrão
        this.codigo = codigo;
        this.nome = nome;
        this.unidade_medida = unidade_medida;
    }
}

module.exports = Ingrediente;