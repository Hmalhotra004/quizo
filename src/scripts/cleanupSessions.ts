import db from "@/lib/db";

async function deleteExpiredSessions() {
  const now = new Date();

  try {
    const deletedSessions = await db.session.deleteMany({
      where: {
        expires: { lt: now },
      },
    });

    console.log(`✅ Deleted ${deletedSessions.count} expired sessions.`);
  } catch (error) {
    console.error("❌ Error deleting expired sessions:", error);
  } finally {
    await db.$disconnect(); // Properly close the Prisma connection
    process.exit(); // Exit the script
  }
}

deleteExpiredSessions();
