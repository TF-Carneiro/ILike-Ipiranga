import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const resultado = await testarCRUD();
    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Erro ao executar teste CRUD:", error);
    return NextResponse.json(
      { error: "Falha ao executar teste CRUD" },
      { status: 500 }
    );
  }
}

// Função para executar testes CRUD
async function testarCRUD() {
  // Armazenar resultados de cada operação
  const resultados = {
    listagemInicial: [],
    insercao: null,
    atualizacao: null,
    listagemAposAtualizacao: [],
    exclusao: false,
    listagemFinal: [],
  };

  try {
    // Nome da tabela a ser testada
    const tabela = "agendamentos";

    // 1. Listar registros atuais
    resultados.listagemInicial = await listarRegistros(tabela);

    // 2. Inserir um novo registro
    const novoAgendamento = {
      nome: "Teste CRUD",
      apartamento: "999",
      data_hora: new Date().toISOString(),
      maquina_id: 1,
    };

    resultados.insercao = await inserirRegistro(tabela, novoAgendamento);

    if (resultados.insercao) {
      // 3. Atualizar o registro inserido
      const id = resultados.insercao.id;
      const dadosAtualizados = {
        nome: "Teste CRUD Atualizado",
        apartamento: "888",
      };

      resultados.atualizacao = await atualizarRegistro(
        tabela,
        id,
        dadosAtualizados
      );

      // 4. Listar registros após atualização
      resultados.listagemAposAtualizacao = await listarRegistros(tabela);

      // 5. Excluir o registro de teste
      resultados.exclusao = await excluirRegistro(tabela, id);

      // 6. Listar registros após exclusão
      resultados.listagemFinal = await listarRegistros(tabela);
    }

    return resultados;
  } catch (error) {
    console.error("Erro durante o teste CRUD:", error);
    throw error;
  }
}

// Função para exibir todos os registros de uma tabela
async function listarRegistros(tabela) {
  const { data, error } = await supabase.from(tabela).select("*");

  if (error) {
    console.error("Erro ao listar registros:", error);
    return [];
  } else {
    console.log(`${data.length} registros encontrados na tabela ${tabela}`);
    return data;
  }
}

// Função para inserir um novo registro
async function inserirRegistro(tabela, dados) {
  const { data, error } = await supabase.from(tabela).insert(dados).select();

  if (error) {
    console.error("Erro ao inserir registro:", error);
    return null;
  } else {
    console.log("Registro inserido com sucesso na tabela", tabela);
    return data[0];
  }
}

// Função para atualizar um registro existente
async function atualizarRegistro(tabela, id, dados) {
  const { data, error } = await supabase
    .from(tabela)
    .update(dados)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Erro ao atualizar registro:", error);
    return null;
  } else {
    console.log(`Registro ${id} atualizado com sucesso na tabela ${tabela}`);
    return data[0];
  }
}

// Função para excluir um registro
async function excluirRegistro(tabela, id) {
  const { error } = await supabase.from(tabela).delete().eq("id", id);

  if (error) {
    console.error("Erro ao excluir registro:", error);
    return false;
  } else {
    console.log(`Registro ${id} excluído com sucesso da tabela ${tabela}`);
    return true;
  }
}
