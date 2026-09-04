# Landing Page Dev Raro — Corte de Texto e Clareza — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever a landing page `index.html` para ser mais direta (menos texto por seção), adicionar uma seção de qualificação, um mural de provas com imagens, ocultar a barra de rolagem e alternar o título da aba quando o usuário sai dela.

**Architecture:** Site estático (HTML + CSS em camadas `@layer` + JS vanilla sem build). Nenhuma dependência nova. Todas as mudanças são edições diretas em `index.html`, `assets/css/base.css`, `assets/css/components.css` e `assets/js/main.js`, seguindo os padrões de nomenclatura (BEM em português) e tokens já existentes.

**Tech Stack:** HTML5, CSS3 (custom properties, `@layer`), JavaScript vanilla (IIFE), sem framework, sem bundler.

## Global Constraints

- Nenhuma promessa de resultado garantido de emprego em nenhum texto novo (regra do CDC já seguida no site).
- Português do Brasil, tom direto, frases curtas (regra da skill `copywriting-conversao` deste repositório).
- Não alterar paleta, tipografia ou tokens (`assets/css/tokens.css`).
- Preservar os ids de âncora usados pelo menu: `#problema`, `#metodo`, `#incluso`, `#mentor`, `#faq`, `#inscricao`.
- Sem framework de testes automatizados neste projeto (site estático). Verificação de cada tarefa é manual: `Select-String` (grep) para confirmar marcadores no HTML/CSS/JS, a ferramenta `get_errors` para lint, e uma verificação final no navegador via Playwright MCP (task 11).
- Nomeação de classes novas segue o padrão BEM em português já usado (`.cartao--mentira`, `.cartao--pilar`, etc.). Por consistência com o design system existente, o modificador de card compacto usado na task 3 chama-se `.cartao--compacto` (em vez de `.cartao--publico`, citado na spec — mesmo conceito, nome alinhado à convenção `.cartao--<papel>`).

---

## Task 1: CSS — ocultar barra de rolagem + novos componentes visuais

**Files:**
- Modify: `assets/css/base.css` (regra `html`)
- Modify: `assets/css/components.css` (adicionar `.chip`, `.mural-provas`, `.cartao--compacto` no final do arquivo)

**Interfaces:**
- Produces: classes CSS `.chips`, `.chip`, `.mural-provas`, `.mural-provas__item`, `.cartao--compacto`, `.cartao__icone` — consumidas pelas tasks 3, 7 e 8 (HTML).

- [ ] **Step 1: Ocultar a barra de rolagem em `base.css`**

Modificar o bloco `html` em `assets/css/base.css`:

```css
@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-block-start: calc(var(--altura-cabecalho) + var(--sp-4));
    scrollbar-width: none; /* Firefox: barra de rolagem oculta */
    -ms-overflow-style: none; /* Edge legado */
  }

  html::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge Chromium */
  }
```

- [ ] **Step 2: Verificar a alteração**

Rodar (PowerShell):
```powershell
Select-String -Path assets/css/base.css -Pattern "scrollbar-width: none"
```
Esperado: 1 linha encontrada dentro do bloco `html`.

- [ ] **Step 3: Adicionar os 3 componentes novos ao final de `components.css`**

Adicionar ao final do arquivo `assets/css/components.css` (após o último bloco existente, ainda dentro do `@layer components` que envolve o arquivo):

```css
  /* ---------- Card compacto (ícone + 1 linha) ---------- */
  .cartao--compacto {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    padding: var(--sp-4);
  }

  .cartao__icone {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    inline-size: 2.5rem;
    block-size: 2.5rem;
    border-radius: var(--raio-md);
    border: 1px solid rgb(34 197 94 / 35%);
    background-color: rgb(34 197 94 / 10%);
    color: var(--cor-marca);
  }

  .cartao--compacto p {
    margin: 0;
    color: var(--cor-texto);
    font-size: var(--fs-400);
  }

  /* ---------- Chips de credencial ---------- */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    margin-block-start: var(--sp-2);
    padding: 0;
    list-style: none;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: var(--sp-1) var(--sp-3);
    border-radius: var(--raio-pill);
    border: var(--borda-sutil);
    background-color: rgb(255 255 255 / 3%);
    color: var(--cor-texto-suave);
    font-size: var(--fs-200);
    font-weight: var(--peso-medio);
  }

  /* ---------- Mural de provas (depoimentos em imagem) ---------- */
  .mural-provas {
    display: grid;
    gap: var(--sp-4);
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    list-style: none;
  }

  @media (min-width: 48em) {
    .mural-provas {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .mural-provas__item {
    display: grid;
    gap: var(--sp-2);
  }

  .mural-provas__item img {
    inline-size: 100%;
    block-size: auto;
    border-radius: var(--raio-md);
    border: var(--borda-sutil);
    box-shadow: var(--sombra-sm);
  }

  .mural-provas__item figcaption {
    color: var(--cor-texto-suave);
    font-size: var(--fs-300);
    text-align: center;
  }
```

- [ ] **Step 4: Verificar a alteração**

```powershell
Select-String -Path assets/css/components.css -Pattern "\.mural-provas|\.cartao--compacto|\.chip "
```
Esperado: pelo menos 3 ocorrências (uma por componente novo).

- [ ] **Step 5: Checar erros de lint**

Usar a ferramenta `get_errors` nos dois arquivos (`assets/css/base.css`, `assets/css/components.css`).
Esperado: nenhum erro.

- [ ] **Step 6: Commit**

```powershell
git add assets/css/base.css assets/css/components.css
git commit -m "style: ocultar scrollbar e adicionar componentes de card compacto, chips e mural de provas"
```

---

## Task 2: JS — título da aba alterna quando ela perde o foco

