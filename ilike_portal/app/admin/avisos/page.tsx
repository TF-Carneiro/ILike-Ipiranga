"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { AdminHeader } from "@/components/admin-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Plus, AlertTriangle, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import type { Aviso } from "@/lib/types";
import Link from "next/link";

export default function AvisosPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [dialogoAberto, setDialogoAberto] = useState(false);
  const [confirmarExclusaoAberto, setConfirmarExclusaoAberto] = useState(false);
  const [avisoSelecionado, setAvisoSelecionado] = useState<Aviso | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Estado para o formulário
  const [formDados, setFormDados] = useState({
    titulo: "",
    mensagem: "",
    tipo: "info",
    ativo: true,
  });

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Buscar avisos
  const buscarAvisos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await fetch("/api/avisos");
      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
      }
      const dados = await resposta.json();
      setAvisos(dados);
    } catch (err: any) {
      setErro(err.message || "Erro ao carregar avisos");
    } finally {
      setCarregando(false);
    }
  };

  // Carregar avisos na montagem do componente
  useEffect(() => {
    if (isAuthenticated) {
      buscarAvisos();
    }
  }, [isAuthenticated]);

  // Manipular criação/edição de aviso
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dadosEnvio = {
        ...formDados,
        criadoPor: user?.username || "admin",
      };

      const url = modoEdicao
        ? `/api/avisos/${avisoSelecionado?.id}`
        : "/api/avisos";

      const metodo = modoEdicao ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosEnvio),
      });

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
      }

      // Atualizar a lista de avisos
      buscarAvisos();

      // Fechar o diálogo e limpar o form
      setDialogoAberto(false);
      limparFormulario();
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar aviso");
    }
  };

  // Manipular exclusão de aviso
  const handleExcluir = async () => {
    if (!avisoSelecionado) return;

    try {
      const resposta = await fetch(`/api/avisos/${avisoSelecionado.id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
      }

      // Atualizar a lista de avisos
      buscarAvisos();

      // Fechar o diálogo de confirmação
      setConfirmarExclusaoAberto(false);
      setAvisoSelecionado(null);
    } catch (err: any) {
      setErro(err.message || "Erro ao excluir aviso");
    }
  };

  // Abrir o diálogo para criar um novo aviso
  const abrirDialogoNovoAviso = () => {
    limparFormulario();
    setModoEdicao(false);
    setDialogoAberto(true);
  };

  // Abrir o diálogo para editar um aviso existente
  const abrirDialogoEditarAviso = (aviso: Aviso) => {
    setAvisoSelecionado(aviso);
    setFormDados({
      titulo: aviso.titulo,
      mensagem: aviso.mensagem,
      tipo: aviso.tipo,
      ativo: aviso.ativo,
    });
    setModoEdicao(true);
    setDialogoAberto(true);
  };

  // Abrir diálogo de confirmação de exclusão
  const confirmarExclusao = (aviso: Aviso) => {
    setAvisoSelecionado(aviso);
    setConfirmarExclusaoAberto(true);
  };

  // Limpar formulário
  const limparFormulario = () => {
    setFormDados({
      titulo: "",
      mensagem: "",
      tipo: "info",
      ativo: true,
    });
    setAvisoSelecionado(null);
  };

  // Renderizar badge de tipo
  const renderBadgeTipo = (tipo: string) => {
    switch (tipo) {
      case "info":
        return <Badge variant="secondary">Informativo</Badge>;
      case "aviso":
        return <Badge variant="outline">Aviso</Badge>;
      case "urgente":
        return <Badge variant="destructive">Urgente</Badge>;
      default:
        return <Badge>{tipo}</Badge>;
    }
  };

  // Formatar data
  const formatarData = (dataString: string) => {
    try {
      return format(new Date(dataString), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto py-6 pt-24 sm:pt-28 px-2 sm:px-4 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <Link href="/admin">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-[10px] sm:text-xs"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Voltar</span>
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg sm:text-2xl font-bold">
                Avisos
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Gerencie os avisos exibidos no mural
              </CardDescription>
            </div>
            <Button
              onClick={abrirDialogoNovoAviso}
              size="sm"
              className="text-xs h-8 sm:h-10"
            >
              <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              Novo
            </Button>
          </CardHeader>
          <CardContent>
            {erro && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md flex items-center text-xs sm:text-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {erro}
              </div>
            )}

            {carregando ? (
              <div className="text-center py-4 text-xs sm:text-sm">
                Carregando avisos...
              </div>
            ) : avisos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
                Nenhum aviso encontrado. Clique em "Novo" para criar.
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <div className="min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px] text-[10px] sm:text-xs">
                          ID
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs">
                          Título
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs">
                          Tipo
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                          Criado em
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs">
                          Status
                        </TableHead>
                        <TableHead className="text-right text-[10px] sm:text-xs w-[80px]">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {avisos.map((aviso) => (
                        <TableRow key={aviso.id}>
                          <TableCell className="font-medium text-[10px] sm:text-xs">
                            {aviso.id}
                          </TableCell>
                          <TableCell className="text-[10px] sm:text-xs max-w-[100px] truncate">
                            {aviso.titulo}
                          </TableCell>
                          <TableCell className="text-[10px] sm:text-xs">
                            {renderBadgeTipo(aviso.tipo)}
                          </TableCell>
                          <TableCell className="text-[10px] sm:text-xs whitespace-nowrap">
                            {formatarData(aviso.dataCriacao)}
                          </TableCell>
                          <TableCell className="text-[10px] sm:text-xs">
                            <Badge
                              variant={aviso.ativo ? "outline" : "secondary"}
                              className={
                                aviso.ativo
                                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 dark:border-green-600 text-[10px] sm:text-xs"
                                  : "dark:bg-gray-700 dark:text-gray-200 text-[10px] sm:text-xs"
                              }
                            >
                              {aviso.ativo ? "Ativo" : "Inativo"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => abrirDialogoEditarAviso(aviso)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => confirmarExclusao(aviso)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Diálogo para criar/editar aviso */}
        <Dialog open={dialogoAberto} onOpenChange={setDialogoAberto}>
          <DialogContent className="max-w-[90vw] sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="text-sm sm:text-base">
                {modoEdicao ? "Editar Aviso" : "Novo Aviso"}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                {modoEdicao
                  ? "Altere os dados do aviso conforme necessário."
                  : "Preencha os dados para criar um novo aviso."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-2 sm:py-4">
                <div className="grid gap-1 sm:gap-2">
                  <Label htmlFor="titulo" className="text-xs sm:text-sm">
                    Título
                  </Label>
                  <Input
                    id="titulo"
                    value={formDados.titulo}
                    onChange={(e) =>
                      setFormDados({ ...formDados, titulo: e.target.value })
                    }
                    required
                    className="text-xs sm:text-sm h-8 sm:h-10"
                  />
                </div>
                <div className="grid gap-1 sm:gap-2">
                  <Label htmlFor="mensagem" className="text-xs sm:text-sm">
                    Mensagem
                  </Label>
                  <Textarea
                    id="mensagem"
                    rows={3}
                    value={formDados.mensagem}
                    onChange={(e) =>
                      setFormDados({ ...formDados, mensagem: e.target.value })
                    }
                    required
                    className="text-xs sm:text-sm min-h-[60px] sm:min-h-[80px]"
                  />
                </div>
                <div className="grid gap-1 sm:gap-2">
                  <Label htmlFor="tipo" className="text-xs sm:text-sm">
                    Tipo
                  </Label>
                  <Select
                    value={formDados.tipo}
                    onValueChange={(valor) =>
                      setFormDados({ ...formDados, tipo: valor as any })
                    }
                  >
                    <SelectTrigger
                      id="tipo"
                      className="text-xs sm:text-sm h-8 sm:h-10"
                    >
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info" className="text-xs sm:text-sm">
                        Informativo
                      </SelectItem>
                      <SelectItem value="aviso" className="text-xs sm:text-sm">
                        Aviso
                      </SelectItem>
                      <SelectItem
                        value="urgente"
                        className="text-xs sm:text-sm"
                      >
                        Urgente
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={formDados.ativo}
                    onCheckedChange={(checked) =>
                      setFormDados({ ...formDados, ativo: checked })
                    }
                  />
                  <Label htmlFor="ativo" className="text-xs sm:text-sm">
                    Aviso ativo
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-xs sm:text-sm h-8 sm:h-10"
                >
                  {modoEdicao ? "Salvar" : "Criar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Diálogo de confirmação de exclusão */}
        <Dialog
          open={confirmarExclusaoAberto}
          onOpenChange={setConfirmarExclusaoAberto}
        >
          <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-sm sm:text-base">
                Confirmar Exclusão
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Tem certeza que deseja excluir o aviso &quot;
                {avisoSelecionado?.titulo}&quot;? Esta ação não pode ser
                desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setConfirmarExclusaoAberto(false)}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleExcluir}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
