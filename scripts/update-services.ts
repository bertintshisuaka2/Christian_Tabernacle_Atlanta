import { drizzle } from "drizzle-orm/mysql2";
import { nanoid } from "nanoid";
import { serviceTimes, churchInfo } from "../drizzle/schema";

async function updateServices() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const db = drizzle(process.env.DATABASE_URL);

  console.log("Updating service times and church info...");

  // Delete old service times
  await db.delete(serviceTimes);

  // Insert new service times
  await db.insert(serviceTimes).values([
    {
      id: nanoid(),
      name: "Saturday Evening Service",
      dayOfWeek: "saturday",
      time: "6:00 PM",
      description: "Join us for our Saturday evening worship service.",
    },
    {
      id: nanoid(),
      name: "Sunday Morning Worship",
      dayOfWeek: "sunday",
      time: "10:00 AM",
      description: "Join us for our main Sunday worship service with inspiring messages and fellowship.",
    },
  ]);

  // Update church info
  await db.delete(churchInfo);
  await db.insert(churchInfo).values({
    id: nanoid(),
    name: "Christian Tabernacle of Atlanta",
    tagline: "A place where faith meets fellowship",
    description:
      "Welcome to Christian Tabernacle of Atlanta, where we believe in the power of community, faith, and service. Join us as we grow together in Christ.",
    address: "123 Church Street, Atlanta, GA 30303",
    phone: "(404) 555-1234",
    email: "info@christiantabernacleatlanta.org",
  });

  console.log("Service times and church info updated successfully!");
}

updateServices()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error updating:", error);
    process.exit(1);
  });

