"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut, User, Settings, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { MenuCards } from "./menu-cards";

export function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background shadow-md border-b z-50">
      <div className="container mx-auto py-2 sm:py-3 px-1 sm:px-3 flex flex-wrap justify-between items-center gap-1 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="flex items-center">
            <div className="relative h-7 w-20 sm:h-10 sm:w-28">
              <Image
                src="/logo.png"
                alt="I Like Ipiranga"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-700 mx-0.5 sm:mx-1 hidden sm:block" />
          <Link href="/admin" className="flex items-center">
            <span className="font-medium text-primary text-[10px] xs:text-xs sm:text-base truncate max-w-[120px] xs:max-w-none">
              Painel Administrativo
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <div className="flex items-center gap-0.5 sm:gap-2">
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <span className="text-[10px] xs:text-xs sm:text-sm font-medium max-w-[80px] truncate">
              {user?.username}
            </span>
          </div>
          <MenuCards />
          <Link href="/admin/avisos">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-0.5 text-[10px] h-6 sm:h-8 px-1 sm:px-2"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Avisos</span>
            </Button>
          </Link>
          <Link href="/admin/alterar-senha">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-0.5 text-[10px] h-6 sm:h-8 px-1 sm:px-2"
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
            className="flex items-center gap-0.5 text-[10px] h-6 sm:h-8 px-1 sm:px-2"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
