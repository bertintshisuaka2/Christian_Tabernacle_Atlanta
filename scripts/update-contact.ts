import { drizzle } from "drizzle-orm/mysql2";
import { churchInfo } from "../drizzle/schema";

async function updateContact() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const db = drizzle(process.env.DATABASE_URL);

  console.log("Updating church contact information...");

  // Update church info with new contact details
  await db.delete(churchInfo);
  await db.insert(churchInfo).values({
    id: "1",
    name: "Christian Tabernacle of Atlanta",
    tagline: "A place where faith meets fellowship",
    description:
      "Welcome to Christian Tabernacle of Atlanta, where we believe in the power of community, faith, and service. Join us as we grow together in Christ.",
    address: "4350 Peachtree Industrial Blvd, Peachtree Corners, GA 30071",
    phone: "(678) 979-6811",
    email: "info@christiantabernacleatlanta.org",
  });

  console.log("Church contact information updated successfully!");
}

updateContact()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error updating:", error);
    process.exit(1);
  });

