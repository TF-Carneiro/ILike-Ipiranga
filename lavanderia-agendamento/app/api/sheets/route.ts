import { NextResponse } from "next/server"

// Rota simplificada que retorna apenas um status
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "API funcionando apenas com armazenamento local",
  })
}
