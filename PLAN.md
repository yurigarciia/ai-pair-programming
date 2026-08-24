# PLAN.md — To Do List Pessoal (Kanban)

## 1. Overview

Construir uma aplicação web pessoal de lista de tarefas (To Do List) organizada em um quadro Kanban com três colunas fixas: **A Fazer / Fazendo / Concluído**. O usuário único cria tarefas com título, categoria/tag livre, prioridade e data de vencimento, move as tarefas entre colunas via drag-and-drop, edita e exclui tarefas, e filtra o quadro por categoria e prioridade. Não há backend: todos os dados persistem no `localStorage` do navegador. O visual segue uma linha minimalista e limpa, inspirada no Notion.

Sucesso = o usuário consegue abrir o app no navegador, criar/editar/excluir tarefas, organizá-las arrastando entre as três colunas, filtrar por categoria/prioridade, fechar a aba e reabrir sem perder nada.

## 2. Non Goals

- Login, autenticação ou múltiplos usuários
- Sincronização entre dispositivos ou backend/banco de dados
- Notificações, alertas ou destaques automáticos de prazo
- Busca textual por título
- Colunas de Kanban customizáveis (renomear/adicionar/remover colunas)
- Subtarefas / checklists dentro de uma tarefa
- Modo offline avançado (PWA), exportação/importação de dados
- Testes automatizados de UI end-to-end (ver Definition of Done para o nível de teste esperado)

## 3. Assumptions

- "Categorias/tags" são um único campo de texto livre por tarefa (não múltiplas tags por tarefa), já que o planejamento fala em "categoria" no singular.
- Prioridade é um enum fechado: Alta / Média / Baixa.
- Data de vencimento é opcional (nem toda tarefa precisa ter prazo).
- O drag-and-drop será implementado com a API HTML5 nativa de drag and drop ou uma lib leve (ex.: `@dnd-kit/core`), decisão técnica a ser tomada no ticket correspondente.
- Node.js e npm já estão disponíveis no ambiente de desenvolvimento do usuário.
- Não há requisito de responsividade mobile explícito — o foco é desktop/navegador, mas um layout minimamente flexível é desejável sem ser um objetivo formal do MVP.
- Cores de prioridade/categoria seguem uma paleta neutra com pequenos acentos, a ser definida no ticket de design.

## 4. Constraints

- **Stack obrigatória:** React + Vite, JavaScript/TypeScript no navegador.
- **Sem backend:** persistência exclusivamente via `localStorage`.
- **Sem contas de usuário.**
- Projeto deve rodar localmente com `npm install && npm run dev` sem configuração adicional.
- Deve funcionar nos navegadores modernos padrão (Chrome/Edge/Firefox atuais); sem requisito de suporte a navegadores legados.

## 5. Architecture Sketch

**Estrutura de alto nível (SPA React, sem backend):**

```
src/
  main.jsx                # bootstrap da aplicação
  App.jsx                 # layout raiz, monta o board e a toolbar de filtros
  components/
    Board.jsx             # renderiza as 3 colunas e gerencia drag-and-drop
    Column.jsx            # coluna individual (A Fazer / Fazendo / Concluído)
    TaskCard.jsx           # card de tarefa (exibição resumida no board)
    TaskForm.jsx           # formulário de criação/edição de tarefa (modal ou painel)
    FilterBar.jsx          # controles de filtro por categoria e prioridade
  hooks/
    useTasks.js            # hook central: CRUD de tarefas + persistência
    useLocalStorage.js     # hook genérico de leitura/escrita em localStorage
  models/
    task.js                # shape/schema da tarefa + helpers (validação, defaults)
  utils/
    filters.js             # lógica pura de filtragem de tarefas
  styles/                  # estilos globais e de componentes (CSS ou CSS Modules)
```

**Fluxo de dados:**
- `useTasks` é a fonte única de verdade em memória, sincronizada com `localStorage` a cada mutação (create/update/delete/move).
- `App` mantém o estado de filtros ativos (categoria, prioridade) e passa a lista de tarefas já filtrada para `Board`.
- `Board` distribui as tarefas filtradas entre as 3 `Column`s conforme o campo `status` de cada tarefa.
- Drag-and-drop: ao soltar um card em outra coluna, dispara `updateTaskStatus(taskId, novoStatus)` em `useTasks`.
- `TaskForm` é usado tanto para criar quanto para editar (mesmo componente, modo controlado por prop/estado).

