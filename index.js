// index.js

const express = require('express')
const cors = require('cors')
const rotas = require('./routes/rotas')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// ----------------------------------------------------
// ✅ CONFIGURAÇÃO CORRIGIDA DE CORS PARA PRODUÇÃO
// ----------------------------------------------------

// 1. Defina as origens permitidas
// ATENÇÃO: Substitua 'https://seu-frontend.onrender.com' pela URL real do seu Frontend no Render
const allowedOrigins = [
    'http://localhost:3000', 
    'https://culinaria-api.onrender.com' 
];

// 2. Aplique o middleware CORS com a lógica de origem seletiva
app.use(cors({
    origin: (origin, callback) => {
        // Permite requisições sem 'origin' (Postman, scripts, etc.)
        // OU se a origem estiver na lista permitida
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Rejeita requisições de outras origens
            callback(new Error('Not allowed by CORS policy'));
        }
    },
    // Adicione os métodos e cabeçalhos que você usa, garantindo o 'Authorization' para o token
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// ----------------------------------------------------

app.use(rotas);

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor da API rodando....')
})