**Files:**
- Modify: `assets/js/main.js` (nova função `iniciarTituloAlternado`, chamada no final do IIFE)

**Interfaces:**
- Consumes: nenhuma (função independente, sem dependência de elementos do DOM).
- Produces: nenhuma (efeito colateral apenas em `document.title`).

- [ ] **Step 1: Adicionar a função antes da chamada final das funções `iniciar*`**

Modificar `assets/js/main.js`, inserindo antes do bloco final (`iniciarCabecalho(); ...`):

```js
  /* ------------------------------------------------------------------ *
   * Título da aba: chama de volta quando o usuário sai da página
   * ------------------------------------------------------------------ */
  const iniciarTituloAlternado = () => {
    const tituloOriginal = document.title;
    const mensagens = ["Volte aqui!", "Junte-se ao DEV RARO"];
    let indiceAtual = 0;
    let timer = null;

    const alternar = () => {
      document.title = mensagens[indiceAtual % mensagens.length];
      indiceAtual++;
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        indiceAtual = 0;
        alternar();
        timer = setInterval(alternar, 1500);
      } else {
        clearInterval(timer);
        document.title = tituloOriginal;
      }
    });
  };
```

- [ ] **Step 2: Registrar a chamada da função**

Modificar o bloco final do arquivo:

```js
  iniciarCabecalho();
  iniciarMenu();
  iniciarRevelacao();
  iniciarCtaFixo();
  iniciarCarrossel();
  iniciarAno();
  iniciarTituloAlternado();
})();
```

- [ ] **Step 3: Verificar a alteração**

```powershell
Select-String -Path assets/js/main.js -Pattern "iniciarTituloAlternado"
```
Esperado: 2 ocorrências (definição da função + chamada).

- [ ] **Step 4: Checar erros de lint**

Usar a ferramenta `get_errors` em `assets/js/main.js`.
Esperado: nenhum erro.

- [ ] **Step 5: Commit**

```powershell
git add assets/js/main.js
git commit -m "feat: alternar titulo da aba quando a pagina perde o foco"
```

---

## Task 3: HTML — nova seção "Para quem é o Dev Raro"

**Files:**
- Modify: `index.html` (inserir nova `<section>` entre a seção `barra-confianca` e a seção `problema`)

**Interfaces:**
- Consumes: classes `.cartao--compacto`, `.cartao__icone` (task 1), `.grade`, `.grade--4` (já existentes em `layout.css`).
- Produces: id de seção `#publico`, consumido apenas para navegação por âncora direta (não está no menu principal).

- [ ] **Step 1: Inserir a seção após a "PROVA SOCIAL RÁPIDA" e antes da seção "3. DOR"**

Contexto atual (não muda, serve de âncora para a inserção):

```html
      <!-- 2. PROVA SOCIAL RÁPIDA -->
      <section class="barra-confianca" aria-label="Por que confiar no programa">
        <div class="container">
          <ul class="barra-confianca__lista">
            <li>Método construído sobre o mercado real, não sobre teoria</li>
            <li>Foco único: a sua primeira vaga</li>
            <li>Mentoria individual, direto comigo</li>
            <li>Conteúdo diário no Instagram e no YouTube</li>
          </ul>
        </div>
      </section>

      <!-- 3. DOR -->
```

Substituir por (mantém o bloco original e adiciona a nova seção logo depois):

```html
      <!-- 2. PROVA SOCIAL RÁPIDA -->
      <section class="barra-confianca" aria-label="Por que confiar no programa">
        <div class="container">
          <ul class="barra-confianca__lista">
            <li>Método construído sobre o mercado real, não sobre teoria</li>
            <li>Foco único: a sua primeira vaga</li>
            <li>Mentoria individual, direto comigo</li>
            <li>Conteúdo diário no Instagram e no YouTube</li>
          </ul>
        </div>
      </section>

      <!-- 3. PARA QUEM É -->
      <section class="secao" id="publico" aria-labelledby="publico-titulo">
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">Para quem é</p>
            <h2 id="publico-titulo" class="secao__titulo">
              Feito para quem quer a primeira vaga em tech
            </h2>
          </header>

          <div class="grade grade--4 revelar">
            <article class="cartao cartao--compacto">
              <span class="cartao__icone" aria-hidden="true">1</span>
              <p>Está começando do zero e não sabe por onde ir</p>
            </article>
            <article class="cartao cartao--compacto">
              <span class="cartao__icone" aria-hidden="true">2</span>
              <p>Estuda todo dia mas sente que não avança</p>
            </article>
            <article class="cartao cartao--compacto">
              <span class="cartao__icone" aria-hidden="true">3</span>
              <p>Já aplicou pra vagas e não passa da triagem</p>
            </article>
            <article class="cartao cartao--compacto">
              <span class="cartao__icone" aria-hidden="true">4</span>
              <p>Quer visibilidade pra recrutador chamar primeiro</p>
            </article>
          </div>
        </div>
      </section>

      <!-- 4. DOR -->
```

- [ ] **Step 2: Verificar a alteração**

```powershell
Select-String -Path index.html -Pattern 'id="publico"'
```
Esperado: 1 ocorrência.

- [ ] **Step 3: Checar erros**

Usar `get_errors` em `index.html`.
Esperado: nenhum erro.

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "feat: adicionar secao 'Para quem e o Dev Raro'"
```

---

## Task 4: HTML — fundir "Dor" + "Big Idea" em "Problema → Virada"

**Files:**
- Modify: `index.html` (substituir as seções `<!-- 4. DOR -->` — renumerada na task 3 — e `<!-- 4. BIG IDEA -->` por uma única seção `#problema`)

**Interfaces:**
- Produces: id `#problema` (consumido pelo link de menu `<a href="#problema">O problema</a>`, já existente — não precisa mudar o menu).

- [ ] **Step 1: Substituir as duas seções por uma só**

