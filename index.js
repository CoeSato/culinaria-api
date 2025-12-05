// index.js

// 🛑 CORREÇÃO 1: Carregar variáveis de ambiente. 
// O dotenv-safe garante que as variáveis críticas (como SECRET) existam.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv-safe').config(); 
}

const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas'); // Assumindo que suas rotas estão aqui

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// ----------------------------------------------------
// ✅ CONFIGURAÇÃO DE CORS
// ----------------------------------------------------

// 1. Defina as origens permitidas
// ATENÇÃO: Substitua 'https://seu-frontend.onrender.com' pela URL REAL do seu Frontend no Render
// E 'https://seu-backend.onrender.com' pela URL REAL do seu Backend no Render
const allowedOrigins = [
    'http://localhost:3000', 
    'https://culinaria-compartilhada.onrender.com', // Exemplo: URL do seu frontend no Render
    'https://culinaria-api.onrender.com'           // Exemplo: URL do seu backend no Render
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
            callback(new Error(`Not allowed by CORS policy from origin: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// ----------------------------------------------------
// ✅ MELHORIA: Endpoint Raiz para Status Check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'API Culinária Compartilhada está online!' });
});
// ----------------------------------------------------

app.use(rotas);

// 🛑 CORREÇÃO 2: Usar PORTA 3001 como fallback (convenção)
const port = process.env.PORT || 3001; 

app.listen(port, () => {
    console.log(`Servidor da API rodando na porta ${port}....`);
})