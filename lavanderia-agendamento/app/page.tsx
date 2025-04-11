import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";
import { MuralAvisos } from "@/components/mural-avisos";

/**
 * Página principal do sistema de agendamento
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />

      <main className="flex-1 p-3 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2">
              Condomínio I Like
            </h1>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-md mx-auto">
              Bem-vindo ao portal de serviços do Condomínio I Like Ipiranga
            </p>
          </div>

          {/* Mural de Avisos */}
          <div className="max-w-6xl mx-auto mb-6">
            <MuralAvisos />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-6xl mx-auto">
            {/* Card Lavanderia */}
            <Link href="/agendamento" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer dark:shadow-md dark:shadow-primary/20">
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-primary text-lg sm:text-xl">
                    Lavanderia
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                    Agende horários para utilizar as máquinas de lavar e secar
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Cards para Academia */}
            <Card className="h-full opacity-85 cursor-not-allowed dark:shadow-md dark:shadow-primary/20">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-primary text-lg sm:text-xl">
                  Academia
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Co-Working */}
            <Card className="h-full opacity-85 cursor-not-allowed dark:shadow-md dark:shadow-primary/20">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-primary text-lg sm:text-xl">
                  Co-Working
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Salão de Festas */}
            <Card className="h-full opacity-85 cursor-not-allowed dark:shadow-md dark:shadow-primary/20">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-primary text-lg sm:text-xl">
                  Salão de Festas
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Churrasqueira */}
            <Card className="h-full opacity-85 cursor-not-allowed dark:shadow-md dark:shadow-primary/20">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-primary text-lg sm:text-xl">
                  Churrasqueira
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Quadra */}
            <Card className="h-full opacity-85 cursor-not-allowed dark:shadow-md dark:shadow-primary/20">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-primary text-lg sm:text-xl">
                  Quadra
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
