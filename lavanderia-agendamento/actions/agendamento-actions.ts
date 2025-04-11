"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema de validação para o formulário de agendamento
const agendamentoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  apartamento: z.string().min(1, "Apartamento é obrigatório"),
  data: z.string().refine((data) => !isNaN(Date.parse(data)), {
    message: "Data inválida",
  }),
  hora: z.coerce
    .number()
    .int()
    .min(8, "Horário deve ser entre 8h e 18h")
    .max(17, "Horário deve ser entre 8h e 18h"),
  maquinaId: z.coerce.number().int().min(1).max(4),
});

// Tipo para os dados do formulário
export type AgendamentoFormData = z.infer<typeof agendamentoSchema>;

// Tipo para o resultado da ação
export type AgendamentoActionResult = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

// Função para criar um novo agendamento
export async function criarAgendamento(
  formData: AgendamentoFormData
): Promise<AgendamentoActionResult> {
  try {
    // Validar os dados do formulário
    const validatedData = agendamentoSchema.parse(formData);

    // Criar objeto de data/hora
    const dataHora = new Date(validatedData.data);
    dataHora.setHours(validatedData.hora, 0, 0, 0);

    // Verificar se a data não é anterior a hoje
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (dataHora < hoje) {
      return {
        success: false,
        message: "Não é possível agendar para datas passadas",
      };
    }

    // Verificar se a data não é mais de 5 dias no futuro
    const limiteFuturo = new Date();
    limiteFuturo.setDate(limiteFuturo.getDate() + 5);
    limiteFuturo.setHours(23, 59, 59, 999);
    if (dataHora > limiteFuturo) {
      return {
        success: false,
        message:
          "Agendamentos só podem ser feitos com até 5 dias de antecedência",
      };
    }

    // Criar o objeto de agendamento
    const novoAgendamento = {
      nome: validatedData.nome,
      apartamento: validatedData.apartamento,
      dataHora: dataHora.toISOString(),
      maquinaId: validatedData.maquinaId,
    };

    // Revalidar a página para atualizar os dados
    revalidatePath("/");

    return {
      success: true,
      message: "Agendamento criado com sucesso!",
      data: novoAgendamento,
    };
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);

    // Verificar se é um erro de validação do Zod
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(err.message);
      });

      return {
        success: false,
        message: "Erro de validação",
        errors,
      };
    }

    return {
      success: false,
      message: "Ocorreu um erro ao processar o agendamento",
    };
  }
}
