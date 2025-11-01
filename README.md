# Desafio QA - Testes End-to-End com Playwright e Cucumber

Este projeto é um desafio técnico para avaliar conhecimentos em testes automatizados end-to-end. O objetivo é desenvolver testes de integração para a aplicação **Vikunja**, uma aplicação de lista de tarefas (to-do list).

## 📋 Tecnologias

- **Playwright**: Framework de automação de testes end-to-end
- **Cucumber**: Framework BDD (Behavior-Driven Development) para escrita de testes em linguagem natural
- **TypeScript**: Linguagem de programação
- **Testcontainers**: Para executar a aplicação Vikunja em containers Docker durante os testes
- **SQLite**: Banco de dados utilizado pela aplicação Vikunja

## ⚙️ Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- **Node.js**: Versão 22 ou superior
- **Docker**: Docker Desktop (ou Docker Engine) instalado na máquina host, OU Podman/ORP stack, para que o Testcontainers funcione corretamente
- **Gerenciador de Pacotes**: Recomendamos o uso do `pnpm` (conforme especificado no projeto)

### Sistemas Operacionais Recomendados

Recomendamos usar um dos seguintes sistemas operacionais para desenvolvimento:

- **macOS**: Versões recentes
- **Windows**: Com WSL2 (Windows Subsystem for Linux 2)
- **Linux**: Distribuições modernas (Ubuntu, Fedora, etc.)

> **Nota**: O Testcontainers requer acesso ao Docker/Podman na máquina host. Certifique-se de que o Docker está em execução antes de executar os testes.

## 🎯 Objetivo do Desafio

Desenvolver testes end-to-end completos para a aplicação Vikunja, cobrindo os principais fluxos e funcionalidades da aplicação. A aplicação roda em um container Docker quando o conjunto de testes é executado, e cada scenario pode especificar um banco de dados fixture personalizado.

## 🚀 Como Funciona

### Estrutura do Projeto

- **`src/features/`**: Contém os arquivos `.feature` do Cucumber com os cenários de teste em linguagem Gherkin
- **`src/steps/`**: Contém as implementações dos steps dos testes (step definitions)
- **`src/fixtures/`**: Contém os arquivos de banco de dados SQLite que serão usados como fixtures nos testes
- **`src/lib/`**: Contém utilitários e helpers do projeto

### Executando Testes

A aplicação Vikunja é iniciada automaticamente em um container Docker usando Testcontainers quando você executa os testes. Para cada cenário, você pode especificar qual fixture de banco de dados usar através do step:

```gherkin
Given I start the application with the fixture "nome-do-arquivo.db"
```

Este step inicia um novo container de teste da aplicação usando o banco de dados especificado.

### Scripts Disponíveis

- `pnpm test`: Executa toda a suíte de testes
- `pnpm dev`: Inicia o modo de desenvolvimento com watch para arquivos `.feature` e `.ts` e abre a UI do Playwright

## 📝 O Que Deve Ser Testado

### 1. Fluxo de Autenticação

#### Sign In (Login)
- Login com email ou nome de usuário
- Verificar que o login é bem-sucedido e redireciona para a página correta

#### Sign Up (Cadastro)
- Cadastrar um novo usuário
- Verificar que o cadastro é bem-sucedido

### 2. Dashboard / Página de Lista de Tarefas

#### Gerenciamento de Itens de Tarefa (To-Do Items)

**Criar Nova Tarefa**
- Criar uma nova tarefa
- Verificar que a tarefa foi criada e está visível na lista

**Marcar como Favorito**
- Marcar uma tarefa como favorita
- Verificar que a lista de favoritos está disponível na sidebar
- Navegar para a lista de favoritos e verificar que os itens corretos estão listados
- Voltar para a lista principal e verificar que o estado de favorito está correto

**Marcar como Completo**
- Marcar uma tarefa como completa
- Verificar que a tarefa marcada como completa tem o estado de conclusão correto
- Verificar que uma mensagem de sucesso aparece na parte inferior da página com um botão "Undo" (Desfazer)
- Clicar no botão "Undo" e verificar que o checkbox é desmarcado

### 3. Página de Detalhes da Tarefa

Ao clicar em uma tarefa, você é direcionado para a página de detalhes. Nesta página, você deve testar:

