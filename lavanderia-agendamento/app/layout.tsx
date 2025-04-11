import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AgendamentoProvider } from "@/contexts/agendamento-context";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Agendamento de Lavanderia",
  description: "Agende horários para usar as máquinas de lavar",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, user-scalable=yes",
  themeColor: "#00A67E",
  generator: "v0.dev",
  manifest: "/manifest.json",
  applicationName: "I Like Ipiranga - Lavanderia",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "I Like Lavanderia",
  },
  formatDetection: {
    telephone: true,
    date: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} antialiased overscroll-none`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
