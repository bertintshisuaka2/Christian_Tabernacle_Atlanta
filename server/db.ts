import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, staff, InsertStaff } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Church feature queries
import { 
  events, sermons, prayerRequests, contactMessages, 
  newsletterSubscriptions, donations, churchInfo, serviceTimes,
  InsertEvent, InsertSermon, InsertPrayerRequest, InsertContactMessage,
  InsertNewsletterSubscription, InsertDonation, InsertChurchInfo, InsertServiceTime
} from "../drizzle/schema";
import { desc, and, gte, lte } from "drizzle-orm";

// Events
export async function createEvent(event: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(events).values(event);
}

export async function getEvents() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(events).orderBy(desc(events.eventDate));
}

export async function getUpcomingEvents() {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return await db.select().from(events)
    .where(gte(events.eventDate, now))
    .orderBy(events.eventDate);
}

export async function getEventById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return result[0];
}

export async function updateEvent(id: string, data: Partial<InsertEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(events).set(data).where(eq(events.id, id));
}

export async function deleteEvent(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(events).where(eq(events.id, id));
}

// Sermons
export async function createSermon(sermon: InsertSermon) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(sermons).values(sermon);
}

export async function getSermons() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(sermons).orderBy(desc(sermons.sermonDate));
}

export async function getSermonById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(sermons).where(eq(sermons.id, id)).limit(1);
  return result[0];
}

export async function updateSermon(id: string, data: Partial<InsertSermon>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(sermons).set(data).where(eq(sermons.id, id));
}

export async function deleteSermon(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(sermons).where(eq(sermons.id, id));
}

// Prayer Requests
export async function createPrayerRequest(request: InsertPrayerRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(prayerRequests).values(request);
}

export async function getPrayerRequests(publicOnly = false) {
  const db = await getDb();
  if (!db) return [];
  if (publicOnly) {
    return await db.select().from(prayerRequests)
      .where(and(eq(prayerRequests.isPublic, "yes"), eq(prayerRequests.status, "approved")))
      .orderBy(desc(prayerRequests.createdAt));
  }
  return await db.select().from(prayerRequests).orderBy(desc(prayerRequests.createdAt));
}

export async function updatePrayerRequest(id: string, data: Partial<InsertPrayerRequest>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(prayerRequests).set(data).where(eq(prayerRequests.id, id));
}

// Contact Messages
export async function createContactMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactMessages).values(message);
}

export async function getContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function updateContactMessage(id: string, status: "new" | "read" | "responded") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactMessages).set({ status }).where(eq(contactMessages.id, id));
}

// Newsletter Subscriptions
export async function createNewsletterSubscription(subscription: InsertNewsletterSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(newsletterSubscriptions).values(subscription);
}

export async function getNewsletterSubscriptions() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(newsletterSubscriptions)
    .where(eq(newsletterSubscriptions.status, "active"))
    .orderBy(desc(newsletterSubscriptions.subscribedAt));
}

export async function unsubscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(newsletterSubscriptions)
    .set({ status: "unsubscribed", unsubscribedAt: new Date() })
    .where(eq(newsletterSubscriptions.email, email));
}

// Donations
export async function createDonation(donation: InsertDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(donations).values(donation);
}

export async function getDonations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(donations).orderBy(desc(donations.createdAt));
}

export async function updateDonationStatus(id: string, status: "pending" | "completed" | "failed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(donations).set({ status }).where(eq(donations.id, id));
}

// Church Info
export async function getChurchInfo() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(churchInfo).limit(1);
  return result[0];
}

export async function upsertChurchInfo(info: InsertChurchInfo) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(churchInfo).values(info)
    .onDuplicateKeyUpdate({ set: info });
}

// Service Times
export async function createServiceTime(serviceTime: InsertServiceTime) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(serviceTimes).values(serviceTime);
}

export async function getServiceTimes() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(serviceTimes)
    .where(eq(serviceTimes.isActive, "yes"));
}

export async function updateServiceTime(id: string, data: Partial<InsertServiceTime>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(serviceTimes).set(data).where(eq(serviceTimes.id, id));
}

export async function deleteServiceTime(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(serviceTimes).where(eq(serviceTimes.id, id));
}


// Staff
export async function createStaff(staffMember: InsertStaff) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(staff).values(staffMember);
}

export async function getStaff() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(staff)
    .where(eq(staff.isActive, true))
    .orderBy(staff.displayOrder);
}

export async function getStaffById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(staff).where(eq(staff.id, id)).limit(1);
  return result[0];
}

export async function updateStaff(id: string, data: Partial<InsertStaff>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(staff).set(data).where(eq(staff.id, id));
}

export async function deleteStaff(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(staff).where(eq(staff.id, id));
}