Localizar o bloco atual (da seção DOR original até o fim da seção BIG IDEA):

```html
      <!-- 3. DOR -->
      <section class="secao" id="problema" aria-labelledby="problema-titulo">
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">O problema real</p>
            <h2 id="problema-titulo" class="secao__titulo">
              Se essa é a sua rotina, o problema não é você
            </h2>
            <p class="secao__descricao">
              Você não é preguiçoso. Só nunca te deram um mapa.
            </p>
          </header>

          <div class="grade grade--3 revelar">
            <article class="cartao">
              <h3 class="cartao__titulo">O notebook aberto</h3>
              <p>
                Você abre o notebook cansado, troca de vídeo duas vezes e fecha
                sem sentir progresso. De novo.
              </p>
            </article>
            <article class="cartao">
              <h3 class="cartao__titulo">A rolagem que confunde</h3>
              <p>
                Um post manda estudar Python. Outro diz que acabou. Você sai do
                celular mais perdido do que entrou.
              </p>
            </article>
            <article class="cartao">
              <h3 class="cartao__titulo">O pensamento das 00h</h3>
              <p>
                “To estudando, não sei se ta certo, to inseguro, não to pronto.”
                E você nem sabe dizer o que está fazendo de errado.
              </p>
            </article>
          </div>

          <p class="citacao revelar">
            “Eu sentia que vivia rodando em círculos, sem saber se um dia isso
            ia mudar.”
          </p>
        </div>
      </section>

      <!-- 4. BIG IDEA -->
      <section class="secao secao--alt" aria-labelledby="virada-titulo">
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">A virada</p>
            <h2 id="virada-titulo" class="secao__titulo">
              Mais conteúdo não resolve. Direção resolve.
            </h2>
            <p class="secao__descricao">
              Sem direção, até esforço vira desperdício. Com direção, qualquer
              esforço vira progresso.
            </p>
          </header>

          <div class="grade grade--3 revelar">
            <article class="cartao cartao--mentira">
              <p class="cartao__rotulo">A mentira</p>
              <h3 class="cartao__titulo">
                “Preciso estudar tudo antes de tentar uma vaga.”
              </h3>
              <p>
                Essa crença mantém gente capaz fora do mercado, estudando pra
                sempre.
              </p>
            </article>
            <article class="cartao cartao--verdade">
              <p class="cartao__rotulo">A verdade</p>
              <h3 class="cartao__titulo">
                O mercado não contrata quem sabe mais.
              </h3>
              <p>
                Contrata quem se posiciona e gera valor. Conteúdo sem direção te
                atrasa.
              </p>
            </article>
            <article class="cartao cartao--caminho">
              <p class="cartao__rotulo">O novo caminho</p>
              <h3 class="cartao__titulo">
                Clareza + execução guiada + visibilidade.
              </h3>
              <p>
                É exatamente o que o Método NORT 90 organiza pra você, semana a
                semana.
              </p>
            </article>
          </div>
        </div>
      </section>
```

Substituir por:

```html
      <!-- 4. PROBLEMA -> VIRADA -->
      <section class="secao" id="problema" aria-labelledby="problema-titulo">
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">A virada</p>
            <h2 id="problema-titulo" class="secao__titulo">
              Mais conteúdo não resolve. Direção resolve.
            </h2>
            <p class="secao__descricao">
              Sem direção, até esforço vira desperdício.
            </p>
          </header>

          <div class="grade grade--3 revelar">
            <article class="cartao cartao--mentira">
              <p class="cartao__rotulo">A mentira</p>
              <h3 class="cartao__titulo">
                “Preciso estudar tudo antes de tentar uma vaga.”
              </h3>
            </article>
            <article class="cartao cartao--verdade">
              <p class="cartao__rotulo">A verdade</p>
              <h3 class="cartao__titulo">
                O mercado contrata quem se posiciona, não quem sabe mais.
              </h3>
            </article>
            <article class="cartao cartao--caminho">
              <p class="cartao__rotulo">O caminho</p>
              <h3 class="cartao__titulo">
                Clareza + execução guiada + visibilidade.
              </h3>
            </article>
          </div>

          <p class="citacao revelar">“Agora eu sei exatamente o que fazer.”</p>
        </div>
      </section>
```

- [ ] **Step 2: Verificar a alteração**

```powershell
Select-String -Path index.html -Pattern 'id="problema-titulo"|id="virada-titulo"'
```
Esperado: só `id="problema-titulo"` aparece; `id="virada-titulo"` não existe mais (0 ocorrências).

- [ ] **Step 3: Checar erros**

Usar `get_errors` em `index.html`.

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "refactor: fundir secoes Dor e Big Idea em Problema -> Virada"
```

---

## Task 5: HTML — fundir "Método" + "Transformação" em uma seção só

**Files:**
- Modify: `index.html` (mover o comparativo antes/depois de dentro da seção `#transformacao` para dentro da seção `#metodo`, removendo a seção `#transformacao`)

**Interfaces:**
- Produces: id `#metodo` (consumido pelo link `<a href="#metodo">O método</a>` já existente).
- Remove: id `#transformacao` (confirmado na spec como não referenciado em nenhum outro lugar).

- [ ] **Step 1: Substituir as seções "5. TRANSFORMAÇÃO" e "6. MÉTODO" por uma única seção "5. MÉTODO"**

Localizar o bloco atual (da seção TRANSFORMAÇÃO até o fim da seção MÉTODO, incluindo o `cta-linha`):

