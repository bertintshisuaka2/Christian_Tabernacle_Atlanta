import { nanoid } from "nanoid";
import { getDb } from "../server/db";
import { staff } from "../drizzle/schema";

async function seedStaff() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  const staffMembers = [
    {
      id: nanoid(),
      name: "Pastor John Smith",
      title: "Senior Pastor",
      bio: "Pastor John has been serving Christian Tabernacle of Atlanta for over 15 years. He is passionate about teaching the Word of God and shepherding the congregation with love and wisdom.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      email: "pastor.john@christiantabernacleatlanta.org",
      phone: "(678) 979-6811",
      displayOrder: 1,
      isActive: true,
    },
    {
      id: nanoid(),
      name: "Pastor Mary Johnson",
      title: "Associate Pastor",
      bio: "Pastor Mary leads our worship ministry and women's fellowship. Her heart for worship and prayer has blessed our congregation immensely.",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      email: "pastor.mary@christiantabernacleatlanta.org",
      phone: "(678) 979-6812",
      displayOrder: 2,
      isActive: true,
    },
    {
      id: nanoid(),
      name: "Minister David Brown",
      title: "Youth Pastor",
      bio: "Minister David works with our youth and young adults, helping them grow in their faith and discover their purpose in Christ.",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      email: "youth@christiantabernacleatlanta.org",
      phone: "(678) 979-6813",
      displayOrder: 3,
      isActive: true,
    },
  ];

  for (const member of staffMembers) {
    await db.insert(staff).values(member);
    console.log(`Added staff member: ${member.name}`);
  }

  console.log("Staff seeding completed!");
  process.exit(0);
}

seedStaff().catch((error) => {
  console.error("Error seeding staff:", error);
  process.exit(1);
});

