"use server";

import { revalidatePath } from "next/cache";
import type { Agendamento, Aviso } from "./types";
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

// Input para criar ou editar um aviso
type AvisoInput = {
  titulo: string;
  mensagem: string;
  tipo: "info" | "aviso" | "urgente";
  ativo: boolean;
  criadoPor: string;
};

/**
 * Obtém todos os avisos
 * @returns Lista de avisos
 */
export async function obterAvisos(): Promise<Aviso[]> {
  try {
    const { data, error } = await supabase
      .from("avisos")
      .select("*")
      .order("data_criacao", { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar avisos: ${error.message}`);
    }

    // Converter os dados do formato do banco para o formato da aplicação
    return data.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      mensagem: item.mensagem,
      tipo: item.tipo,
      dataCriacao: item.data_criacao,
      ativo: item.ativo,
      criadoPor: item.criado_por,
    }));
  } catch (error) {
    console.error("Erro ao obter avisos:", error);
    throw error;
  }
}

/**
 * Obtém avisos ativos para exibição no mural
 * @returns Lista de avisos ativos
 */
export async function obterAvisosAtivos(): Promise<Aviso[]> {
  try {
    const { data, error } = await supabase
      .from("avisos")
      .select("*")
      .eq("ativo", true)
      .order("data_criacao", { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar avisos ativos: ${error.message}`);
    }

    // Converter os dados do formato do banco para o formato da aplicação
    return data.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      mensagem: item.mensagem,
      tipo: item.tipo,
      dataCriacao: item.data_criacao,
      ativo: item.ativo,
      criadoPor: item.criado_por,
    }));
  } catch (error) {
    console.error("Erro ao obter avisos ativos:", error);
    throw error;
  }
}

/**
 * Cria um novo aviso
 * @param input Dados do aviso
 * @returns Aviso criado
 */
export async function criarAviso(input: AvisoInput): Promise<Aviso> {
  try {
    const { data, error } = await supabase
      .from("avisos")
      .insert({
        titulo: input.titulo,
        mensagem: input.mensagem,
        tipo: input.tipo,
        ativo: input.ativo,
        criado_por: input.criadoPor,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar aviso: ${error.message}`);
    }

    // Revalidar a página para forçar uma atualização dos dados
    revalidatePath("/");
    revalidatePath("/admin/avisos");

    // Retornar o aviso formatado
    return {
      id: data.id,
      titulo: data.titulo,
      mensagem: data.mensagem,
      tipo: data.tipo,
      dataCriacao: data.data_criacao,
      ativo: data.ativo,
      criadoPor: data.criado_por,
    };
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    throw error;
  }
}

/**
 * Atualiza um aviso existente
 * @param id ID do aviso
 * @param input Dados atualizados do aviso
 * @returns Aviso atualizado
 */
export async function atualizarAviso(
  id: number,
  input: Partial<AvisoInput>
): Promise<Aviso> {
  try {
    // Preparar os dados para atualização
    const dadosAtualizados: any = {};
    if (input.titulo !== undefined) dadosAtualizados.titulo = input.titulo;
    if (input.mensagem !== undefined)
      dadosAtualizados.mensagem = input.mensagem;
    if (input.tipo !== undefined) dadosAtualizados.tipo = input.tipo;
    if (input.ativo !== undefined) dadosAtualizados.ativo = input.ativo;
    if (input.criadoPor !== undefined)
      dadosAtualizados.criado_por = input.criadoPor;

    // Atualizar no Supabase
    const { data, error } = await supabase
      .from("avisos")
      .update(dadosAtualizados)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao atualizar aviso: ${error.message}`);
    }

    // Revalidar a página para forçar uma atualização dos dados
    revalidatePath("/");
    revalidatePath("/admin/avisos");

    // Retornar o aviso formatado
    return {
      id: data.id,
      titulo: data.titulo,
      mensagem: data.mensagem,
      tipo: data.tipo,
      dataCriacao: data.data_criacao,
      ativo: data.ativo,
      criadoPor: data.criado_por,
    };
  } catch (error) {
    console.error("Erro ao atualizar aviso:", error);
    throw error;
  }
}

/**
 * Exclui um aviso
 * @param id ID do aviso
 * @returns true se sucesso, false se falha
 */
export async function excluirAviso(id: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("avisos").delete().eq("id", id);

    if (error) {
      throw new Error(`Erro ao excluir aviso: ${error.message}`);
    }

    // Revalidar a página para forçar uma atualização dos dados
    revalidatePath("/");
    revalidatePath("/admin/avisos");

    return true;
  } catch (error) {
    console.error("Erro ao excluir aviso:", error);
    return false;
  }
}
