const { autenticaUsuarioDB, cadastraUsuarioDB } = require('../usecases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 600 //expira em 10 min
            })
            return response.json({ auth: true, token: token })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}

const cadastro = async (request, response) => {
    const { email, senha, tipo, telefone, nome } = request.body;
    if (!email || !senha || !tipo || !telefone || !nome) {
        return response.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const usuario = await cadastraUsuarioDB(request.body);
        return response.status(201).json({ status: 'success', message: 'Usuário cadastrado com sucesso.', usuario });
    } catch (err) {
        return response.status(400).json({ status: 'error', message: 'Erro ao cadastrar usuário: ' + err });
    }
}

// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
        // Se o token for válido, salva no request para uso posterior
        console.log("Usuario: " + JSON.stringify(decoded.usuario));
        request.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    login, cadastro, verificaJWT
}