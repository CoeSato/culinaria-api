class Receita {
    constructor(codigo, nome) {
        this.codigo = codigo;
        this.nome = nome;
        this.modo_de_preparo = modo_de_preparo;
        this.tempo_de_preparo = tempo_de_preparo;
        this.nota = nota;
        this.data_cadastro = data_cadastro;
        this.cozinheiro = cozinheiro;
        this.ingredientes = ingredientes;
    }
}

module.exports = Receita;