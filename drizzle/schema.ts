import { create } from "domain";
import {
  pgTable,
  varchar,
  boolean,
  integer,
  jsonb,
  date,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  password: varchar("password", { length: 250 }).notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  messages: integer("message_id").references(() => messageTable.id, {
    onDelete: "cascade",
  }),
});

export const messageTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),
  service: varchar("service", { length: 50 }).notNull(),
  message: varchar("message", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testimonialTable = pgTable("testimonials", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  message: varchar("message", { length: 500 }).notNull(),
  projectName: varchar("project_name", { length: 50 }).notNull(),
  rating: integer("rating").notNull().default(5),
  isVerified: boolean("is_verified").notNull().default(false),
  photo: varchar("photo", { length: 250 }).notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projectTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectName: varchar("project_name", { length: 100 }).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  url: varchar("url", { length: 250 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  designer: varchar("designer", { length: 50 }).notNull(),
  approach: varchar("approach", { length: 500 }).notNull(),
  photos: jsonb("photos").notNull().default("[]"),
  story: varchar("story", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletterSubscribersTable = pgTable("newsletter_subscribers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletterTable = pgTable("newsletters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  subject: varchar("subject", { length: 100 }).notNull(),
  body: varchar("body", { length: 1000 }).notNull(),
});

export const newsTable = pgTable("news", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  subject: varchar("subject", { length: 100 }).notNull(),
  body: varchar("body", { length: 1000 }).notNull(),
});

export const jobTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  postedDate: timestamp("posted_date").notNull().defaultNow(),
  latestDate: date("latest_date").notNull(),
});

export const newEmployeeTable = pgTable("new_employee", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),
  motivation: varchar("motivation", { length: 500 }).notNull(),
  job: varchar("job", { length: 50 }).notNull(),
  jobId: integer("job_id").notNull().references(() => jobTable.id),
  resume: varchar("resume", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});



export const employeeTable = pgTable("employees", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  photo: varchar("photo", { length: 250 }).notNull().default(""),
  bio: varchar("bio", { length: 500 }).notNull(),
  position: varchar("position", { length: 100 }).notNull(),
  qualification: varchar("qualification", { length: 100 }).notNull(),
  socialLinks: jsonb("social_links").notNull().default("{}"),
  hiredDate: timestamp("hiredDate_at").notNull().defaultNow(),
});