```html
      <!-- 5. TRANSFORMAÇÃO -->
      <section
        class="secao"
        id="transformacao"
        aria-labelledby="transformacao-titulo"
      >
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">A transformação</p>
            <h2 id="transformacao-titulo" class="secao__titulo">
              O que muda quando você finalmente tem um norte
            </h2>
          </header>

          <div class="comparativo revelar">
            <div class="comparativo__coluna comparativo__coluna--antes">
              <h3 class="comparativo__titulo">Hoje, sem direção</h3>
              <ul class="lista-marcada lista-marcada--negativa">
                <li>Perdido entre dez caminhos possíveis</li>
                <li>Estudando muito e retendo pouco</li>
                <li>Invisível para quem contrata</li>
                <li>Ansioso, comparando sua vida com a dos outros</li>
                <li>
                  Adiando a primeira aplicação para “quando estiver pronto”
                </li>
              </ul>
            </div>
            <div class="comparativo__coluna comparativo__coluna--depois">
              <h3 class="comparativo__titulo">Com o Método NORT 90</h3>
              <ul class="lista-marcada lista-marcada--positiva">
                <li>Uma área escolhida com base no mercado real</li>
                <li>Um plano de estudo enxuto, na ordem certa</li>
                <li>LinkedIn e currículo que fazem o recrutador parar</li>
                <li>Rotina possível, com progresso visível toda semana</li>
                <li>Aplicando para vagas desde cedo, com estratégia</li>
              </ul>
            </div>
          </div>

          <p class="citacao revelar">“Agora eu sei exatamente o que fazer.”</p>
        </div>
      </section>

      <!-- 6. MÉTODO -->
      <section
        class="secao secao--alt"
        id="metodo"
        aria-labelledby="metodo-titulo"
      >
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">O mecanismo</p>
            <h2 id="metodo-titulo" class="secao__titulo">
              Método NORT 90: quatro pilares, noventa dias
            </h2>
            <p class="secao__descricao">
              O sistema aplicado dentro da mentoria individual Dev Raro. Você
              executa desde o dia 1; o acompanhamento comigo dura 6 meses.
            </p>
          </header>

          <div class="grade grade--4 revelar">
            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">N</span>
              <h3 class="cartao__titulo">Navegação do mercado</h3>
              <p>
                Leitura real das áreas de TI e escolha estratégica de caminho,
                sem achismo e sem modinha.
              </p>
              <p class="pilar__resultado">“Agora eu sei pra onde ir”</p>
            </article>

            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">O</span>
              <h3 class="cartao__titulo">Organização de habilidades</h3>
              <p>
                Stack definida e ordem correta de aprendizado. Menos conteúdo,
                porém o certo. Fim do estudo aleatório.
              </p>
              <p class="pilar__resultado">“Agora eu sei o que estudar”</p>
            </article>

            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">R</span>
              <h3 class="cartao__titulo">Relevância no mercado</h3>
              <p>
                LinkedIn estratégico, currículo orientado a valor e aplicação
                inteligente, desde o início, não no final.
              </p>
              <p class="pilar__resultado">“Agora eu sou visto”</p>
            </article>

            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">T</span>
              <h3 class="cartao__titulo">Tração diária</h3>
              <p>
                Um sistema de estudo, prática e aplicação que cabe na sua
                rotina. Consistência sem depender de motivação.
              </p>
              <p class="pilar__resultado">“Agora eu avanço todos os dias”</p>
            </article>
          </div>

          <div class="cta-linha revelar">
            <p>Do zero à direção clara, visibilidade e execução consistente.</p>
            <a class="botao botao--primario" href="#inscricao">
              Quero minha vaga no Dev Raro
            </a>
          </div>
        </div>
      </section>
```

Substituir por:

```html
      <!-- 5. MÉTODO -->
      <section
        class="secao secao--alt"
        id="metodo"
        aria-labelledby="metodo-titulo"
      >
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">O mecanismo</p>
            <h2 id="metodo-titulo" class="secao__titulo">
              Método NORT 90: quatro pilares, noventa dias
            </h2>
            <p class="secao__descricao">
              Você executa desde o dia 1. O acompanhamento comigo dura 6 meses.
            </p>
          </header>

          <div class="grade grade--4 revelar">
            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">N</span>
              <h3 class="cartao__titulo">Navegação do mercado</h3>
              <p>Escolha estratégica de área, sem achismo.</p>
              <p class="pilar__resultado">“Agora eu sei pra onde ir”</p>
            </article>

            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">O</span>
              <h3 class="cartao__titulo">Organização de habilidades</h3>
              <p>Stack certa, na ordem certa.</p>
              <p class="pilar__resultado">“Agora eu sei o que estudar”</p>
            </article>

            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">R</span>
              <h3 class="cartao__titulo">Relevância no mercado</h3>
              <p>LinkedIn e currículo que fazem o recrutador parar.</p>
              <p class="pilar__resultado">“Agora eu sou visto”</p>
            </article>

            <article class="cartao cartao--pilar">
              <span class="pilar__letra" aria-hidden="true">T</span>
              <h3 class="cartao__titulo">Tração diária</h3>
              <p>Rotina de estudo e prática que cabe no seu dia.</p>
              <p class="pilar__resultado">“Agora eu avanço todos os dias”</p>
            </article>
          </div>

          <div class="comparativo revelar">
            <div class="comparativo__coluna comparativo__coluna--antes">
              <h3 class="comparativo__titulo">Hoje, sem direção</h3>
              <ul class="lista-marcada lista-marcada--negativa">
                <li>Perdido entre dez caminhos</li>
                <li>Estuda muito, retém pouco</li>
                <li>Invisível pro recrutador</li>
                <li>Adia a primeira aplicação</li>
              </ul>
            </div>
            <div class="comparativo__coluna comparativo__coluna--depois">
              <h3 class="comparativo__titulo">Com o Método NORT 90</h3>
              <ul class="lista-marcada lista-marcada--positiva">
                <li>Área escolhida com dados reais</li>
                <li>Plano enxuto, na ordem certa</li>
                <li>LinkedIn que atrai recrutador</li>
                <li>Aplica desde cedo, com estratégia</li>
              </ul>
            </div>
          </div>

          <div class="cta-linha revelar">
            <p>Do zero à direção clara, visibilidade e execução consistente.</p>
            <a class="botao botao--primario" href="#inscricao">
              Quero minha vaga no Dev Raro
            </a>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verificar a alteração**

```powershell
Select-String -Path index.html -Pattern 'id="transformacao"|id="metodo"'
```
Esperado: só `id="metodo"` aparece; `id="transformacao"` não existe mais (0 ocorrências).

- [ ] **Step 3: Checar erros**

Usar `get_errors` em `index.html`.

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "refactor: fundir secoes Transformacao e Metodo, encurtar textos dos pilares"
```

