"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAgendamentos } from "@/contexts/agendamento-context";
import { AdminHeader } from "@/components/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format, parse } from "date-fns";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";
import { Footer } from "@/components/footer";

/**
 * Página de edição de agendamento
 * Permite editar os detalhes de um agendamento existente
 */
export default function EditarAgendamentoPage() {
  const params = useParams();
  const router = useRouter();
  const { getAgendamento, editarAgendamento } = useAgendamentos();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    apartamento: "",
    data: "",
    hora: "",
    maquinaId: "",
  });

  // Carregar dados do agendamento
  useEffect(() => {
    const id = Number(params.id);
    if (isNaN(id)) {
      toast({
        title: "Erro",
        description: "ID de agendamento inválido",
        variant: "destructive",
      });
      router.push("/admin");
      return;
    }

    setIsLoading(true);
    const agendamento = getAgendamento(id);

    if (!agendamento) {
      toast({
        title: "Erro",
        description: "Agendamento não encontrado",
        variant: "destructive",
      });
      router.push("/admin");
      return;
    }

    const dataHora = new Date(agendamento.dataHora);

    setFormData({
      nome: agendamento.nome,
      apartamento: agendamento.apartamento,
      data: format(dataHora, "yyyy-MM-dd"),
      hora: format(dataHora, "HH:mm"),
      maquinaId: agendamento.maquinaId.toString(),
    });

    setIsLoading(false);
  }, [params.id, getAgendamento, router, toast]);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para lidar com mudanças nos campos de select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para salvar as alterações
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      // Validar campos
      if (
        !formData.nome ||
        !formData.apartamento ||
        !formData.data ||
        !formData.hora ||
        !formData.maquinaId
      ) {
        toast({
          title: "Erro",
          description: "Todos os campos são obrigatórios",
          variant: "destructive",
        });
        return;
      }

      // Criar objeto de data/hora
      const [hora, minuto] = formData.hora.split(":");
      const dataHora = parse(
        `${formData.data} ${hora}:${minuto}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );

      // Atualizar agendamento
      const id = Number(params.id);
      const resultado = await editarAgendamento(id, {
        nome: formData.nome,
        apartamento: formData.apartamento,
        dataHora: dataHora.toISOString(),
        maquinaId: Number(formData.maquinaId),
      });

      if (resultado) {
        toast({
          title: "Sucesso",
          description: "Agendamento atualizado com sucesso",
        });

        // Aguardar um momento para garantir que o Supabase sincronizou os dados
        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o agendamento",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o agendamento",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader />

        <main className="container mx-auto py-6 px-4 flex-1">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Link
                href="/admin"
                className="flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar para a lista
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Editar Agendamento</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          disabled={isSaving}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="apartamento">Unidade</Label>
                        <Input
                          id="apartamento"
                          name="apartamento"
                          value={formData.apartamento}
                          onChange={handleChange}
                          disabled={isSaving}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="data">Data</Label>
                          <Input
                            id="data"
                            name="data"
                            type="date"
                            value={formData.data}
                            onChange={handleChange}
                            disabled={isSaving}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="hora">Hora</Label>
                          <Select
                            value={formData.hora}
                            onValueChange={(value) =>
                              handleSelectChange("hora", value)
                            }
                            disabled={isSaving}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um horário" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => {
                                const hora = i + 8;
                                return (
                                  <SelectItem key={hora} value={`${hora}:00`}>
                                    {hora}:00
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maquinaId">Máquina</Label>
                        <Select
                          value={formData.maquinaId}
                          onValueChange={(value) =>
                            handleSelectChange("maquinaId", value)
                          }
                          disabled={isSaving}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma máquina" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4].map((id) => (
                              <SelectItem key={id} value={id.toString()}>
                                Máquina {id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.push("/admin")}
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading || isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
}
