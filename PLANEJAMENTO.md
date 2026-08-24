# Planejamento — To Do List App

## 1. Visão Geral

Aplicação de lista de tarefas (To Do List) para uso pessoal, com organização visual em estilo Kanban, categorias/tags livres e prioridades. Sem necessidade de conta, login ou sincronização entre dispositivos — todos os dados ficam salvos localmente no navegador.

## 2. Público-Alvo e Uso

- **Usuário único**: só o dono do projeto vai usar, sem multiusuário.
- **Sem autenticação/login**: não há necessidade de backend de contas.
- **Um único dispositivo**: não há requisito de sincronizar dados entre celular/PC. Os dados persistem via `localStorage` do navegador.

## 3. Plataforma e Stack Técnica

| Item | Decisão |
|---|---|
| Plataforma | Web (navegador) |
| Framework | React |
| Ferramenta de build | Vite |
| Backend | Nenhum |
| Persistência de dados | `localStorage` do navegador |

## 4. Funcionalidades das Tarefas

Cada tarefa deve suportar os seguintes campos e ações:

- **Título** da tarefa
- **Categoria/tag**: texto livre, criada pelo usuário no momento de criar/editar a tarefa (sem lista fixa pré-definida)
- **Prioridade**: alta / média / baixa
- **Data de vencimento**: apenas exibida junto à tarefa, **sem** alertas ou notificações associadas
- **Exclusão**: usuário pode excluir qualquer tarefa
- **Edição completa**: usuário pode editar qualquer campo de uma tarefa já criada (título, categoria, prioridade, data)

## 5. Organização e Visualização

- **Formato**: quadro Kanban
- **Colunas fixas**: `A Fazer` / `Fazendo` / `Concluído`
- **Movimentação entre colunas**: via drag-and-drop (arrastar e soltar)
- **Filtros**: por categoria e por prioridade (aplicados sobre o quadro)
- Não há busca por texto (não solicitada) — pode ser considerada como melhoria futura, mas não faz parte do escopo inicial.

## 6. Notificações

- **Não há** notificações push nem destaque visual automático para tarefas atrasadas/próximas do prazo.
- A data de vencimento é apenas informativa, exibida no card da tarefa.

## 7. Design e Estilo Visual

- **Estilo**: minimalista e limpo (referência: Notion)
- Poucas cores, foco no conteúdo, boa legibilidade
- (A definir na fase de design: paleta de cores específica, tipografia, tratamento visual das prioridades/categorias — provavelmente com pequenas cores de indicação por prioridade, mantendo o restante da interface neutro)

## 8. Fora de Escopo (por enquanto)

- Login / múltiplos usuários
- Sincronização entre dispositivos / backend / banco de dados
- Notificações e alertas de prazo
- Busca textual
- Colunas de Kanban customizáveis pelo usuário
- Subtarefas

Esses itens podem ser revisitados como evoluções futuras, mas não fazem parte do MVP.

## 9. Resumo das Decisões (Perguntas & Respostas da sessão de planejamento)

| Pergunta | Resposta |
|---|---|
| Para quem é a To Do list? | Só para mim (uso pessoal) |
| Onde será usada? | Web (navegador) |
| Precisa sincronizar entre dispositivos? | Não, só um dispositivo |
| Funcionalidades das tarefas? | Categorias/tags, prioridade, data de vencimento, exclusão |
| Visualização principal? | Colunas por status (Kanban) |
| Quais colunas? | A Fazer / Fazendo / Concluído |
| Como mover tarefas entre colunas? | Drag and drop |
| Notificação de prazo? | Não, só mostrar a data |
| Estilo visual? | Minimalista e limpo |
| Tecnologia? | React |
| Editar tarefa depois de criada? | Sim, editar tudo |
| Categorias fixas ou livres? | Livres, criadas a qualquer momento |
| Busca/filtro? | Sim, filtro por categoria e prioridade |
| Setup do projeto React? | Vite |

## 10. Próximos Passos

1. Validar este documento com o usuário.
2. Definir estrutura de dados da tarefa (schema/modelo).
3. Definir estrutura de pastas/componentes do projeto React.
4. Implementar o MVP conforme escopo acima.
