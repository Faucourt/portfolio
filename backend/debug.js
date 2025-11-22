// debug.js
(function () {
  // CONFIG GLOBALE
  const STORAGE_KEY = "DEBUG_ENABLED";
  let DEBUG_ENABLED = localStorage.getItem(STORAGE_KEY) === "true";
  const PANEL_ID = "devtools-panel";

  const COLORS = {
    text: "#C9D1D9",
    bg: "#0D1117",
    border: "#30363D",
    tab: "#161B22",
    tabActive: "#21262D",
    accent: "#58A6FF",
    success: "#3FB950",
    warn: "#F2CC60",
    error: "#F85149",
  };

  let PATCHED_CONSOLE = false;
  let PATCHED_FETCH = false;
  let EVENTS_WIRED = false;
  let GLOBAL_ERRORS_WIRED = false;

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  // CRÉATION DU PANNEAU
  function createPanel() {
    if (document.getElementById(PANEL_ID)) return;

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.style.position = "fixed";
    panel.style.bottom = "0";
    panel.style.right = "0";
    panel.style.background = COLORS.bg;
    panel.style.color = COLORS.text;
    panel.style.borderTopLeftRadius = "8px";
    panel.style.borderLeft = `1px solid ${COLORS.border}`;
    panel.style.borderTop = `1px solid ${COLORS.border}`;
    panel.style.fontFamily = "Consolas, monospace";
    panel.style.fontSize = "13px";
    panel.style.display = "none";
    panel.style.zIndex = "999999";
    panel.style.boxShadow = "0 0 10px rgba(0,0,0,0.4)";

    function applyResponsiveLayout() {
      if (window.innerWidth <= 640) {
        // mobile / petit écran
        panel.style.width = "100%";
        panel.style.height = "55vh";
        panel.style.left = "0";
        panel.style.right = "0";
      } else {
        // desktop
        panel.style.width = "480px";
        panel.style.height = "45vh";
        panel.style.left = "";
        panel.style.right = "0";
      }
    }

    applyResponsiveLayout();
    window.addEventListener("resize", applyResponsiveLayout);

    // Barre du haut
    const topBar = document.createElement("div");
    topBar.style.display = "flex";
    topBar.style.alignItems = "center";
    topBar.style.background = COLORS.tab;
    topBar.style.borderBottom = `1px solid ${COLORS.border}`;

    const title = document.createElement("div");
    title.textContent = "Debug Panel";
    title.style.padding = "6px 10px";
    title.style.flex = "1";
    title.style.fontWeight = "600";
    title.style.color = COLORS.text;
    topBar.appendChild(title);

    const tabs = document.createElement("div");
    tabs.style.display = "flex";

    const tabNames = ["Logs", "Tests", "Events"];
    const contents = {};
    const tabButtons = {};

    function showTab(tab) {
      tabNames.forEach((t) => {
        contents[t].style.display = t === tab ? "block" : "none";
        tabButtons[t].style.background =
          t === tab ? COLORS.tabActive : COLORS.tab;
      });
    }

    tabNames.forEach((name) => {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.style.padding = "6px 10px";
      btn.style.background = COLORS.tab;
      btn.style.color = COLORS.text;
      btn.style.border = "none";
      btn.style.borderLeft = `1px solid ${COLORS.border}`;
      btn.style.cursor = "pointer";
      btn.addEventListener("click", () => showTab(name));
      tabs.appendChild(btn);
      tabButtons[name] = btn;
    });

    topBar.appendChild(tabs);
    panel.appendChild(topBar);

    // Contenu des onglets
    tabNames.forEach((name) => {
      const div = document.createElement("div");
      div.style.display = "none";
      div.style.height = "calc(100% - 30px)";
      div.style.overflowY = "auto";
      div.style.padding = "8px";
      div.style.whiteSpace = "pre-wrap";
      contents[name] = div;
      panel.appendChild(div);
    });

    document.body.appendChild(panel);
    showTab("Logs");

    window.__DEVTOOLS__ = {
      panel,
      tabs,
      contents,
      show() {
        panel.style.display = "block";
      },
      hide() {
        panel.style.display = "none";
      },
      clearAll() {
        Object.values(contents).forEach((c) => (c.innerHTML = ""));
      },
      log(msg, color = COLORS.text) {
        const line = document.createElement("div");
        line.style.color = color;
        line.textContent = msg;
        contents.Logs.appendChild(line);
        contents.Logs.scrollTop = contents.Logs.scrollHeight;
      },
      test(msg, ok) {
        const line = document.createElement("div");
        line.style.color = ok ? COLORS.success : COLORS.error;
        line.textContent = (ok ? "✔ " : "✘ ") + msg;
        contents.Tests.appendChild(line);
        contents.Tests.scrollTop = contents.Tests.scrollHeight;
      },
      event(msg) {
        const line = document.createElement("div");
        line.style.color = COLORS.accent;
        line.textContent = msg;
        contents.Events.appendChild(line);
        contents.Events.scrollTop = contents.Events.scrollHeight;
      },
    };
  }

  // ACTIVATION / DÉSACTIVATION
  function setDebugEnabled(enabled) {
    DEBUG_ENABLED = enabled;
    localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");

    createPanel();
    if (!window.__DEVTOOLS__) return;

    if (enabled) {
      window.__DEVTOOLS__.show();
      initDebugOncePerPage();
    } else {
      window.__DEVTOOLS__.log("Debug désactivé");
      window.__DEVTOOLS__.hide();
    }
  }

  // PC / Desktop → Ctrl + Alt + D
  function wireKeyboardToggle() {
    if (isTouchDevice) return; // clavier seulement sur desktop
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "d") {
        setDebugEnabled(!DEBUG_ENABLED);
      }
    });
  }

  // Mobile → 5 taps sur la photo de profil
  function wireMobileToggle() {
    if (!isTouchDevice) return;

    const attach = () => {
      const img = document.querySelector(".site-header .logo img");
      if (!img) return;

      let tapCount = 0;
      let lastTapTime = 0;

      img.addEventListener("click", () => {
        const now = Date.now();

        // reset si plus de 800ms entre 2 taps
        if (now - lastTapTime > 800) {
          tapCount = 0;
        }
        tapCount += 1;
        lastTapTime = now;

        if (tapCount >= 5) {
          tapCount = 0;
          setDebugEnabled(!DEBUG_ENABLED);
        }
      });
    };

    // header est injecté en JS → on attend le load
    if (document.readyState === "complete") {
      attach();
    } else {
      window.addEventListener("load", attach);
    }
  }

  window.addEventListener("load", () => {
    createPanel();
    wireKeyboardToggle();
    wireMobileToggle();
    if (DEBUG_ENABLED) {
      setDebugEnabled(true);
    }
  });

  // PATCH CONSOLE / FETCH / ERREURS GLOBALES
  function patchConsole() {
    if (PATCHED_CONSOLE) return;
    PATCHED_CONSOLE = true;

    ["log", "warn", "error"].forEach((method) => {
      const original = console[method];
      console[method] = (...args) => {
        if (DEBUG_ENABLED && window.__DEVTOOLS__) {
          const color =
            method === "warn"
              ? COLORS.warn
              : method === "error"
              ? COLORS.error
              : COLORS.text;
          window.__DEVTOOLS__.log(
            args
              .map((a) =>
                typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
              )
              .join(" "),
            color
          );
        }
        original(...args);
      };
    });
  }

  function patchFetch() {
    if (PATCHED_FETCH || !window.fetch) return;
    PATCHED_FETCH = true;

    const originalFetch = window.fetch.bind(window);
    window.fetch = (...args) => {
      if (DEBUG_ENABLED && window.__DEVTOOLS__) {
        window.__DEVTOOLS__.log("fetch → " + args[0], COLORS.accent);
      }
      return originalFetch(...args);
    };
  }

  function wireGlobalErrors() {
    if (GLOBAL_ERRORS_WIRED) return;
    GLOBAL_ERRORS_WIRED = true;

    window.addEventListener(
      "error",
      (event) => {
        if (!DEBUG_ENABLED || !window.__DEVTOOLS__) return;
        if (event.target && event.target.tagName === "IMG") {
          window.__DEVTOOLS__.log(
            "❌ Image non chargée : " + event.target.src,
            COLORS.warn
          );
        } else if (event.message) {
          window.__DEVTOOLS__.log(
            `💥 JS error: ${event.message} @ ${event.filename}:${event.lineno}`,
            COLORS.error
          );
        }
      },
      true
    );

    window.addEventListener("unhandledrejection", (event) => {
      if (!DEBUG_ENABLED || !window.__DEVTOOLS__) return;
      window.__DEVTOOLS__.log(
        "💥 Promise rejetée: " + String(event.reason),
        COLORS.error
      );
    });
  }

