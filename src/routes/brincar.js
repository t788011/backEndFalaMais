const express = require('express');
const router = express.Router();
const { getAllBrincar, updateBrincar, createBrincar, deleteBrincar } = require('../querys'); // Verifique o caminho do arquivo de queries

router.get('/', async (req, res) => {
    try {
        const brincar = await getAllBrincar();
        res.json(brincar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id, label, image_path, audio_path, ativo } = req.body;
    try {
        const brincar = await updateBrincar(id, label, image_path, audio_path, ativo);
        if (brincar === null) {
            res.status(404).json({ message: 'Brincar não encontrada' });
        } else {
            res.json(brincar);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const {label, image_path, audio_path, ativo } = req.body;
    try {
        const brincar = await createBrincar(label, image_path, audio_path, ativo);
        if (brincar === null) {
            res.status(404).json({ message: 'Brincar não encontrada' });
        } else {
            res.json(brincar);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = await deleteBrincar(id);
    if (query === null) {
        return res.status(400).json({ message: 'Cadastro não encontrado' });
    }
    return res.status(200).json({ message: 'Cadastro deletado com sucesso' });
});

module.exports = router;
