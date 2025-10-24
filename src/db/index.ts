// Exemplo de código CORRIGIDO usando variáveis separadas (Recomendado pelo Railway)
import { Pool } from 'pg'; 
import { drizzle } from 'drizzle-orm/node-postgres';

// 1. Verifique as variáveis de ambiente necessárias
const PGHOST = process.env.PGHOST;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;
const PGPORT = process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432;

if (!PGHOST || !PGUSER || !PGPASSWORD || !PGDATABASE) {
  throw new Error("As variáveis de ambiente do PostgreSQL (PGHOST, PGUSER, PGPASSWORD, PGDATABASE) devem ser configuradas.");
}

// 2. Crie o Pool de conexão usando as variáveis separadas
const pool = new Pool({
  host: PGHOST,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
  // Adicione outras configurações de segurança se necessário (ex: ssl)
  // ssl: { rejectUnauthorized: false } 
});

export const db = drizzle(pool);