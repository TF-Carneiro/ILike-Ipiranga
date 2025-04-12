"use client"

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type AgendamentoSucessoToastProps = {
  maquinaId: number
  horario: string
}

export function AgendamentoSucessoToast({ maquinaId, horario }: AgendamentoSucessoToastProps) {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "Agendamento realizado com sucesso!",
      action: <ToastAction altText="Ok">Ok</ToastAction>,
    })
  }, [toast, maquinaId, horario])

  return null
}
