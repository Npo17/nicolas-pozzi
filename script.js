// Cambio de idioma 
document.getElementById("language-toggle").addEventListener("click", function() {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === "es" ? "en" : "es";
  const elementsEs = document.querySelectorAll("[data-lang='es']");
  const elementsEn = document.querySelectorAll("[data-lang='en']");
  const downloadBtn = document.getElementById("download-cv");

  // Cambiar idioma en el HTML
  document.documentElement.lang = newLang;
  this.textContent = newLang === "es" ? "EN" : "ES";

  // Mostrar/Ocultar elementos por idioma
  elementsEs.forEach(el => el.classList.toggle("hidden", newLang !== "es"));
  elementsEn.forEach(el => el.classList.toggle("hidden", newLang !== "en"));

  // Actualizar el enlace de descarga
  if (downloadBtn) {
    downloadBtn.setAttribute("href", newLang === "es" ? "assets/cv-es.pdf" : "assets/cv-en.pdf");
  }

  // ✅ Arreglar visibilidad en los textos del botón
  document.querySelectorAll('.btn-text').forEach(el => {
    const lang = el.getAttribute('data-lang');
    el.classList.toggle('hidden', lang !== newLang);
  });
  document.querySelectorAll('.btn-hover-text').forEach(el => {
    el.classList.add('hidden'); // Siempre ocultos al cambiar idioma
  });
});

// Agregar funcionalidad al botón de despliegue
document.querySelectorAll('.toggle-details').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.experience-card');
    card.classList.toggle('active');
  });
});

// Interacción para el botón de descarga
document.addEventListener('DOMContentLoaded', function() {
  const downloadBtn = document.getElementById('download-cv');
  const downloadThanks = document.getElementById('download-thanks');

  if (downloadBtn) {
    // Hover: mostrar mensaje divertido
    downloadBtn.addEventListener('mouseenter', function() {
      const currentLang = document.documentElement.lang;
      const btnText = this.querySelector(`.btn-text[data-lang="${currentLang}"]`);
      const hoverText = this.querySelector(`.btn-hover-text[data-lang="${currentLang}"]`);

      if (btnText) btnText.classList.add('hidden');
      if (hoverText) hoverText.classList.remove('hidden');
    });

    downloadBtn.addEventListener('mouseleave', function() {
      const currentLang = document.documentElement.lang;
      const btnText = this.querySelector(`.btn-text[data-lang="${currentLang}"]`);
      const hoverText = this.querySelector(`.btn-hover-text[data-lang="${currentLang}"]`);

      if (btnText) btnText.classList.remove('hidden');
      if (hoverText) hoverText.classList.add('hidden');
    });

    // Clic: mostrar mensaje de agradecimiento
    downloadBtn.addEventListener('click', function(e) {
      const currentLang = document.documentElement.lang;
      const thanksMessage = document.querySelector(`#download-thanks span[data-lang="${currentLang}"]`);
      const otherThanksMessage = document.querySelector(`#download-thanks span:not([data-lang="${currentLang}"])`);

      if (thanksMessage) thanksMessage.classList.remove('hidden');
      if (otherThanksMessage) otherThanksMessage.classList.add('hidden');
      downloadThanks.classList.remove('hidden');

      // Ocultar después de 3 segundos
      setTimeout(() => {
        downloadThanks.classList.add('hidden');
      }, 3000);
    });
  }

  // Mostrar idioma correcto al iniciar
  const initialLang = document.documentElement.lang || 'es';
  document.querySelectorAll(`[data-lang="${initialLang}"]`).forEach(el => {
    if (!el.classList.contains('btn-hover-text') && !el.classList.contains('download-confirmation')) {
      el.classList.remove('hidden');
    }
  });

  // También asegurar que solo el texto visible esté presente
  document.querySelectorAll('.btn-text').forEach(el => {
    const lang = el.getAttribute('data-lang');
    el.classList.toggle('hidden', lang !== initialLang);
  });
  document.querySelectorAll('.btn-hover-text').forEach(el => {
    el.classList.add('hidden');
  });
});