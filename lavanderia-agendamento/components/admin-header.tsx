"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut, User, Settings, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <header className="bg-background shadow-sm border-b">
      <div className="container mx-auto py-3 px-3 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative h-8 w-24 sm:h-10 sm:w-28">
              <Image
                src="/logo.png"
                alt="I Like Ipiranga"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />
            <span className="font-medium text-primary text-sm sm:text-base">
              Painel Administrativo
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-medium">
              {user?.username}
            </span>
          </div>
          <Link href="/admin/avisos">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-xs h-8"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Avisos</span>
            </Button>
          </Link>
          <Link href="/admin/alterar-senha">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-xs h-8"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Alterar Senha</span>
            </Button>
          </Link>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs h-8"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
