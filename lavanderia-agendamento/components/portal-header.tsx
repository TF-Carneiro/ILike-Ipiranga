import Image from "next/image";
import { Home, Lock } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MenuCards } from "./menu-cards";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PortalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background shadow-md border-b z-50 h-[60px] sm:h-[70px]">
      <div className="container mx-auto h-full py-1 sm:py-2 px-1.5 sm:px-4 flex flex-row items-center justify-between gap-1 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/">
            <div className="relative h-6 w-18 sm:h-10 sm:w-28">
              <Image
                src="/logo.png"
                alt="I Like Ipiranga"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-0.5 sm:mx-1 hidden xs:block" />
          <div className="flex items-center text-primary">
            <Home className="h-2.5 w-2.5 mr-0.5 sm:h-5 sm:w-5 sm:mr-2" />
            <span className="font-medium text-[10px] xs:text-xs sm:text-base">
              Portal do Morador
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <MenuCards />
          <ThemeToggle />
          <Link href="/admin/login">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 sm:h-9 sm:w-9"
              title="Área Administrativa"
            >
              <Lock className="h-2.5 w-2.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
