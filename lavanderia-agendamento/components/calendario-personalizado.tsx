"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CalendarioPersonalizadoProps = {
  selected?: Date
  onSelect?: (date: Date) => void
  disabled?: (date: Date) => boolean
  className?: string
}

export function CalendarioPersonalizado({ selected, onSelect, disabled, className }: CalendarioPersonalizadoProps) {
  const [mesAtual, setMesAtual] = useState(new Date())

  // Dias da semana abreviados
  const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"]

  // Navegar para o mês anterior
  const mesAnterior = () => {
    setMesAtual(subMonths(mesAtual, 1))
  }

  // Navegar para o próximo mês
  const proximoMes = () => {
    setMesAtual(addMonths(mesAtual, 1))
  }

  // Gerar os dias do mês atual
  const diasDoMes = () => {
    const inicio = startOfMonth(mesAtual)
    const fim = endOfMonth(mesAtual)
    return eachDayOfInterval({ start: inicio, end: fim })
  }

  // Obter o dia da semana do primeiro dia do mês (0 = domingo, 1 = segunda, etc.)
  const primeiroDiaDaSemana = startOfMonth(mesAtual).getDay()

  // Dias do mês anterior para preencher o início do calendário
  const diasAnteriores = Array.from({ length: primeiroDiaDaSemana }, (_, i) => {
    const data = new Date(mesAtual)
    data.setDate(0 - i) // Dias do mês anterior
    return data
  }).reverse()

  // Dias do próximo mês para preencher o final do calendário
  const diasDoMesAtual = diasDoMes()
  const diasRestantes = 42 - (diasAnteriores.length + diasDoMesAtual.length) // 6 semanas * 7 dias = 42

  const diasPosteriores = Array.from({ length: diasRestantes }, (_, i) => {
    const ultimoDiaDoMes = endOfMonth(mesAtual)
    return addDays(ultimoDiaDoMes, i + 1)
  })

  // Todos os dias a serem exibidos no calendário
  const todosDias = [...diasAnteriores, ...diasDoMesAtual, ...diasPosteriores]

  // Verificar se uma data está desabilitada
  const estaDesabilitada = (data: Date) => {
    return disabled ? disabled(data) : false
  }

  // Verificar se é o dia atual
  const hoje = new Date()

  // Função para verificar se o dia atual ainda está dentro do horário de funcionamento
  const isDiaAtualDisponivel = () => {
    const agora = new Date()
    const hora = agora.getHours()
    // Se a hora atual for maior ou igual a 18h, o dia atual não está mais disponível
    return hora < 18
  }

  // Função para verificar se uma data está dentro do período permitido para agendamento
  const isDataPermitida = (date: Date) => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    // Calcular a data limite (hoje + 5 dias)
    const dataLimite = addDays(hoje, 5)

    // Verificar se é o dia atual e se está fora do horário de funcionamento
    const ehHoje =
      date.getDate() === hoje.getDate() &&
      date.getMonth() === hoje.getMonth() &&
      date.getFullYear() === hoje.getFullYear()

    if (ehHoje && !isDiaAtualDisponivel()) {
      return false // Não permitir o dia atual se estiver fora do horário
    }

    // Verificar se a data está dentro do período permitido
    return date >= hoje && date <= dataLimite
  }

  // Função para capitalizar a primeira letra
  const capitalizar = (texto: string): string => {
    return texto.charAt(0).toUpperCase() + texto.slice(1)
  }

  return (
    <div className={cn("p-3 bg-card rounded-lg", className)}>
      {/* Cabeçalho do calendário */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={mesAnterior}
          className="h-6 w-6 sm:h-7 sm:w-7 bg-transparent p-0 border-0 hover:bg-muted"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        <h2 className="text-xs sm:text-sm font-medium text-foreground">
          {capitalizar(format(mesAtual, "MMMM", { locale: ptBR })) + " " + format(mesAtual, "yyyy", { locale: ptBR })}
        </h2>

        <Button
          variant="outline"
          size="icon"
          onClick={proximoMes}
          className="h-6 w-6 sm:h-7 sm:w-7 bg-transparent p-0 border-0 hover:bg-muted"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      {/* Grade do calendário */}
      <div className="grid grid-cols-7 gap-1">
        {/* Cabeçalho dos dias da semana */}
        {diasDaSemana.map((dia, index) => (
          <div
            key={`header-${index}`}
            className="text-center text-xs font-medium text-muted-foreground h-8 flex items-center justify-center mb-1"
          >
            {dia}
          </div>
        ))}

        {/* Dias do calendário */}
        {todosDias.map((dia, index) => {
          const estaNoMesAtual = isSameMonth(dia, mesAtual)
          const eHoje = isSameDay(dia, hoje)
          const estaSelecionado = selected ? isSameDay(dia, selected) : false
          const desabilitado = !isDataPermitida(dia) || estaDesabilitada(dia)

          return (
            <button
              key={`day-${index}`}
              onClick={() => !desabilitado && onSelect && onSelect(dia)}
              disabled={desabilitado}
              className={cn(
                "h-8 w-full flex items-center justify-center text-xs rounded-md transition-colors mb-1",
                !estaNoMesAtual && "text-muted-foreground/50",
                eHoje && !estaSelecionado && "bg-primary/10 dark:bg-primary/20 font-medium",
                estaSelecionado && "bg-primary text-primary-foreground font-medium",
                desabilitado && "opacity-30 cursor-not-allowed",
                !desabilitado && !estaSelecionado && "hover:bg-muted",
                "text-foreground dark:text-foreground", // Garantir que o texto seja visível no modo escuro
              )}
            >
              {dia.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
