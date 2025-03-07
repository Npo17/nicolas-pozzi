// Cambio de idioma
document.getElementById("language-toggle").addEventListener("click", function () {
    const currentLang = document.documentElement.lang;
    const elementsEs = document.querySelectorAll("[data-lang='es']");
    const elementsEn = document.querySelectorAll("[data-lang='en']");
  
    if (currentLang === "es") {
      document.documentElement.lang = "en";
      this.textContent = "ES";
      elementsEs.forEach(el => el.classList.add("hidden"));
      elementsEn.forEach(el => el.classList.remove("hidden"));
    } else {
      document.documentElement.lang = "es";
      this.textContent = "EN";
      elementsEn.forEach(el => el.classList.add("hidden"));
      elementsEs.forEach(el => el.classList.remove("hidden"));
    }
  });// Agregar funcionalidad al botón de despliegue
  document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.experience-card');
      card.classList.toggle('active');
    });
  });