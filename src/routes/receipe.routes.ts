// src/routes/recipe.routes.ts

import { Router } from 'express';
// Importe o repositório correto para RECEITAS e o de CHEFS (para validação)
import * as recipeRepository from '../repository/recipeRepository.js';
import * as chefRepository from '../repository/chefRepository.js'; // Necessário para validar chefId
import ingredientRouter from './ingredient.routes.js';

// Cria uma instância do Router
const recipeRouter = Router();

// POST: Criar Receita (C - Create)
recipeRouter.post('/', async (req, res) => {
    try {
        const { title, description, prepTime, chefId } = req.body;
        
        // 1. Validação de Chave Estrangeira: O chefId existe?
        if (!chefId) {
            return res.status(400).json({ error: 'chefId é obrigatório.' });
        }
        const chefExists = await chefRepository.findChefById(chefId);
        if (!chefExists) {
            return res.status(404).json({ error: `Chef com ID ${chefId} não encontrado.` });
        }

        // 2. Cria a Receita
        // Usamos [newRecipe] se o seu repositório retorna um array de um elemento (como o do chef)
        const [newRecipe] = await recipeRepository.createRecipe({ title, description, prepTime, chefId });
        
        return res.status(201).json(newRecipe);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao criar receita.' });
    }
});

// GET: Listar Todas as Receitas (R - Read All)
recipeRouter.get('/', async (req, res) => {
    try {
        // Assume que findAllRecipes já carrega os dados do chef (JOIN)
        const allRecipes = await recipeRepository.findAllRecipes();
        return res.status(200).json(allRecipes);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao listar receitas.' });
    }
});

// GET: Buscar Receita por ID (R - Read One)
recipeRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const recipe = await recipeRepository.findRecipeById(id); // Assume que busca a receita e o chef

        if (recipe) {
            return res.status(200).json(recipe);
        }
        return res.status(404).json({ error: 'Receita não encontrada.' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao buscar receita.' });
    }
});

// PUT: Atualizar Receita (U - Update)
recipeRouter.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updatedFields = req.body; 

        // 1. Validação da Chave Estrangeira (se chefId for alterado)
        if (updatedFields.chefId) {
            const chefExists = await chefRepository.findChefById(updatedFields.chefId);
            if (!chefExists) {
                return res.status(404).json({ error: `Chef com ID ${updatedFields.chefId} não encontrado.` });
            }
        }
        
        // 2. Atualiza a Receita
        const [updatedRecipe] = await recipeRepository.updateRecipe(id, updatedFields);
        
        if (updatedRecipe) {
            return res.status(200).json(updatedRecipe);
        }
        return res.status(404).json({ error: 'Receita não encontrada para atualização.' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao atualizar receita.' });
    }
});

// DELETE: Deletar Receita (D - Delete)
recipeRouter.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        // O repositório deve lidar com a exclusão em cascata (Ingredientes)
        const [deletedRecipe] = await recipeRepository.deleteRecipe(id); 
        
        if (deletedRecipe) {
            return res.status(204).send(); // 204 No Content
        }
        return res.status(404).json({ error: 'Receita não encontrada para exclusão.' });
    } catch (e) {
        console.error(e);
        // Em caso de erro de restrição de chave estrangeira (se não houver CASCADE)
        if (e && typeof e === 'object' && 'code' in e && e.code === '23503') {
             return res.status(409).json({ error: 'Não é possível excluir a receita: possui ingredientes associados.' });
        }
        return res.status(500).json({ error: 'Erro ao excluir receita.' });
    }
});

recipeRouter.use('/:recipeId/ingredients', ingredientRouter);

export default recipeRouter;