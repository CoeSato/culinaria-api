// src/repository/recipeRepository.ts
import { db } from '../db/index.js';
import { recipes, type InsertRecipe, type SelectRecipe } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// --- CREATE ---
/**
 * Cria uma nova receita. Requer o chefId (chave estrangeira).
 * @param data Os dados da nova receita (title, description, prepTime e chefId).
 * @returns A receita recém-criada.
 */
export async function createRecipe(data: InsertRecipe): Promise<SelectRecipe[]> {
  return db.insert(recipes).values(data).returning();
}

// --- READ ALL (e com relação) ---
/**
 * Busca todas as receitas, incluindo o nome do Chef.
 * @returns Uma lista de receitas.
 */
export async function findAllRecipes(): Promise<any[]> {
  // Use .findMany() com with() para trazer o relacionamento 'chef'
  return db.query.recipes.findMany({
    with: {
      chef: {
        columns: {
          id: true,
          name: true, // Traz o nome do chef
        },
      },
      // Poderia incluir também: comments: true,
    },
  });
}

// --- READ ONE ---
/**
 * Busca uma receita específica pelo ID.
 * @param id O ID da receita.
 * @returns A receita encontrada ou undefined.
 */
export async function findRecipeById(id: number): Promise<any | undefined> { // <--- Usamos 'any' temporariamente
    // Use .findFirst() com with() para trazer o relacionamento 'chef'
    return db.query.recipes.findFirst({
        where: eq(recipes.id, id),
        with: {
            chef: { // Traz o objeto Chef completo ou com colunas específicas
                columns: {
                    id: true,
                    name: true,
                },
            },
        },
    });
}

// --- UPDATE ---
/**
 * Atualiza os dados de uma receita existente.
 * @param id O ID da receita a ser atualizada.
 * @param data Os dados a serem alterados.
 * @returns A receita atualizada.
 */
export async function updateRecipe(id: number, data: Partial<InsertRecipe>): Promise<SelectRecipe[]> {
  return db.update(recipes).set(data).where(eq(recipes.id, id)).returning();
}

// --- DELETE ---
/**
 * Remove uma receita pelo ID.
 * @param id O ID da receita a ser removida.
 * @returns A receita removida (útil para confirmação).
 */
export async function deleteRecipe(id: number): Promise<SelectRecipe[]> {
  return db.delete(recipes).where(eq(recipes.id, id)).returning();
}