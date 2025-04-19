CREATE TABLE "job" (
	"job_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"shift" text NOT NULL,
	"dispatch_time" timestamp DEFAULT now() NOT NULL,
	"clear_time" timestamp DEFAULT now() NOT NULL,
	"composition" text NOT NULL,
	"type" text NOT NULL,
	"response" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;