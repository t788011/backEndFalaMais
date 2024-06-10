const { Router } = require('express');
const querys = require('../querys');
const router = Router();

router.post('/', async (req, res) => { // Use async para lidar com funções assíncronas
  console.log('Recebida requisição POST para /login');
  const { cpf, password } = req.body;
  console.log(`CPF: ${cpf}, Password: ${password}`);

  try {
    const fonoResult = await querys.getFonoByCpf(cpf); // Verifica se é um fono
    if (fonoResult.length > 0 && fonoResult[0].password === password) {
      return res.status(200).json({ tipo: 'fono' });
    }

    const pacienteResult = await querys.getPacienteByCpf(cpf); // Verifica se é um paciente
    if (pacienteResult.length > 0 && pacienteResult[0].password === password) {
      return res.status(200).json({ tipo: 'paciente' });
    }

    res.status(401).json({ message: 'Credenciais inválidas' }); // Se não for encontrado nenhum usuário
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
