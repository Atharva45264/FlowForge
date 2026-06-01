import { redirect } from "next/navigation";

import { syncCurrentUserToDatabase } from "@/lib/sync-user";

export default async function SyncUserPage() {
  await syncCurrentUserToDatabase();

  redirect("/");
}
