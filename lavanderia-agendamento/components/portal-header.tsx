import Image from "next/image";
import { Home, Lock } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PortalHeader() {
  return (
    <header className="bg-background shadow-sm border-b">
      <div className="container mx-auto py-2 sm:py-3 px-2 sm:px-4 flex flex-col xs:flex-row items-center justify-between gap-1 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative h-7 w-20 sm:h-10 sm:w-28">
            <Image
              src="/logo.png"
              alt="I Like Ipiranga"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-700 mx-0.5 sm:mx-1 hidden xs:block" />
          <div className="flex items-center text-primary">
            <Home className="h-3 w-3 mr-0.5 sm:h-5 sm:w-5 sm:mr-2" />
            <span className="font-medium text-xs sm:text-base">
              Portal do Morador
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href="/admin/login">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-9 sm:w-9"
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
