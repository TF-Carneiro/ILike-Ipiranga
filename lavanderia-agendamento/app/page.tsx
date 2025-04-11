import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";

/**
 * Página principal do sistema de agendamento
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />

      <main className="flex-1 p-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Condomínio I Like
            </h1>
            <p className="text-muted-foreground text-lg">
              Bem-vindo ao portal de serviços do Condomínio I Like Ipiranga
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card Lavanderia */}
            <Link href="/agendamento" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-primary">Lavanderia</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Agende horários para utilizar as máquinas de lavar e secar
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Cards para Academia */}
            <Card className="h-full opacity-70 cursor-not-allowed">
              <CardHeader>
                <CardTitle className="text-primary">Academia</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Co-Working */}
            <Card className="h-full opacity-70 cursor-not-allowed">
              <CardHeader>
                <CardTitle className="text-primary">Co-Working</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Salão de Festas */}
            <Card className="h-full opacity-70 cursor-not-allowed">
              <CardHeader>
                <CardTitle className="text-primary">Salão de Festas</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Churrasqueira */}
            <Card className="h-full opacity-70 cursor-not-allowed">
              <CardHeader>
                <CardTitle className="text-primary">Churrasqueira</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Página em desenvolvimento
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card para Quadra */}
            <Card className="h-full opacity-70 cursor-not-allowed">
              <CardHeader>
                <CardTitle className="text-primary">Quadra</CardTitle>
                <CardDescription className="text-muted-foreground">
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
