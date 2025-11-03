import { getDb } from "../server/db";
import { staff } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function updatePastorPhoto() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  // Get the first staff member (displayOrder = 1)
  const result = await db.select().from(staff).where(eq(staff.displayOrder, 1)).limit(1);
  
  if (result.length > 0) {
    await db.update(staff)
      .set({ photoUrl: "/pastor-photo.png" })
      .where(eq(staff.id, result[0].id));
    console.log(`Updated pastor photo for: ${result[0].name}`);
  } else {
    console.log("No staff member found with displayOrder = 1");
  }

  process.exit(0);
}

updatePastorPhoto().catch((error) => {
  console.error("Error updating pastor photo:", error);
  process.exit(1);
});