---

## Task 6: HTML — encurtar "O que você recebe" (Incluso)

**Files:**
- Modify: `index.html` (seção `#incluso`, encurtar descrição de cada um dos 6 cards para 1 linha)

- [ ] **Step 1: Substituir a lista de entregáveis**

Localizar:

```html
          <ul class="grade grade--3 lista-entregas revelar">
            <li class="cartao">
              <h3 class="cartao__titulo">Diagnóstico de direção</h3>
              <p>
                Mapeamos seu ponto de partida, seu tempo real disponível e a
                área com maior chance de te empregar.
              </p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Seu mapa NORT 90</h3>
              <p>
                O plano semana a semana: o que estudar, praticar e publicar.
                Enxuto o suficiente para você cumprir.
              </p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Encontros individuais</h3>
              <p>
                Sessões comigo para corrigir a rota e destravar o que estiver te
                parando naquela semana.
              </p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Revisão de posicionamento</h3>
              <p>
                LinkedIn, currículo e apresentação profissional revisados pra
                fazer o recrutador parar em você.
              </p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Preparação para entrevistas</h3>
              <p>
                Como falar de você, de projetos sem ter experiência e não travar
                na primeira pergunta técnica.
              </p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Suporte direto comigo</h3>
              <p>
                Canal aberto pelo WhatsApp durante os 6 meses de mentoria,
                sempre que você travar.
              </p>
            </li>
          </ul>
```

Substituir por:

```html
          <ul class="grade grade--3 lista-entregas revelar">
            <li class="cartao">
              <h3 class="cartao__titulo">Diagnóstico de direção</h3>
              <p>Mapeamos seu ponto de partida e a área com mais chance de te empregar.</p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Seu mapa NORT 90</h3>
              <p>Plano semana a semana: o que estudar, praticar e publicar.</p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Encontros individuais</h3>
              <p>Sessões comigo pra corrigir a rota e destravar a semana.</p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Revisão de posicionamento</h3>
              <p>LinkedIn e currículo revisados pra recrutador parar em você.</p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Preparação para entrevistas</h3>
              <p>Roteiro pra falar de você sem travar na pergunta técnica.</p>
            </li>
            <li class="cartao">
              <h3 class="cartao__titulo">Suporte direto comigo</h3>
              <p>Canal aberto no WhatsApp durante os 6 meses de mentoria.</p>
            </li>
          </ul>
```

- [ ] **Step 2: Verificar a alteração**

```powershell
Select-String -Path index.html -Pattern "Mapeamos seu ponto de partida e a área"
```
Esperado: 1 ocorrência.

- [ ] **Step 3: Checar erros**

Usar `get_errors` em `index.html`.

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "copy: encurtar descricoes da secao O que voce recebe"
```

---

## Task 7: HTML — encurtar bio do mentor + adicionar chips de credenciais

**Files:**
- Modify: `index.html` (seção `#mentor`, bloco `.mentor__texto`)
- Consumes: classes `.chips`, `.chip` (task 1)

- [ ] **Step 1: Substituir o bloco `.mentor__texto`**

Localizar:

```html
          <div class="mentor__texto">
            <p class="secao__etiqueta">Quem vai te guiar</p>
            <h2 id="mentor-titulo" class="secao__titulo">
              Eu sou o Daniel Carneiro
            </h2>
            <p>
              Sou engenheiro de software sênior na Accruent, empresa americana
              de tecnologia, onde trabalho de forma 100% remota, lidero as
              iniciativas de inteligência artificial aplicada ao desenvolvimento
              e venci o hackathon de IA do grupo Fortive. Antes disso, comecei
              como trainee no Banco Safra e cheguei a gerente de TI no
              Santander, liderando equipes técnicas.
            </p>
            <p>
              Participo hoje dos mesmos processos seletivos que decidem se você
              entra ou não no mercado. Também sou mentor voluntário na ONG Pulse
              Mais, ajudando jovens de baixa renda a entrarem em TI. Foi lá que
              confirmei: o problema quase nunca é capacidade, é direção.
            </p>
            <p class="mentor__assinatura">
              “Enquanto todo mundo ensina código, eu te dou o norte para entrar
              no mercado.”
            </p>
          </div>
```

Substituir por:

```html
          <div class="mentor__texto">
            <p class="secao__etiqueta">Quem vai te guiar</p>
            <h2 id="mentor-titulo" class="secao__titulo">
              Eu sou o Daniel Carneiro
            </h2>
            <p>
              Sou engenheiro de software sênior na Accruent, lidero iniciativas
              de IA aplicada ao desenvolvimento e venci o hackathon de IA do
              grupo Fortive. Hoje participo dos mesmos processos seletivos que
              decidem sua entrada no mercado — e confirmo todo dia: o problema
              quase nunca é capacidade, é direção.
            </p>
            <ul class="chips">
              <li class="chip">Accruent · Eng. Sênior</li>
              <li class="chip">Ex-Santander · Gerente de TI</li>
              <li class="chip">Ex-Safra · Trainee</li>
              <li class="chip">Hackathon IA · Fortive</li>
              <li class="chip">Mentor voluntário · ONG Pulse Mais</li>
            </ul>
            <p class="mentor__assinatura">
              “Enquanto todo mundo ensina código, eu te dou o norte para entrar
              no mercado.”
            </p>
          </div>
```

