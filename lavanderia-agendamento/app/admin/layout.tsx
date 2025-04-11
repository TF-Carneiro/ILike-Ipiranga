import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Não vamos usar o AuthGuard aqui, pois ele deve ser aplicado apenas nas páginas internas
  // e não na página de login
  return <>{children}</>
}
