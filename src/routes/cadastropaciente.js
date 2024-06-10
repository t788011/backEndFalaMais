const { Router } = require('express');
const querys = require('../querys');
const router = Router();

router.post('/', async (req, res) => {
  const { nome, dataNascimento, endereco, telefone, cpf, tipoDeficiencia, nomeResponsavel, email, password } = req.body;
  try {
    const query = await querys.createCadastroPaciente(nome, dataNascimento, endereco, telefone, cpf, tipoDeficiencia, nomeResponsavel, email, password);
    return res.status(201).json({ message: 'Paciente cadastrado com sucesso', id: query.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao cadastrar paciente', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const query = await querys.getAllCadastroPaciente();
    return res.status(200).json(query);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar pacientes', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = await querys.getCadastroPacienteById(id);
    if (!query) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    return res.status(200).json(query);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar paciente', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, dataNascimento, endereco, telefone, cpf, tipoDeficiencia, nomeResponsavel, email, password } = req.body;
  try {
    const query = await querys.updateCadastroPaciente(id, nome, dataNascimento, endereco, telefone, cpf, tipoDeficiencia, nomeResponsavel, email, password);
    if (!query) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    return res.status(200).json({ message: 'Paciente atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar paciente', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = await querys.deleteCadastroPaciente(id);
    if (!query) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    return res.status(200).json({ message: 'Paciente deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar paciente', error: error.message });
  }
});

module.exports = router;