- **Adicionar Labels**: Adicionar etiquetas à tarefa
- **Definir Prioridade**: Configurar a prioridade da tarefa
- **Definir Progresso**: Configurar o progresso da tarefa
- **Definir Cor**: Configurar a cor da tarefa
- **Atribuir a Usuários**: Atribuir a tarefa a outros usuários
- **Adicionar Anexos**: Adicionar arquivos anexos à tarefa
- **Adicionar Relações**: Adicionar relações com outras tarefas
- **Definir Data de Início e Prazo**: Configurar datas de início e vencimento
- **Marcar como Favorito**: Marcar a tarefa como favorita a partir da página de detalhes

### 4. Funcionalidade de Times (Teams)

Para testar esta funcionalidade, você deve:

1. **Configurar dois usuários**: Criar um arquivo de fixture de banco de dados que já contenha dois usuários, OU criar um segundo usuário durante os testes
2. **Criar um novo time**: 
   - Fazer login com um usuário
   - Criar um novo time (nomear o time)
   - Adicionar pessoas ao time (convidar o segundo usuário)
3. **Verificar compartilhamento**:
   - Fazer logout
   - Fazer login com o segundo usuário
   - Verificar que o segundo usuário vê o time criado

### 5. Compartilhamento de Projetos

- Cada conta já possui um projeto "Inbox" (Caixa de Entrada)
- Ao clicar no card do projeto, você pode ver um menu dropdown logo após o nome do projeto no topo da página
- Ao clicar no menu, você verá a opção "Share" (Compartilhar)
- Ao escolher compartilhar, você pode selecionar um time
- Definir as permissões para o time nesse projeto
- Após compartilhar, o segundo usuário deve ser capaz de ver as tarefas nesse Inbox compartilhado

### 6. Funcionalidades Extras (Opcional - Bônus)

Estas funcionalidades são consideradas extras e podem ser implementadas como bônus para demonstrar conhecimento avançado:

#### Quick Add Magic
- Criar tarefas usando palavras-chave especiais
- Criar tarefa com data de vencimento mencionando uma data no texto
- Adicionar labels automaticamente usando palavras-chave
- Adicionar assignees automaticamente usando palavras-chave
- Verificar que todas as propriedades foram aplicadas corretamente

#### Subtarefas (Subtasks)
- Criar subtarefas dentro de uma tarefa principal
- Verificar que as subtarefas aparecem corretamente
- Marcar subtarefas como completas individualmente
- Verificar que o progresso da tarefa principal reflete o status das subtarefas

#### Tarefas Recorrentes (Recurring Tasks)
- Criar uma tarefa que se repete em intervalos (semanal, mensal, etc.)
- Verificar que a tarefa aparece novamente após o intervalo configurado
- Verificar que a tarefa mantém as configurações de recorrência

#### Visualizações Alternativas
O Vikunja oferece diferentes formas de visualizar tarefas. Teste as seguintes visualizações:

- **Calendar View**: Visualizar tarefas em formato de calendário
  - Verificar que tarefas com datas aparecem nas datas corretas
  - Criar tarefa diretamente do calendário
  - Navegar entre meses

- **Gantt Chart**: Visualizar tarefas em formato de gráfico de Gantt
  - Verificar que tarefas com datas de início e prazo aparecem corretamente
  - Verificar a visualização temporal das tarefas

- **Kanban Board**: Visualizar tarefas em formato de quadro Kanban
  - Verificar que tarefas aparecem nas colunas corretas baseadas no status
  - Mover tarefas entre colunas (drag and drop)
  - Verificar que o status da tarefa é atualizado após mover

#### Filtros Salvos (Saved Filters)
- Criar um filtro com critérios específicos (ex: tarefas com determinada label, tarefas atribuídas a um usuário, etc.)
- Salvar o filtro com um nome
- Verificar que o filtro salvo aparece na lista de filtros
- Aplicar o filtro salvo e verificar que apenas as tarefas que correspondem aos critérios são exibidas

#### Compartilhamento com Links (Share Links)
- Criar um link de compartilhamento para um projeto
- Definir permissões do link (visualização, edição, etc.)
- Verificar que o link foi gerado corretamente
- Acessar o projeto através do link compartilhado (sem fazer login)
- Verificar que as permissões do link são respeitadas

#### Subprojetos (Subprojects)
- Criar um subprojeto dentro de um projeto existente
- Verificar que a organização hierárquica está correta
- Navegar entre projetos e subprojetos
- Verificar que tarefas aparecem no contexto correto (projeto pai ou subprojeto)

#### Gerenciamento de Labels
- Criar múltiplas labels com cores diferentes
- Aplicar múltiplas labels em uma mesma tarefa
- Filtrar tarefas por label
- Editar uma label existente
- Deletar uma label e verificar que ela é removida das tarefas

## 🗄️ Como Criar Arquivos de Fixture (Banco de Dados)

