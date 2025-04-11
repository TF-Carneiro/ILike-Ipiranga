"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertTriangle,
  Info,
  Bell,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Aviso } from "@/lib/types";

// Número de caracteres a mostrar quando o aviso está recolhido
const LIMITE_CARACTERES = 150;

export function MuralAvisos() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [avisosExpandidos, setAvisosExpandidos] = useState<
    Record<number, boolean>
  >({});

  // Função para alternar o estado de expansão de um aviso
  const toggleExpansao = (id: number) => {
    setAvisosExpandidos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Verificar se uma mensagem é longa e precisa ser truncada
  const mensagemEhLonga = (mensagem: string) => {
    return mensagem.length > LIMITE_CARACTERES;
  };

  // Retornar a mensagem truncada ou completa dependendo do estado
  const formatarMensagem = (aviso: Aviso) => {
    if (!mensagemEhLonga(aviso.mensagem) || avisosExpandidos[aviso.id]) {
      return aviso.mensagem;
    }
    return `${aviso.mensagem.substring(0, LIMITE_CARACTERES)}...`;
  };

  // Buscar avisos ativos
  useEffect(() => {
    const buscarAvisosAtivos = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch("/api/avisos");
        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        }
        const dados = await resposta.json();

        // Filtrar apenas avisos ativos
        const avisosAtivos = dados.filter((aviso: Aviso) => aviso.ativo);

        setAvisos(avisosAtivos);
      } catch (err: any) {
        console.error("Erro ao buscar avisos:", err);
        setErro(err.message || "Erro ao carregar avisos");
      } finally {
        setCarregando(false);
      }
    };

    buscarAvisosAtivos();
  }, []);

  // Formatar data
  const formatarData = (dataString: string) => {
    try {
      return format(new Date(dataString), "dd/MM/yyyy", { locale: ptBR });
    } catch (error) {
      return "";
    }
  };

  // Obter ícone com base no tipo
  const getIcone = (tipo: string) => {
    switch (tipo) {
      case "info":
        return <Info className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "aviso":
        return <Bell className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "urgente":
        return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <Info className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  // Obter cor com base no tipo
  const getCorTipo = (tipo: string) => {
    switch (tipo) {
      case "info":
        return "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground";
      case "aviso":
        return "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-100";
      case "urgente":
        return "bg-red-50 text-red-800 dark:bg-red-900/70 dark:text-red-100";
      default:
        return "bg-muted/50 text-muted-foreground dark:bg-muted dark:text-muted-foreground";
    }
  };

  // Verificar se há avisos para mostrar
  if (!carregando && avisos.length === 0 && !erro) {
    return null; // Não exibir o mural se não houver avisos
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-1 p-2 sm:p-6 sm:pb-3">
        <CardTitle className="text-base sm:text-xl text-primary">
          Mural de Avisos
        </CardTitle>
        <CardDescription className="text-[10px] sm:text-sm">
          Avisos e informações importantes para os moradores
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
        {carregando ? (
          <div className="text-center py-2 sm:py-3 text-[10px] sm:text-sm text-muted-foreground">
            Carregando avisos...
          </div>
        ) : erro ? (
          <div className="text-center py-2 sm:py-3 text-[10px] sm:text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="h-2.5 w-2.5 sm:h-4 sm:w-4 inline mr-1" />
            {erro}
          </div>
        ) : (
          <div className="space-y-1.5 sm:space-y-3">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className={`p-1.5 sm:p-3 rounded-md ${getCorTipo(aviso.tipo)}`}
              >
                <div className="flex items-start gap-1.5 sm:gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcone(aviso.tipo)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-[11px] sm:text-base">
                        {aviso.titulo}
                      </h3>
                      <div className="text-[8px] sm:text-xs opacity-80 ml-1">
                        {formatarData(aviso.dataCriacao)}
                      </div>
                    </div>
                    <div className="mt-0.5 sm:mt-1">
                      <p className="text-[10px] sm:text-sm whitespace-pre-line">
                        {formatarMensagem(aviso)}
                      </p>
                      {mensagemEhLonga(aviso.mensagem) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-0.5 sm:mt-1 h-5 sm:h-6 px-1.5 sm:px-2 text-[8px] sm:text-xs"
                          onClick={() => toggleExpansao(aviso.id)}
                        >
                          {avisosExpandidos[aviso.id] ? (
                            <>
                              <ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                              Mostrar menos
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                              Mostrar mais
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
