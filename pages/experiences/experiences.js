/* EXPÉRIENCES – Données + génération dynamique*/

const EXPERIENCES = [
  //Stage 3e année
  {
  role: "Développeur Front-End",
  company: "Société Générale",
  location: "Fontenay-sous-Bois (94), France",
  date: "Mai - Août 2024",
  context: "stage",

  description: `
    Participation au développement Front-End d’une solution Big Data interne.
    Le stage a mêlé intégration UI basée sur Figma, appels API REST,
    tests unitaires et suivi de qualité continue. Travail en équipe Agile/Scrum
    avec l’UX/UI et les développeurs Back-End.
  `,

  missions: [
    "Intégration de maquettes Figma pour créer des interfaces modernes et responsives",
    "Développement Front-End en React : composants, logique métier et gestion d’état",
    "Appels API REST pour connecter le Front-End au Back-End et manipuler les données",
    "Réalisation de tests unitaires intégrés dans la chaîne CI de Jenkins",
    "Analyse de la qualité et correction via SonarQube",
    "Suivi des builds Jenkins, debugging et garantie de la continuité applicative",
    "Travail d’équipe avec l’UX/UI et les développeurs Back-End",
    "Participation active à la méthodologie Agile/Scrum (daily, planning, review, rétro)"
  ],

  tech: [
    "React",
    "JavaScript",
    "API REST",
    "Figma",
    "Jenkins",
    "GitHub",
    "SonarQube",
    "Agile / Scrum"
  ]
}
,
  //Stage 2e année
  {
    role: "Étude MoveToCloud",
    company: "MGI Consultants",
    location: "Paris (8e arr.), France",
    date: "Avril - Août 2023",
    context: "stage",
    description: `
      Contribution à une étude MoveToCloud incluant l’analyse, la préparation et les tests
      d’une migration d’infrastructure Microsoft vers AWS, avec mise en place d’un domaine AD
      et configuration de serveurs Windows.
  `,
    missions: [
      "Analyse des besoins métiers pour une transition Cloud (MoveToCloud)",
      "Étude comparative des coûts et configurations d’instances Windows Server sur AWS",
      "Mise en place d’un environnement de test : domaine Active Directory On-Premise / Cloud",
      "Création, gestion et synchronisation d’objets AD (utilisateurs, groupes, stratégies…)",
      "Configuration de GPO pour sécuriser et standardiser l’environnement",
      "Installation et configuration d’instances EC2 dans un contexte d’infrastructure hybride",
    ],

    tech: [
      "AWS EC2",
      "Active Directory (AD On-Premise / Cloud)",
      "Windows Server",
      "PowerShell",
      "Hyper-V",
      "GPO (Group Policy Objects)",
      "Réseaux et VPN",
    ],
  },

  //Stage 1re année
  {
    role: "Assistant Développeur",
    company: "Société Générale",
    location: "Fontenay-Sous-Bois (94), France",
    date: "Juin - Août 2022",
    context: "stage",

    description: `
    Immersion dans un environnement de développement web moderne afin de découvrir les
    bases du Front-End et les méthodologies professionnelles. Le stage m’a permis de
    comprendre l’organisation d’un projet Agile ainsi que les outils essentiels
    au versionnement et au travail collaboratif.
  `,

    missions: [
      "Découverte de l’écosystème React et prise en main d’un environnement de développement professionnel",
      "Création d’une mini-application Todo List pour comprendre les composants, états et interactions",
      "Initiation aux méthodes Agile (Scrum) : sprint planning, daily meeting et rétrospectives",
      "Suivi du projet et gestion des tâches via Jira",
      "Utilisation de Git et GitHub pour le versionnement et le travail en équipe",
      "Observation du cycle complet d’un projet : développement, revue de code et intégration",
    ],

    tech: [
      "React",
      "JavaScript",
      "HTML / CSS",
      "Git & GitHub",
      "Méthode Agile (Scrum)",
      "Jira",
    ],
  },

  //Job Saisonnier
  {
    role: "Commis de Bar / Barman",
    company: "Bar du Marché des Blancs Manteaux",
    location: "Paris (4e arr.), France",
    date: "Été 2021 et 2022",
    context: "CDD saisonnier",
    description: `
      Assurer la fluidité du Service, Service de bar et Gestion de stockage
    `,
    missions: [
      "Service au comptoir et en salle",
      "Préparation des cocktails classiques",
      "Gestion des stocks et réassort",
      "Nettoyage du bar et de la salle après fermeture",
    ],
    tech: [
      "Organisation du Service",
      "Préparation de Cocktails",
      "Gestion de Stock",
      "Relations Clients",
      "Reactivité et Gestion du Stress",
      "Travail en Équipe",
    ],
  },

  //Trèsorier Adjoint/Trésorier
  {
    role: "Trésorier Adjoint/Trésorier",
    company: "Maisons des Lycéens (M.D.L)",
    location: "Lycée Eugène Delacroix, Maisons-Alfort (94)",
    date: "Septembre 2020 — Août 2021",
    context: "associatif",
    description: `
      Gestion trésorerie et décisions budgétaires et événementielles face aux enjeux du Covid 19
    `,
    missions: [
      "Marché de Noël",
      "Repas de Noël",
      "Vente de viennoiseries",
      "Vente de Roses pour la Saint Valentin",
      "Organisation d'un Bal de fin d'année",
    ],
    tech: [
      "Excel",
      "Gestion de Trésorerie",
      "Travail en Équipe",
      "Prise de Décision",
    ],
  },
];

/* Génération dynamique*/

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("xp-list");

  EXPERIENCES.forEach((xp) => {
    const card = document.createElement("article");
    card.className = "card xp-card";

    const badge =
      xp.context === "stage"
        ? "xp-context--stage"
        : xp.context === "alternance"
        ? "xp-context--alternance"
        : xp.context === "associatif"
        ? "xp-context--freelance"
        : "xp-context--default";

    card.innerHTML = `
      <header class="xp-header">
        <div>
          <h2 class="xp-role">${xp.role}</h2>
          <p class="xp-company">${xp.company} — ${xp.location}</p>
        </div>

        <div class="xp-info">
          <span class="xp-date">${xp.date}</span>
          <span class="xp-context ${badge}">
            ${xp.context.charAt(0).toUpperCase() + xp.context.slice(1)}
          </span>
        </div>
      </header>

      <p class="xp-description">${xp.description.trim()}</p>

      <ul class="xp-missions">
        ${xp.missions.map((m) => `<li>${m}</li>`).join("")}
      </ul>

      <div class="xp-techs">
        ${xp.tech.map((t) => `<span class="xp-tech">${t}</span>`).join("")}
      </div>
    `;

    list.appendChild(card);
  });

  /* --- Apparition fluide --- */
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }
      }),
    { threshold: 0.2 }
  );

  document.querySelectorAll(".xp-card").forEach((c) => observer.observe(c));
});
