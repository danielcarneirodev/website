# danielcarneiro.dev — landing page do programa Dev Raro

Site estático (HTML + CSS + JS, sem build) da landing page de vendas da mentoria
**Dev Raro**, que aplica o **Método NORT 90**. Publicado via GitHub Pages.

## Estrutura

```
index.html            # landing page (única página de conversão)
privacidade.html      # política de privacidade (LGPD)
favicon.svg
robots.txt
sitemap.xml
assets/
  css/
    reset.css         # normalização + declaração da ordem de @layer
    tokens.css        # design tokens (cores, tipografia, espaçamento, efeitos)
    base.css          # elementos padrão (tipografia, links, foco)
    layout.css        # containers, grades, seções, cabeçalho e rodapé
    components.css    # botões, cartões, FAQ, CTA fixo…
    utilities.css     # helpers (skip link, honeypot, revelação no scroll)
  js/
    main.js           # cabeçalho, menu, revelação, CTA fixo
.github/skills/       # skills do Copilot: fonte da verdade de marca e padrões
```

A ordem dos `<link rel="stylesheet">` no HTML espelha a ordem declarada em
`@layer reset, tokens, base, layout, components, utilities;` (definida no topo
de `reset.css`). Ao criar um arquivo novo, respeite essa ordem.

## Convenções

- Todo o conteúdo em português do Brasil.
- Nomes de classe em português, no padrão BEM: `bloco__elemento--modificador`.
- Nenhum valor de cor, fonte, espaçamento ou raio fora de `tokens.css`.
- Propriedades lógicas (`inline-size`, `margin-block`, `inset-*`) em vez de
  `width`/`top`/`left`.
- JS sem dependências; cada função de inicialização falha em silêncio se o
  elemento não existir.
- Marca: o produto é **Dev Raro**; o método é **NORT 90**. Ver
  `.github/skills/mentoria-dev-raro/SKILL.md`.

## Rodar localmente

Qualquer servidor estático serve. Exemplos:

```powershell
npx serve .
# ou
python -m http.server 8000
```

## Antes de publicar (pendências)

- [ ] Substituir os **depoimentos de exemplo** por depoimentos reais (nome, foto
      e resultado). Não publicar com os textos de placeholder.
- [ ] Confirmar os **entregáveis** da seção "O que você recebe".
- [ ] Adicionar `assets/img/og-image.jpg` (1200×630, < 300 KB) e 3–4 fotos reais
      do mentor no lugar dos placeholders do carrossel (`#mentor`).
- [ ] Preencher o e-mail de contato e a data de atualização em
      `privacidade.html`.
- [ ] Validar o preview do link no WhatsApp e o JSON-LD no teste de resultados
      aprimorados do Google.

Decisão de produto: **nenhum preço é exibido na página**. A conversão final é
um link direto para o WhatsApp (`https://api.whatsapp.com/send?phone=...`),
sem formulário — o contato inicial acontece por lá.
