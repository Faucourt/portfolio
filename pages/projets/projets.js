/* PROJETS.JS — Données + génération dynamique*/
import { convertRichText } from "/backend/utils.js";

const newLocal = `
        Ce projet est mon portfolio web complet, pensé comme un vrai projet professionnel :
        - architecture de fichiers claire
        - composants réutilisables (header, footer, navigation)
        - pages spécialisées (projets, compétences, expériences, veilles, centres d’intérêts)
        - CSS modulaires (base, components, pages)
        - JS centralisé (utils, debug, header/footer, navigation).

        L’objectif est de présenter mes compétences avec un code propre, structuré et facilement réutilisable.
      `;
/* DATA directement ici*/

const PROJECTS = [
  // Projet Portfolio Web
  {
    title: "Portfolio Web – Développeur Fullstack",
    year: "2024",
    image: "/assets/images/projets/portfolioProject.png",
    alt: "Portfolio web interactif et modulable",

    sections: {
      contexte: newLocal,

      objectif: `
        - Proposer une vitrine claire de mon profil (projets, compétences, expériences).
        - Avoir une arborescence professionnelle, prête à devenir un template réutilisable.
        - Centraliser le comportement JS (navigation, injections dynamiques, utils).
        - Intégrer un mode debug interne (console type devtools custom).
        - Assurer une expérience responsive et accessible (mobile first, ARIA, clavier).
      `,

      fonctionnement: `
        L’architecture se découpe en plusieurs blocs :

        - /index.html : page d’accueil (hero, à propos, projet en vedette).
        - /pages/... : une page par section (projets, compétences, expériences, etc.), chaque dossier de page contient un fichier HTML, un fichier CSS et un fichier JS spécifiques.
        - /assets/css/base : reset, variables, layout, typographie, darkmode.
        - /assets/css/components : boutons, cards, sections, titres.

        JavaScript :
        - /backend/header.js & footer.js : injection automatique du header/footer sur chaque page.
        - /backend/navigation.js : gestion du menu, état actif, navigation cohérente.
        - /backend/utils.js : fonctions utilitaires (ex: convertRichText pour les textes riches).
        - /backend/debug.js : panneau de debug custom (logs, tests rapides, événements).

        Le contenu (projets, compétences, veilles...) est majoritairement centralisé dans des objets JS,
        puis injecté dynamiquement dans le HTML.
      `,
    },

    versions: [
      {
        version: "v1.0",
        description:
          "Version statique : sections écrites directement en HTML sans génération dynamique.",
      },
      {
        version: "v1.1",
        description:
          "Refonte de l’arborescence + séparation base/components/pages pour le CSS.",
      },
      {
        version: "v1.2",
        description:
          "Ajout du chargement dynamique (projets, compétences, veilles, expériences).",
      },
      {
        version: "v1.3",
        description:
          "Intégration d’un panneau de debug custom (logs, tests, events, network).",
      },
      {
        version: "Version actuelle - v1.4",
        description: "Template propre, modulaire et avec code JS centralisé.",
      },
      {
        version: "Version Future - v1.5",
        description:
          "Ajout du mode sombre automatique selon préférence système",
      },
      {
        version: "Version Future - v1.6",
        description:
          "Refonte complète de l'arborescence et du code afin qu'il soit réutilisable pour toutes personnes souhaitant un portfolio moderne.",
      },
      {
        version: "Version Future - v2.0",
        description:
          "Refonte avec framework JS (ex: React, Vue) pour une modularité et maintenabilité accrues.",
      },
    ],

    tests: `
      - Prérequis :
        - Navigateur moderne (Chrome, Edge, Firefox).
        - (Optionnel) Un petit serveur local type Live Server ou Python (http.server).

      - Lancement :
        - Ouvrir index.html dans le navigateur
        - Vérifier le header/footer sur chaque page
        - Tester la navigation : accueil → projets → compétences → expériences → veilles → intérêts.

      - Vérifications :
        - Sur la page Projets : ouvrir/fermer les sections, vérifier l’affichage des listes et icônes.
        - Sur la page Compétences : tester les boutons “ouvrir tout/fermer tout”.
        - Sur la page Intérêts : vérifier la carte Leaflet et les carrousels d’images.
        - Sur la page Parcours : tester le flip des cartes + animation d’apparition.

      - Debug :
        - Activer le mode debug via le raccourci clavier (ex: Ctrl + Alt + D selon la config).
        - Observer :
          - les logs de chargement
          - les tests basiques (header, footer, main présents)
          - les événements (clics, scroll, mutations DOM).
    `,

    tech: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      },
      {
        name: "Leaflet (carte)",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
    ],

    github: "https://github.com/Faucourt/portfolio",
  },

  // Projet Todolist React
  {
    title: "Todolist React – Gestion avancée des tâches",
    year: "2024",
    image: "/assets/images/projets/todolistProject.png",
    alt: "Application TodoList moderne en React",

    sections: {
      contexte: `
      Cette ToDoList est une application complète développée en React, intégrant
      une gestion avancée des tâches avec :
      - filtres dynamiques,
      - création, édition, suppression,
      - priorités,
      - statuts,
      - sélection multiple,
      - persistance locale via localStorage.

      L'objectif était de produire un outil ergonomique, rapide et totalement
      modulable, basé sur une architecture React moderne et découpée en composants.
    `,

      objectif: `
      - Fournir une interface simple mais puissante permettant d’organiser des tâches.
      - Assurer la persistance avec localStorage (sans backend).
      - Séparer proprement l’application :
        - composants (TodoList, TodoItem, Modal…)
        - hooks custom (useTodos)
        - UI (DaisyUI + TailwindCSS).
      - Gérer :
        - Création de tâche
        - Edition
        - Suppression
        - Filtrage par priorité
        - Statuts
        - Sélection multiple + action groupée.
    `,

      fonctionnement: `
      L'application repose sur un hook central : \`useTodos()\`.

      Il gère :
      - la liste des tâches,
      - les filtres,
      - les statistiques,
      - les sélections multiples,
      - l'ajout, modification, suppression,
      - la sauvegarde automatique dans localStorage.

      Architecture React :
      - App.jsx : cœur de l’application, gestion des modales + logique globale.
      - components/
        - Filters : boutons dynamiques avec décompte.
        - TodoList : affichage des tâches filtrées.
        - TodoItem : chaque tâche avec badge priorité.
        - CreateTodo : modal de création.
        - EditTodo : modal d’édition.
        - DeleteTodo : suppression rapide.
        - Modal : composant générique.
      - hooks/
        - useTodos.js → toute la logique de gestion + stats.

      UI :
      - TailwindCSS
      - DaisyUI
      - Icônes Lucide (React)
    `,
    },

    versions: [
      {
        version: "v1.0",
        description: "Création / suppression de tâches + interface simple.",
      },
      {
        version: "v1.2",
        description: "Ajout des priorités + filtres dynamiques.",
      },
      {
        version: "v1.5",
        description: "Sélection multiple + action finir la sélection.",
      },
      {
        version: "v2.0",
        description: "Système de modales pour création et édition des tâches.",
      },
      {
        version: "Version actuelle",
        description:
          "Architecture propre en composants + hook useTodos + stats dynamiques + persistance locale.",
      },
    ],

    tests: `
    - Installer le projet : npm install
    - Lancer le serveur : npm run dev
    - Tester les fonctions :
      - Création d’une tâche : titre obligatoire
      - Mise à jour d’une tâche : vérifier startDate avant endDate
      - Suppression d’une tâche
      - Filtres : Tous / Urgente / Moyenne / Basse
      - Sélection multiple : cochez plusieurs tâches → "Finir la sélection"
      - Vérifier la persistance : recharger la page
    - Vérifier que :
      - les statistiques se mettent à jour en temps réel
      - les modales se ferment bien
      - aucune erreur React n’apparaît en console.
  `,

    tech: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      },
      {
        name: "TailwindCSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "DaisyUI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "Lucide Icons",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
    ],

    github: "https://github.com/Faucourt/todolist-React", 
 
  },

  // Projet Iris Color Analysis
  {
    title: "Analyse Couleur de l’Iris (Python)",
    year: "2024",
    image: "/assets/images/projets/irisProject.png",
    alt: "Application d'analyse de couleurs d'iris en Python",

    sections: {
      contexte: `
        Ce projet explore la détection et l’analyse précise des couleurs de l’iris à partir d’une photo d’œil.
        Il combine vision par ordinateur, clustering couleur et interface utilisateur Tkinter pour créer un outil complet.
      `,
      objectif: `
        - Détecter automatiquement la zone de l’iris grâce à HoughCircles.
        - Nettoyer l’image et filtrer la pupille / les reflets.
        - Extraire les couleurs dominantes avec KMeans.
        - Afficher un résumé clair (graphique + rendu pixelisé).
        - Fournir une interface simple pour charger, analyser et sauvegarder.
      `,
      fonctionnement: `
        L’application utilise OpenCV pour détecter l’iris, applique un filtrage HSV pour isoler les teintes
        et un clustering KMeans pour déterminer les couleurs principales.

        Elle génère ensuite :
        - Une version propre de l’iris
        - Une version pixelisée
        - Un graphique des couleurs dominantes

        Tout est affiché dans une interface Tkinter ergonomique.
      `,
    },

    versions: [
      {
        version: "v1.0",
        description: "Détection simple + extraction naïve des couleurs.",
      },
      {
        version: "v1.3",
        description: "Ajout du filtrage HSV + correction des reflets.",
      },
      {
        version: "v2.0",
        description: "Interface Tkinter complète + rendu graphique avancé.",
      },
      {
        version: "Version actuelle",
        description: "Optimisation du pipeline OpenCV + stabilité améliorée.",
      },
    ],

    tests: `
      - -Préalable : Avoir Python installé sur un IDE (ex: PyCharm, VSCode); une image d'iris (Google Images: 'Image Iris Oeil', Option de Taille d'image: Grande).
      - -Installer les dépendances : OpenCV, NumPy, Scikit-Learn, Matplotlib.
      - -Lancer le script principal : python iris_analyse_projet.py
      - -Charger : image d'iris via l’interface Tkinter.
      - -Comparer : les graphiques générés à la détection réelle.
      - -Tester : avec différentes résolutions et luminosités.
    `,

    tech: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      {
        name: "Pandas",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
      },
      {
        name: "NumPy",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
      },
      {
        name: "Scikit-Learn",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
      },
      {
        name: "Matplotlib",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
      },
      {
        name: "Tkinter",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
    ],

    github: "https://github.com/Faucourt/iris-color-analysis",
  },

  // Projet Simulateur de Matchs de Football
  {
    title: "Simulateur de Matchs de Football (Python)",
    year: "2024",
    image: "/assets/images/projets/soccerProject.png",
    alt: "Simulateur avancé de matchs de football en Python",

    sections: {
      contexte: `
        Ce projet est un simulateur complet basé sur un moteur statistique réaliste.
        Il repose sur 50 000 simulations par match, des distributions Poisson ajustées
        et des données réelles d'équipes/pays.
      `,
      objectif: `
        - Simuler des matchs réalistes.
        - Générer probabilités : victoire / nul / défaite.
        - Comparer clubs et pays.
        - Proposer des phases de groupes et matchs aller-retour.
        - Fournir un outil d'analyse statistique du football.
      `,
      fonctionnement: `
        Le moteur SoccerSim repose sur :
        - Poisson ajusté
        - Forces d’attaque/défense
        - Facteur de domination
        - 50 000 simulations par match

        Fonctionnalités :
        - Comparaison de clubs
        - Comparaison de pays
        - Groupes & classement
        - Aller-retour
        - CLI ergonomique
      `,
    },

    versions: [
      { version: "v1.0", description: "Match simple + probabilités brutes." },
      {
        version: "v1.5",
        description: "Ajout du moteur SoccerSim et des simulations multiples.",
      },
      {
        version: "v2.0",
        description: "Groupes, aller-retour, comparaison pays/clubs.",
      },
      {
        version: "Version actuelle",
        description: "Optimisation + gestion avancée de la domination.",
      },
    ],

    tests: `
      - Installer NumPy / Pandas / Matplotlib.
      - Lancer : python main_menu.py
      - Tester un match simple (Club A vs Club B).
      - Lancer un match aller-retour.
      - Simuler un groupe complet (4 équipes).
      - Vérifier cohérence des probabilités (somme ≈ 100%).
    `,

    tech: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      {
        name: "Pandas",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
      },
      {
        name: "NumPy",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
      },
      {
        name: "Scikit-Learn",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
      },
      {
        name: "Matplotlib",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
      },
    ],

    github: "https://github.com/utilisateur/football-simulator",
  },
];

/* Attache les listeners des sections*/
function attachSectionToggle(details) {
  const headers = details.querySelectorAll(".details-header");

  headers.forEach((header) => {
    const content = header.nextElementSibling;
    if (!content) return;

    header.addEventListener("click", () => {
      const isOpening = content.hidden;

      details
        .querySelectorAll(".details-content")
        .forEach((c) => (c.hidden = true));
      details
        .querySelectorAll(".details-header")
        .forEach((h) => h.setAttribute("aria-expanded", "false"));

      content.hidden = !isOpening;
      header.setAttribute("aria-expanded", String(isOpening));
    });
  });
}

/* Génération dynamique */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-container");
  if (!container) return;

  PROJECTS.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card card";

    card.innerHTML = `
      <div class="project-header">
        <img src="${project.image}" alt="${project.alt}" class="project-img" />
        <div>
          <h2 class="card-title">${project.title}</h2>
          <p class="card-text">${project.year}</p>
        </div>
      </div>

      <button class="btn btn-light project-toggle"
        aria-expanded="false"
        aria-controls="details-${index}">
        Voir les détails
      </button>

      <div class="project-details" id="details-${index}" hidden></div>
    `;

    const details = card.querySelector(".project-details");

    /* --- SECTIONS TEXTE (contexte / objectif / fonctionnement)--- */
    Object.entries(project.sections).forEach(([label, text]) => {
      const section = document.createElement("section");
      section.className = "details-section";

      const header = document.createElement("button");
      header.className = "details-header";
      header.textContent =
        "📌 " + label.charAt(0).toUpperCase() + label.slice(1);

      const content = document.createElement("div");
      content.className = "details-content";
      content.hidden = true;
      content.innerHTML = convertRichText(text);

      section.appendChild(header);
      section.appendChild(content);
      details.appendChild(section);
    });

    /* --- VERSIONS --- */
    if (project.versions) {
      const versionSection = document.createElement("section");
      versionSection.className = "details-section";

      versionSection.innerHTML = `
        <button class="details-header" aria-expanded="false">
          🛠️ Versions du projet
        </button>

        <div class="details-content" hidden>
          <ul class="version-list">
            ${project.versions
              .map(
                (v) =>
                  `<li><strong>${v.version}</strong> — ${v.description}</li>`
              )
              .join("")}
          </ul>
        </div>
      `;

      details.appendChild(versionSection);
    }

    /* --- COMMENT TESTER --- */
    if (project.tests) {
      const testSection = document.createElement("section");
      testSection.className = "details-section";

      testSection.innerHTML = `
        <button class="details-header" aria-expanded="false">
          🧪 Comment tester ?
        </button>

        <div class="details-content" hidden>
          ${convertRichText(project.tests)}
        </div>
      `;

      details.appendChild(testSection);
    }

    /* --- TECHNOLOGIES --- */
    const techSection = document.createElement("section");
    techSection.className = "details-section";

    techSection.innerHTML = `
      <button class="details-header" aria-expanded="false">
        🧩 Technologies utilisées
      </button>

      <div class="details-content" hidden>
        <div class="tech-grid">
          ${project.tech
            .map(
              (t) => `
              <div class="tech-item">
                <img src="${t.icon}" alt="${t.name}" />
                <span>${t.name}</span>
              </div>`
            )
            .join("")}
        </div>
      </div>
    `;

    details.appendChild(techSection);

    /* --- LIENS --- */
    const links = document.createElement("section");
    links.className = "details-section";

    links.innerHTML = `
      <button class="details-header" aria-expanded="false">🔗 Liens</button>

      <div class="details-content" hidden>
        <a class="github-link" href="${
          project.github
        }" target="_blank">Voir sur GitHub →</a>
        ${
          project.download
            ? `<br /><br /><a class="github-link" href="${project.download}" download>Télécharger →</a>`
            : ""
        }
      </div>
    `;

    details.appendChild(links);

    /* --- TOGGLE PRINCIPAL --- */
    const btnToggle = card.querySelector(".project-toggle");
    btnToggle.addEventListener("click", () => {
      const isOpening = details.hidden;
      details.hidden = !isOpening;
      btnToggle.setAttribute("aria-expanded", String(isOpening));
    });

    /* --- Toggle internes --- */
    attachSectionToggle(details);

    container.appendChild(card);
  });
});
