# Dependências do Projeto Sistema de Agendamento de Lavanderia

Este documento lista todas as dependências necessárias para executar o projeto em um novo ambiente.

## Requisitos do Sistema

- Node.js (versão 18.x ou superior)
- npm (8.x ou superior) ou pnpm (8.x ou superior)

## Dependências Principais

### Framework e Bibliotecas Core

- **Next.js** (v15.2.4) - Framework React com renderização do lado do servidor
- **React** (v19) - Biblioteca de UI
- **React DOM** (v19) - Renderização do React no navegador
- **TypeScript** (v5) - Superset tipado de JavaScript

### Banco de Dados e Backend

- **Supabase** (v2.49.4) - Plataforma de backend-as-a-service

### UI/UX e Componentes

- **Radix UI** - Componentes primitivos acessíveis:
  - Accordion, Alert Dialog, Aspect Ratio, Avatar, Checkbox
  - Collapsible, Context Menu, Dialog, Dropdown Menu
  - Hover Card, Label, Menubar, Navigation Menu, Popover
  - Progress, Radio Group, Scroll Area, Select, Separator
  - Slider, Slot, Switch, Tabs, Toast, Toggle, Toggle Group, Tooltip
- **Tailwind CSS** - Framework CSS utilitário
- **Tailwind Merge** - Utilitário para mesclar classes Tailwind
- **Class Variance Authority** - Gerenciamento de variantes de componentes
- **CLSX** - Utilitário para construir strings de classe condicionalmente

### Gerenciamento de Formulários

- **React Hook Form** - Biblioteca para formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integrações para validação com Zod

### Utilitários e Componentes Adicionais

- **date-fns** - Biblioteca para manipulação de datas
- **Lucide React** - Biblioteca de ícones
- **next-themes** - Gerenciamento de temas para Next.js
- **React Day Picker** - Componente de calendário
- **cmdk** - Componente de comando/pesquisa
- **Embla Carousel** - Componente de carrossel
- **Sonner** - Biblioteca de notificações toast
- **Recharts** - Biblioteca de visualização de dados

## Dependências de Desenvolvimento

- **@types/node** - Tipos para Node.js
- **@types/react** - Tipos para React
- **@types/react-dom** - Tipos para React DOM
- **PostCSS** - Processador CSS com plugins
- **Tailwind CSS** - Framework CSS
- **Autoprefixer** - Plugin PostCSS para adicionar prefixos vendor
- **tailwindcss-animate** - Animações para Tailwind CSS

## Instalação

Para instalar todas as dependências, execute:

```bash
npm install
```

Ou, se preferir usar pnpm:

```bash
pnpm install
```

## Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Para construir o projeto para produção:

```bash
npm run build
```

Para iniciar o servidor de produção:

```bash
npm start
```

---

© 2025 I Like Ipiranga - Sistema de Agendamento de Lavanderia  
Desenvolvido por TF-Carneiro