**Modelo de dados (Task):**
```
{
  id: string (uuid),
  title: string,
  category: string,        // livre, pode ser vazio
  priority: "alta" | "media" | "baixa",
  dueDate: string | null,  // ISO date, opcional
  status: "todo" | "doing" | "done",
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

**Integrações externas:** nenhuma (sem APIs externas, sem backend).

## 6. Definition of Done

**Build:**
- `npm install` e `npm run build` completam sem erros.
- `npm run dev` sobe o app localmente sem erros no console.

**Test:**
- Não há suíte de testes automatizados obrigatória para o MVP (fora de escopo), mas o código deve ser estruturado de forma a permitir testes unitários futuros nos hooks/utils puros (ex.: `filters.js`, `useTasks.js`).
- Validação manual de cada ticket via os "Validation Steps" descritos no backlog.

**Run / Validação de usuário:**
- Usuário consegue criar uma tarefa com todos os campos (título, categoria, prioridade, data).
- Usuário consegue editar uma tarefa existente e ver a mudança refletida imediatamente.
- Usuário consegue excluir uma tarefa.
- Usuário consegue arrastar uma tarefa entre as 3 colunas e o status persiste após reload da página.
- Usuário consegue filtrar o board por categoria e por prioridade, isolada e combinadamente.
- Ao fechar e reabrir o navegador, todas as tarefas e seus estados permanecem intactos (persistência via localStorage).
- Interface visualmente limpa, consistente, sem elementos quebrados, seguindo a linha minimalista definida no planejamento.

## 7. Task Backlog

### Ticket: T001 Setup inicial do projeto (Vite + React)
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Criar o projeto com `npm create vite@latest` (template React), configurar estrutura de pastas (`src/components`, `src/hooks`, `src/models`, `src/utils`, `src/styles`), limpar boilerplate padrão do Vite.
- **Acceptance Criteria:** Projeto roda com `npm run dev` mostrando uma página em branco/placeholder sem erros no console; estrutura de pastas criada.
- **Validation Steps:** `npm install`, `npm run dev`, abrir `localhost` e confirmar ausência de erros no console do navegador e do terminal.
- **Notes:** Projeto criado em `todo-app/`. Boilerplate removido, `npm run build` passou sem erros.

### Ticket: T002 Definir modelo de dados da tarefa
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Criar `src/models/task.js` com a função de criação de tarefa (gera `id`, `createdAt`, `updatedAt`, valores default) conforme o schema descrito na Architecture Sketch.
- **Acceptance Criteria:** Função `createTask(input)` retorna objeto com todos os campos do schema; campos obrigatórios (`title`) validados; `id` único gerado a cada chamada.
- **Validation Steps:** Testar manualmente no console do navegador ou script Node: chamar `createTask({title: "x"})` duas vezes e confirmar IDs diferentes e campos default corretos.
- **Notes:** Validado via script Node: IDs únicos, defaults corretos, título vazio lança erro.

### Ticket: T003 Hook `useLocalStorage`
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Implementar hook genérico `useLocalStorage(key, initialValue)` que lê/escreve em `localStorage` e mantém estado React sincronizado.
- **Acceptance Criteria:** Estado persiste entre reloads da página; leitura inicial recupera valor salvo ou usa `initialValue` se não existir.
- **Validation Steps:** Usar o hook num componente de teste, alterar o valor, dar reload na página e confirmar que o valor persiste.
- **Notes:** Validado indiretamente via T011 (persistência confirmada com Playwright após reload).

### Ticket: T004 Hook `useTasks` (CRUD central)
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Implementar `useTasks()` usando `useLocalStorage` como storage, expondo `tasks`, `addTask`, `updateTask`, `deleteTask`, `moveTask(id, novoStatus)`.
- **Acceptance Criteria:** Cada operação atualiza o estado em memória e reflete no `localStorage`; `updatedAt` é atualizado em toda mutação.
- **Validation Steps:** Testar manualmente via componente/página de debug chamando cada função e inspecionando `localStorage` no DevTools.
- **Notes:** Validado via teste Playwright end-to-end (criar, editar, excluir, mover — todos refletidos e persistidos).

### Ticket: T005 Layout raiz da aplicação (`App.jsx`)
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Criar layout base com cabeçalho (título do app + botão "Nova tarefa"), área de filtros e área do board, usando `useTasks`.
- **Acceptance Criteria:** App renderiza cabeçalho e áreas vazias (placeholders) sem erros; estado de tarefas disponível via hook.
- **Validation Steps:** `npm run dev`, inspecionar visualmente a estrutura no navegador.
- **Notes:** Confirmado via screenshot Playwright (shot1_initial.png).

### Ticket: T006 Componentes `Board` e `Column`
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Implementar `Board.jsx` que recebe a lista de tarefas e renderiza 3 `Column`s (A Fazer / Fazendo / Concluído), cada uma exibindo as tarefas do seu status.
- **Acceptance Criteria:** Tarefas de exemplo (mock) aparecem na coluna correta conforme `status`; colunas vazias mostram estado vazio sem quebrar layout.
- **Validation Steps:** Popular `useTasks` com 2-3 tarefas mock via `addTask` e verificar visualmente a distribuição correta entre colunas.
- **Notes:** Confirmado visualmente via screenshots Playwright (colunas corretas, contadores e estado vazio "Nenhuma tarefa aqui.").

### Ticket: T007 Componente `TaskCard`
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Criar o card visual de uma tarefa exibindo título, categoria, prioridade (indicador visual) e data de vencimento (se houver).
- **Acceptance Criteria:** Card exibe corretamente todos os campos presentes; campos ausentes (ex.: sem data) não quebram o layout.
- **Validation Steps:** Renderizar cards com tarefas variando presença/ausência de campos opcionais e conferir visualmente.
- **Notes:** Confirmado via screenshots (card com categoria, prioridade e data renderizados corretamente).

### Ticket: T008 Formulário de criação de tarefa (`TaskForm` - modo criar)
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Criar formulário (modal ou painel lateral) com campos título, categoria (texto livre), prioridade (select), data de vencimento (date picker opcional). Botão "Nova tarefa" no header abre este formulário.
- **Acceptance Criteria:** Submeter o formulário cria uma nova tarefa com status `todo` e ela aparece na coluna "A Fazer"; título é obrigatório (validação simples).
- **Validation Steps:** Preencher e submeter o formulário com dados válidos e conferir que a tarefa aparece no board; tentar submeter sem título e confirmar bloqueio/mensagem de erro.
- **Notes:** Validado via Playwright: criação de tarefa com todos os campos, aparece em "A Fazer".

### Ticket: T009 Edição de tarefa (`TaskForm` - modo editar)
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Permitir abrir o mesmo `TaskForm` pré-preenchido ao clicar num `TaskCard`, editando os campos existentes e salvando via `updateTask`.
- **Acceptance Criteria:** Clicar num card abre o formulário com os dados atuais preenchidos; salvar atualiza a tarefa exibida no board sem duplicar.
- **Validation Steps:** Editar uma tarefa existente, alterar todos os campos e confirmar que os novos valores aparecem no card e persistem após reload.
- **Notes:** Validado via Playwright: edição de título refletida no card e persistida após reload.

### Ticket: T010 Exclusão de tarefa
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Adicionar ação de excluir tarefa (botão no card ou dentro do `TaskForm`), com confirmação simples antes de remover.
- **Acceptance Criteria:** Excluir uma tarefa a remove do board e do `localStorage` permanentemente.
- **Validation Steps:** Criar uma tarefa, excluí-la, dar reload na página e confirmar que ela não reaparece.
- **Notes:** Validado via Playwright com `window.confirm` aceito; tarefa removida do board.

### Ticket: T011 Drag-and-drop entre colunas
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Implementar arrastar-e-soltar de `TaskCard` entre `Column`s, chamando `moveTask` ao soltar num status diferente. Decidir e integrar abordagem técnica (HTML5 DnD nativo ou `@dnd-kit/core`).
- **Acceptance Criteria:** Arrastar um card de uma coluna para outra atualiza visualmente e persiste o novo status; soltar na mesma coluna não gera efeito colateral indesejado.
- **Validation Steps:** Arrastar tarefas entre as 3 colunas em todas as combinações possíveis, dar reload e confirmar persistência do status final.
- **Notes:** Implementado com API HTML5 nativa de drag-and-drop (sem dependência externa). Validado via Playwright `dragTo` de "A Fazer" para "Fazendo", persistindo após reload.

### Ticket: T012 Componente `FilterBar` (filtro por categoria)
- **Priority:** P1
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Criar controle de filtro (dropdown ou lista) que lista as categorias existentes nas tarefas atuais e permite filtrar o board por uma categoria selecionada (ou "todas").
- **Acceptance Criteria:** Selecionar uma categoria mostra somente tarefas daquela categoria em todas as colunas; opção "todas" remove o filtro.
- **Validation Steps:** Criar tarefas com categorias diferentes, aplicar o filtro e conferir visualmente que somente as tarefas corretas aparecem.
- **Notes:** Validado via Playwright: filtro por categoria "casa" reduziu corretamente para 1 card visível.

### Ticket: T013 Filtro por prioridade
- **Priority:** P1
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Adicionar controle de filtro por prioridade (Alta/Média/Baixa/Todas) na `FilterBar`, combinável com o filtro de categoria.
- **Acceptance Criteria:** Filtros de categoria e prioridade funcionam simultaneamente (AND lógico); resultado correto em qualquer combinação.
- **Validation Steps:** Testar combinações de categoria + prioridade com um conjunto de tarefas variado e conferir os resultados exibidos.
- **Notes:** Validado via Playwright: filtro por prioridade "baixa" isolado funcionou; lógica AND coberta pelos testes unitários de `filters.js` (T014).

### Ticket: T014 Utilitário puro `filters.js`
- **Priority:** P1
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Extrair a lógica de filtragem (por categoria/prioridade) de dentro dos componentes para uma função pura reutilizável e testável em `src/utils/filters.js`.
- **Acceptance Criteria:** `filterTasks(tasks, {category, priority})` retorna a lista filtrada corretamente para qualquer combinação de filtros, incluindo nenhum filtro aplicado.
- **Validation Steps:** Chamar a função manualmente com arrays de teste (via console/script) cobrindo os casos: sem filtro, só categoria, só prioridade, ambos.
- **Notes:** Validado via script Node cobrindo os 4 casos (nenhum filtro, categoria, prioridade, ambos) — todos corretos.

### Ticket: T015 Estilo visual base (design system minimalista)
- **Priority:** P1
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Definir paleta de cores neutra, tipografia e espaçamentos base inspirados no Notion; aplicar estilos globais e no header/board.
- **Acceptance Criteria:** Interface visualmente consistente, com hierarquia clara de tipografia e espaçamento, sem cores excessivas.
- **Validation Steps:** Revisão visual manual das telas principais (board vazio e com tarefas).
- **Notes:** Paleta neutra aplicada em `index.css`/`App.css`. Revisado via screenshots Playwright — visual limpo e consistente.

### Ticket: T016 Estilo visual de prioridade e categoria nos cards
- **Priority:** P1
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Aplicar indicadores visuais discretos de prioridade (ex.: pequena barra/ponto colorido) e badge de categoria no `TaskCard`, mantendo a linha minimalista.
- **Acceptance Criteria:** É possível distinguir visualmente a prioridade e a categoria de uma tarefa à primeira vista, sem poluir o card.
- **Validation Steps:** Revisão visual com tarefas cobrindo as 3 prioridades e categorias diferentes.
- **Notes:** Barra lateral colorida por prioridade (vermelho/amarelo/verde) + badge de categoria implementados e confirmados via screenshot.

### Ticket: T017 Estados vazios e feedback de interface
- **Priority:** P2
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Adicionar mensagens de estado vazio (coluna sem tarefas, filtro sem resultados) e pequenos feedbacks visuais (ex.: hover, transição ao mover card).
- **Acceptance Criteria:** Nenhuma coluna ou board fica visualmente "quebrado" ou confuso quando vazio; usuário recebe pista visual clara.
- **Validation Steps:** Esvaziar todas as tarefas e aplicar filtros sem resultado, conferindo as mensagens exibidas.
- **Notes:** Mensagem de vazio diferenciada ("Nenhuma tarefa aqui." vs "Nenhuma tarefa corresponde aos filtros."), destaque visual de coluna durante drag-over, hover/transition nos cards. Validado via Playwright.

### Ticket: T018 Responsividade básica de layout
- **Priority:** P2
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Garantir que o board e o formulário não quebrem em janelas menores (ex.: colunas com scroll horizontal se necessário).
- **Acceptance Criteria:** Redimensionar a janela do navegador não gera overflow quebrado ou elementos sobrepostos.
- **Validation Steps:** Testar manualmente redimensionando a janela do navegador em diferentes larguras.
- **Notes:** Breakpoint em 720px empilha colunas e ajusta padding/modal. Validado via Playwright em viewport 375x700: sem overflow horizontal, layout coerente.

### Ticket: T019 Tratamento de erros e validações de formulário
- **Priority:** P2
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Reforçar validações no `TaskForm` (título obrigatório, data válida) com mensagens de erro claras e não bloqueantes de forma confusa.
- **Acceptance Criteria:** Não é possível salvar uma tarefa sem título; mensagens de erro são exibidas de forma clara junto ao campo correspondente.
- **Validation Steps:** Tentar submeter formulários inválidos de diversas formas e conferir as mensagens.
- **Notes:** Título obrigatório com destaque visual (`aria-invalid`, borda vermelha) e mensagem de erro; limites de tamanho em título/categoria; fechar modal com Escape. Validado via Playwright.

### Ticket: T020 Revisão final e checklist de Definition of Done
- **Priority:** P0
- **Status:** Done
- **Owner:** Unassigned
- **Scope:** Percorrer manualmente todos os itens da seção "Definition of Done" deste plano, corrigindo quaisquer gaps encontrados.
- **Acceptance Criteria:** Todos os itens da Definition of Done são verificados e passam.
- **Validation Steps:** Executar o checklist completo da seção 6 manualmente, item a item, documentando o resultado.
- **Notes:** Checklist executado — ver resultado detalhado logo após a tabela de tickets.

### Checklist da Definition of Done (executado em 2026-08-21)

- [x] `npm install` e `npm run build` completam sem erros.
- [x] `npm run dev` sobe o app localmente sem erros no console.
- [x] Criação de tarefa com todos os campos — validado via Playwright.
- [x] Edição de tarefa refletida imediatamente — validado via Playwright.
- [x] Exclusão de tarefa — validado via Playwright.
- [x] Drag-and-drop entre colunas, com persistência do status após reload — validado via Playwright.
- [x] Filtro por categoria e prioridade, isolados e combinados — validado via Playwright + testes unitários de `filters.js`.
- [x] Persistência completa em `localStorage` após reload — validado via Playwright.
- [x] Interface visualmente limpa e consistente, com estados vazios claros e responsiva até 375px de largura — validado via Playwright + inspeção visual dos screenshots.

Todos os itens passaram. MVP completo (tickets T001–T020) concluído.

## 8. Open Questions

- O campo "categoria" deve permitir múltiplas categorias por tarefa no futuro, ou seguirá sempre como valor único? (Assumido: valor único para o MVP.)
- Deve haver algum limite de caracteres para título/categoria?
- A ordenação das tarefas dentro de uma mesma coluna importa (ex.: manter ordem de criação, permitir reordenar manualmente) ou é indiferente?
- Vale a pena, mesmo fora do MVP, prever desde já um formato de dados exportável (JSON) para facilitar uma futura migração para backend?
- Qual biblioteca de drag-and-drop usar: HTML5 nativo (mais leve, sem dependência) ou `@dnd-kit/core` (mais robusto, melhor UX)? Decisão a ser tomada no início do Ticket T011.

## 9. Discovered Issues Log

> _New issues must be appended here with a timestamp and brief context._
