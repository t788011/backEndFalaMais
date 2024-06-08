const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Se estiver usando MySQL
// Crie a conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comunicacao'
});

// Verifica se o usuário é um fonoaudiólogo
const checkFono = (cpf, password, callback) => {
  const sql = 'SELECT * FROM cadastrofono WHERE cpf = ? AND password = ?';
  const values = [cpf, password];
  pool.query(sql, values, (err, results) => {
    if (err) return callback(err, null);
    if (results.length > 0) return callback(null, 'fono');
    return callback(null, null);
  });
};

// Verifica se o usuário é um paciente
const checkPaciente = (cpf, password, callback) => {
  const sql = 'SELECT * FROM cadastrarpaciente WHERE cpf = ? AND password = ?';
  const values = [cpf, password];
  pool.query(sql, values, (err, results) => {
    if (err) return callback(err, null);
    if (results.length > 0) return callback(null, 'paciente');
    return callback(null, null);
  });
};

router.post('/login', (req, res) => {
    console.log('Recebida requisição POST para /login');
  const { cpf, password } = req.body;
  console.log(`CPF: ${cpf}, Password: ${password}`);

  checkFono(cpf, password, (err, tipo) => {
    if (err) return res.status(500).json({ message: 'Erro no servidor' });
    if (tipo) return res.status(200).json({ tipo });

    checkPaciente(cpf, password, (err, tipo) => {
      if (err) return res.status(500).json({ message: 'Erro no servidor' });
      if (tipo) return res.status(200).json({ tipo });

      res.status(401).json({ message: 'Credenciais inválidas' });
    });
  });
});

module.exports = router;
