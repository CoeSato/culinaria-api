// src/repository/chefRepository.ts
import { db } from '../db/index.js';
import { chefs, type InsertChef, type SelectChef } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// --- CREATE ---
/**
 * Cria um novo chef (usuário).
 */
export async function createChef(data: InsertChef): Promise<SelectChef[]> {
  return db.insert(chefs).values(data).returning();
}

// --- READ ALL ---
/**
 * Busca todos os chefs.
 */
export async function findAllChefs(): Promise<SelectChef[]> {
  return db.select().from(chefs);
}

// --- READ ONE ---
/**
 * Busca um chef específico pelo ID.
 */
export async function findChefById(id: number): Promise<SelectChef | undefined> {
  const result = await db.select().from(chefs).where(eq(chefs.id, id)).execute();
  return result[0];
}

// --- UPDATE ---
/**
 * Atualiza os dados de um chef existente.
 */
export async function updateChef(id: number, data: Partial<InsertChef>): Promise<SelectChef[]> {
  return db.update(chefs).set(data).where(eq(chefs.id, id)).returning();
}

// --- DELETE ---
/**
 * Remove um chef pelo ID.
 */
export async function deleteChef(id: number): Promise<SelectChef[]> {
  return db.delete(chefs).where(eq(chefs.id, id)).returning();
}