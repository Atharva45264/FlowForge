import { UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">
        FlowForge
      </h1>

      <div className="mt-6">
        <UserButton />
      </div>

      <a
        href="/kanban"
        className="mt-6 rounded-lg bg-indigo-500 px-6 py-3"
      >
        Open Workspace
      </a>
    </main>
  );
}