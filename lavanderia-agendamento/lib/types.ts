/**
 * Tipo para representar um agendamento
 */
export type Agendamento = {
  id: number;
  nome: string;
  apartamento: string;
  dataHora: string;
  maquinaId: number;
};

/**
 * Tipo para representar um aviso no mural
 */
export type Aviso = {
  id: number;
  titulo: string;
  mensagem: string;
  tipo: "info" | "aviso" | "urgente";
  dataCriacao: string;
  ativo: boolean;
  criadoPor: string;
};
