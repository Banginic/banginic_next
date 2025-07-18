CREATE TABLE "main_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL,
	"email" varchar(30) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"password" varchar(250) NOT NULL,
	CONSTRAINT "main_users_email_unique" UNIQUE("email")
);
