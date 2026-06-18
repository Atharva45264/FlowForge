import { auth } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return new Response(
      "Unauthorized",
      { status: 401 }
    );
  }

  const session =
    liveblocks.prepareSession(
      userId
    );

  session.allow(
    "*",
    session.FULL_ACCESS
  );

  const { body, status } =
    await session.authorize();

  return new Response(body, {
    status,
  });
}