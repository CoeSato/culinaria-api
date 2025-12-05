const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

let pool = null;
if (isProduction) {
    // ✅ Configuração para Produção (Render)
    // Render e serviços cloud geralmente fornecem o DATABASE_URL completo
    pool = new Pool({
        connectionString: process.env.DATABASE_URL, 
        ssl: {
            rejectUnauthorized: false,
        }
    })
} else {
    // 🛑 CORRIGIDO: Configuração para Desenvolvimento (Local)
    // Puxando credenciais de variáveis de ambiente locais (via .env)
    pool = new Pool({
        user: process.env.DB_USER || 'postgres', // Usar variável ou fallback
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE || 'culinaria',
        password: process.env.DB_PASSWORD || 'postgres',
        port: process.env.DB_PORT || 5432
    })
}

module.exports = { pool }