# Landing page Dev Raro — corte de texto e clareza (inspirado no AceleraDev)

**Data:** 2026-09-04
**Status:** aguardando revisão do usuário

## Objetivo

O site atual (`index.html`) é bonito, mas denso: várias seções (Dor, Big Idea,
Transformação, Mentor, Oferta) usam parágrafos corridos onde uma landing page
de conversão deveria usar frase curta + elemento visual. O objetivo desta
mudança é reduzir a densidade de texto em todas as seções e encurtar o
comprimento total da página, sem alterar paleta, tipografia, JS existente ou
a proposta de posicionamento (Método NORT 90).

Referência de estilo: https://aceleradev.com.br/ — página do mesmo nicho que
resolve cada seção com 1 frase de gancho + lista curta ou imagem, nunca dois
parágrafos seguidos.

## Diagnóstico (resumo)

| Aspecto | AceleraDev | Dev Raro hoje |
|---|---|---|
| Prova social | Prints reais de feedback | Parágrafos de depoimento |
| Método | 5 pilares, 1 frase cada | 4 pilares, frase + resultado |
| Antes/depois | Bullets de 3-4 palavras | Bullets de frase completa |
| Qualificação | Seção dedicada "Para quem é" | Inexistente |
| Sobre o mentor | 2 parágrafos curtos | 2 parágrafos densos |
| Garantia | 1 frase | Parágrafo + bullets + parágrafo |
| FAQ | Perguntas enxutas | 7 perguntas, resposta em parágrafo |

## Nova arquitetura de seções (12 → 10, mais uma nova)

| # | Seção | id | Mudança |
|---|---|---|---|
| 1 | Hero | `#topo` | Sem mudança |
| 2 | Prova social rápida | — | Sem mudança |
| 3 | **Para quem é o Dev Raro** *(nova)* | `#publico` | 4 cards de 1 linha, qualifica o visitante |
| 4 | Problema → Virada *(fusão de Dor + Big Idea)* | `#problema` | Remove os 3 cards de dor + citação; 1 frase de contexto + 3 cards mentira/verdade/caminho |
| 5 | Método NORT 90 *(absorve Transformação)* | `#metodo` | 4 pilares de 1 linha + comparativo antes/depois compacto |
| 6 | O que você recebe | `#incluso` | Mesmos 6 cards, texto cortado para 1 linha |
| 7 | Quem sou eu | `#mentor` | Bio de 2 parágrafos → 1 parágrafo + chips de credenciais |
| 8 | Depoimentos → Mural de provas | `#depoimentos` | Grid de imagens (prints reais) + legenda curta |
| 9 | Oferta | `#oferta` | Regra + garantia → 1 frase única; bullets mantidos |
| 10 | FAQ | `#faq` | 7 perguntas → 5, resposta de 1 linha; `FAQPage` JSON-LD atualizado |
| — | CTA final + Rodapé | `#inscricao` | Sem mudança |

A navegação do cabeçalho (`#problema`, `#metodo`, `#incluso`, `#mentor`,
`#faq`) continua válida porque os ids são preservados nas seções fundidas.
O id `#transformacao` deixa de existir (conteúdo absorvido por `#metodo`) —
não é referenciado em nenhum lugar, então a remoção é segura.

## Copy final por seção

### 3. Para quem é o Dev Raro (nova)
- "Está começando do zero e não sabe por onde ir"
- "Estuda todo dia mas sente que não avança"
- "Já aplicou pra vagas e não passa da triagem"
- "Quer visibilidade pra recrutador chamar primeiro"

### 4. Problema → Virada
- Título: "Mais conteúdo não resolve. Direção resolve."
- Contexto (1 linha): "Sem direção, até esforço vira desperdício."
- Cards:
  - Mentira — "Preciso estudar tudo antes de tentar uma vaga."
  - Verdade — "O mercado contrata quem se posiciona, não quem sabe mais."
  - Caminho — "Clareza + execução guiada + visibilidade."
- Citação: "Agora eu sei exatamente o que fazer."

