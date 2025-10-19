import { drizzle } from "drizzle-orm/mysql2";
import { nanoid } from "nanoid";
import {
  events,
  sermons,
  serviceTimes,
  churchInfo,
} from "../drizzle/schema";

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const db = drizzle(process.env.DATABASE_URL);

  console.log("Seeding database...");

  // Seed church info
  await db.insert(churchInfo).values({
    id: nanoid(),
    name: "Community Church",
    tagline: "A place where faith meets fellowship",
    description:
      "Welcome to Community Church, where we believe in the power of community, faith, and service. Join us as we grow together in Christ.",
    address: "123 Church Street, City, State 12345",
    phone: "(555) 123-4567",
    email: "info@communitychurch.org",
  });

  // Seed service times
  await db.insert(serviceTimes).values([
    {
      id: nanoid(),
      name: "Sunday Morning Worship",
      dayOfWeek: "sunday",
      time: "10:00 AM",
      description: "Join us for our main worship service with contemporary music and biblical teaching.",
    },
    {
      id: nanoid(),
      name: "Sunday Evening Service",
      dayOfWeek: "sunday",
      time: "6:00 PM",
      description: "A more intimate gathering focused on prayer and worship.",
    },
    {
      id: nanoid(),
      name: "Wednesday Bible Study",
      dayOfWeek: "wednesday",
      time: "7:00 PM",
      description: "Dive deeper into God's Word with our midweek Bible study.",
    },
  ]);

  // Seed upcoming events
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const threeWeeks = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);

  await db.insert(events).values([
    {
      id: nanoid(),
      title: "Community Outreach Day",
      description:
        "Join us as we serve our local community through various service projects. All ages welcome!",
      eventDate: nextWeek,
      location: "Various locations in the city",
      category: "outreach",
      createdBy: "admin",
    },
    {
      id: nanoid(),
      title: "Youth Group Game Night",
      description:
        "An evening of fun, games, and fellowship for our youth (grades 6-12).",
      eventDate: twoWeeks,
      location: "Church Youth Center",
      category: "youth",
      createdBy: "admin",
    },
    {
      id: nanoid(),
      title: "Prayer & Worship Night",
      description:
        "A special evening dedicated to prayer and worship. Come and experience God's presence.",
      eventDate: threeWeeks,
      location: "Main Sanctuary",
      category: "prayer",
      createdBy: "admin",
    },
  ]);

  // Seed sermons
  const lastSunday = new Date(now);
  lastSunday.setDate(now.getDate() - now.getDay());
  const twoSundaysAgo = new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000);
  const threeSundaysAgo = new Date(lastSunday.getTime() - 14 * 24 * 60 * 60 * 1000);

  await db.insert(sermons).values([
    {
      id: nanoid(),
      title: "Walking in Faith",
      speaker: "Pastor John Smith",
      description:
        "Exploring what it means to truly walk by faith and not by sight in our daily lives.",
      sermonDate: lastSunday,
      scripture: "2 Corinthians 5:7",
      series: "Faith Foundations",
    },
    {
      id: nanoid(),
      title: "The Power of Prayer",
      speaker: "Pastor John Smith",
      description:
        "Understanding the importance and impact of prayer in the life of a believer.",
      sermonDate: twoSundaysAgo,
      scripture: "James 5:16",
      series: "Faith Foundations",
    },
    {
      id: nanoid(),
      title: "Love Your Neighbor",
      speaker: "Guest Speaker Sarah Johnson",
      description:
        "Practical ways to show Christ's love to those around us in our everyday lives.",
      sermonDate: threeSundaysAgo,
      scripture: "Mark 12:31",
    },
  ]);

  console.log("Database seeded successfully!");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });

