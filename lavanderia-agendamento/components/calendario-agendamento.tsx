"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarioNavegacao } from "./calendario-navegacao";
import { useAgendamentos } from "@/contexts/agendamento-context";
import type { Agendamento } from "@/lib/types";
import { WashingMachine, Clock, Loader2 } from "lucide-react";

/**
 * Componente de calendário para visualização e agendamento
 * Exibe os horários disponíveis e agendamentos existentes
 */
export function CalendarioAgendamento() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [agendamentosDoDia, setAgendamentosDoDia] = useState<Agendamento[]>([]);
  const { agendamentos, getAgendamentosPorData, carregando } =
    useAgendamentos();
  const [visualizacaoMobile, setVisualizacaoMobile] = useState(false);

  // Configurações do calendário
  const horaInicio = 8;
  const horaFim = 18;
  const maquinas = [1, 2, 3, 4];
  const horarios = Array.from(
    { length: horaFim - horaInicio },
    (_, i) => horaInicio + i
  );

  // Detectar se estamos em uma tela pequena - ajustado para melhor detecção
  useEffect(() => {
    const verificarTamanho = () => {
      setVisualizacaoMobile(window.innerWidth < 768);
    };

    // Verificar tamanho inicial
    verificarTamanho();

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", verificarTamanho);

    return () => {
      window.removeEventListener("resize", verificarTamanho);
    };
  }, []);

  // Atualizar agendamentos quando a data selecionada mudar
  useEffect(() => {
    const agendamentosFiltrados = getAgendamentosPorData(dataSelecionada);
    setAgendamentosDoDia(agendamentosFiltrados);
  }, [dataSelecionada, getAgendamentosPorData, agendamentos]);

  // Exibir indicador de carregamento
  if (carregando) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Carregando agendamentos...</p>
      </div>
    );
  }

  // Renderização para dispositivos móveis - melhorada para melhor visualização
  if (visualizacaoMobile) {
    return (
      <div className="flex flex-col gap-4">
        <CalendarioNavegacao
          dataSelecionada={dataSelecionada}
          setDataSelecionada={setDataSelecionada}
        />

        {agendamentosDoDia.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground bg-muted/50 rounded-lg border border-border">
            <WashingMachine className="h-10 w-10 mx-auto mb-2 text-primary/50" />
            <p className="text-sm">
              Nenhum agendamento encontrado para esta data.
            </p>
            <p className="text-xs mt-1">
              Clique em "Agendar" para reservar um horário.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          {horarios.map((hora) => (
            <div
              key={`hora-${hora}`}
              className="border rounded-lg overflow-hidden border-border"
            >
              <div className="bg-primary text-primary-foreground p-2 font-medium flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {hora}:00
              </div>
              <div className="grid grid-cols-2 gap-2 p-2">
                {maquinas.map((maquina) => {
                  const agendamento = agendamentosDoDia.find(
                    (a) =>
                      a.maquinaId === maquina &&
                      new Date(a.dataHora).getHours() === hora
                  );

                  return (
                    <div
                      key={`slot-${hora}-${maquina}`}
                      className={`p-2 border rounded-md border-border ${
                        agendamento
                          ? "bg-primary/10 dark:bg-primary/20"
                          : "bg-card"
                      }`}
                    >
                      {agendamento ? (
                        <div className="flex flex-col gap-1 items-center text-center">
                          <Badge
                            variant="outline"
                            className="bg-background border-primary text-primary text-xs px-1 py-0 h-5"
                          >
                            {agendamento.nome}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Unid. {agendamento.apartamento}
                          </span>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                          Disponível
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderização para desktop
  return (
    <div className="flex flex-col gap-6">
      <CalendarioNavegacao
        dataSelecionada={dataSelecionada}
        setDataSelecionada={setDataSelecionada}
      />

      {agendamentosDoDia.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-muted/50 rounded-lg border border-border">
          <WashingMachine className="h-12 w-12 mx-auto mb-3 text-primary/50" />
          <p>Nenhum agendamento encontrado para esta data.</p>
          <p className="text-sm mt-1">
            Clique em "Novo Agendamento" para reservar um horário.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-[100px_repeat(4,1fr)] gap-2 rounded-lg overflow-hidden">
        <div className="font-medium text-center bg-primary text-primary-foreground p-3">
          Horário
        </div>
        <div className="font-medium text-center bg-primary text-primary-foreground p-3 col-span-4">
          Disponibilidade
        </div>

        {horarios.map((hora) => (
          <React.Fragment key={`hora-${hora}`}>
            <div className="py-3 text-center bg-muted font-medium">
              {hora}:00
            </div>

            {maquinas.map((maquina) => {
              const agendamento = agendamentosDoDia.find(
                (a) =>
                  a.maquinaId === maquina &&
                  new Date(a.dataHora).getHours() === hora
              );

              return (
                <div
                  key={`slot-${hora}-${maquina}`}
                  className={`p-3 border border-border ${
                    agendamento
                      ? "bg-primary/10 dark:bg-primary/20"
                      : "bg-card hover:bg-muted/50 transition-colors"
                  } flex flex-col items-center justify-center`}
                >
                  {agendamento ? (
                    <div className="flex flex-col gap-1 items-center text-center w-full">
                      <Badge
                        variant="outline"
                        className="bg-background border-primary text-primary"
                      >
                        {agendamento.nome}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Unidade {agendamento.apartamento}
                      </span>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                      Disponível
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
