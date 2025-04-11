"use server";

import { revalidatePath } from "next/cache";
import type { Agendamento } from "./types";
import { supabase } from "./supabase";

// Atualizar o tipo AgendamentoInput para tornar maquinaId opcional
type AgendamentoInput = {
  nome: string;
  telefone: string;
  dataHora: string;
  maquinaId?: number;
};

// Atualizar a função criarAgendamento para atribuir máquina automaticamente
export async function criarAgendamento(
  input: AgendamentoInput
): Promise<Agendamento> {
  const dataHora = new Date(input.dataHora);
  const hora = dataHora.getHours();

  // Validar horário de funcionamento
  if (hora < 8 || hora >= 18) {
    throw new Error(
      "Horário fora do período de funcionamento (08:00 às 18:00)"
    );
  }

  // Se não foi fornecido um maquinaId, encontrar uma máquina disponível
  let maquinaId = input.maquinaId;

  if (!maquinaId) {
    // Buscar agendamentos existentes para este horário
    const { data: agendamentosExistentes } = await supabase
      .from("agendamentos")
      .select("maquina_id")
      .eq("data_hora", dataHora.toISOString());

    // Verificar máquinas disponíveis
    const totalMaquinas = 4;
    const maquinasOcupadas =
      agendamentosExistentes?.map((a) => a.maquina_id) || [];

    for (let id = 1; id <= totalMaquinas; id++) {
      if (!maquinasOcupadas.includes(id)) {
        maquinaId = id;
        break;
      }
    }

    if (!maquinaId) {
      throw new Error("Não há máquinas disponíveis neste horário");
    }
  }

  // Criar o agendamento no Supabase
  const { data, error } = await supabase
    .from("agendamentos")
    .insert({
      nome: input.nome,
      apartamento: input.telefone,
      data_hora: input.dataHora,
      maquina_id: maquinaId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao criar agendamento: ${error.message}`);
  }

  // Revalidar a página para forçar uma atualização dos dados
  revalidatePath("/");

  // Retornar o agendamento formatado
  return {
    id: data.id,
    nome: data.nome,
    apartamento: data.apartamento,
    dataHora: data.data_hora,
    maquinaId: data.maquina_id,
  };
}
