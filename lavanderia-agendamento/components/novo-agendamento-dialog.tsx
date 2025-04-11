"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAgendamentos } from "@/contexts/agendamento-context";
import { CalendarioPersonalizado } from "./calendario-personalizado";

// Schema de validação do formulário
const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  apartamento: z.string().min(1, "Informe sua unidade."),
  data: z.date({
    required_error: "Por favor selecione uma data.",
  }),
  hora: z
    .string({
      required_error: "Informe um horário.",
    })
    .refine((val) => {
      const hora = Number.parseInt(val);
      return hora >= 8 && hora < 18;
    }, "Horário deve ser entre 8:00 e 17:00"),
});

type NovoAgendamentoDialogProps = {
  aberto: boolean;
  onOpenChange: (aberto: boolean) => void;
};

/**
 * Componente de diálogo para criar um novo agendamento
 */
export function NovoAgendamentoDialog({
  aberto,
  onOpenChange,
}: NovoAgendamentoDialogProps) {
  const { toast } = useToast();
  const [enviando, setEnviando] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    adicionarAgendamento,
    encontrarMaquinaDisponivel,
    integracaoConfigurada,
  } = useAgendamentos();

  // Configurar o formulário com React Hook Form e Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      apartamento: "",
    },
  });

  // Função para verificar se o dia atual ainda está dentro do horário de funcionamento
  const isDiaAtualDisponivel = () => {
    const agora = new Date();
    const hora = agora.getHours();
    // Se a hora atual for maior ou igual a 18h, o dia atual não está mais disponível
    return hora < 18;
  };

  // Função para verificar se uma data está dentro do período permitido para agendamento
  const isDataPermitida = (date: Date) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Calcular a data limite (hoje + 5 dias)
    const dataLimite = addDays(hoje, 5);

    // Verificar se é o dia atual e se está fora do horário de funcionamento
    const ehHoje =
      date.getDate() === hoje.getDate() &&
      date.getMonth() === hoje.getMonth() &&
      date.getFullYear() === hoje.getFullYear();

    if (ehHoje && !isDiaAtualDisponivel()) {
      return false; // Não permitir o dia atual se estiver fora do horário
    }

    // Verificar se a data está dentro do período permitido
    return date >= hoje && date <= dataLimite;
  };

  // Gerar opções de horários (8h às 17h)
  const horarios = Array.from({ length: 10 }, (_, i) => {
    const hora = i + 8;
    return { value: hora.toString(), label: `${hora}:00` };
  });

  // Função para processar o envio do formulário
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setEnviando(true);
      setErrorMessage(null);

      // Criar a data e hora completa
      const dataHora = new Date(values.data);
      dataHora.setHours(Number.parseInt(values.hora), 0, 0, 0);

      // Garantir que a data está no formato ISO correto
      const dataHoraISO = dataHora.toISOString();

      // Encontrar uma máquina disponível
      const maquinaId = encontrarMaquinaDisponivel(
        dataHora,
        Number.parseInt(values.hora)
      );

      if (!maquinaId) {
        toast({
          title: "Erro ao criar agendamento",
          description: "Não há máquinas disponíveis neste horário",
          variant: "destructive",
        });
        return;
      }

      // Adicionar o agendamento
      const resultado = await adicionarAgendamento({
        nome: values.nome,
        apartamento: values.apartamento,
        dataHora: dataHoraISO, // Usar o formato ISO
        maquinaId,
      });

      // Limpar o formulário e fechar o diálogo
      form.reset();
      onOpenChange(false);

      // Mostrar toast de sucesso
      toast({
        title: "Agendamento realizado com sucesso!",
        description: integracaoConfigurada
          ? "Seu agendamento foi salvo localmente e enviado para o Google Sheets."
          : "Seu agendamento foi salvo localmente.",
      });
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao criar o agendamento. Tente novamente mais tarde."
      );

      toast({
        title: "Erro ao criar agendamento",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-w-[95vw] p-3 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3 text-left">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary">
            Novo Agendamento
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Preencha os campos abaixo para agendar um horário na lavanderia.
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <Alert variant="destructive" className="mt-2 mb-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-xs sm:text-sm ml-2">Erro</AlertTitle>
            <AlertDescription className="text-xs ml-2">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome"
                      {...field}
                      className="text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Unidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nº do apartamento"
                      {...field}
                      className="text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs sm:text-sm">Data</FormLabel>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "min-w-[240px] justify-start text-left font-normal text-xs sm:text-sm h-8 sm:h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          {field.value ? (
                            format(field.value, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarioPersonalizado
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setCalendarOpen(false);
                        }}
                        disabled={(date) => !isDataPermitida(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hora"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Horário</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-xs sm:text-sm h-8 sm:h-10">
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-xs sm:text-sm max-h-[200px]">
                      {horarios.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="text-xs sm:text-sm"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2 sm:pt-4">
              <Button
                type="submit"
                disabled={enviando}
                className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10"
              >
                {enviando ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Agendando...
                  </>
                ) : (
                  "Agendar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
