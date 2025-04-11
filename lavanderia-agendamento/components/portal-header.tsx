import Image from "next/image";
import { Home, Lock } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PortalHeader() {
  return (
    <header className="bg-background shadow-sm border-b">
      <div className="container mx-auto py-3 px-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
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
          <div className="flex items-center text-primary">
            <Home className="h-4 w-4 mr-1 sm:h-5 sm:w-5 sm:mr-2" />
            <span className="font-medium text-sm sm:text-base">
              Portal do Morador
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/admin/login">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Área Administrativa"
            >
              <Lock className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
