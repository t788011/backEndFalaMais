const express = require('express');
const router = express.Router();
const { getAllPictograms, updatePictogram, createPictogram, deletePictogram } = require('../querys'); // Corrija o caminho conforme necessário

router.get('/', async (req, res) => {
    try {
        const pictograms = await getAllPictograms();
        res.json(pictograms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    console.log('estou passando')
    const { id, label, image_path, audio_path, ativo } = req.body;
    try {
        const pictograms = await updatePictogram(id, label, image_path, audio_path, ativo);
        res.json(pictograms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    console.log('estou passando')
    const {label, image_path, audio_path, ativo } = req.body;
    try {
        const pictograms = await createPictogram(label, image_path, audio_path, ativo);
        res.json(pictograms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = await deletePictogram(id);
    if (query === null) {
        return res.status(400).json({ message: 'Cadastro não encontrado' });
    }
    return res.status(200).json({ message: 'Cadastro deletado com sucesso' });
});

module.exports = router;