Os arquivos de fixture são bancos de dados SQLite que contêm dados pré-configurados para seus testes. Siga os passos abaixo para criar um novo arquivo de fixture:

### Passo 1: Iniciar a Aplicação Vikunja

No diretório raiz do projeto, execute:

```bash
docker-compose up
```

Isso iniciará a aplicação Vikunja em um container Docker na porta `3456`.

### Passo 2: Configurar o Banco de Dados

1. Acesse a aplicação em `http://localhost:3456`
2. Configure o banco de dados conforme necessário:
   - Crie usuários
   - Crie tarefas
   - Configure times
   - Configure projetos
   - Configure qualquer outro dado necessário para seus testes

### Passo 3: Parar o Docker Compose

Após configurar tudo conforme necessário, pare o container


### Passo 4: Copiar o Banco de Dados

1. Navegue até a pasta `data/db/` na raiz do projeto
2. Você encontrará o arquivo `vikunja.db`
3. Copie este arquivo para a pasta `src/fixtures/`
4. Renomeie o arquivo para um nome descritivo (ex: `dois-usuarios.db`, `projeto-compartilhado.db`, etc.)

### Exemplo

```bash
# Após parar o docker-compose
cp data/db/vikunja.db src/fixtures/meu-teste.db
```

### Passo 5: Usar a Fixture nos Testes

Agora você pode usar este arquivo de fixture em seus cenários de teste:

```gherkin
Feature: Meu Teste

    Scenario: Testar com minha fixture personalizada
        Given I start the application with the fixture "meu-teste.db"
        # ... restante dos steps
```

## 📁 Estrutura de Arquivos

```
copera-challenge-qa/
├── src/
│   ├── features/          # Arquivos .feature do Cucumber
│   │   └── auth/
│   │       └── login.feature
│   ├── fixtures/          # Arquivos de banco de dados SQLite (.db)
│   │   └── basic.db
│   ├── steps/             # Implementações dos steps
│   │   ├── auth/
│   │   ├── shared/
│   │   ├── bootstrap.ts
│   │   └── fixtures.ts
│   └── lib/               # Utilitários e helpers
│       ├── createAppContainer.ts
│       ├── helpers.ts
│       └── index.ts
├── data/                  # Dados temporários (gerados pelo docker-compose)
│   ├── db/
│   └── files/
├── docker-compose.yaml    # Configuração do Docker Compose para setup de fixtures
├── playwright.config.ts   # Configuração do Playwright
├── cucumber.json          # Configuração do Cucumber
└── package.json
```

## 📚 Recursos Adicionais

- A aplicação Vikunja está disponível em: https://vikunja.io/
- Página de Features do Vikunja: https://vikunja.io/features/ (consulte para entender todas as funcionalidades disponíveis)
- Documentação do Playwright: https://playwright.dev/
- Documentação do Cucumber: https://cucumber.io/docs/
- Documentação do Playwright BDD: https://github.com/vitalets/playwright-bdd

## 🎨 Qualidade de Código e Boas Práticas

Além de garantir que os testes funcionem corretamente, também avaliaremos a qualidade do código e a organização do projeto. Os seguintes aspectos serão considerados:

### Organização dos Steps

**Estrutura de Pastas**
- Organize os steps em pastas lógicas baseadas em funcionalidades ou páginas
- Use a pasta `shared/` para steps reutilizáveis que são usados em múltiplos cenários
- Mantenha steps específicos de uma feature em suas respectivas pastas (ex: `auth/`, `todo/`, `teams/`)

### Nomenclatura dos Steps

**Clareza e Semântica**
- Use nomes descritivos e em linguagem natural (português brasileiro)
- Os steps devem ser legíveis por pessoas não técnicas
- Evite abreviações e termos técnicos desnecessários
- Siga o padrão Given-When-Then do BDD


### Implementação dos Steps

**Reutilização e Manutenibilidade**
- Crie steps genéricos e reutilizáveis sempre que possível
- Evite duplicação de código - extraia lógica comum para funções auxiliares
- Mantenha os steps simples e focados em uma única ação ou verificação
- Use page objects ou funções auxiliares para interações complexas

**Exemplo de step bem implementado:**
```typescript
// shared/fields.ts
When('I type {string} into field with label {string}', async ({ page }, value: string, label: string) => {
    await page.getByRole('textbox', { name: label }).fill(value);
});
```

**Complexidade**
- Steps devem ser atômicos (fazer uma coisa de cada vez)
- Se um step fizer múltiplas ações, considere dividir em steps menores
- Evite steps que dependem de estado anterior não explícito
- Prefira composição de steps simples sobre steps monolíticos

