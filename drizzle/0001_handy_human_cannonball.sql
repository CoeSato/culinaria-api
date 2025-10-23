CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"recipe_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"prep_time" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"chef_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "chefs";--> statement-breakpoint
ALTER TABLE "chefs" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_chef_id_chefs_id_fk" FOREIGN KEY ("chef_id") REFERENCES "public"."chefs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chefs" ADD CONSTRAINT "chefs_email_unique" UNIQUE("email");