- [ ] **Step 2: Verificar a alteração**

```powershell
Select-String -Path index.html -Pattern 'class="chips"'
```
Esperado: 1 ocorrência.

- [ ] **Step 3: Checar erros**

Usar `get_errors` em `index.html`.

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "copy: encurtar bio do mentor e adicionar chips de credenciais"
```

---

## Task 8: HTML — Depoimentos vira mural de provas (imagens) + 2 fallback em texto

**Files:**
- Modify: `index.html` (seção `#depoimentos`)
- Consumes: classes `.mural-provas`, `.mural-provas__item` (task 1)

**Nota:** as imagens de prova (`assets/images/prova-01.jpg` … `prova-06.jpg`) são placeholders. O usuário fornecerá os prints reais depois (ver "Pendências" na spec). O `alt` de cada imagem descreve o conteúdo esperado para não quebrar acessibilidade enquanto o placeholder estiver no ar.

- [ ] **Step 1: Substituir a seção "9. DEPOIMENTOS"**

Localizar (da abertura da seção até o fechamento):

```html
      <!-- 9. DEPOIMENTOS -->
      <!-- TODO: substituir pelos depoimentos reais (nome, foto e resultado). Não publicar com textos de exemplo. -->
      <section
        class="secao"
        id="depoimentos"
        aria-labelledby="depoimentos-titulo"
      >
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">Prova</p>
            <h2 id="depoimentos-titulo" class="secao__titulo">
              Gente comum, com a mesma dúvida que você tem hoje
            </h2>
          </header>

          <div class="grade grade--3 revelar">
            <figure class="cartao cartao--depoimento">
              <blockquote>
                <p>
                  “Eu vivia estudando e não sentia progresso nenhum, tipo
                  rodando em círculos mesmo. Na primeira semana de mentoria já
                  sabia qual área seguir e o que parar de estudar. Foi um
                  alívio.”
                </p>
              </blockquote>
              <figcaption class="depoimento__autor">
                <span class="depoimento__nome">Camila</span>
                <span class="depoimento__resultado"
                  >Escolheu a área e o plano de estudo em 1 semana</span
                >
              </figcaption>
            </figure>

            <figure class="cartao cartao--depoimento">
              <blockquote>
                <p>
                  “Meu LinkedIn era basicamente um currículo morto. Depois da
                  revisão que fizemos juntos, recebi mensagem de recrutador pela
                  primeira vez na vida.”
                </p>
              </blockquote>
              <figcaption class="depoimento__autor">
                <span class="depoimento__nome">Rafael</span>
                <span class="depoimento__resultado"
                  >Primeira mensagem de recrutador em 2 meses</span
                >
              </figcaption>
            </figure>

            <figure class="cartao cartao--depoimento">
              <blockquote>
                <p>
                  “Eu achava que meu problema era falta de tempo. Era falta de
                  prioridade. Hoje estudo bem menos horas por dia e avanço muito
                  mais do que antes.”
                </p>
              </blockquote>
              <figcaption class="depoimento__autor">
                <span class="depoimento__nome">Bianca</span>
                <span class="depoimento__resultado"
                  >Reduziu o tempo de estudo e triplicou o progresso</span
                >
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
```

Substituir por:

```html
      <!-- 9. DEPOIMENTOS -->
      <!-- TODO: substituir as imagens placeholder (prova-01.jpg .. prova-06.jpg) por prints reais de WhatsApp/Instagram fornecidos pelo usuário. Não publicar com placeholders. -->
      <section
        class="secao"
        id="depoimentos"
        aria-labelledby="depoimentos-titulo"
      >
        <div class="container">
          <header class="secao__cabecalho revelar">
            <p class="secao__etiqueta">Prova</p>
            <h2 id="depoimentos-titulo" class="secao__titulo">
              Gente comum, com a mesma dúvida que você tem hoje
            </h2>
          </header>

          <ul class="mural-provas revelar">
            <li class="mural-provas__item">
              <img
                src="assets/images/prova-01.jpg"
                alt="Print de mensagem de aluno relatando resultado da mentoria"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Camila</figcaption>
            </li>
            <li class="mural-provas__item">
              <img
                src="assets/images/prova-02.jpg"
                alt="Print de mensagem de aluno relatando resultado da mentoria"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Rafael</figcaption>
            </li>
            <li class="mural-provas__item">
              <img
                src="assets/images/prova-03.jpg"
                alt="Print de mensagem de aluno relatando resultado da mentoria"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Bianca</figcaption>
            </li>
            <li class="mural-provas__item">
              <img
                src="assets/images/prova-04.jpg"
                alt="Print de mensagem de aluno relatando resultado da mentoria"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Aluno Dev Raro</figcaption>
            </li>
            <li class="mural-provas__item">
              <img
                src="assets/images/prova-05.jpg"
                alt="Print de mensagem de aluno relatando resultado da mentoria"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Aluno Dev Raro</figcaption>
            </li>
            <li class="mural-provas__item">
              <img
                src="assets/images/prova-06.jpg"
                alt="Print de mensagem de aluno relatando resultado da mentoria"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Aluno Dev Raro</figcaption>
            </li>
          </ul>

          <div class="grade grade--3 revelar">
            <figure class="cartao cartao--depoimento">
              <blockquote>
                <p>“Na primeira semana já sabia qual área seguir.”</p>
              </blockquote>
              <figcaption class="depoimento__autor">
                <span class="depoimento__nome">Camila</span>
                <span class="depoimento__resultado"
                  >Escolheu a área e o plano de estudo em 1 semana</span
                >
              </figcaption>
            </figure>

            <figure class="cartao cartao--depoimento">
              <blockquote>
                <p>“Recebi mensagem de recrutador pela primeira vez na vida.”</p>
              </blockquote>
              <figcaption class="depoimento__autor">
                <span class="depoimento__nome">Rafael</span>
                <span class="depoimento__resultado"
                  >Primeira mensagem de recrutador em 2 meses</span
                >
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verificar a alteração**

```powershell
Select-String -Path index.html -Pattern 'class="mural-provas revelar"'
```
Esperado: 1 ocorrência.

- [ ] **Step 3: Checar erros**

Usar `get_errors` em `index.html`.

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "feat: converter depoimentos em mural de provas com fallback em texto"
```

