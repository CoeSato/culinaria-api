// src/routes/ingredient.routes.ts (Versão para Roteamento Aninhado)

import { Router, Request, Response } from 'express';
// Importe as funções do repositório
import * as ingredientRepository from '../repository/ingredientRepository.js'; 
import * as recipeRepository from '../repository/recipeRepository.js'; // Para validação de POST

// Cria uma instância do Router e habilita mergeParams
// O mergeParams é CRÍTICO para acessar :recipeId do router pai!
const ingredientRouter = Router({ mergeParams: true }); 

// Rotas de Ingredientes Aninhadas sob /api/recipes/:recipeId/ingredients

// 1. GET: Listar Ingredientes por Receita (R - Read All for Parent)
// URL: GET /api/recipes/:recipeId/ingredients
ingredientRouter.get('/', async (req: Request, res: Response) => {
    try {
        // req.params.recipeId está disponível graças a { mergeParams: true }
        const recipeId = parseInt(req.params.recipeId, 10); 
        
        if (isNaN(recipeId)) {
            return res.status(400).json({ error: 'ID de Receita inválido.' });
        }
        
        // Use a função do repositório com o nome correto
        const ingredients = await ingredientRepository.findIngredientsByRecipeId(recipeId);
        
        return res.status(200).json(ingredients);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao listar ingredientes.' });
    }
});

// 2. POST: Criar Ingrediente (C - Create)
// URL: POST /api/recipes/:recipeId/ingredients
ingredientRouter.post('/', async (req: Request, res: Response) => {
    try {
        const recipeId = parseInt(req.params.recipeId, 10); 
        const { name, quantity } = req.body;
        
        // 1. Validação
        if (!name || !quantity || isNaN(recipeId)) {
            return res.status(400).json({ error: 'Nome, Quantidade e recipeId são obrigatórios.' });
        }

        // 2. Cria o ingrediente
        // Passa o recipeId da URL para os dados de criação
        const [newIngredient] = await ingredientRepository.createIngredient({ name, quantity, recipeId });
        return res.status(201).json(newIngredient);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao criar ingrediente.' });
    }
});


// 3. DELETE: Deletar Ingrediente (D - Delete)
// URL: DELETE /api/recipes/:recipeId/ingredients/:id
ingredientRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID de ingrediente inválido.' });
        }
        
        const [deletedIngredient] = await ingredientRepository.deleteIngredient(id);
        
        if (deletedIngredient) {
            return res.status(204).send(); // 204 No Content
        }
        return res.status(404).json({ error: 'Ingrediente não encontrado para exclusão.' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Erro ao excluir ingrediente.' });
    }
});

export default ingredientRouter;