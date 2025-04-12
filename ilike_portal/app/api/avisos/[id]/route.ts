import { NextResponse } from "next/server";
import { atualizarAviso, excluirAviso, obterAvisos } from "@/lib/actions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const avisos = await obterAvisos();
    const aviso = avisos.find((a) => a.id === id);

    if (!aviso) {
      return NextResponse.json(
        { error: "Aviso não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(aviso);
  } catch (error: any) {
    console.error(`Erro ao buscar aviso ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const dados = await request.json();

    const aviso = await atualizarAviso(id, {
      titulo: dados.titulo,
      mensagem: dados.mensagem,
      tipo: dados.tipo,
      ativo: dados.ativo,
      criadoPor: dados.criadoPor,
    });

    if (!aviso) {
      return NextResponse.json(
        { error: "Aviso não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(aviso);
  } catch (error: any) {
    console.error(`Erro ao atualizar aviso ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const sucesso = await excluirAviso(id);

    if (!sucesso) {
      return NextResponse.json(
        { error: "Erro ao excluir aviso ou aviso não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Aviso excluído com sucesso" });
  } catch (error: any) {
    console.error(`Erro ao excluir aviso ${params.id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
