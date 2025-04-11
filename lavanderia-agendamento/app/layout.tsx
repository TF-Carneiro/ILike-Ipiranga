import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AgendamentoProvider } from "@/contexts/agendamento-context";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

// Reverter para o título original do documento
export const metadata: Metadata = {
  title: "Sistema de Agendamento de Lavanderia",
  description: "Agende horários para usar as máquinas de lavar",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AgendamentoProvider>
              {children}
              <Toaster />
            </AgendamentoProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
