const express = require('express');
const router = express.Router();

router.post('/cadastrarpaciente', (req, res) => {
  const { nome, dataNascimento, endereco, telefone, cpf, tipoDeficiencia, nomeResponsavel, email, password } = req.body;

  const sql = 'INSERT INTO cadastrarpaciente (nome, dataNascimento, endereco, telefone, cpf, tipoDeficiencia, nomeResponsavel, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [nome, dataNascimento, endereco, telefone, cpf, tipoDeficiencia, nomeResponsavel, email, password];

  pool.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao cadastrar paciente' });
    }

    res.status(201).json({ message: 'Paciente cadastrado com sucesso' });
  });
});

module.exports = router;
