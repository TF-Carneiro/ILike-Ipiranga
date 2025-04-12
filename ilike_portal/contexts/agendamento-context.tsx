"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Agendamento } from "@/lib/types";
import { supabase } from "@/lib/supabase";

// Interface para o contexto
interface AgendamentoContextType {
  agendamentos: Agendamento[];
  adicionarAgendamento: (
    agendamento: Omit<Agendamento, "id">
  ) => Promise<Agendamento>;
  editarAgendamento: (
    id: number,
    agendamento: Partial<Omit<Agendamento, "id">>
  ) => Promise<Agendamento | null>;
  excluirAgendamento: (id: number) => Promise<boolean>;
  excluirVariosAgendamentos: (ids: number[]) => Promise<boolean>;
  getAgendamento: (id: number) => Agendamento | null;
  getAgendamentosPorData: (data: Date) => Agendamento[];
  encontrarMaquinaDisponivel: (data: Date, hora: number) => number | null;
  carregando: boolean;
  setCarregando: (estado: boolean) => void;
  erro: string | null;
  recarregarAgendamentos: () => Promise<void>;
}

// Criar o contexto
const AgendamentoContext = createContext<AgendamentoContextType | undefined>(
  undefined
);

/**
 * Provider do contexto de agendamentos
 * Gerencia o estado dos agendamentos e fornece métodos para manipulá-los
 */
