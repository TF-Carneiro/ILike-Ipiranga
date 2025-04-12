import type React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AgendamentoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20 sm:pt-24">{children}</main>
      <Footer />
    </div>
  );
}
