import type React from "react";
import { AdminHeader } from "@/components/admin-header";
import { Footer } from "@/components/footer";

export default function DocumentacaoAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
