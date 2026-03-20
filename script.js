(function () {
  "use strict";

  function getReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getTouchPrimary() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }

  function setLanguageUI(lang) {
    var toggle = document.getElementById("language-toggle");
    if (!toggle) return;
    toggle.textContent = lang === "es" ? "EN" : "ES";
    toggle.setAttribute(
      "aria-label",
      lang === "es" ? "Cambiar idioma a inglés" : "Switch language to Spanish"
    );
  }

  function applyLanguage(newLang) {
    var elementsEs = document.querySelectorAll("[data-lang='es']");
    var elementsEn = document.querySelectorAll("[data-lang='en']");
    var downloadBtn = document.getElementById("download-cv");

    document.documentElement.lang = newLang;
    setLanguageUI(newLang);

    elementsEs.forEach(function (el) {
      el.classList.toggle("hidden", newLang !== "es");
    });
    elementsEn.forEach(function (el) {
      el.classList.toggle("hidden", newLang !== "en");
    });

    if (downloadBtn) {
      downloadBtn.setAttribute(
        "href",
        newLang === "es" ? "assets/cv-es.pdf" : "assets/cv-en.pdf"
      );
    }

    document.querySelectorAll(".btn-text").forEach(function (el) {
      var lang = el.getAttribute("data-lang");
      el.classList.toggle("hidden", lang !== newLang);
    });
    document.querySelectorAll(".btn-hover-text").forEach(function (el) {
      el.classList.add("hidden");
    });
  }

  function initLanguageToggle() {
    var btn = document.getElementById("language-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var current = document.documentElement.lang || "es";
      applyLanguage(current === "es" ? "en" : "es");
    });
  }

  function launchCvCelebration() {
    if (getReducedMotion()) return;

    var root = document.getElementById("cv-celebration-root");
    if (!root) return;

    root.innerHTML = "";

    var count = 20;
    var frag = document.createDocumentFragment();
    var i;

    for (i = 0; i < count; i++) {
      var el = document.createElement("span");
      el.className = "cv-mini-doc";
      el.setAttribute("aria-hidden", "true");
      var startX = Math.random() * 100;
      var delay = Math.random() * 0.4;
      var dur = 2.1 + Math.random() * 0.85;
      var rot = (Math.random() - 0.5) * 48;
      var drift = (Math.random() - 0.5) * 100;
      el.style.left = startX + "%";
      el.style.animationDelay = delay + "s";
      el.style.animationDuration = dur + "s";
      el.style.setProperty("--cv-rot", rot + "deg");
      el.style.setProperty("--cv-drift", drift + "px");
      frag.appendChild(el);
    }

    root.appendChild(frag);

    window.setTimeout(function () {
      root.innerHTML = "";
    }, 3400);
  }

  function initDownloadCv() {
    var downloadBtn = document.getElementById("download-cv");
    var downloadThanks = document.getElementById("download-thanks");
    if (!downloadBtn || !downloadThanks) return;

    if (!getReducedMotion()) {
      downloadBtn.addEventListener("mouseenter", function () {
        var currentLang = document.documentElement.lang || "es";
        var btnText = this.querySelector('.btn-text[data-lang="' + currentLang + '"]');
        var hoverText = this.querySelector('.btn-hover-text[data-lang="' + currentLang + '"]');
        if (btnText) btnText.classList.add("hidden");
        if (hoverText) hoverText.classList.remove("hidden");
      });

      downloadBtn.addEventListener("mouseleave", function () {
        var currentLang = document.documentElement.lang || "es";
        var btnText = this.querySelector('.btn-text[data-lang="' + currentLang + '"]');
        var hoverText = this.querySelector('.btn-hover-text[data-lang="' + currentLang + '"]');
        if (btnText) btnText.classList.remove("hidden");
        if (hoverText) hoverText.classList.add("hidden");
      });
    }

    downloadBtn.addEventListener("click", function () {
      var currentLang = document.documentElement.lang || "es";
      var thanksMessage = downloadThanks.querySelector(
        'span[data-lang="' + currentLang + '"]'
      );
      var otherThanksMessage = downloadThanks.querySelector(
        "span[data-lang]:not([data-lang='" + currentLang + "'])"
      );
      if (thanksMessage) thanksMessage.classList.remove("hidden");
      if (otherThanksMessage) otherThanksMessage.classList.add("hidden");
      downloadThanks.classList.remove("hidden");
      launchCvCelebration();
      window.setTimeout(function () {
        downloadThanks.classList.add("hidden");
      }, 3200);
    });
  }

  function initExperienceCards() {
    document.querySelectorAll(".toggle-details").forEach(function (button) {
      button.addEventListener("click", function () {
        var card = button.closest(".experience-card");
        if (!card) return;
        var open = !card.classList.contains("active");
        card.classList.toggle("active", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function initNav() {
    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!nav || !toggle || !menu) return;

    function closeNav() {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    }

    function openNav() {
      nav.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("nav-open")) closeNav();
      else openNav();
    });

    menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 900px)").matches) closeNav();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth > 900) closeNav();
      },
      { passive: true }
    );
  }

  function initScrollSpy() {
    var nav = document.getElementById("site-nav");
    var links = document.querySelectorAll(".nav-link[href^='#']");
    if (!links.length) return;

    var sectionIds = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href");
      if (id && id.length > 1 && sectionIds.indexOf(id) === -1) {
        sectionIds.push(id);
      }
    });

    var sections = sectionIds
      .map(function (id) {
        return document.querySelector(id);
      })
      .filter(Boolean);

    if (!sections.length) return;

    var headerOffset = nav ? nav.offsetHeight + 12 : 80;

    function setActive(id) {
      links.forEach(function (link) {
        var href = link.getAttribute("href");
        var match = href === id;
        link.classList.toggle("active", match);
        if (match) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) {
            return e.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });
        if (visible[0] && visible[0].target.id) {
          setActive("#" + visible[0].target.id);
        }
      },
      {
        rootMargin: "-" + headerOffset + "px 0px -55% 0px",
        threshold: [0.08, 0.2, 0.35, 0.5],
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });

    window.addEventListener(
      "scroll",
      function () {
        if (!nav) return;
        nav.classList.toggle("is-scrolled", window.scrollY > 24);
      },
      { passive: true }
    );

    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function initFlipCards() {
    if (getReducedMotion()) return;

    var cards = document.querySelectorAll("[data-flip-card]");
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.classList.toggle("is-flipped");
        }
      });
      if (getTouchPrimary()) {
        card.addEventListener("click", function () {
          card.classList.toggle("is-flipped");
        });
      }
    });
  }

  function initOnLoad() {
    var initialLang = document.documentElement.lang || "es";
    setLanguageUI(initialLang);

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      if (
        el.classList.contains("btn-hover-text") ||
        el.classList.contains("download-confirmation")
      ) {
        return;
      }
      var lang = el.getAttribute("data-lang");
      el.classList.toggle("hidden", lang !== initialLang);
    });

    document.querySelectorAll(".btn-text").forEach(function (el) {
      var lang = el.getAttribute("data-lang");
      el.classList.toggle("hidden", lang !== initialLang);
    });
    document.querySelectorAll(".btn-hover-text").forEach(function (el) {
      el.classList.add("hidden");
    });

    initDownloadCv();
  }

  initLanguageToggle();
  initExperienceCards();
  initNav();
  initScrollSpy();
  initFlipCards();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOnLoad);
  } else {
    initOnLoad();
  }
})();
