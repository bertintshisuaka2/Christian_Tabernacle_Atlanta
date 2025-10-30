import { mysqlEnum, mysqlTable, text, timestamp, varchar, int, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Church-specific tables

// Events table for church events and activities
export const events = mysqlTable("events", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: timestamp("eventDate").notNull(),
  endDate: timestamp("endDate"),
  location: varchar("location", { length: 255 }),
  imageUrl: text("imageUrl"),
  category: mysqlEnum("category", ["worship", "youth", "community", "outreach", "prayer", "other"]).default("other"),
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// Sermons table for sermon library
export const sermons = mysqlTable("sermons", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  speaker: varchar("speaker", { length: 255 }).notNull(),
  description: text("description"),
  sermonDate: timestamp("sermonDate").notNull(),
  videoUrl: text("videoUrl"),
  audioUrl: text("audioUrl"),
  thumbnailUrl: text("thumbnailUrl"),
  scripture: varchar("scripture", { length: 255 }),
  series: varchar("series", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Sermon = typeof sermons.$inferSelect;
export type InsertSermon = typeof sermons.$inferInsert;

// Prayer requests table
export const prayerRequests = mysqlTable("prayerRequests", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  request: text("request").notNull(),
  isPublic: mysqlEnum("isPublic", ["yes", "no"]).default("no"),
  status: mysqlEnum("status", ["pending", "approved", "archived"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type PrayerRequest = typeof prayerRequests.$inferSelect;
export type InsertPrayerRequest = typeof prayerRequests.$inferInsert;

// Contact messages table
export const contactMessages = mysqlTable("contactMessages", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "responded"]).default("new"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// Newsletter subscriptions table
export const newsletterSubscriptions = mysqlTable("newsletterSubscriptions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  status: mysqlEnum("status", ["active", "unsubscribed"]).default("active"),
  subscribedAt: timestamp("subscribedAt").defaultNow(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

// Donations table
export const donations = mysqlTable("donations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  donorName: varchar("donorName", { length: 255 }),
  donorEmail: varchar("donorEmail", { length: 320 }),
  amount: int("amount").notNull(), // Amount in cents
  currency: varchar("currency", { length: 3 }).default("USD"),
  purpose: varchar("purpose", { length: 255 }),
  isAnonymous: mysqlEnum("isAnonymous", ["yes", "no"]).default("no"),
  status: mysqlEnum("status", ["pending", "completed", "failed"]).default("pending"),
  userId: varchar("userId", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = typeof donations.$inferInsert;

// Church information table (single record for church details)
export const churchInfo = mysqlTable("churchInfo", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 500 }),
  description: text("description"),
  address: text("address"),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 320 }),
  logoUrl: text("logoUrl"),
  bannerUrl: text("bannerUrl"),
  facebookUrl: text("facebookUrl"),
  instagramUrl: text("instagramUrl"),
  youtubeUrl: text("youtubeUrl"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type ChurchInfo = typeof churchInfo.$inferSelect;
export type InsertChurchInfo = typeof churchInfo.$inferInsert;

// Service times table
export const serviceTimes = mysqlTable("serviceTimes", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  dayOfWeek: mysqlEnum("dayOfWeek", ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]).notNull(),
  time: varchar("time", { length: 50 }).notNull(),
  description: text("description"),
  isActive: mysqlEnum("isActive", ["yes", "no"]).default("yes"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ServiceTime = typeof serviceTimes.$inferSelect;
export type InsertServiceTime = typeof serviceTimes.$inferInsert;


// Staff table for pastors and church staff
export const staff = mysqlTable("staff", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  bio: text("bio"),
  photoUrl: text("photoUrl"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  displayOrder: int("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Staff = typeof staff.$inferSelect;
export type InsertStaff = typeof staff.$inferInsert;