### 5. Método NORT 90
- 4 pilares (título + 1 linha + resultado entre aspas, mantendo o texto
  atual de resultado: "Agora eu sei pra onde ir", "Agora eu sei o que
  estudar", "Agora eu sou visto", "Agora eu avanço todos os dias").
- Comparativo antes/depois compacto:
  - Antes: "Perdido entre dez caminhos" · "Estuda muito, retém pouco" ·
    "Invisível pro recrutador" · "Adia a primeira aplicação"
  - Depois: "Área escolhida com dados reais" · "Plano enxuto, na ordem
    certa" · "LinkedIn que atrai recrutador" · "Aplica desde cedo, com
    estratégia"
- CTA de fechamento mantido igual.

### 6. O que você recebe
Mesmos 6 títulos de card, descrição cortada para 1 linha cada (ex.:
"Sessões comigo pra corrigir a rota e destravar a semana.").

### 7. Quem sou eu
- Parágrafo único: Accruent + IA + hackathon + missão (direção, não
  capacidade).
- Chips: `Accruent · Eng. Sênior` · `Ex-Santander · Gerente de TI` ·
  `Ex-Safra · Trainee` · `Hackathon IA · Fortive` · `Mentor voluntário ·
  ONG Pulse Mais`
- Mantra mantido: "Enquanto todo mundo ensina código, eu te dou o norte
  para entrar no mercado."

### 8. Depoimentos → Mural de provas
- Grid de imagens (prints de WhatsApp/Instagram fornecidos pelo usuário)
  com `figcaption` curta (nome + resultado em poucas palavras).
- **Pendência:** aguardando prints reais do usuário. Até lá, usar o mesmo
  padrão de placeholder já existente no código (comentário `TODO`) e manter
  2 depoimentos em texto curto (1 linha) como conteúdo de fallback/SEO.

### 9. Oferta
Bullets mantidos como estão. Regra + garantia viram uma frase única:
"Entrou, participou e não fez sentido? Devolvemos 100% em até 7 dias, sem
perguntas."

### 10. FAQ (5 perguntas finais)
1. "Sou iniciante total. Isso é pra mim?" → "Sim. O primeiro passo do NORT
   90 é escolher o caminho certo antes de estudar qualquer tecnologia."
2. "Já tentei antes e não deu certo. O que muda?" → "Faltou direção, não
   esforço. Aqui você tem plano guiado e 6 meses de acompanhamento comigo."
3. "Não tenho muito tempo livre. Consigo acompanhar?" → "Sim. A rotina é
   montada a partir do seu tempo real, não do ideal."
4. "É mentoria individual ou em grupo?" → "Individual. Só você e eu, sem
   turma."
5. "Vocês garantem que vou conseguir emprego?" → "Não. Ninguém sério
   garante contratação. Garanto direção, plano e acompanhamento até você
   estar pronto."

Perguntas removidas ("Quanto tempo dura a mentoria?" e "Como funciona a
inscrição?") porque já são respondidas em outras seções (Hero, Método,
Oferta, CTA final). O bloco `FAQPage` no JSON-LD do `<head>` é atualizado
para as mesmas 5 perguntas/respostas.

## Componentes novos de CSS (dentro do design system atual)

Sem novas cores, fontes ou tokens — apenas 3 classes novas seguindo o
padrão BEM já usado em `components.css`:

- `.grade--publico` / `.cartao--publico` — cards pequenos com ícone + 1
  linha (seção "Para quem é").
- `.chips` / `.chip` — pill de credencial (seção "Quem sou eu").
- `.mural-provas` / `.mural-provas__item` — grid de imagens com
  `figcaption` (seção "Depoimentos").

## Duas melhorias adicionais de UX (pedidas pelo usuário)

### A. Ocultar a barra de rolagem da página

O projeto já usa essa técnica no carrossel do mentor
(`.carrossel__trilho` em `components.css`, linhas ~605-611). Replicar o
mesmo padrão em `base.css` para `html`, mantendo a rolagem funcional:

```css
html {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Edge legado */
}
html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge Chromium */
}
```

### B. Título da aba alterna quando a página perde o foco

Usar a Page Visibility API (`document.visibilitychange`), seguindo o
mesmo padrão de função independente e auto-contida do `main.js`
(`iniciarXxx`, falha em silêncio, sem dependências):

- Ao sair da aba (`document.hidden === true`): iniciar um intervalo que
  alterna `document.title` entre `"Volte aqui!"` e `"Junte-se ao DEV
  RARO"` a cada 1,5s.
- Ao voltar para a aba: parar o intervalo e restaurar o título original
  da página (`Dev Raro | Sua rota para a primeira vaga em TI`).

## Fora de escopo

- Paleta de cores, tipografia, tokens (`tokens.css`).
- JS existente (cabeçalho, menu, revelação, CTA fixo, carrossel) — só
  adição de uma função nova (título alternado).
- Estrutura do `<head>` (meta tags, Open Graph) — exceto o conteúdo do
  `FAQPage` no JSON-LD, que é atualizado para bater com as 5 perguntas
  finais.
- Formulário/CTA final — mantém o link do WhatsApp como está.

## Pendências do usuário

- Fornecer prints reais (WhatsApp/Instagram) para o mural de provas da
  seção Depoimentos. Até lá, o código usa placeholders com comentário
  `TODO`, no mesmo padrão já usado para as fotos do mentor.

## Critérios de aceite

- [ ] Nenhuma seção tem mais de 1 parágrafo de texto corrido (fora a bio
      do mentor, que tem exatamente 1 parágrafo).
- [ ] Todos os ids de âncora do menu (`#problema`, `#metodo`, `#incluso`,
      `#mentor`, `#faq`) continuam funcionando.
- [ ] FAQ tem exatamente 5 perguntas, e o JSON-LD `FAQPage` bate com o
      HTML visível.
- [ ] Barra de rolagem da página não aparece em nenhum navegador testado,
      e a rolagem continua funcional (mouse, teclado, touch).
- [ ] Título da aba volta ao valor original ao reganhar o foco; nunca
      fica "preso" no texto alternado.
- [ ] Nenhuma promessa de emprego garantido em nenhum texto novo.
