// src/routes/chef.routes.ts
import { Router } from 'express';
import * as chefRepository from '../repository/chefRepository.js';

// Cria uma instância do Router
const chefRouter = Router();

// POST: Criar Chef (C - Create)
chefRouter.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const [newChef] = await chefRepository.createChef({ name, email });
        return res.status(201).json(newChef);
    } catch (e) {
        console.error(e);
        // Em caso de erro de duplicidade de e-mail (unique), retorne 409 Conflict
        if (e && typeof e === 'object' && 'code' in e && e.code === '23505') { 
             return res.status(409).json({ error: 'Email já cadastrado.' });
        }
        return res.status(500).json({ error: 'Erro ao criar chef.' });
    }
});

// GET: Listar Todos os Chefs (R - Read All)
chefRouter.get('/', async (req, res) => {
    try {
        const allChefs = await chefRepository.findAllChefs();
        return res.status(200).json(allChefs);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao listar chefs.' });
    }
});

// GET: Buscar Chef por ID (R - Read One)
chefRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const chef = await chefRepository.findChefById(id);

        if (chef) {
            return res.status(200).json(chef);
        }
        return res.status(404).json({ error: 'Chef não encontrado.' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao buscar chef.' });
    }
});

// PUT: Atualizar Chef (U - Update)
chefRouter.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updatedFields = req.body; 

        const [updatedChef] = await chefRepository.updateChef(id, updatedFields);
        
        if (updatedChef) {
            return res.status(200).json(updatedChef);
        }
        return res.status(404).json({ error: 'Chef não encontrado para atualização.' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao atualizar chef.' });
    }
});

// DELETE: Deletar Chef (D - Delete)
chefRouter.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const [deletedChef] = await chefRepository.deleteChef(id);
        
        if (deletedChef) {
            return res.status(204).send(); // 204 No Content
        }
        return res.status(404).json({ error: 'Chef não encontrado para exclusão.' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao excluir chef.' });
    }
});

export default chefRouter;