// EVENTS TRACKING (click + touch)
  function wireEvents() {
    if (EVENTS_WIRED) return;
    EVENTS_WIRED = true;

    const handler = (type) => (e) => {
      if (!DEBUG_ENABLED || !window.__DEVTOOLS__) return;
      const t = e.target;
      const tag = t.tagName ? t.tagName.toLowerCase() : "node";
      const id = t.id ? `#${t.id}` : "";
      const cls =
        t.className && typeof t.className === "string"
          ? "." + t.className.trim().split(/\s+/).join(".")
          : "";
      window.__DEVTOOLS__.event(`${type} → ${tag}${id}${cls}`);
    };

    document.addEventListener("click", handler("click"), true);
    document.addEventListener("touchstart", handler("touch"), true);
  }

  
  // TESTS GLOBAUX
  function runGlobalTests(t) {
    const hasUser = !!window.USER_CONFIG && !!window.USER_CONFIG.fullName;
    t.test("USER_CONFIG chargé", hasUser);

    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const main = document.querySelector("main");

    t.test("Container header présent (#header)", !!header);
    t.test("Container footer présent (#footer)", !!footer);
    t.test("Balise <main> présente", !!main);

    const logoImg = document.querySelector(".site-header .logo img");
    t.test("Photo de profil dans le header", !!logoImg);

    const navLinks = document.querySelectorAll(".navbar .nav-link");
    t.test("Liens de navigation présents", navLinks.length >= 4);

    const scripts = document.scripts.length;
    const images = document.images.length;
    t.log(`Scripts chargés : ${scripts}`);
    t.log(`Images présentes : ${images}`);
  }


  // TESTS PAR PAGE
  // Page Projets
  function runProjetsTests(t) {
    const container = document.getElementById("projects-container");
    const cards = container ? container.querySelectorAll(".project-card") : [];

    t.log("=== Tests page Projets ===", COLORS.accent);
    t.test("Container projets (#projects-container)", !!container);
    t.test("Au moins un projet généré (.project-card)", cards.length > 0);

    if (!cards.length) return;

    const first = cards[0];
    const toggle = first.querySelector(".project-toggle");
    const details = first.querySelector(".project-details");

    t.test("Bouton toggle présent", !!toggle);
    t.test("Bloc détails présent", !!details);

    if (toggle && details) {
      const initialHidden = details.hidden;
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      const afterClick = details.hidden !== initialHidden;
      t.test("Click sur toggle ouvre/ferme le bloc détails", afterClick);
    }

    const headers = first.querySelectorAll(".details-section .details-header");
    t.test(
      "Sous-sections présentes (contexte/objectif/...)",
      headers.length >= 3
    );

    if (headers.length) {
      const h = headers[0];
      const content = h.nextElementSibling;
      if (content) {
        const initial = content.hidden;
        h.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        const changed = content.hidden !== initial;
        t.test("Toggle d’une sous-section fonctionne", changed);
      }
    }

    const techGrid = first.querySelector(".tech-grid");
    t.test("Grille des technologies présente (.tech-grid)", !!techGrid);

    const githubLink = first.querySelector(
      '.details-section a.github-link[href*="github.com"]'
    );
    t.test("Lien GitHub détecté", !!githubLink);
  }

  // Page Compétences
  function runCompetencesTests(t) {
    const container = document.getElementById("competences-container");
    const groups = container ? container.querySelectorAll(".skill-group") : [];

    t.log("=== Tests page Compétences ===", COLORS.accent);
    t.test("Container compétences (#competences-container)", !!container);
    t.test("Groupes de compétences présents (.skill-group)", groups.length > 0);

    const openAll = document.getElementById("open-all");
    const closeAll = document.getElementById("close-all");
    const sortBtn = document.getElementById("sort-by-level");

    if (openAll || closeAll || sortBtn) {
      t.test("Bouton Ouvrir tout (#open-all)", !!openAll);
      t.test("Bouton Fermer tout (#close-all)", !!closeAll);
      t.test("Bouton Tri par niveau (#sort-by-level)", !!sortBtn);
    }

    if (!groups.length) return;

    const firstGroup = groups[0];
    const groupHeader = firstGroup.querySelector(".group-header");
    const groupContent = firstGroup.querySelector(".group-content");

    t.test("Header de groupe présent", !!groupHeader);
    t.test("Contenu de groupe présent", !!groupContent);

    if (groupHeader && groupContent) {
      const wasOpen = firstGroup.classList.contains("open");
      groupHeader.click();
      const nowOpen = firstGroup.classList.contains("open");
      t.test("Toggle d’un groupe fonctionne (open/close)", wasOpen !== nowOpen);
    }

    const firstCategory = firstGroup.querySelector(".competence-category");
    if (firstCategory) {
      const catHeader = firstCategory.querySelector(".category-header");
      const progress = firstCategory.querySelector(".progress .progress-fill");
      t.test("Sous-catégorie présente (.competence-category)", !!firstCategory);
      t.test("Jauge de progression présente (.progress-fill)", !!progress);

      if (catHeader && progress) {
        const before = progress.style.width || "0px";
        catHeader.click();
        setTimeout(() => {
          const after = progress.style.width;
          t.test(
            "Ouverture d’une catégorie déclenche l’animation de la jauge",
            after !== before && after !== "" && after !== "0px"
          );
        }, 300);
      }
    }
  }

  // Page Veilles
  function runVeillesTests(t) {
    const grid = document.getElementById("veilles-grid");
    const cards = grid ? grid.querySelectorAll(".veille-card") : [];

    t.log("=== Tests page Veilles ===", COLORS.accent);
    t.test("Grille de veilles (#veilles-grid)", !!grid);
    t.test("Cartes de veille générées (.veille-card)", cards.length > 0);

    cards.forEach((card) => {
      const link = card.querySelector("a.btn");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const txt = (link.textContent || "").toLowerCase();
      if (href.includes("youtube.com")) {
        t.test(
          `Bouton pour ${href} affiche 'Voir la chaîne'`,
          txt.includes("chaîne")
        );
      } else {
        t.test(
          `Bouton pour ${href} affiche 'Voir l’article'`,
          txt.includes("article")
        );
      }
    });
  }

  // Page Expériences
  function runExperiencesTests(t) {
    const page = document.querySelector(".experiences-page");
    const cards = document.querySelectorAll(".xp-card");

    t.log("=== Tests page Expériences ===", COLORS.accent);
    t.test("Container page expériences (.experiences-page)", !!page);
    t.test("Cartes d’expérience (.xp-card)", cards.length > 0);

    if (!cards.length) return;
    const first = cards[0];
    const role = first.querySelector(".xp-role");
    const company = first.querySelector(".xp-company");
    const missions = first.querySelectorAll(".xp-missions li");
    const techs = first.querySelectorAll(".xp-tech");

    t.test("Intitulé du poste présent (.xp-role)", !!role);
    t.test("Nom de l’entreprise présent (.xp-company)", !!company);
    t.test("Missions listées (.xp-missions li)", missions.length > 0);
    t.test("Technos listées (.xp-tech)", techs.length > 0);
  }

  // Page Parcours
  function runParcoursTests(t) {
    const section = document.querySelector(".parcours-section");
    const cards = document.querySelectorAll(".card--flip");

    t.log("=== Tests page Parcours ===", COLORS.accent);
    t.test("Section parcours (.parcours-section)", !!section);
    t.test("Cartes flip générées (.card--flip)", cards.length >= 3);

    if (!cards.length) return;
    const first = cards[0];
    const inner = first.querySelector(".card-inner");
    t.test("Structure interne présente (.card-inner)", !!inner);

    const heightBefore = first.getBoundingClientRect().height;
    t.test("Hauteur initiale de la carte > 0", heightBefore > 0);

    // test flip
    const wasFlipped = first.classList.contains("flipped");
    first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    const isFlippedNow = first.classList.contains("flipped");
    t.test(
      "Click sur une carte bascule l’état 'flipped'",
      wasFlipped !== isFlippedNow
    );
  }

  // Page Intérêts
  function runInteretsTests(t) {
    const page = document.querySelector(".interets-page");
    const mapEl = document.getElementById("map");
    const travelList = document.getElementById("travelList");
    const sportsGrid = document.getElementById("sportsContainer");

    t.log("=== Tests page Intérêts ===", COLORS.accent);
    t.test("Section intérêts (.interets-page)", !!page);
    t.test("Carte Leaflet (#map)", !!mapEl);
    t.test("Liste des voyages (#travelList)", !!travelList);
    t.test(
      "Items de voyages présents",
      travelList && travelList.querySelectorAll("li").length > 0
    );
    t.test("Section sports (#sportsContainer)", !!sportsGrid);

    const carousels = sportsGrid
      ? sportsGrid.querySelectorAll(".sport-carousel")
      : [];
    t.test(
      "Carrousels sports présents (.sport-carousel)",
      carousels.length > 0
    );

    if (carousels.length) {
      const first = carousels[0];
      const photos = first.querySelectorAll(".sport-photo");
      t.test("Photos dans le carrousel sport", photos.length > 0);
      if (photos.length > 1) {
        const activeCount = Array.from(photos).filter((p) =>
          p.classList.contains("active")
        ).length;
        t.test(
          "Une seule photo active à la fois dans le carrousel sport",
          activeCount === 1
        );
      }
    }

    // Vérification basique Leaflet : classes ajoutées
    if (mapEl) {
      const hasLeaflet = mapEl.classList.contains("leaflet-container");
      t.test("Leaflet initialisé sur #map", hasLeaflet);
    }
  }

  // --- Page Accueil (si existante) ---
  function runHomeTests(t) {
    const hero = document.querySelector(".hero");
    const featured = document.querySelector(".featured-project");
    if (!hero && !featured) return; // page pas détectée comme accueil

    t.log("=== Tests page Accueil ===", COLORS.accent);
    if (hero) {
      t.test("Bloc hero présent (.hero)", !!hero);
    }
    if (featured) {
      const title = featured.querySelector(".featured-title");
      t.test("Projet vedette présent (.featured-project)", !!featured);
      t.test("Titre du projet vedette présent", !!title);
    }
  }

  // INIT / DISPATCH DES TESTS SELON LA PAGE
  function runPageSpecificTests() {
    const t = window.__DEVTOOLS__;
    if (!t) return;

    runGlobalTests(t);
    runHomeTests(t);

    const path = window.location.pathname;

    // Dispatch par "type" de page → on utilise classes + path
    if (
      document.querySelector(".projets-section") ||
      path.includes("/projets")
    ) {
      runProjetsTests(t);
    }
    if (
      document.querySelector(".competences-section") ||
      path.includes("/competences")
    ) {
      runCompetencesTests(t);
    }
    if (
      document.querySelector(".veilles-section") ||
      path.includes("/veilles")
    ) {
      runVeillesTests(t);
    }
    if (
      document.querySelector(".experiences-page") ||
      path.includes("/experiences")
    ) {
      runExperiencesTests(t);
    }
    if (
      document.querySelector(".parcours-section") ||
      path.includes("/parcours")
    ) {
      runParcoursTests(t);
    }
    if (
      document.querySelector(".interets-page") ||
      path.includes("/interets")
    ) {
      runInteretsTests(t);
    }
  }

  // INIT COMPLET QUAND DEBUG ACTIVE
  function initDebugOncePerPage() {
    if (!window.__DEVTOOLS__) return;

    const t = window.__DEVTOOLS__;
    t.clearAll();
    t.log(`🔧 Debug activé – ${window.location.pathname}`, COLORS.accent);

    patchConsole();
    patchFetch();
    wireEvents();
    wireGlobalErrors();
    runPageSpecificTests();
  }
})();
