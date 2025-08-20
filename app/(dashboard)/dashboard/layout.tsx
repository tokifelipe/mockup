// app/(dashboard)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { SupportChat } from "@/components/support-chat";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // En tu versión, cookies() => Promise<ReadonlyRequestCookies>
  const cookieStore = await cookies();
  const hasSession = Boolean(cookieStore.get("session")?.value);

  if (!hasSession) redirect("/login");

  return (
    <div className="flex h-screen bg-gray-50 app-shell">
      <div className="app-sidebar">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="app-mobile-header">
          <MobileHeader />
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      <div className="app-support">
        <SupportChat />
      </div>
    </div>
  );
}