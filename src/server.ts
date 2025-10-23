// src/server.ts (Somente as alterações no topo e na montagem das rotas)

import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import chefRouter from './routes/chef.routes.js';
import recipeRouter from './routes/receipe.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ------------------------------------
// ROTAS DE CHEFS
// ------------------------------------
app.use('/api/chefs', chefRouter);

// ------------------------------------
// ROTAS DE RECEITAS
//------------------------------------
app.use('/api/recipes', recipeRouter);

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});