import { getDb } from "../server/db";
import { staff } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function updateStaff() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  // Remove the third staff member (Youth Pastor - displayOrder = 3)
  const youthPastor = await db.select().from(staff).where(eq(staff.displayOrder, 3)).limit(1);
  if (youthPastor.length > 0) {
    await db.delete(staff).where(eq(staff.id, youthPastor[0].id));
    console.log(`Removed: ${youthPastor[0].name}`);
  }

  // Update the first pastor's name to "Bertin Tshisuaka"
  const firstPastor = await db.select().from(staff).where(eq(staff.displayOrder, 1)).limit(1);
  if (firstPastor.length > 0) {
    await db.update(staff)
      .set({ 
        name: "Bertin Tshisuaka",
        title: "Senior Pastor"
      })
      .where(eq(staff.id, firstPastor[0].id));
    console.log(`Updated first pastor name to: Bertin Tshisuaka`);
  }

  process.exit(0);
}

updateStaff().catch((error) => {
  console.error("Error updating staff:", error);
  process.exit(1);
});

