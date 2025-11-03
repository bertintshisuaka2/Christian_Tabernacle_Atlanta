import { drizzle } from "drizzle-orm/mysql2";
import { events } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

async function updateEventPhoto() {
  try {
    // Update the first event with the new photo
    const result = await db
      .update(events)
      .set({ imageUrl: '/event-photo.png' })
      .execute();

    console.log('✅ Event photo updated successfully');
  } catch (error) {
    console.error('❌ Error updating event photo:', error);
    process.exit(1);
  }
  process.exit(0);
}

updateEventPhoto();

