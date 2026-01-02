CREATE TABLE "articles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"reporterId" integer NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reporters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reporters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"specialty" text NOT NULL,
	"yearsOfExperience" integer NOT NULL,
	"keyTrait" text NOT NULL,
	"notableAchievement" text NOT NULL,
	"styleDescription" text NOT NULL,
	"biography" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_reporterId_reporters_id_fk" FOREIGN KEY ("reporterId") REFERENCES "public"."reporters"("id") ON DELETE cascade ON UPDATE no action;