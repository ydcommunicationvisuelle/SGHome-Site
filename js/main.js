(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     ENTRADA — sem tela de intro. O hero anima ao carregar via
     a classe "loaded" no body (ver .load-in / .line-inner no CSS).
  --------------------------------------------------------- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add("loaded");
    });
  });

  /* ---------------------------------------------------------
     HEADER — muda de aparência ao rolar
  --------------------------------------------------------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     HERO — halo doux qui suit le curseur
  --------------------------------------------------------- */
  var hero = document.getElementById("hero");
  var glow = document.getElementById("hero-glow");
  if (hero && glow && window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      glow.style.setProperty("--gx", (e.clientX - rect.left) + "px");
      glow.style.setProperty("--gy", (e.clientY - rect.top) + "px");
    });
  }

  /* ---------------------------------------------------------
     MENU MOBILE
  --------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mainNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal, section .viewport-frame:not(.load-in)");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------------------------------------------------------
     GALERIA — gera os itens e liga o lightbox
  --------------------------------------------------------- */
  var galleryFiles = [
    "00001PORT-SGHOME.jpg",
    "00002PORT-SGHOME.jpg",
    "00003PORT-SGHOME.jpg",
    "00004PORT-SGHOME.jpg",
    "00005PORT-SGHOME.jpg",
    "00006PORT-SGHOME.jpg",
    "00007PORT-SGHOME.jpg",
    "00008PORT-SGHOME.jpg",
    "00009PORT-SGHOME.jpg",
    "00010PORT-SGHOME.png",
    "00011PORT-SGHOME.jpg",
    "00012PORT-SGHOME.jpg",
    "00013PORT-SGHOME.jpg",
    "00014PORT-SGHOME.jpg",
    "00015PORT-SGHOME.jpg",
    "00016PORT-SGHOME.jpg",
    "00017PORT-SGHOME.jpg",
    "00018PORT-SGHOME.jpg",
    "00019PORT-SGHOME.jpg",
    "00020PORT-SGHOME.jpg",
    "00021PORT-SGHOME.jpg",
    "00022PORT-SGHOME.jpg",
    "00023PORT-SGHOME.jpg",
    "00024PORT-SGHOME.jpg",
    "00025PORT-SGHOME.jpg",
    "00026PORT-SGHOME.jpg",
    "00027PORT-SGHOME.jpg",
    "00028PORT-SGHOME.jpg",
    "00029PORT-SGHOME.jpg",
    "00030PORT-SGHOME.jpg",
    "00031PORT-SGHOME.jpg"
  ];

  var basePath = "assets/images/portfolio/";
  var grid = document.getElementById("gallery-grid");
  var frag = document.createDocumentFragment();

  galleryFiles.forEach(function (file, index) {
    var item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("data-index", index);

    var img = document.createElement("img");
    img.src = basePath + file;
    img.alt = "Réalisation SG Home " + (index + 1);
    img.loading = "lazy";
    img.decoding = "async";

    var overlay = document.createElement("div");
    overlay.className = "gallery-overlay";
    var label = document.createElement("span");
    label.textContent = "Voir — " + String(index + 1).padStart(2, "0");
    overlay.appendChild(label);

    item.appendChild(img);
    item.appendChild(overlay);
    frag.appendChild(item);
  });
  grid.appendChild(frag);

  /* ---------------------------------------------------------
     LIGHTBOX
  --------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCounter = document.getElementById("lightbox-counter");
  var btnClose = document.getElementById("lightbox-close");
  var btnPrev = document.getElementById("lightbox-prev");
  var btnNext = document.getElementById("lightbox-next");
  var currentIndex = 0;

  function renderLightbox() {
    lightboxImg.src = basePath + galleryFiles[currentIndex];
    lightboxImg.alt = "Réalisation SG Home " + (currentIndex + 1);
    lightboxCounter.textContent =
      String(currentIndex + 1).padStart(2, "0") + " / " + String(galleryFiles.length).padStart(2, "0");
  }

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showDelta(delta) {
    currentIndex = (currentIndex + delta + galleryFiles.length) % galleryFiles.length;
    renderLightbox();
  }

  grid.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery-item");
    if (!item) return;
    openLightbox(parseInt(item.getAttribute("data-index"), 10));
  });

  btnClose.addEventListener("click", closeLightbox);
  btnPrev.addEventListener("click", function () {
    showDelta(-1);
  });
  btnNext.addEventListener("click", function () {
    showDelta(1);
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showDelta(-1);
    if (e.key === "ArrowRight") showDelta(1);
  });
})();
