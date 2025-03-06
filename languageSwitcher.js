document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      welcome: "Welcome to my website!",
      greetings: "Hi, it's",
      profession: "I'm a",
      passion:
        "Passionate about creating applications, learning everyday and teaching others.",
      emailMe: "Email me",
      youtubeSectionTitle: "Check some",
      freeContentText: "free content",
      youtubeSectionTitleEnd: "here",
      subscribeText: "Subscribe to my youtube channel!",
      switchLanguage: "Mudar para Português",
      copyrightText: "All rights reserved.",
    },
    pt: {
      welcome: "Bem-vindo ao meu site!",
      greetings: "Olá, sou o",
      profession: "Eu sou",
      passion:
        "Apaixonado por criar aplicações, aprender todos os dias e ensinar os outros.",
      emailMe: "Contate via email",
      youtubeSectionTitle: "Confira",
      freeContentText: "conteúdos gratuitos",
      youtubeSectionTitleEnd: "aqui (inglês)",
      subscribeText: "Se inscreva no meu canal do youtube!",
      switchLanguage: "Switch to English",
      copyrightText: "Todos os direitos reservados.",
    },
  }

  const languageSwitcher = document.getElementById("language-switcher")
  if (languageSwitcher) {
    languageSwitcher.addEventListener("click", () => {
      const currentLang = document.documentElement.lang || "en"
      const newLang = currentLang === "en" ? "pt" : "en"
      document.documentElement.lang = newLang

      const logoText = document.getElementById("welcome-text")
      if (logoText) {
        logoText.textContent = translations[newLang].welcome
      }

      const greetingsText = document.getElementById("greetings-text")
      if (greetingsText) {
        greetingsText.textContent = translations[newLang].greetings
      }

      const professionText = document.getElementById("profession-text")
      if (professionText) {
        professionText.textContent = translations[newLang].profession
      }

      const passionText = document.getElementById("passion-text")
      if (passionText) {
        passionText.textContent = translations[newLang].passion
      }

      const emailMeText = document.getElementById("email-me")
      if (emailMeText) {
        emailMeText.textContent = translations[newLang].emailMe
      }

      const youtubeSectionTitle = document.getElementById(
        "youtube-section-title"
      )
      if (youtubeSectionTitle) {
        youtubeSectionTitle.textContent =
          translations[newLang].youtubeSectionTitle
      }

      const youtubeSectionTitleEndElement = document.getElementById(
        "youtube-section-title-end"
      )
      if (youtubeSectionTitleEndElement) {
        youtubeSectionTitleEndElement.textContent =
          translations[newLang].youtubeSectionTitleEnd
      }

      const youtubeIconElement = document.getElementById("youtube-link")
      if (youtubeIconElement) {
        youtubeIconElement.title = translations[newLang].subscribeText
      }

      const freeContentTextElement =
        document.getElementById("free-content-text")
      if (freeContentTextElement) {
        freeContentTextElement.textContent =
          translations[newLang].freeContentText
      }

      const copyrightTextElement = document.getElementById("copyright-text")
      if (copyrightTextElement) {
        copyrightTextElement.textContent = translations[newLang].copyrightText
      }

      languageSwitcher.textContent = translations[newLang].switchLanguage
    })
  }
})
