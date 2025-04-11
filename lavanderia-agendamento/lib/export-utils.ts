import { format } from "date-fns";
import type { Agendamento } from "./types";

/**
 * Converte um array de agendamentos para uma string CSV
 * @param agendamentos Lista de agendamentos a serem convertidos
 * @returns String no formato CSV
 */
export function convertAgendamentosToCSV(agendamentos: Agendamento[]): string {
  // Cabeçalhos das colunas
  const headers = ["ID", "Nome", "Unidade", "Data", "Hora", "Máquina"];

  // Linhas de dados
  const rows = agendamentos.map((agendamento) => {
    const dataHora = new Date(agendamento.dataHora);
    return [
      agendamento.id,
      agendamento.nome,
      agendamento.apartamento,
      format(dataHora, "dd/MM/yyyy"),
      format(dataHora, "HH:mm"),
      `Máquina ${agendamento.maquinaId}`,
    ];
  });

  // Combinar cabeçalhos e linhas
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
}

/**
 * Faz o download de uma string como um arquivo
 * @param csvContent Conteúdo CSV a ser baixado
 * @param filename Nome do arquivo
 */
export function downloadCSV(csvContent: string, filename: string): void {
  // Adicionar BOM para garantir que caracteres especiais sejam exibidos corretamente no Excel
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8" });

  // Criar URL para o blob
  const url = URL.createObjectURL(blob);

  // Criar elemento de link para download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.display = "none";

  // Adicionar ao DOM, clicar e remover
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Liberar a URL
  URL.revokeObjectURL(url);
}

/**
 * Exporta agendamentos para um arquivo CSV
 * @param agendamentos Lista de agendamentos a serem exportados
 * @param filename Nome do arquivo (opcional)
 */
export function exportAgendamentosToCSV(
  agendamentos: Agendamento[],
  filename = "agendamentos.csv"
): void {
  const csvContent = convertAgendamentosToCSV(agendamentos);
  downloadCSV(csvContent, filename);
}