### Seletores do Playwright

**Semântica e Robustez**
Avaliaremos especialmente a escolha e qualidade dos seletores utilizados. Prefira seletores semânticos e robustos.


**Boas Práticas de Seletores:**
- ✅ Prefira `getByRole()` para elementos interativos (botões, links, inputs)
- ✅ Use `getByLabel()` para campos de formulário
- ✅ Use `getByText()` para texto visível na página
- ✅ Use `getByPlaceholder()` quando apropriado
- ✅ Evite seletores que dependem de classes CSS específicas
- ✅ Evite seletores que dependem de estrutura HTML específica
- ✅ Use seletores compostos quando necessário (ex: `page.getByRole('button').filter({ hasText: 'Salvar' })`)

**Exemplo de seletores bem escolhidos:**
```typescript
// ✅ Bom - semântico e robusto
await page.getByRole('button', { name: 'Criar Tarefa' }).click();
await page.getByLabel('Título da Tarefa').fill('Minha tarefa');
await page.getByRole('checkbox', { name: 'Marcar como favorito' }).check();

// ❌ Ruim - depende de classes CSS específicas
await page.locator('.btn-create').click();
await page.locator('#task-title').fill('Minha tarefa');
await page.locator('.favorite-checkbox').check();
```

### Outros Aspectos de Qualidade

**Legibilidade do Código**
- Use nomes de variáveis descritivos
- Adicione comentários quando a lógica não for óbvia
- Mantenha funções pequenas e focadas

## ✅ Checklist de Funcionalidades a Testar

### Funcionalidades Obrigatórias

- [ ] Sign in com email/username
- [ ] Sign up de novo usuário
- [ ] Criar nova tarefa e verificar criação
- [ ] Marcar tarefa como favorita e verificar na sidebar
- [ ] Verificar lista de favoritos
- [ ] Marcar tarefa como completa e verificar estado
- [ ] Verificar mensagem de sucesso com botão Undo
- [ ] Testar funcionalidade Undo
- [ ] Página de detalhes: adicionar labels
- [ ] Página de detalhes: definir prioridade
- [ ] Página de detalhes: definir progresso
- [ ] Página de detalhes: definir cor
- [ ] Página de detalhes: atribuir a usuários
- [ ] Página de detalhes: adicionar anexos
- [ ] Página de detalhes: definir datas de início e prazo
- [ ] Página de detalhes: marcar como favorito
- [ ] Criar time e adicionar pessoas
- [ ] Compartilhar time entre usuários
- [ ] Compartilhar projeto com time
- [ ] Verificar permissões de compartilhamento
- [ ] Verificar acesso do segundo usuário a projetos compartilhados

### Funcionalidades Extras (Bônus)

- [ ] Quick Add Magic: criar tarefa com data mencionada no texto
- [ ] Quick Add Magic: adicionar labels usando palavras-chave
- [ ] Quick Add Magic: adicionar assignees usando palavras-chave
- [ ] Criar subtarefas dentro de uma tarefa
- [ ] Marcar subtarefas como completas e verificar progresso da tarefa principal
- [ ] Criar tarefa recorrente (semanal/mensal)
- [ ] Calendar View: visualizar tarefas no calendário
- [ ] Calendar View: criar tarefa diretamente do calendário
- [ ] Gantt Chart: visualizar tarefas em formato Gantt
- [ ] Kanban Board: visualizar tarefas em quadro Kanban
- [ ] Kanban Board: mover tarefas entre colunas (drag and drop)
- [ ] Table View: visualizar tarefas em formato de tabela
- [ ] Table View: alterar colunas visíveis
- [ ] Table View: ordenar tarefas por diferentes colunas
- [ ] Criar filtro salvo com critérios específicos
- [ ] Aplicar filtro salvo e verificar resultados
- [ ] Criar link de compartilhamento para projeto
- [ ] Acessar projeto através de link compartilhado (sem login)
- [ ] Criar subprojeto dentro de projeto existente
- [ ] Navegar entre projetos e subprojetos
- [ ] Criar múltiplas labels com cores diferentes
- [ ] Aplicar múltiplas labels em uma tarefa
- [ ] Filtrar tarefas por label
- [ ] Editar label existente
- [ ] Deletar label e verificar remoção das tarefas

---

Boa sorte com o desafio! 🚀

## Instruções de entrega
Você deve disponibilizar o seu projeto em um repositório privado no GitHub e dar acesso de leitura para os usuários @matheusAle e @christiancuri.