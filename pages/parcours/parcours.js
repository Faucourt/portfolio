document.addEventListener("DOMContentLoaded", () => {
  const DATA = [
    {
      title: "🎓 Collège",
      years: "2013 – 2017",
      desc: "Découverte des sciences, logique, premiers intérêts pour l’informatique.",
    },
    {
      title: "🏫 Lycée",
      years: "2017 – 2021",
      desc: "Esprit analytique, logique, début de la programmation. Baccalauréat spécialité Mathématiques, Sciences Économiques et Sociales (S.E.S) et option Mathématiques Expertes obtenu.",
    },
    {
      title: "💻 Bachelor ECE ",
      years: "2021 – 2024",
      desc: "Bachelor Conception d'Application/Web : Développement web/mobile, UX/UI, gestion de projets, travail d’équipe, initiation au domaine de la Data. Le tout renforcé par des stages en entreprise.",
    },
    {
      title: "🧠 Master Epitech",
      years: "2025 – Aujourd’hui",
      desc: " Master Management des Systèmes d'Information (MSI). Spécialisation en IA, IOT & Santé, prévu pour décembre lors de la sélection d'une des spécialités.",
    },
  ];

  const container = document.getElementById("parcours-cards");

  DATA.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card--flip";

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <h2 class="card-title">${item.title}</h2>
          <p class="card-text">${item.years}</p>
        </div>
        <div class="card-face card-back">
          <p class="card-text">${item.desc}</p>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  const cards = document.querySelectorAll(".card--flip");

  /* DYNAMIQUE : ajuster hauteur selon contenu */
  function adjustHeights() {
    cards.forEach((card) => {
      const front = card.querySelector(".card-front");
      const back = card.querySelector(".card-back");

      const hFront = front.scrollHeight;
      const hBack = back.scrollHeight;

      const finalH = Math.max(hFront, hBack);

      // La hauteur est réellement dynamique
      card.style.height = finalH + "px";
    });
  }

  // Appel initial
  adjustHeights();

  // Fix pour le responsive
  window.addEventListener("resize", () => {
    adjustHeights();
  });

  /* Flip au clic */
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    /* Accessibilité : clavier */
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });

  /* Apparition animée */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));
});
