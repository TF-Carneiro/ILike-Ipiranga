import Image from "next/image";
import { WashingMachine, Lock } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MenuCards } from "./menu-cards";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background shadow-md border-b z-50 h-[60px] sm:h-[70px]">
      <div className="container mx-auto h-full py-1 sm:py-2 px-2 sm:px-3 flex flex-row items-center justify-between gap-1 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/">
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
          <div className="flex items-center text-primary">
            <WashingMachine className="h-3 w-3 mr-0.5 sm:h-5 sm:w-5 sm:mr-2" />
            <span className="font-medium text-xs sm:text-base">Lavanderia</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-[10px] sm:text-sm text-muted-foreground hidden xs:block">
            Sistema de Agendamento
          </div>
          <MenuCards />
          <ThemeToggle />
          <Link href="/admin/login">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              title="Área Administrativa"
            >
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
