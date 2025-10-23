// src/db/schema.ts
import { pgTable, serial, text, timestamp, integer, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm'; 

// 1. Tabela Chefs (Usuários/Colaboradores)
export const chefs = pgTable('chefs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Tabela Recipes (Receitas) - Possui FK para Chefs
export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(), // Nova coluna
  prepTime: integer('prep_time'), // Nova coluna (em minutos)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  // CHAVE ESTRANGEIRA (FK): recipe.chefId refere-se a chefs.id
  chefId: integer('chef_id')
    .notNull()
    .references(() => chefs.id, { onDelete: 'cascade' }),
});

// 3. Tabela Ingredients (Ingredientes) - Possui FK para Recipes
export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // Ex: "Farinha de Trigo"
  quantity: text('quantity').notNull(), // Ex: "2 xícaras"
  createdAt: timestamp('created_at').defaultNow().notNull(),

  // CHAVE ESTRANGEIRA (FK): ingredient.recipeId refere-se a recipes.id
  recipeId: integer('recipe_id')
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
});


// Tipagem para Segurança (Type Safety)
export type InsertChef = typeof chefs.$inferInsert;
export type SelectChef = typeof chefs.$inferSelect;
export type InsertRecipe = typeof recipes.$inferInsert;
export type SelectRecipe = typeof recipes.$inferSelect;
export type InsertIngredient = typeof ingredients.$inferInsert;
export type SelectIngredient = typeof ingredients.$inferSelect;

// --- Definição de Relações (Opcional, mas útil para o Drizzle) ---
export const chefsRelations = relations(chefs, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  chef: one(chefs, {
    fields: [recipes.chefId],
    references: [chefs.id],
  }),
  ingredients: many(ingredients),
}));

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));