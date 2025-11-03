import { getDb } from "../server/db";
import { staff } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function removeSecondPastor() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  // Remove the second staff member (displayOrder = 2)
  const secondPastor = await db.select().from(staff).where(eq(staff.displayOrder, 2)).limit(1);
  if (secondPastor.length > 0) {
    await db.delete(staff).where(eq(staff.id, secondPastor[0].id));
    console.log(`Removed: ${secondPastor[0].name}`);
  } else {
    console.log("No staff member found with displayOrder = 2");
  }

  process.exit(0);
}

removeSecondPastor().catch((error) => {
  console.error("Error removing second pastor:", error);
  process.exit(1);
});

