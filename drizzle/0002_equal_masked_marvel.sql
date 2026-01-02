ALTER TABLE "articles" ADD COLUMN "excerpt" text;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "reporters" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;