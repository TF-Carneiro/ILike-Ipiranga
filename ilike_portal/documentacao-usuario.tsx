import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  User,
  WashingMachine,
  Info,
  HelpCircle,
} from "lucide-react";

export default function DocumentacaoUsuario() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Manual do Usuário
          </h1>
          <h2 className="text-xl text-muted-foreground">
            Sistema de Agendamento de Lavanderia
          </h2>
        </div>

        <Tabs defaultValue="visao-geral" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
            <TabsTrigger value="calendario">Calendário</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Visão Geral do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Bem-vindo ao Sistema de Agendamento de Lavanderia do I Like
                  Ipiranga. Este sistema foi desenvolvido para facilitar o
                  agendamento das máquinas de lavar disponíveis no condomínio.
                </p>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-primary">
                    Informações Importantes:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Horário de funcionamento:{" "}
                      <strong>08:00h às 18:00h</strong> todos os dias.
                    </li>
                    <li>
                      Cada agendamento tem duração máxima de{" "}
                      <strong>1 hora</strong>.
                    </li>
                    <li>
                      Agendamentos podem ser feitos com até{" "}
                      <strong>5 dias de antecedência</strong>.
                    </li>
                    <li>
                      O condomínio possui <strong>4 máquinas</strong>{" "}
                      disponíveis para uso.
                    </li>
                  </ul>
                </div>

                <h3 className="font-medium text-lg">
                  Funcionalidades Principais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">
                        Visualização de Calendário
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Visualize todos os agendamentos existentes em um
                      calendário intuitivo, organizado por dia e hora.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <PlusCircle className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Criação de Agendamentos</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Crie novos agendamentos de forma rápida e simples,
                      selecionando data, hora e informando seus dados.
                    </p>
                  </div>
                </div>

                <h3 className="font-medium text-lg mt-4">
                  Navegação do Sistema
                </h3>
                <p>
                  O sistema possui uma interface simples e intuitiva. Na página
                  principal, você encontrará:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cabeçalho com o logo do condomínio</li>
                  <li>Botão para criar novo agendamento</li>
                  <li>Calendário de agendamentos</li>
                  <li>Informações sobre regras e horários</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agendamentos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  Criando e Gerenciando Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-medium text-lg">
                  Como Criar um Novo Agendamento
                </h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">
                      Passo 1: Acessar o formulário de agendamento
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Clique no botão "Novo Agendamento" ou "Agendar" localizado
                      no canto superior direito da tela.
                    </p>
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4 text-primary" />
                        <span>
                          Clique aqui para abrir o formulário de agendamento
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">
                      Passo 2: Preencher seus dados
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      No formulário que aparece, preencha:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>
                        <strong>Nome:</strong> Seu nome completo
                      </li>
                      <li>
                        <strong>Unidade:</strong> Número do seu apartamento
                      </li>
                      <li>
                        <strong>Data:</strong> Selecione a data desejada no
                        calendário
                      </li>
                      <li>
                        <strong>Horário:</strong> Escolha um horário disponível
                        entre 8h e 17h
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">
                      Passo 3: Confirmar agendamento
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Após preencher todos os campos, clique no botão "Agendar"
                      para confirmar seu agendamento.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Se todos os dados estiverem corretos e houver
                      disponibilidade, você receberá uma confirmação de que seu
                      agendamento foi realizado com sucesso.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mt-4">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5" />
                    Informações de Segurança
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Todos os dados do sistema são armazenados com segurança em
                    um banco de dados na nuvem (Supabase). Suas informações
                    pessoais são protegidas e só podem ser acessadas pelos
                    administradores autorizados. O sistema sincroniza
                    automaticamente em tempo real, garantindo que você sempre
                    veja as informações mais atualizadas.
                  </p>
                </div>

                <h3 className="font-medium text-lg mt-6">
                  Visualizando Agendamentos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Todos os agendamentos são exibidos no calendário na página
                  principal. Você pode identificar:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-medium">Seus agendamentos</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Identificados pelo seu nome na célula do calendário.
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <WashingMachine className="h-4 w-4 text-primary" />
                      <span className="font-medium">Máquinas disponíveis</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Células vazias indicam horários disponíveis para
                      agendamento.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendario">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Navegando pelo Calendário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-medium text-lg">Entendendo o Calendário</h3>
                <p>
                  O calendário é a principal ferramenta do sistema, exibindo
                  todos os agendamentos e horários disponíveis.
                </p>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Estrutura do Calendário</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                          <strong>Linhas:</strong> Representam os horários (8h
                          às 17h)
                        </li>
                        <li>
                          <strong>Colunas:</strong> Representam as máquinas (1 a
                          4)
                        </li>
                        <li>
                          <strong>Células ocupadas:</strong> Mostram o nome do
                          usuário que agendou
                        </li>
                        <li>
                          <strong>Células vazias:</strong> Indicam
                          disponibilidade
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-center mb-1">
                        Exemplo de visualização:
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-xs">
                        <div className="bg-primary/20 p-1 text-center font-medium">
                          Hora
                        </div>
                        <div className="bg-primary/20 p-1 text-center font-medium">
                          Máq. 1
                        </div>
                        <div className="bg-primary/20 p-1 text-center font-medium">
                          Máq. 2
                        </div>
                        <div className="bg-primary/20 p-1 text-center font-medium">
                          Máq. 3
                        </div>
                        <div className="bg-primary/20 p-1 text-center font-medium">
                          Máq. 4
                        </div>

                        <div className="bg-muted p-1 text-center">8:00</div>
                        <div className="border p-1 text-center">Disponível</div>
                        <div className="border p-1 text-center bg-primary/10">
                          Maria
                        </div>
                        <div className="border p-1 text-center">Disponível</div>
                        <div className="border p-1 text-center">Disponível</div>

                        <div className="bg-muted p-1 text-center">9:00</div>
                        <div className="border p-1 text-center bg-primary/10">
                          João
                        </div>
                        <div className="border p-1 text-center">Disponível</div>
                        <div className="border p-1 text-center bg-primary/10">
                          Ana
                        </div>
                        <div className="border p-1 text-center">Disponível</div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="font-medium text-lg mt-4">
                  Navegação entre Datas
                </h3>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">
                    Mudando a data visualizada
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Você pode navegar entre diferentes datas usando os botões de
                    navegação no topo do calendário:
                  </p>
                  <div className="flex items-center justify-center gap-4 bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-1">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="text-sm">Dia anterior</span>
                    </div>
                    <div className="text-sm font-medium">
                      Quarta, 10 de Abril de 2024
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Próximo dia</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 rounded-lg p-4 mt-4">
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5" />
                    Restrições de Datas
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>
                      Você só pode visualizar e agendar horários para os
                      próximos 5 dias.
                    </li>
                    <li>
                      Não é possível agendar horários para datas passadas.
                    </li>
                    <li>
                      Para o dia atual, só é possível agendar horários futuros
                      (não é possível agendar um horário que já passou).
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
                      Como posso cancelar um agendamento?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Atualmente, o sistema não permite que os usuários cancelem
                      seus próprios agendamentos. Caso precise cancelar, entre
                      em contato com a administração do condomínio.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      Posso fazer mais de um agendamento por dia?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sim, você pode fazer mais de um agendamento por dia, desde
                      que haja disponibilidade de máquinas nos horários
                      desejados.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      O que acontece se eu me atrasar para o meu horário
                      agendado?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Recomendamos que você chegue pontualmente no horário
                      agendado. Caso se atrase, seu tempo de uso será reduzido,
                      pois cada agendamento tem duração fixa de 1 hora.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      Posso escolher qual máquina quero usar?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      O sistema atribui automaticamente uma máquina disponível
                      para o horário selecionado. Não é possível escolher uma
                      máquina específica.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      Como posso cancelar ou alterar meu agendamento?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Atualmente, o sistema não permite que os usuários cancelem
                      ou alterem seus próprios agendamentos. Caso precise fazer
                      alguma modificação, entre em contato com a administração
                      do condomínio.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">
                      O sistema funciona em dispositivos móveis?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sim, o sistema é totalmente responsivo e funciona em
                      smartphones, tablets e computadores.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-lg p-4">
                  <h3 className="font-medium text-green-800 dark:text-green-300 flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5" />
                    Precisa de mais ajuda?
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Se você tiver outras dúvidas ou precisar de assistência
                    adicional, entre em contato com a administração do
                    condomínio.
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
