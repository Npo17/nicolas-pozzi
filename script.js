// Cambio de idioma
document.getElementById("language-toggle").addEventListener("click", function() {
  const currentLang = document.documentElement.lang;
  const elementsEs = document.querySelectorAll("[data-lang='es']");
  const elementsEn = document.querySelectorAll("[data-lang='en']");
  const downloadBtn = document.getElementById("download-cv");
  
  if (currentLang === "es") {
    // Cambiar a inglés
    document.documentElement.lang = "en";
    this.textContent = "ES";
    elementsEs.forEach(el => el.classList.add("hidden"));
    elementsEn.forEach(el => el.classList.remove("hidden"));
    
    // Actualizar el enlace de descarga
    downloadBtn.setAttribute("href", "assets/cv-en.pdf");
  } else {
    // Cambiar a español
    document.documentElement.lang = "es";
    this.textContent = "EN";
    elementsEn.forEach(el => el.classList.add("hidden"));
    elementsEs.forEach(el => el.classList.remove("hidden"));
    
    // Actualizar el enlace de descarga
    downloadBtn.setAttribute("href", "assets/cv-es.pdf");
  }
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
    // Configurar hover
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
    
    // Configurar click
    downloadBtn.addEventListener('click', function(e) {
      const currentLang = document.documentElement.lang;
      const thanksMessage = document.querySelector(`#download-thanks span[data-lang="${currentLang}"]`);
      const otherThanksMessage = document.querySelector(`#download-thanks span:not([data-lang="${currentLang}"])`);
      
      // Mostrar mensaje de confirmación
      if (thanksMessage) thanksMessage.classList.remove('hidden');
      if (otherThanksMessage) otherThanksMessage.classList.add('hidden');
      downloadThanks.classList.remove('hidden');
      
      // Ocultar después de 3 segundos
      setTimeout(() => {
        downloadThanks.classList.add('hidden');
      }, 3000);
      
      // La descarga se manejará automáticamente por el atributo download
    });
  }
  
  // Configurar idioma inicial
  const initialLang = document.documentElement.lang || 'es';
  document.querySelectorAll(`[data-lang="${initialLang}"]`).forEach(el => {
    if (!el.classList.contains('btn-hover-text') && !el.classList.contains('download-confirmation')) {
      el.classList.remove('hidden');
    }
  });
});