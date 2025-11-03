import { getDb } from "../server/db";
import { staff } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function updatePastorEmail() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  // Update Pastor Bertin's email
  const bertin = await db.select().from(staff).where(eq(staff.displayOrder, 1)).limit(1);
  if (bertin.length > 0) {
    await db.update(staff)
      .set({ email: "bertintshisuaka@hotmail.com" })
      .where(eq(staff.id, bertin[0].id));
    console.log(`Updated email for ${bertin[0].name} to bertintshisuaka@hotmail.com`);
  } else {
    console.log("Pastor not found");
  }

  process.exit(0);
}

updatePastorEmail().catch((error) => {
  console.error("Error updating email:", error);
  process.exit(1);
});

