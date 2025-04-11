"use client";

import { useState, useEffect } from "react";
import { useAgendamentos } from "@/contexts/agendamento-context";
import { AdminHeader } from "@/components/admin-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Search,
  ArrowUpDown,
  Calendar,
  Clock,
  Loader2,
  Trash2,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";
import { Checkbox } from "@/components/ui/checkbox";
import { exportAgendamentosToCSV } from "@/lib/export-utils";
import { Footer } from "@/components/footer";

/**
 * Página de administração do sistema
 * Permite visualizar agendamentos e excluir agendamentos selecionados
 */
export default function AdminPage() {
  const {
    agendamentos,
    carregando,
    excluirVariosAgendamentos,
    excluirAgendamento,
    setCarregando,
  } = useAgendamentos();
  const [filteredAgendamentos, setFilteredAgendamentos] =
    useState(agendamentos);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAgendamentos, setSelectedAgendamentos] = useState<number[]>(
    []
  );
  const [selectAll, setSelectAll] = useState(false);
  const [deleteMultipleDialogOpen, setDeleteMultipleDialogOpen] =
    useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState<number | null>(
    null
  );
  const { toast } = useToast();

  // Detectar se estamos em uma tela pequena - com segurança para SSR
  useEffect(() => {
    const verificarTamanho = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar tamanho inicial
    verificarTamanho();

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", verificarTamanho);

    return () => {
      window.removeEventListener("resize", verificarTamanho);
    };
  }, []);

  // Atualizar agendamentos filtrados quando os agendamentos mudarem
  useEffect(() => {
    handleSearch(searchTerm);
  }, [agendamentos, searchTerm]);

  // Função para lidar com a pesquisa
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredAgendamentos(agendamentos);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = agendamentos.filter(
      (agendamento) =>
        agendamento.nome.toLowerCase().includes(lowerTerm) ||
        agendamento.apartamento.toLowerCase().includes(lowerTerm) ||
        format(new Date(agendamento.dataHora), "dd/MM/yyyy").includes(
          lowerTerm
        ) ||
        format(new Date(agendamento.dataHora), "HH:mm").includes(lowerTerm) ||
        `Máquina ${agendamento.maquinaId}`.toLowerCase().includes(lowerTerm)
    );
    setFilteredAgendamentos(filtered);
  };

  // Função para ordenar agendamentos
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredAgendamentos].sort((a, b) => {
      if (key === "dataHora") {
        const dateA = new Date(a[key]).getTime();
        const dateB = new Date(b[key]).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (key === "maquinaId") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }

      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredAgendamentos(sorted);
  };

  // Função para lidar com a seleção de um agendamento
  const handleSelectAgendamento = (id: number) => {
    setSelectedAgendamentos((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Função para selecionar/desselecionar todos os agendamentos
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAgendamentos([]);
    } else {
      setSelectedAgendamentos(filteredAgendamentos.map((a) => a.id));
    }
    setSelectAll(!selectAll);
  };

  // Função para confirmar exclusão de múltiplos agendamentos
  const confirmDeleteMultiple = () => {
    if (selectedAgendamentos.length === 0) {
      toast({
        title: "Nenhum agendamento selecionado",
        description: "Selecione pelo menos um agendamento para excluir.",
        variant: "destructive",
      });
      return;
    }
    setDeleteMultipleDialogOpen(true);
  };

  // Função para excluir múltiplos agendamentos
  const deleteMultipleAgendamentos = async () => {
    try {
      setCarregando(true);
      const success = await excluirVariosAgendamentos(selectedAgendamentos);
      if (success) {
        toast({
          title: "Agendamentos excluídos",
          description: `${selectedAgendamentos.length} agendamento(s) foram excluídos com sucesso.`,
        });
        // Limpar seleções após exclusão bem-sucedida
        setSelectedAgendamentos([]);
        setSelectAll(false);
      } else {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir os agendamentos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao excluir os agendamentos.",
        variant: "destructive",
      });
    } finally {
      setCarregando(false);
      setDeleteMultipleDialogOpen(false);
    }
  };

  // Função para confirmar exclusão de um agendamento individual
  const confirmDeleteAgendamento = (id: number) => {
    setAgendamentoToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Função para excluir um agendamento individual
  const deleteAgendamento = async () => {
    if (!agendamentoToDelete) return;

    try {
      setCarregando(true);
      const success = await excluirAgendamento(agendamentoToDelete);
      if (success) {
        toast({
          title: "Agendamento excluído",
          description: "O agendamento foi excluído com sucesso.",
        });
      } else {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o agendamento.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao excluir o agendamento.",
        variant: "destructive",
      });
    } finally {
      setCarregando(false);
      setDeleteDialogOpen(false);
      setAgendamentoToDelete(null);
    }
  };

  // Função para exportar agendamentos para Excel (CSV)
  const handleExportToExcel = () => {
    try {
      // Usar os agendamentos filtrados se houver pesquisa, senão usar todos
      const dataToExport = searchTerm ? filteredAgendamentos : agendamentos;

      // Nome do arquivo com data atual
      const hoje = format(new Date(), "dd-MM-yyyy");
      const filename = `agendamentos_${hoje}.csv`;

      // Exportar
      exportAgendamentosToCSV(dataToExport, filename);

      toast({
        title: "Exportação concluída",
        description: `${dataToExport.length} agendamentos exportados com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao exportar agendamentos:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os agendamentos.",
        variant: "destructive",
      });
    }
  };

  // Exibir indicador de carregamento
  if (carregando) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background flex flex-col">
          <AdminHeader />
          <div className="flex-1 flex items-center justify-center pt-24 sm:pt-28">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Carregando agendamentos...
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </AuthGuard>
    );
  }

  // Renderização para dispositivos móveis
  const renderMobileView = () => (
    <div className="flex flex-col gap-4 px-2">
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold text-foreground">
          Visualizar Agendamentos
        </h1>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-8 w-full h-8 text-xs"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-1 justify-between">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-[10px] h-7 px-1.5"
              onClick={handleExportToExcel}
              disabled={agendamentos.length === 0}
            >
              <Calendar className="h-3 w-3" />
              <span>CSV</span>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-1 text-[10px] h-7 px-1.5"
              onClick={confirmDeleteMultiple}
              disabled={selectedAgendamentos.length === 0}
            >
              <Trash2 className="h-3 w-3" />
              <span>Excluir ({selectedAgendamentos.length})</span>
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="text-[10px] h-7 px-1.5"
              >
                Ver Calendário
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {filteredAgendamentos.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground bg-muted/50 rounded-lg border border-border">
          <p className="text-xs">Nenhum agendamento encontrado</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <Checkbox
              id="select-all-mobile"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
              className="h-3 w-3"
            />
            <label
              htmlFor="select-all-mobile"
              className="text-[10px] font-medium"
            >
              Selecionar todos
            </label>
          </div>

          {filteredAgendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className="bg-card rounded-lg border border-border p-2 text-xs"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-1">
                  <Checkbox
                    id={`select-${agendamento.id}-mobile`}
                    checked={selectedAgendamentos.includes(agendamento.id)}
                    onCheckedChange={() =>
                      handleSelectAgendamento(agendamento.id)
                    }
                    className="h-3 w-3"
                  />
                  <div>
                    <h3 className="font-medium text-xs">{agendamento.nome}</h3>
                    <p className="text-[10px] text-muted-foreground">
                      Unid. {agendamento.apartamento}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    asChild
                  >
                    <Link href={`/admin/editar/${agendamento.id}`}>
                      <Pencil className="h-3 w-3" />
                      <span className="sr-only">Editar</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={() => confirmDeleteAgendamento(agendamento.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 text-[10px]">
                <div className="flex items-center">
                  <Calendar className="h-2.5 w-2.5 mr-0.5 text-muted-foreground" />
                  {format(new Date(agendamento.dataHora), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-2.5 w-2.5 mr-0.5 text-muted-foreground" />
                  {format(new Date(agendamento.dataHora), "HH:mm")}
                </div>
                <div className="ml-auto">Máq. {agendamento.maquinaId}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Renderização para desktop
  const renderDesktopView = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">
          Visualizar Agendamentos
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar agendamentos..."
              className="pl-9 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleExportToExcel}
            disabled={agendamentos.length === 0}
          >
            <Calendar className="h-4 w-4" />
            <span>Exportar CSV</span>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-1"
            onClick={confirmDeleteMultiple}
            disabled={selectedAgendamentos.length === 0}
          >
            <Trash2 className="h-4 w-4" />
            <span>Excluir Selecionados ({selectedAgendamentos.length})</span>
          </Button>

          <Link href="/">
            <Button variant="outline" size="sm">
              Ver Calendário
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    id="select-all"
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                    aria-label="Selecionar todos os agendamentos"
                  />
                </TableHead>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("nome")}
                    aria-label="Ordenar por nome"
                  >
                    Nome
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("apartamento")}
                    aria-label="Ordenar por unidade"
                  >
                    Unidade
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("dataHora")}
                    aria-label="Ordenar por data"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Data
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("dataHora")}
                    aria-label="Ordenar por hora"
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Hora
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("maquinaId")}
                    aria-label="Ordenar por máquina"
                  >
                    Máquina
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgendamentos.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Nenhum agendamento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredAgendamentos.map((agendamento) => (
                  <TableRow key={agendamento.id}>
                    <TableCell>
                      <Checkbox
                        id={`select-${agendamento.id}`}
                        checked={selectedAgendamentos.includes(agendamento.id)}
                        onCheckedChange={() =>
                          handleSelectAgendamento(agendamento.id)
                        }
                        aria-label={`Selecionar agendamento de ${agendamento.nome}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {agendamento.id}
                    </TableCell>
                    <TableCell>{agendamento.nome}</TableCell>
                    <TableCell>{agendamento.apartamento}</TableCell>
                    <TableCell>
                      {format(new Date(agendamento.dataHora), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      {format(new Date(agendamento.dataHora), "HH:mm")}
                    </TableCell>
                    <TableCell>Máquina {agendamento.maquinaId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={`/admin/editar/${agendamento.id}`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() =>
                            confirmDeleteAgendamento(agendamento.id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader />
        <div className="flex-1 p-3 sm:p-6 pt-24 sm:pt-28">
          <div className="container mx-auto">
            {isMobile ? renderMobileView() : renderDesktopView()}
          </div>
        </div>

        {/* Diálogo de confirmação para excluir múltiplos agendamentos */}
        <Dialog
          open={deleteMultipleDialogOpen}
          onOpenChange={setDeleteMultipleDialogOpen}
        >
          <DialogContent className="max-w-[90vw] sm:max-w-md p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg">
                Confirmar exclusão em massa
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Tem certeza que deseja excluir {selectedAgendamentos.length}{" "}
                agendamento(s)? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setDeleteMultipleDialogOpen(false)}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={deleteMultipleAgendamentos}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                Excluir Selecionados
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de confirmação para excluir um agendamento individual */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-[90vw] sm:max-w-md p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg">Confirmar exclusão</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Tem certeza que deseja excluir este agendamento? Esta ação não
                pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={deleteAgendamento}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </AuthGuard>
  );
}