---

## Task 9: HTML — encurtar Oferta (regra + garantia em 1 frase)

**Files:**
- Modify: `index.html` (seção `#oferta`, bloco `.oferta__conteudo`)

- [ ] **Step 1: Substituir o parágrafo de garantia**

Localizar:

```html
              <p class="oferta__garantia">
                <strong>Garantia de 7 dias.</strong> Entrou, participou e sentiu
                que não é para você? Devolvemos o valor integral, sem
                burocracia.
              </p>
```

Substituir por:

```html
              <p class="oferta__garantia">
                <strong>Garantia de 7 dias.</strong> Entrou, participou e não
                fez sentido? Devolvemos 100% em até 7 dias, sem perguntas.
              </p>
```

- [ ] **Step 2: Verificar a alteração**

```powershell
Select-String -Path index.html -Pattern "sem perguntas"
```
Esperado: 1 ocorrência.

- [ ] **Step 3: Checar erros**

Usar `get_errors` em `index.html`.

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "copy: encurtar garantia da oferta para uma frase"
```

---

## Task 10: HTML + JSON-LD — reduzir FAQ para 5 perguntas

**Files:**
- Modify: `index.html` (bloco `<script type="application/ld+json">` no `<head>` e a seção `#faq`)

- [ ] **Step 1: Atualizar o `FAQPage` no JSON-LD**

Localizar, dentro do `@graph` do `<script type="application/ld+json">`:

```json
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Eu sou totalmente iniciante. O Dev Raro é para mim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. O primeiro passo do Método NORT 90 é escolher o caminho certo antes de estudar qualquer tecnologia."
                }
              },
              {
                "@type": "Question",
                "name": "Já tentei antes e não deu certo. O que muda aqui?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Faltou direção, não esforço. Aqui você tem um plano guiado e acompanhamento comigo por 6 meses."
                }
              },
              {
                "@type": "Question",
                "name": "Não tenho muito tempo livre. Consigo acompanhar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. A rotina é montada a partir do tempo real que você tem hoje, não do ideal."
                }
              },
              {
                "@type": "Question",
                "name": "Quanto tempo dura a mentoria?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O plano é estruturado em até 90 dias e você já executa desde o dia 1. O acompanhamento individual comigo dura 6 meses."
                }
              },
              {
                "@type": "Question",
                "name": "É mentoria em grupo ou individual?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Individual. Só você e eu, sem turma e sem grupo."
                }
              },
              {
                "@type": "Question",
                "name": "Vocês garantem que vou conseguir emprego?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. Ninguém sério garante contratação. Garanto direção, plano e acompanhamento até você estar pronto."
                }
              },
              {
                "@type": "Question",
                "name": "Como funciona a inscrição?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Clique no botão do WhatsApp aqui embaixo. Conversamos por lá sobre o seu momento e o investimento."
                }
              }
            ]
          }
```

Substituir por:

```json
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Sou iniciante total. Isso é pra mim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. O primeiro passo do Método NORT 90 é escolher o caminho certo antes de estudar qualquer tecnologia."
                }
              },
              {
                "@type": "Question",
                "name": "Já tentei antes e não deu certo. O que muda?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Faltou direção, não esforço. Aqui você tem plano guiado e 6 meses de acompanhamento comigo."
                }
              },
              {
                "@type": "Question",
                "name": "Não tenho muito tempo livre. Consigo acompanhar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. A rotina é montada a partir do seu tempo real, não do ideal."
                }
              },
              {
                "@type": "Question",
                "name": "É mentoria individual ou em grupo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Individual. Só você e eu, sem turma."
                }
              },
              {
                "@type": "Question",
                "name": "Vocês garantem que vou conseguir emprego?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. Ninguém sério garante contratação. Garanto direção, plano e acompanhamento até você estar pronto."
                }
              }
            ]
          }
```

- [ ] **Step 2: Substituir a seção `#faq` visível no HTML**

Localizar:

```html
          <div class="faq revelar">
            <details class="faq__item">
              <summary class="faq__pergunta">
                Eu sou totalmente iniciante. O Dev Raro é para mim?
              </summary>
              <div class="faq__resposta">
                <p>
                  Sim. O primeiro passo do Método NORT 90 é escolher o caminho
                  certo antes de estudar qualquer tecnologia.
                </p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Já tentei antes e não deu certo. O que muda aqui?
              </summary>
              <div class="faq__resposta">
                <p>
                  Faltou direção, não esforço. Aqui você tem um plano guiado e
                  acompanhamento comigo por 6 meses.
                </p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Não tenho muito tempo livre. Consigo acompanhar?
              </summary>
              <div class="faq__resposta">
                <p>
                  Sim. A rotina é montada a partir do tempo real que você tem
                  hoje, não do ideal.
                </p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Quanto tempo dura a mentoria?
              </summary>
              <div class="faq__resposta">
                <p>
                  O plano é estruturado em até 90 dias e você já executa desde o
                  dia 1. O acompanhamento individual comigo dura 6 meses.
                </p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                É mentoria em grupo ou individual?
              </summary>
              <div class="faq__resposta">
                <p>Individual. Só você e eu, sem turma e sem grupo.</p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Vocês garantem que vou conseguir emprego?
              </summary>
              <div class="faq__resposta">
                <p>
                  Não. Ninguém sério garante contratação. Garanto direção, plano
                  e acompanhamento até você estar pronto.
                </p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Como funciona a inscrição?
              </summary>
              <div class="faq__resposta">
                <p>
                  Clique no botão do WhatsApp aqui embaixo. Conversamos por lá
                  sobre o seu momento e o investimento.
                </p>
              </div>
            </details>
          </div>
```

