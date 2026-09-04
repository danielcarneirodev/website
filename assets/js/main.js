/**
 * Dev Raro — interações da landing page.
 * Sem dependências. Cada bloco é independente e falha em silêncio se o
 * elemento correspondente não existir na página.
 */
(() => {
  "use strict";

  const prefereMenosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------ *
   * Cabeçalho: estado visual ao rolar
   * ------------------------------------------------------------------ */
  const iniciarCabecalho = () => {
    const cabecalho = document.querySelector("[data-cabecalho]");
    if (!cabecalho) return;

    const atualizar = () => {
      cabecalho.classList.toggle("cabecalho--rolado", window.scrollY > 8);
    };

    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
  };

  /* ------------------------------------------------------------------ *
   * Menu mobile
   * ------------------------------------------------------------------ */
  const iniciarMenu = () => {
    const botao = document.querySelector("[data-menu-alternar]");
    const menu = document.querySelector("[data-menu]");
    if (!botao || !menu) return;

    const definirEstado = (aberto) => {
      botao.setAttribute("aria-expanded", String(aberto));
      menu.classList.toggle("navegacao--aberta", aberto);
      botao.querySelector(".visualmente-oculto").textContent = aberto
        ? "Fechar menu"
        : "Abrir menu";
    };

    botao.addEventListener("click", () => {
      definirEstado(botao.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (evento) => {
      if (evento.target.closest("a")) definirEstado(false);
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") definirEstado(false);
    });
  };

  /* ------------------------------------------------------------------ *
   * Revelação de seções ao rolar
   * ------------------------------------------------------------------ */
  const iniciarRevelacao = () => {
    const alvos = document.querySelectorAll(".revelar");
    if (!alvos.length) return;

    if (prefereMenosMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach((alvo) => alvo.classList.add("revelar--visivel"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("revelar--visivel");
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    alvos.forEach((alvo) => observador.observe(alvo));
  };

  /* ------------------------------------------------------------------ *
   * CTA fixo no mobile: aparece depois do hero, some sobre o formulário
   * ------------------------------------------------------------------ */
  const iniciarCtaFixo = () => {
    const cta = document.querySelector("[data-cta-fixo]");
    const hero = document.querySelector(".hero");
    const inscricao = document.querySelector("#inscricao");
    if (!cta || !hero || !("IntersectionObserver" in window)) return;

    const visibilidade = { hero: true, inscricao: false };

    const atualizar = () => {
      cta.hidden = visibilidade.hero || visibilidade.inscricao;
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          const chave = entrada.target === hero ? "hero" : "inscricao";
          visibilidade[chave] = entrada.isIntersecting;
        });
        atualizar();
      },
      { threshold: 0 }
    );

    observador.observe(hero);
    if (inscricao) observador.observe(inscricao);
  };

  /* ------------------------------------------------------------------ *
   * Ano do rodapé
   * ------------------------------------------------------------------ */
  const iniciarAno = () => {
    const alvo = document.querySelector("[data-ano]");
    if (alvo) alvo.textContent = String(new Date().getFullYear());
  };

  /* ------------------------------------------------------------------ *
   * Carrossel de fotos do mentor
   * ------------------------------------------------------------------ */
  const iniciarCarrossel = () => {
    const raiz = document.querySelector("[data-carrossel]");
    if (!raiz) return;

    const trilho = raiz.querySelector("[data-carrossel-trilho]");
    const pontosContainer = raiz.querySelector("[data-carrossel-pontos]");
    const contagemElemento = raiz.querySelector("[data-carrossel-contagem]");
    const numeroElemento = contagemElemento?.querySelector(".carrossel__numero");
    if (!trilho) return;

    const slides = Array.from(trilho.children);
    if (!slides.length) return;

    const comportamento = prefereMenosMovimento ? "auto" : "smooth";

    let indiceAtivo = 0;
    let timerContagem = null;
    let contagemAtual = 5;

    const pontos = pontosContainer
      ? slides.map((slide, indice) => {
          const ponto = document.createElement("button");
          ponto.type = "button";
          ponto.className = "carrossel__ponto";
          ponto.setAttribute("aria-label", `Ir para a foto ${indice + 1}`);
          ponto.addEventListener("click", () => {
            indiceAtivo = indice;
            slide.scrollIntoView({
              behavior: comportamento,
              inline: "center",
              block: "nearest",
            });
            reiniciarAutoPlay();
          });
          pontosContainer.appendChild(ponto);
          return ponto;
        })
      : [];

    const marcarAtivo = (indiceAtivo) => {
      pontos.forEach((ponto, indice) => {
        ponto.classList.toggle("carrossel__ponto--ativo", indice === indiceAtivo);
      });
    };

    marcarAtivo(0);

    if (pontos.length && "IntersectionObserver" in window) {
      const observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              indiceAtivo = slides.indexOf(entrada.target);
              marcarAtivo(indiceAtivo);
            }
          });
        },
        { root: trilho, threshold: 0.6 }
      );
      slides.forEach((slide) => observador.observe(slide));
    }

    const rolar = (direcao) => {
      if (direcao > 0) {
        indiceAtivo = indiceAtivo < slides.length - 1 ? indiceAtivo + 1 : 0;
      } else {
        indiceAtivo = indiceAtivo > 0 ? indiceAtivo - 1 : slides.length - 1;
      }
      slides[indiceAtivo].scrollIntoView({
        behavior: comportamento,
        inline: "center",
        block: "nearest",
      });
      marcarAtivo(indiceAtivo);
    };

    const proximoSlide = () => rolar(1);

    // Um único timer conduz a contagem e a troca de slide: nunca perdem a sincronia entre si.
    const atualizarContagem = () => {
      contagemAtual--;
      if (numeroElemento) {
        numeroElemento.textContent = String(Math.max(0, contagemAtual));
      }
      if (contagemAtual <= 0) {
        proximoSlide();
        contagemAtual = 5;
        if (numeroElemento) numeroElemento.textContent = "5";
      }
    };

    const iniciarAutoPlay = () => {
      if (prefereMenosMovimento) return;
      contagemAtual = 5;
      if (numeroElemento) numeroElemento.textContent = "5";
      timerContagem = setInterval(atualizarContagem, 1000);
    };

    const retomarAutoPlay = () => {
      if (prefereMenosMovimento) return;
      timerContagem = setInterval(atualizarContagem, 1000);
    };

    const reiniciarAutoPlay = () => {
      if (timerContagem) clearInterval(timerContagem);
      iniciarAutoPlay();
    };

    const pararAutoPlay = () => {
      if (timerContagem) clearInterval(timerContagem);
    };

    raiz
      .querySelector("[data-carrossel-anterior]")
      ?.addEventListener("click", () => {
        rolar(-1);
        reiniciarAutoPlay();
      });
    raiz
      .querySelector("[data-carrossel-proxima]")
      ?.addEventListener("click", () => {
        rolar(1);
        reiniciarAutoPlay();
      });

    // Autoplay só roda com o carrossel visível: senão o scrollIntoView do
    // avanço automático puxa a página inteira até aqui enquanto o usuário lê outra seção.
    if ("IntersectionObserver" in window) {
      const observadorPagina = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              reiniciarAutoPlay();
            } else {
              pararAutoPlay();
            }
          });
        },
        { threshold: 0.5 }
      );
      observadorPagina.observe(raiz);
    } else {
      iniciarAutoPlay();
    }

    trilho.addEventListener("mouseenter", pararAutoPlay);
    trilho.addEventListener("mouseleave", retomarAutoPlay);
    trilho.addEventListener("touchstart", pararAutoPlay);
    trilho.addEventListener("touchend", retomarAutoPlay);
  };

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

  iniciarCabecalho();
  iniciarMenu();
  iniciarRevelacao();
  iniciarCtaFixo();
  iniciarCarrossel();
  iniciarAno();
  iniciarTituloAlternado();
})();
