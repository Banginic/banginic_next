CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"photo" varchar(250) DEFAULT '' NOT NULL,
	"bio" varchar(500) NOT NULL,
	"position" varchar(100) NOT NULL,
	"qualification" varchar(100) NOT NULL,
	"social_links" jsonb DEFAULT '{}' NOT NULL,
	"hiredDate_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"location" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"posted_date" timestamp DEFAULT now() NOT NULL,
	"latest_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"email" varchar(30) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"service" varchar(50) NOT NULL,
	"message" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "messages_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "new_employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"email" varchar(30) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"motivation" varchar(500) NOT NULL,
	"job" varchar(50) NOT NULL,
	"job_id" integer NOT NULL,
	"resume" varchar(250) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "new_employee_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(100) NOT NULL,
	"body" varchar(1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(100) NOT NULL,
	"body" varchar(1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_name" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"url" varchar(250) NOT NULL,
	"category" varchar(50) NOT NULL,
	"designer" varchar(50) NOT NULL,
	"approach" varchar(500) NOT NULL,
	"photos" jsonb DEFAULT '[]' NOT NULL,
	"story" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"email" varchar(30) NOT NULL,
	"message" varchar(500) NOT NULL,
	"project_name" varchar(50) NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"photo" varchar(250) DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "testimonials_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar(250) NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "new_employee" ADD CONSTRAINT "new_employee_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;