/* COMPETENCES – DATA (sans images)*/

const COMPETENCES = [
  {
    title: "Hard Skills",
    categories: [
      {
        title: "Développement Web",
        skills: [
          { name: "HTML / CSS / SQL", level: 70 },
          { name: "JavaScript", level: 55 },
          { name: "Front-End", level: 75 },
          { name: "React (Native, JS)", level: 55 },
        ],
      },

      {
        title: "Back-End & API",
        skills: [
          { name: "API REST", level: 45 },
          { name: "Python", level: 60 },
          { name: "Cloud (AWS / Azure)", level: 35 },
        ],
      },

      {
        title: "Méthodes & Outils",
        skills: [
          { name: "Gestion de Projets Agile", level: 90 },
          { name: "Outils & Méthodes", level: 85 },
          { name: "Design Graphique", level: 80 },
          { name: "Git / GitHub", level: 75 },
        ],
      },
    ],
  },

  {
    title: "Soft Skills",
    categories: [
      {
        title: "Communication",
        skills: [
          { name: "Expression écrite & orale", level: 85 },
          { name: "Pédagogie / Vulgarisation", level: 80 },
        ],
      },
      {
        title: "Collaboration",
        skills: [
          { name: "Travail d’équipe", level: 90 },
          { name: "Feedback & écoute", level: 85 },
        ],
      },
      {
        title: "Autonomie & organisation",
        skills: [
          { name: "Priorisation & planification", level: 80 },
          { name: "Résolution de problèmes", level: 75 },
        ],
      },
    ],
  },

  {
    title: "Langues",
    categories: [
      {
        title: "Compétences linguistiques",
        skills: [
          { name: "Anglais", level: 60 },
          { name: "Espagnol", level: 30 },
          { name: "Japonais", level: 20 },
        ],
      },
    ],
  },
];

/* GÉNÉRATION HTML*/

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("competences-container");

  function generateCompetences() {
    container.innerHTML = "";

    COMPETENCES.forEach((groupData) => {
      const group = document.createElement("article");
      group.className = "skill-group";

      group.innerHTML = `
        <button class="group-header" aria-expanded="false">
          <span class="group-title">${groupData.title}</span>
          <span class="group-icon">▼</span>
        </button>

        <div class="group-content"></div>
      `;

      const groupContent = group.querySelector(".group-content");

      /* CATEGORIES */
      groupData.categories.forEach((catData) => {
        const category = document.createElement("section");
        category.className = "competence-category";

        category.innerHTML = `
          <button class="category-header" aria-expanded="false">
            <span>${catData.title}</span>
            <span class="chev">›</span>
          </button>

          <div class="category-content"></div>
        `;

        const catContent = category.querySelector(".category-content");

        /* SKILLS */
        catData.skills.forEach((s) => {
          const skill = document.createElement("div");
          skill.className = "skill";

          skill.innerHTML = `
              <span class="skill-name">${s.name}</span>

              <div class="progress-container">
                <div class="progress" data-value="${s.level}">
                  <div class="progress-fill"></div>
                </div>
                <span class="progress-value">${s.level}%</span>
              </div>
            `;


          catContent.appendChild(skill);
        });

        groupContent.appendChild(category);
      });

      container.appendChild(group);
    });

    bindInteractions();
  }

  generateCompetences();

  /* INTERACTIONS (accordéons + jauges)*/

  function bindInteractions() {
    document.querySelectorAll(".group-header").forEach((header) => {
      header.onclick = () => {
        const group = header.parentElement;
        const isOpen = group.classList.toggle("open");
        header.setAttribute("aria-expanded", isOpen);
      };
    });

    document.querySelectorAll(".competence-category").forEach((cat) => {
      const header = cat.querySelector(".category-header");

      header.onclick = () => {
        const group = cat.closest(".skill-group");

        group.querySelectorAll(".competence-category").forEach((other) => {
          if (other !== cat) {
            other.classList.remove("open");
            other
              .querySelector(".category-header")
              .setAttribute("aria-expanded", "false");
            other
              .querySelectorAll(".progress-fill")
              .forEach((f) => (f.style.width = "0"));
          }
        });

        const isOpen = cat.classList.toggle("open");
        header.setAttribute("aria-expanded", isOpen);

        if (isOpen) animateBars(cat);
      };
    });
  }

  function animateBars(cat) {
    cat.querySelectorAll(".progress").forEach((p) => {
      const value = Number(p.dataset.value);
      const fill = p.querySelector(".progress-fill");

      fill.style.width = "0";
      setTimeout(() => (fill.style.width = value + "%"), 40);
    });
  }

  /* OUVRIR / FERMER TOUT*/

  document.getElementById("open-all").onclick = () => {
    document.querySelectorAll(".skill-group").forEach((g) => {
      g.classList.add("open");
      g.querySelector(".group-header").setAttribute("aria-expanded", "true");
    });

    document.querySelectorAll(".competence-category").forEach((cat) => {
      cat.classList.add("open");
      cat
        .querySelector(".category-header")
        .setAttribute("aria-expanded", "true");
      animateBars(cat);
    });
  };

  document.getElementById("close-all").onclick = () => {
    document.querySelectorAll(".skill-group").forEach((g) => {
      g.classList.remove("open");
      g.querySelector(".group-header").setAttribute("aria-expanded", "false");
    });

    document.querySelectorAll(".competence-category").forEach((cat) => {
      cat.classList.remove("open");
      cat
        .querySelector(".category-header")
        .setAttribute("aria-expanded", "false");
      cat
        .querySelectorAll(".progress-fill")
        .forEach((f) => (f.style.width = "0"));
    });
  };

  /* TRI DES COMPÉTENCES (↑ ↓ reset)*/

  let sortState = 0;

  document.getElementById("sort-by-level").onclick = () => {
    sortState = (sortState + 1) % 3;

    const btn = document.getElementById("sort-by-level");

    if (sortState === 0) {
      btn.textContent = "Trier par niveau ↓";
      regenerateSorted(null);
    } else if (sortState === 1) {
      btn.textContent = "Trier par niveau ↑";
      regenerateSorted("desc");
    } else if (sortState === 2) {
      btn.textContent = "Trier par niveau (↑)";
      regenerateSorted("asc");
    }
  };

  function regenerateSorted(mode) {
    COMPETENCES.forEach((group) =>
      group.categories.forEach((cat) => {
        if (!mode) return;
        cat.skills.sort((a, b) =>
          mode === "asc" ? a.level - b.level : b.level - a.level
        );
      })
    );

    generateCompetences();
  }
});
