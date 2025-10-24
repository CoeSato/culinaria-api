import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema.js';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect().catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1);
});

export const db = drizzle(client, { schema });