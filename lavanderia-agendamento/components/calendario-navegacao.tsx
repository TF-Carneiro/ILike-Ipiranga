"use client";

import { format, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalendarioNavegacaoProps = {
  dataSelecionada: Date;
  setDataSelecionada: (data: Date) => void;
};

/**
 * Componente de navegação do calendário
 * Permite navegar entre os dias
 */
export function CalendarioNavegacao({
  dataSelecionada,
  setDataSelecionada,
}: CalendarioNavegacaoProps) {
  // Função para navegar para o dia anterior
  const navegarParaAnterior = () => {
    setDataSelecionada(subDays(dataSelecionada, 1));
  };

  // Função para navegar para o próximo dia
  const navegarParaProximo = () => {
    setDataSelecionada(addDays(dataSelecionada, 1));
  };

  // Função auxiliar para capitalizar a primeira letra
  const capitalizar = (texto: string): string => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  // Formata a data para exibição
  const formatarData = () => {
    // Obter os componentes da data separadamente
    const diaDaSemana = capitalizar(
      format(dataSelecionada, "EEEE", { locale: ptBR })
    );
    const dia = format(dataSelecionada, "dd", { locale: ptBR });
    const mes = capitalizar(format(dataSelecionada, "MMMM", { locale: ptBR }));
    const ano = format(dataSelecionada, "yyyy", { locale: ptBR });

    // Formato completo para desktop com primeira letra maiúscula no dia da semana e mês
    const formatoCompleto = `${diaDaSemana}, ${dia} de ${mes} de ${ano}`;

    // Formato reduzido para mobile
    const formatoReduzido = format(dataSelecionada, "dd/MM/yyyy", {
      locale: ptBR,
    });

    return (
      <>
        <span className="hidden sm:inline">{formatoCompleto}</span>
        <span className="sm:hidden">{formatoReduzido}</span>
      </>
    );
  };

  return (
    <div className="flex items-center justify-between bg-card p-3 sm:p-4 rounded-lg shadow-sm border border-border">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-base sm:text-xl font-semibold text-foreground">
          {formatarData()}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={navegarParaAnterior}
          className="border-border h-8 w-8 sm:h-10 sm:w-10"
          aria-label="Dia anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={navegarParaProximo}
          className="border-border h-8 w-8 sm:h-10 sm:w-10"
          aria-label="Próximo dia"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
