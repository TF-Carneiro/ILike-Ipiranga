"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

/**
 * Componente de guarda de autenticação
 * Protege rotas que requerem autenticação
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Se não estiver carregando e não estiver autenticado, redirecionar para login
    if (!isLoading) {
      if (!isAuthenticated && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
      setChecking(false)
    }
  }, [isAuthenticated, isLoading, router, pathname])

  // Exibir indicador de carregamento enquanto verifica a autenticação
  if (isLoading || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Se não estiver autenticado, não renderizar nada (o redirecionamento já foi iniciado)
  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  return <>{children}</>
}
