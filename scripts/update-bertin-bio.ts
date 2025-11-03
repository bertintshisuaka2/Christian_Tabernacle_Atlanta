import { getDb } from "../server/db";
import { staff } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function updateBertinBio() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  // Update Pastor Bertin's biography
  const bertin = await db.select().from(staff).where(eq(staff.displayOrder, 1)).limit(1);
  if (bertin.length > 0) {
    const newBio = `Pastor Bertin is an end-time believer who stands firm on the truth that there is only one God, and the Bible is our absolute authority. He believes that the Word of God must be applied in the life of every true servant of God, as taught in John 3:34 - "For he whom God hath sent speaketh the words of God: for God giveth not the Spirit by measure unto him," 2 Timothy 3:16 - "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness," and Titus 2:1 - "But speak thou the things which become sound doctrine." His ministry is dedicated to proclaiming the unadulterated Word of God in these last days.`;
    
    await db.update(staff)
      .set({ bio: newBio })
      .where(eq(staff.id, bertin[0].id));
    console.log(`Updated biography for Pastor Bertin Tshisuaka`);
  }

  // Remove the second pastor (displayOrder = 2)
  const secondPastor = await db.select().from(staff).where(eq(staff.displayOrder, 2)).limit(1);
  if (secondPastor.length > 0) {
    await db.delete(staff).where(eq(staff.id, secondPastor[0].id));
    console.log(`Removed: ${secondPastor[0].name}`);
  }

  process.exit(0);
}

updateBertinBio().catch((error) => {
  console.error("Error updating biography:", error);
  process.exit(1);
});

