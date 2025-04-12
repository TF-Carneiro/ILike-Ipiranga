import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  Edit,
  Trash2,
  Search,
  FileDown,
  RefreshCw,
  Lock,
  LogIn,
  HelpCircle,
  FileSpreadsheet,
} from "lucide-react";

export default function DocumentacaoAdmin() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Manual do Administrador
          </h1>
          <h2 className="text-xl text-muted-foreground">
            Sistema de Agendamento de Lavanderia
          </h2>
        </div>

        <Tabs defaultValue="acesso" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="acesso">Acesso</TabsTrigger>
            <TabsTrigger value="gerenciamento">Gerenciamento</TabsTrigger>
            <TabsTrigger value="exportacao">Exportação</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="acesso">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Acessando o Painel Administrativo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  O painel administrativo é uma área restrita do sistema,
                  acessível apenas para administradores autorizados. Siga os
                  passos abaixo para acessar o painel:
                </p>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm">
                        1
                      </span>
                      Acesse a página de login administrativa
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Existem duas formas de acessar a página de login
                      administrativa:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>
                        <strong>Acesso pelo cabeçalho:</strong> Na página
                        inicial do sistema, clique no ícone de cadeado
                        localizado no canto superior direito do cabeçalho.
                      </li>
                      <li>
                        <strong>Acesso direto pela URL:</strong> Digite o
                        endereço da página de login administrativa no seu
                        navegador:
                        <div className="bg-muted p-3 rounded-lg text-sm font-mono mt-1">
                          https://seu-site.vercel.app/admin/login
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Substitua "seu-site.vercel.app" pelo domínio real do
                          seu sistema.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm">
                        2
                      </span>
                      Clique no botão de acesso
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Na página de gerenciamento, clique no botão "Acessar
                      Painel Administrativo".
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm">
                        3
                      </span>
                      Faça login com suas credenciais
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Digite seu nome de usuário e senha nos campos
                      correspondentes:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-xs font-medium mb-1">Usuário:</div>
                        <div className="font-mono">Ilike@Cond</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-xs font-medium mb-1">Senha:</div>
                        <div className="font-mono">#!S@coma_ilike</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Importante:</strong> Mantenha essas credenciais em
                      segurança e não as compartilhe com pessoas não
                      autorizadas.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 rounded-lg p-4 mt-4">
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2 mb-2">
                    <LogIn className="h-5 w-5" />
                    Segurança do Acesso
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>
                      A URL da página de gerenciamento não está vinculada a
                      partir de nenhum lugar no site público.
                    </li>
                    <li>
                      Apenas pessoas que conhecem o caminho específico podem
                      acessá-la.
                    </li>
                    <li>
                      Mesmo conhecendo a URL, é necessário ter as credenciais
                      corretas para acessar o painel.
                    </li>
                    <li>
                      Considere alterar a senha periodicamente para maior
                      segurança.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gerenciamento">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Gerenciando Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  O painel administrativo permite gerenciar todos os
                  agendamentos do sistema. Você pode visualizar, editar e
                  excluir agendamentos conforme necessário.
                </p>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">
                      Visualizando Agendamentos
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Ao acessar o painel administrativo, você verá uma lista de
                      todos os agendamentos existentes. A lista inclui as
                      seguintes informações:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>ID do agendamento</li>
                      <li>Nome do morador</li>
                      <li>Unidade (apartamento)</li>
                      <li>Data do agendamento</li>
                      <li>Hora do agendamento</li>
                      <li>Máquina reservada</li>
                      <li>Opções de ações (editar/excluir)</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      Pesquisando Agendamentos
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Use o campo de pesquisa no topo da lista para filtrar
                      agendamentos. Você pode pesquisar por nome, unidade, data
                      ou qualquer outra informação visível na tabela.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Edit className="h-4 w-4 text-primary" />
                      Editando Agendamentos
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Para editar um agendamento, clique no ícone de lápis
                      (editar) na linha correspondente. Você será redirecionado
                      para um formulário onde poderá modificar:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Nome do morador</li>
                      <li>Unidade (apartamento)</li>
                      <li>Data do agendamento</li>
                      <li>Hora do agendamento</li>
                      <li>Máquina reservada</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      Após fazer as alterações, clique em "Salvar Alterações"
                      para confirmar.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Trash2 className="h-4 w-4 text-primary" />
                      Excluindo Agendamentos
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Para excluir um agendamento, clique no ícone de lixeira
                      (excluir) na linha correspondente. Uma caixa de diálogo de
                      confirmação será exibida. Clique em "Excluir" para
                      confirmar a exclusão ou "Cancelar" para voltar sem
                      excluir.
                    </p>
                    <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg mt-2 text-xs text-red-700 dark:text-red-300">
                      <strong>Atenção:</strong> A exclusão de agendamentos é
                      permanente e não pode ser desfeita.
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Visualizando o Calendário
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Para visualizar os agendamentos no formato de calendário,
                      clique no botão "Ver Calendário" no topo da página. Isso o
                      levará à visualização de calendário que os moradores veem,
                      permitindo verificar a disponibilidade de máquinas em
                      diferentes horários.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exportacao">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileDown className="h-5 w-5 text-primary" />
                  Exportação e Sincronização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  O sistema permite exportar os dados de agendamentos para
                  formatos externos e sincronizar com o Google Sheets para
                  backup e análise.
                </p>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <FileDown className="h-4 w-4 text-primary" />
                      Exportando para Excel (CSV)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Para exportar os agendamentos para um arquivo CSV (que
                      pode ser aberto no Excel):
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>
                        Clique no botão "Exportar" no topo da lista de
                        agendamentos
                      </li>
                      <li>
                        Selecione "Baixar como Excel (CSV)" no menu suspenso
                      </li>
                      <li>
                        O arquivo será baixado automaticamente para o seu
                        computador
                      </li>
                      <li>
                        Abra o arquivo com o Excel ou outro programa de
                        planilhas
                      </li>
                    </ol>
                    <p className="text-xs text-muted-foreground mt-2">
                      Se você estiver usando uma pesquisa para filtrar
                      agendamentos, apenas os resultados filtrados serão
                      exportados.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-primary" />
                      Exportando para Google Sheets
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Para exportar os agendamentos diretamente para o Google
                      Sheets:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>
                        Clique no botão "Exportar" no topo da lista de
                        agendamentos
                      </li>
                      <li>
                        Selecione "Abrir no Google Sheets" no menu suspenso
                      </li>
                      <li>Uma nova aba será aberta com o Google Sheets</li>
                      <li>Um arquivo CSV será baixado automaticamente</li>
                      <li>
                        No Google Sheets, clique em "Arquivo" &gt; "Importar"
                      </li>
                      <li>
                        Selecione a aba "Upload" e arraste o arquivo CSV baixado
                      </li>
                      <li>
                        Escolha "Substituir planilha atual" e clique em
                        "Importar dados"
                      </li>
                    </ol>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      Sincronização com Banco de Dados
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      O sistema agora utiliza o Supabase como banco de dados em
                      nuvem:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>
                        Todos os dados são sincronizados automaticamente em
                        tempo real
                      </li>
                      <li>
                        As alterações feitas são imediatamente salvas no banco
                        de dados
                      </li>
                      <li>
                        Não é necessário realizar backups manuais, pois os dados
                        são armazenados na nuvem
                      </li>
                    </ol>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg mt-2 text-xs text-blue-700 dark:text-blue-300">
                      <strong>Nota:</strong> A sincronização em tempo real
                      significa que todas as alterações são salvas
                      instantaneamente. Isso garante que os dados estejam sempre
                      atualizados e disponíveis em todos os dispositivos.
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-lg p-4 mt-4">
                  <h3 className="font-medium text-green-800 dark:text-green-300 flex items-center gap-2 mb-2">
                    <HelpCircle className="h-5 w-5" />
                    Dicas para Exportação
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>
                      Exporte regularmente os dados como backup de segurança.
                    </li>
                    <li>
                      Use a funcionalidade de pesquisa para exportar apenas os
                      agendamentos de interesse.
                    </li>
                    <li>
                      O formato CSV é compatível com a maioria dos programas de
                      planilhas, incluindo Excel, Google Sheets e LibreOffice
                      Calc.
                    </li>
                    <li>
                      Considere exportar os dados ao final de cada mês para
                      manter registros históricos.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Perguntas Frequentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      Como adicionar um novo agendamento para um morador?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Você pode adicionar um novo agendamento de duas formas:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm mt-2">
                      <li>
                        <strong>Através do painel administrativo:</strong> Volte
                        para a página principal clicando em "Ver Calendário",
                        depois clique em "Novo Agendamento" e preencha os dados
                        do morador.
                      </li>
                      <li>
                        <strong>Diretamente no calendário:</strong> Na
                        visualização de calendário, clique em um horário
                        disponível e preencha os dados do morador no formulário
                        que aparece.
                      </li>
                    </ol>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      Como lidar com conflitos de agendamento?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      O sistema não permite agendamentos duplicados para a mesma
                      máquina no mesmo horário. Se um morador precisar usar uma
                      máquina em um horário já ocupado, você tem duas opções:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                      <li>
                        Sugerir um horário alternativo ou outra máquina
                        disponível
                      </li>
                      <li>
                        Entrar em contato com o morador que já fez o agendamento
                        para verificar a possibilidade de alteração
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      O que fazer se uma máquina estiver em manutenção?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Se uma máquina estiver em manutenção, você deve:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm mt-2">
                      <li>
                        Verificar se há agendamentos para essa máquina nos
                        próximos dias
                      </li>
                      <li>
                        Editar esses agendamentos para atribuí-los a outras
                        máquinas disponíveis
                      </li>
                      <li>Notificar os moradores afetados sobre a mudança</li>
                      <li>
                        Considerar colocar um aviso físico na lavanderia
                        informando sobre a manutenção
                      </li>
                    </ol>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      Como recuperar a senha de administrador se eu esquecer?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Caso você esqueça sua senha, você pode solicitar a
                      recuperação através da página de login, na aba "Recuperar
                      Senha". Informe seu nome de usuário e o administrador do
                      sistema será notificado para ajudá-lo a recuperar o
                      acesso.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg mt-2 text-xs text-blue-700 dark:text-blue-300">
                      <strong>Dica:</strong> Para alterar sua senha quando já
                      está logado, clique no botão "Alterar Senha" no cabeçalho
                      do painel administrativo.
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      Como garantir que os dados não sejam perdidos?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Para garantir a segurança dos dados:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                      <li>
                        Os dados são armazenados automaticamente no Supabase, um
                        banco de dados em nuvem seguro
                      </li>
                      <li>
                        Exporte periodicamente os dados para CSV como backup
                        adicional
                      </li>
                      <li>O Supabase mantém backups automáticos dos dados</li>
                      <li>
                        Mantenha cópias dos arquivos exportados em diferentes
                        locais se necessário
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                    <HelpCircle className="h-5 w-5" />
                    Precisa de mais ajuda?
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Se você tiver outras dúvidas ou precisar de assistência
                    adicional, entre em contato com o desenvolvedor do sistema
                    para suporte técnico.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} I Like Ipiranga - Sistema de
            Agendamento de Lavanderia
          </p>
          <p className="mt-1">Desenvolvido por TF-Carneiro</p>
        </div>
      </div>
    </div>
  );
}
