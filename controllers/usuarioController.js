// /controllers/usuarioController.js

const { getUsuarioPorEmail, atualizaUsuarioDB } = require('../usecases/segurancaUseCases');

const getUsuario = async (req, res) => {
  try {
    const email = req.usuario.email;
    const usuario = await getUsuarioPorEmail(email);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err });
  }
};

const atualizaUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    usuario.email = req.usuario.email; // Garante que só atualize o próprio usuário
    const ok = await atualizaUsuarioDB(usuario);
    res.json({ status: "success", mensagem: ok ? "Atualizado com sucesso" : "Nada atualizado" });
  } catch (err) {
    res.status(400).json({ status: "error", mensagem: err });
  }
};

module.exports = { getUsuario, atualizaUsuario };
