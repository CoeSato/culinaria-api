class Receita {
    constructor(
        codigo, 
        nome, 
        modo_de_preparo, // ⬅️ Parâmetro incluído
        tempo_de_preparo, // ⬅️ Parâmetro incluído
        nota, // ⬅️ Parâmetro incluído
        data_cadastro, // ⬅️ Parâmetro incluído
        cozinheiro, // ⬅️ Parâmetro incluído
        ingredientes // ⬅️ Parâmetro incluído
    ) {
        this.codigo = codigo;
        this.nome = nome;
        
        // CORREÇÃO: Usar a referência 'this.' para atribuir o valor do parâmetro
        this.modo_de_preparo = modo_de_preparo;
        this.tempo_de_preparo = tempo_de_preparo;
        this.nota = nota;
        this.data_cadastro = data_cadastro;
        
        // Associações
        this.cozinheiro = cozinheiro;
        this.ingredientes = ingredientes;
    }
}

module.exports = Receita;