# Par de Programação com IA — da ideia ao código funcionando

Material da aula **"Par de Programação com IA"**, ministrada por Yuri Garcia no InfoHub (Sistemas de Informação · AMF), sobre uma versão enxuta de **Spec-Driven Development (SDD)**: decidir o que o software deve fazer antes de pedir para a IA escrever como.

## A aula

Aula prática de 1h30, com o seguinte roteiro:

1. **O que é SDD** — decidir o *o quê* antes do *como*
2. **Os 4 artefatos** — planejamento, marcos, Definition of Done e histórico de decisões
3. **Setup** — Cursor + skills customizadas
4. **Construção do zero** — um projeto real, em par com a IA, aplicando os 4 artefatos
5. **Fechamento** — reflexão sobre os momentos em que foi preciso corrigir ou redirecionar a IA

Os slides completos estão em [`par-programacao-ia (2).pptx`](<par-programacao-ia (2).pptx>).

## Os 4 artefatos do SDD enxuto

| Artefato | Pergunta que responde | Neste repo |
|---|---|---|
| **Planejamento** | O que estamos construindo, com que contexto e restrições? | [`PLANEJAMENTO.md`](PLANEJAMENTO.md) |
| **Marcos / Definition of Done** | Quando cada etapa está realmente pronta? | [`PLAN.md`](PLAN.md) (seções 6 e 7) |
| **Histórico de decisões** | Por que escolhemos X e não Y? | Registrado nas *Notes* de cada ticket em [`PLAN.md`](PLAN.md) |

Na aula, esses artefatos evitam três problemas comuns ao programar com IA: reexplicar o projeto a cada sessão, a IA perder o rumo no meio da tarefa, e o critério de "pronto" virar opinião de cada um.

## Exemplo prático: [`todo-app/`](todo-app/)

Projeto construído do zero durante a aula para demonstrar o fluxo completo: entrevista de escopo → planejamento → plano de implementação com tickets → construção incremental → validação.

- **O quê:** to-do list pessoal, quadro Kanban (A Fazer / Fazendo / Concluído), categorias livres, prioridade, data de vencimento, filtros, drag-and-drop
- **Stack:** React + Vite, sem backend (persistência via `localStorage`)
- **Como rodar:**
  ```bash
  cd todo-app
  npm install
  npm run dev
  ```

O caminho completo até aqui está documentado em [`PLANEJAMENTO.md`](PLANEJAMENTO.md) (levantamento de escopo) e [`PLAN.md`](PLAN.md) (plano de implementação com 20 tickets, todos concluídos e validados).

## Skills usadas

Skills customizadas do Cursor/Claude usadas para conduzir a aula, em [`.claude/skills/`](.claude/skills/):

- **grill-me** — entrevista guiada para transformar uma ideia vaga em escopo definido
- **project-planner** — gera o plano de implementação (`PLAN.md`) com tickets, critérios de aceite e Definition of Done
- **database-designer** — modela schema e relações de banco de dados a partir da spec
- **frontend-design** — aplica padrões de UI consistentes sem precisar reexplicar estilo a cada vez

## Contato

Yuri Garcia — [@yurigarciia](https://github.com/yurigarciia)
