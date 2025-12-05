const express = require('express');
const { rotas } = require('./routes/rotas');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); 

app.use(rotas);

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando');
});