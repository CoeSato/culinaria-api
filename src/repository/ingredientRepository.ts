// src/repository/ingredientRepository.ts
import { db } from '../db/index.js';
import { ingredients, type InsertIngredient, type SelectIngredient } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// --- CREATE ---
/**
 * Adiciona um novo ingrediente a uma receita específica.
 */
export async function createIngredient(data: InsertIngredient): Promise<SelectIngredient[]> {
  return db.insert(ingredients).values(data).returning();
}

// --- READ ALL by Recipe ID ---
/**
 * Busca todos os ingredientes de uma receita específica.
 * @param recipeId O ID da receita.
 */
export async function findIngredientsByRecipeId(recipeId: number): Promise<SelectIngredient[]> {
  return db.select().from(ingredients).where(eq(ingredients.recipeId, recipeId)).execute();
}

// --- READ ONE ---
/**
 * Busca um ingrediente específico pelo ID (útil para edição).
 */
export async function findIngredientById(id: number): Promise<SelectIngredient | undefined> {
  const result = await db.select().from(ingredients).where(eq(ingredients.id, id)).execute();
  return result[0];
}

// --- UPDATE ---
/**
 * Atualiza os dados de um ingrediente existente.
 * Geralmente usado para mudar a quantidade ou nome.
 */
export async function updateIngredient(id: number, data: Partial<InsertIngredient>): Promise<SelectIngredient[]> {
  return db.update(ingredients).set(data).where(eq(ingredients.id, id)).returning();
}

// --- DELETE ---
/**
 * Remove um ingrediente pelo ID.
 */
export async function deleteIngredient(id: number): Promise<SelectIngredient[]> {
  return db.delete(ingredients).where(eq(ingredients.id, id)).returning();
}