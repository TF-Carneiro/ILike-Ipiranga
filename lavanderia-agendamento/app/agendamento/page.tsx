import { CalendarioAgendamento } from "@/components/calendario-agendamento";
import { NovoAgendamentoButton } from "@/components/novo-agendamento-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AgendamentoPage() {
  return (
    <div className="container mx-auto py-4 px-3 flex-1">
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">
              Reservas
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <NovoAgendamentoButton />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="p-2 sm:p-6">
            <CalendarioAgendamento />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-3 sm:p-4 text-xs sm:text-sm text-card-foreground">
          <h3 className="font-medium text-primary mb-2">Informações:</h3>
          <ul className="space-y-1 list-disc pl-4 sm:pl-5 text-muted-foreground">
            <li>Horário de funcionamento: 08:00h às 18:00h todos os dias.</li>
            <li>Cada agendamento tem duração máxima de 1 hora.</li>
            <li>
              Agendamentos podem ser feitos com até 5 dias de antecedência.
            </li>
            <li>Em caso de dúvidas, entre em contato com a administração.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