Substituir por:

```html
          <div class="faq revelar">
            <details class="faq__item">
              <summary class="faq__pergunta">
                Sou iniciante total. Isso é pra mim?
              </summary>
              <div class="faq__resposta">
                <p>
                  Sim. O primeiro passo do Método NORT 90 é escolher o caminho
                  certo antes de estudar qualquer tecnologia.
                </p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Já tentei antes e não deu certo. O que muda?
              </summary>
              <div class="faq__resposta">
                <p>
                  Faltou direção, não esforço. Aqui você tem plano guiado e 6
                  meses de acompanhamento comigo.
                </p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Não tenho muito tempo livre. Consigo acompanhar?
              </summary>
              <div class="faq__resposta">
                <p>Sim. A rotina é montada a partir do seu tempo real, não do ideal.</p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                É mentoria individual ou em grupo?
              </summary>
              <div class="faq__resposta">
                <p>Individual. Só você e eu, sem turma.</p>
              </div>
            </details>

            <details class="faq__item">
              <summary class="faq__pergunta">
                Vocês garantem que vou conseguir emprego?
              </summary>
              <div class="faq__resposta">
                <p>
                  Não. Ninguém sério garante contratação. Garanto direção, plano
                  e acompanhamento até você estar pronto.
                </p>
              </div>
            </details>
          </div>
```

- [ ] **Step 3: Verificar a alteração**

```powershell
(Select-String -Path index.html -Pattern '"@type": "Question"').Count
```
Esperado: `5`.

```powershell
(Select-String -Path index.html -Pattern 'class="faq__item"').Count
```
Esperado: `5`.

- [ ] **Step 4: Validar que o JSON-LD continua bem formado**

```powershell
node -e "const fs=require('fs'); const html=fs.readFileSync('index.html','utf8'); const m=html.match(/<script type=[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/); JSON.parse(m[1]); console.log('JSON-LD valido');"
```
Esperado: `JSON-LD valido` impresso, sem erro de `JSON.parse`.

- [ ] **Step 5: Checar erros**

Usar `get_errors` em `index.html`.

- [ ] **Step 6: Commit**

```powershell
git add index.html
git commit -m "copy: reduzir FAQ para 5 perguntas e sincronizar com JSON-LD"
```

---

## Task 11: Verificação final no navegador (Playwright)

**Files:** nenhum (só verificação)

**Interfaces:**
- Consumes: todas as mudanças das tasks 1–10.

- [ ] **Step 1: Abrir o arquivo no navegador via Playwright MCP**

Usar a ferramenta de navegação do Playwright MCP para abrir
`file:///c:/projects/Study/danielcarneirodev-website/index.html`.

- [ ] **Step 2: Verificar ausência de erros no console**

Checar mensagens de console do navegador.
Esperado: nenhum erro de JS.

- [ ] **Step 3: Verificar a barra de rolagem oculta**

Executar no contexto da página:
```js
getComputedStyle(document.documentElement).scrollbarWidth
```
Esperado: `"none"`.

- [ ] **Step 4: Verificar a alternância do título da aba**

Executar no contexto da página, em sequência:
```js
Object.defineProperty(document, "hidden", { value: true, configurable: true });
document.dispatchEvent(new Event("visibilitychange"));
```
Aguardar ~2 segundos e ler `document.title`.
Esperado: `"Volte aqui!"` ou `"Junte-se ao DEV RARO"` (o valor alterna a cada 1,5s).

Depois, restaurar e verificar o retorno ao título original:
```js
Object.defineProperty(document, "hidden", { value: false, configurable: true });
document.dispatchEvent(new Event("visibilitychange"));
```
Esperado: `document.title` volta a ser `"Dev Raro | Sua rota para a primeira vaga em TI"`.

- [ ] **Step 5: Verificar âncoras do menu**

Clicar em cada link do menu principal (`#problema`, `#metodo`, `#incluso`,
`#mentor`, `#faq`) e confirmar que a página rola até a seção correspondente
sem erro.

- [ ] **Step 6: Screenshot de cada seção nova/alterada**

Capturar screenshot de: seção "Para quem é", seção "Problema → Virada",
seção "Método" (com o comparativo), seção "Depoimentos" (mural de provas),
seção "Mentor" (chips), seção FAQ.
Confirmar visualmente: nenhum texto cortado, nenhum overflow horizontal,
paleta e tipografia inalteradas.

- [ ] **Step 7: Registrar o resultado**

Se tudo passar, não é necessário commit (task de verificação, sem mudança
de arquivo). Se algo falhar, voltar à task correspondente, corrigir e
recomitar.

---

## Resumo de arquivos tocados

- `assets/css/base.css` — scrollbar oculta (task 1)
- `assets/css/components.css` — `.cartao--compacto`, `.chips`/`.chip`, `.mural-provas` (task 1)
- `assets/js/main.js` — `iniciarTituloAlternado` (task 2)
- `index.html` — todas as demais tasks (3 a 10)
- `assets/images/prova-01.jpg` … `prova-06.jpg` — **pendentes do usuário**, referenciados como placeholder na task 8
