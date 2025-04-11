import { NextResponse } from "next/server";
import { obterAvisos, criarAviso } from "@/lib/actions";

export async function GET() {
  try {
    const avisos = await obterAvisos();
    return NextResponse.json(avisos);
  } catch (error: any) {
    console.error("Erro ao buscar avisos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const dados = await request.json();

    // Validar campos obrigatórios
    if (!dados.titulo || !dados.mensagem || !dados.tipo) {
      return NextResponse.json(
        { error: "Campos obrigatórios: titulo, mensagem, tipo" },
        { status: 400 }
      );
    }

    const aviso = await criarAviso({
      titulo: dados.titulo,
      mensagem: dados.mensagem,
      tipo: dados.tipo,
      ativo: dados.ativo !== undefined ? dados.ativo : true,
      criadoPor: dados.criadoPor || "admin",
    });

    return NextResponse.json(aviso, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar aviso:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
