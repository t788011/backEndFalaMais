const { Router } = require('express');
const querys = require('../querys');

const router = Router();

router.post('/login', async (req, res) => {
    const { cpf } = req.body;
    const fono = await querys.getFonoByCpf(cpf);
    if (fono.length > 0) {
        return res.status(200).json({ redirectTo: 'fono/pages/inicio' });
    }

    const paciente = await querys.getPacienteByCpf(cpf);
    if (paciente.length > 0) {
        return res.status(200).json({ redirectTo: 'pacientes/pages/inicio' });
    }

    return res.status(400).json({ message: 'Usuário não encontrado' });
});

module.exports = router;
