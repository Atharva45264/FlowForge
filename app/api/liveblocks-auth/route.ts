import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST() {
  const session = liveblocks.prepareSession(
    "atharva"
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