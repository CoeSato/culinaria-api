// src/db/index.ts (Solução Otimizada)

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg'; // <-- Usamos Pool: Melhor para Drizzle e produção
import * as schema from './schema.js';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("ERRO: A variável de ambiente DATABASE_URL não está configurada.");
  process.exit(1);
}

// Criação do Pool de Conexão usando a URL completa
// O Pool lida melhor com conexões concorrentes
const pool = new Pool({
  connectionString: DATABASE_URL,
  // **CRUCIAL:** O host externo (public domain) exige SSL
  ssl: { 
    rejectUnauthorized: false // Desabilita a verificação de certificado (necessário em alguns ambientes cloud)
  }, 
});

// A conexão é estabelecida à medida que as queries chegam.
// Podemos tentar um ping inicial para verificar:
pool.query('SELECT NOW()').catch(err => {
    // ESTE É O TESTE DE CONEXÃO
    console.error('Erro ao conectar ou pingar o banco de dados:', err);
    process.exit(1);
});

// Inicialização e Exportação do Drizzle
export const db = drizzle(pool, { schema });

// Exportar o Tipo do DB é CRUCIAL para o seu Repositório (DrizzleTypeError)
export type Db = typeof db;