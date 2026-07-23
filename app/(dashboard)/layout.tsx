import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import DashboardBackground from "@/components/dashboard/dashboard-background";
import SearchProvider from "@/components/search/search-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-100">
      <div className="dashboard-shell flex min-h-screen overflow-hidden">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <DashboardBackground />
            {children}
            <SearchProvider />
          </div>
        </section>
      </div>
    </main>
  )
}