const { Router } = require('express');
const querys = require('../querys');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = await querys.getAllCadastrofono();
        return res.status(200).json(query);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar cadastros', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = await querys.getCadastrofonoById(id);
    if (query.length === 0) {
        return res.status(400).json({ message: 'Cadastro não encontrado' });
    }
    return res.status(200).json(query);
});

router.post('/', async (req, res) => {
    const { first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password } = req.body;
    const query = await querys.createCadastrofono(first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password);
    return res.status(200).json(query);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password } = req.body;
    const query = await querys.updateCadastrofono(id, first_name, birth_date, address, phone, cpf, crfa, crfa_expiry, email, password);
    if (query === null) {
        return res.status(400).json({ message: 'Cadastro não encontrado' });
    }
    return res.status(200).json({ message: 'Cadastro atualizado com sucesso' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = await querys.deleteCadastrofono(id);
    if (query === null) {
        return res.status(400).json({ message: 'Cadastro não encontrado' });
    }
    return res.status(200).json({ message: 'Cadastro deletado com sucesso' });
});

module.exports = router;