export function AgendamentoProvider({ children }: { children: ReactNode }) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Função para carregar agendamentos do Supabase
  const carregarAgendamentos = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);

      const { data, error } = await supabase
        .from("agendamentos")
        .select("*")
        .order("data_hora", { ascending: true });

      if (error) {
        throw error;
      }

      // Converter os dados do formato do banco para o formato da aplicação
      const agendamentosFormatados: Agendamento[] = data.map((item) => ({
        id: item.id,
        nome: item.nome,
        apartamento: item.apartamento,
        dataHora: item.data_hora,
        maquinaId: item.maquina_id,
      }));

      setAgendamentos(agendamentosFormatados);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      setErro("Falha ao carregar agendamentos");
      setAgendamentos([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  // Adicionar um listener para mudanças na tabela de agendamentos
  useEffect(() => {
    const channel = supabase
      .channel("agendamentos_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "agendamentos",
        },
        () => {
          // Recarregar agendamentos quando houver qualquer mudança
          carregarAgendamentos();
        }
      )
      .subscribe();

    // Limpar o listener ao desmontar o componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, [carregarAgendamentos]);

  // Carregar agendamentos inicialmente
  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  // Função pública para forçar o recarregamento de agendamentos
  const recarregarAgendamentos = useCallback(async () => {
    await carregarAgendamentos();
  }, [carregarAgendamentos]);

  /**
   * Obtém um agendamento específico por ID
   */
  const getAgendamento = useCallback(
    (id: number): Agendamento | null => {
      return agendamentos.find((a) => a.id === id) || null;
    },
    [agendamentos]
  );

  /**
   * Adiciona um novo agendamento
   */
  const adicionarAgendamento = useCallback(
    async (novoAgendamento: Omit<Agendamento, "id">): Promise<Agendamento> => {
      try {
        setCarregando(true);

        // Inserir no Supabase
        const { data, error } = await supabase
          .from("agendamentos")
          .insert({
            nome: novoAgendamento.nome,
            apartamento: novoAgendamento.apartamento,
            data_hora: novoAgendamento.dataHora,
            maquina_id: novoAgendamento.maquinaId,
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Converter para o formato da aplicação
        const agendamentoAdicionado: Agendamento = {
          id: data.id,
          nome: data.nome,
          apartamento: data.apartamento,
          dataHora: data.data_hora,
          maquinaId: data.maquina_id,
        };

        // Supabase vai acionar o canal de tempo real, mas vamos atualizar o estado local também
        // para garantir uma experiência de usuário mais responsiva
        setAgendamentos((prev) => [...prev, agendamentoAdicionado]);

        return agendamentoAdicionado;
      } catch (error) {
        console.error("Erro ao adicionar agendamento:", error);
        setErro("Falha ao adicionar agendamento");
        throw error;
      } finally {
        setCarregando(false);
      }
    },
    []
  );

  /**
   * Edita um agendamento existente
   */
  const editarAgendamento = useCallback(
    async (
      id: number,
      dadosAtualizados: Partial<Omit<Agendamento, "id">>
    ): Promise<Agendamento | null> => {
      try {
        setCarregando(true);

        // Preparar os dados para atualização
        const dadosParaAtualizar: any = {};
        if (dadosAtualizados.nome !== undefined)
          dadosParaAtualizar.nome = dadosAtualizados.nome;
        if (dadosAtualizados.apartamento !== undefined)
          dadosParaAtualizar.apartamento = dadosAtualizados.apartamento;
        if (dadosAtualizados.dataHora !== undefined)
          dadosParaAtualizar.data_hora = dadosAtualizados.dataHora;
        if (dadosAtualizados.maquinaId !== undefined)
          dadosParaAtualizar.maquina_id = dadosAtualizados.maquinaId;

        // Atualizar no Supabase
        const { data, error } = await supabase
          .from("agendamentos")
          .update(dadosParaAtualizar)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          return null;
        }

        // Converter para o formato da aplicação
        const agendamentoAtualizado: Agendamento = {
          id: data.id,
          nome: data.nome,
          apartamento: data.apartamento,
          dataHora: data.data_hora,
          maquinaId: data.maquina_id,
        };

        // Supabase vai acionar o canal de tempo real, mas vamos atualizar o estado local também
        // para garantir uma experiência de usuário mais responsiva
        setAgendamentos((prev) =>
          prev.map((a) => (a.id === id ? agendamentoAtualizado : a))
        );

        return agendamentoAtualizado;
      } catch (error) {
        console.error(`Erro ao editar agendamento ${id}:`, error);
        setErro("Falha ao editar agendamento");
        throw error;
      } finally {
        setCarregando(false);
      }
    },
    []
  );

  /**
   * Exclui um agendamento
   */
  const excluirAgendamento = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        setCarregando(true);

        // Excluir do Supabase
        const { error } = await supabase
          .from("agendamentos")
          .delete()
          .eq("id", id);

        if (error) {
          throw error;
        }

        // Supabase vai acionar o canal de tempo real, mas vamos atualizar o estado local também
        // para garantir uma experiência de usuário mais responsiva
        setAgendamentos((prev) => prev.filter((a) => a.id !== id));

        return true;
      } catch (error) {
        console.error(`Erro ao excluir agendamento ${id}:`, error);
        setErro("Falha ao excluir agendamento");
        throw error;
      } finally {
        setCarregando(false);
      }
    },
    []
  );

  /**
   * Exclui vários agendamentos de uma vez
   */
  const excluirVariosAgendamentos = useCallback(
    async (ids: number[]): Promise<boolean> => {
      try {
        if (ids.length === 0) return true;

        setCarregando(true);

        // Excluir do Supabase
        const { error } = await supabase
          .from("agendamentos")
          .delete()
          .in("id", ids);

        if (error) {
          throw error;
        }

        // Supabase vai acionar o canal de tempo real, mas vamos atualizar o estado local também
        // para garantir uma experiência de usuário mais responsiva
        setAgendamentos((prev) => prev.filter((a) => !ids.includes(a.id)));

        return true;
      } catch (error) {
        console.error(`Erro ao excluir múltiplos agendamentos:`, error);
        setErro("Falha ao excluir agendamentos");
        throw error;
      } finally {
        setCarregando(false);
      }
    },
    []
  );

  /**
   * Obtém agendamentos para uma data específica
   */
  const getAgendamentosPorData = useCallback(
    (data: Date): Agendamento[] => {
      return agendamentos.filter((agendamento) => {
        const dataAgendamento = new Date(agendamento.dataHora);
        return (
          dataAgendamento.getDate() === data.getDate() &&
          dataAgendamento.getMonth() === data.getMonth() &&
          dataAgendamento.getFullYear() === data.getFullYear()
        );
      });
    },
    [agendamentos]
  );

  /**
   * Encontra uma máquina disponível para um horário específico
   */
  const encontrarMaquinaDisponivel = useCallback(
    (data: Date, hora: number): number | null => {
      // Total de máquinas disponíveis
      const totalMaquinas = 4;

      // Cria uma data com a hora específica
      const dataHora = new Date(data);
      dataHora.setHours(hora, 0, 0, 0);

      // Verifica cada máquina até encontrar uma disponível
      for (let maquinaId = 1; maquinaId <= totalMaquinas; maquinaId++) {
        const ocupada = agendamentos.some((agendamento) => {
          const dataAgendamento = new Date(agendamento.dataHora);
          return (
            agendamento.maquinaId === maquinaId &&
            dataAgendamento.getDate() === dataHora.getDate() &&
            dataAgendamento.getMonth() === dataHora.getMonth() &&
            dataAgendamento.getFullYear() === dataHora.getFullYear() &&
            dataAgendamento.getHours() === dataHora.getHours()
          );
        });

        if (!ocupada) {
          return maquinaId;
        }
      }

      // Se nenhuma máquina estiver disponível, retorna null
      return null;
    },
    [agendamentos]
  );

  const contextValue = {
    agendamentos,
    adicionarAgendamento,
    editarAgendamento,
    excluirAgendamento,
    excluirVariosAgendamentos,
    getAgendamento,
    getAgendamentosPorData,
    encontrarMaquinaDisponivel,
    carregando,
    setCarregando,
    erro,
    recarregarAgendamentos,
  };

  return (
    <AgendamentoContext.Provider value={contextValue}>
      {children}
    </AgendamentoContext.Provider>
  );
}

/**
 * Hook para usar o contexto de agendamentos
 */
export function useAgendamentos() {
  const context = useContext(AgendamentoContext);
  if (context === undefined) {
    throw new Error(
      "useAgendamentos deve ser usado dentro de um AgendamentoProvider"
    );
  }
  return context;
}
