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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertTriangle, Info, Bell } from "lucide-react";
import type { Aviso } from "@/lib/types";

export function MuralAvisos() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

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
    <Card>
      <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-3">
        <CardTitle className="text-lg sm:text-xl text-primary">
          Mural de Avisos
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Avisos e informações importantes para os moradores
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
        {carregando ? (
          <div className="text-center py-3 text-xs sm:text-sm text-muted-foreground">
            Carregando avisos...
          </div>
        ) : erro ? (
          <div className="text-center py-3 text-xs sm:text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
            {erro}
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className={`p-2 sm:p-3 rounded-md ${getCorTipo(aviso.tipo)}`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    {getIcone(aviso.tipo)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-xs sm:text-base">
                        {aviso.titulo}
                      </h3>
                      <div className="text-[10px] sm:text-xs opacity-80">
                        {formatarData(aviso.dataCriacao)}
                      </div>
                    </div>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm whitespace-pre-line">
                      {aviso.mensagem}
                    </p>
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
