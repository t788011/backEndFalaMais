const express = require('express');
const router = express.Router();
const { getAllAlimentos,  updateAlimento , createAlimento, deleteAlimento} = require('../querys'); // Corrija o caminho conforme necessário

router.get('/', async (req, res) => {
    try {
        const alimentos = await getAllAlimentos();
        res.json(alimentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    console.log('estou passando')
    const { id, label, image_path, audio_path, ativo } = req.body;
    try {
        const alimentos = await updateAlimento(id, label, image_path, audio_path, ativo);
        res.json(alimentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    console.log('estou passando')
    const {label, image_path, audio_path, ativo } = req.body;
    try {
        const alimentos = await createAlimento(label, image_path, audio_path, ativo);
        res.json(alimentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    console.log('estou passando delete')
    const { id } = req.params;
    const query = await deleteAlimento(id);
    if (query === null) {
        return res.status(400).json({ message: 'Cadastro não encontrado' });
    }
    return res.status(200).json({ message: 'Cadastro deletado com sucesso' });
});



module.exports = router;