/*  HEADER – génération automatique Utilise USER_CONFIG*/

document.addEventListener("DOMContentLoaded", () => {
  const user = window.USER_CONFIG;
  const header = document.getElementById("header");
  if (!header) return;

  /* ---- MENU ---- */
  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Parcours", path: "/pages/parcours/parcours.html" },
    { label: "Compétences", path: "/pages/competences/competences.html" },
    { label: "Projets", path: "/pages/projets/projets.html" },
    { label: "Veilles", path: "/pages/veilles/veilles.html" },
    { label: "Experiences", path: "/pages/experiences/experiences.html" },
    { label: "Intérêts", path: "/pages/interets/interets.html" },
  ];

  /* ---- HEADER ---- */
  header.innerHTML = `
    <header class="site-header">
      <div class="logo">
        <img src="/assets/images/profil.png" alt="Photo de profil de ${
          user.fullName
        }" />
        <h1>${user.fullName}</h1>
      </div>
      <nav class="navbar" aria-label="Navigation principale">
        <ul>
          ${navItems
            .map(
              (item) =>
                `<li><a href="${item.path}" class="nav-link">${item.label}</a></li>`
            )
            .join("")}
        </ul>
      </nav>
    </header>
  `;

  /* ---- SEO AUTOMATIQUE ---- */
  document.title = `Portfolio – ${user.fullName}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    const m = document.createElement("meta");
    m.name = "description";
    m.content = `${user.fullName} – ${user.jobTitle}`;
    document.head.appendChild(m);
  } else {
    metaDesc.content = `${user.fullName} – ${user.jobTitle}`;
  }
});
