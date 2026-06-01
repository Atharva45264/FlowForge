import { currentUser } from "@clerk/nextjs/server";

import { db, users } from "@/db";

export async function syncCurrentUserToDatabase() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    return null;
  }

  const name =
    user.fullName ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    email;

  await db
    .insert(users)
    .values({
      clerkId: user.id,
      email,
      name,
      imageUrl: user.imageUrl,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        clerkId: user.id,
        name,
        imageUrl: user.imageUrl,
        updatedAt: new Date(),
      },
    });

  return user;
}
