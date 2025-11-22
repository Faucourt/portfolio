/* VEILLES — Données + Génération dynamique + animation fade-in*/
const VEILLES = [
  {
    title: "La Ferme du Web",
    text: "Veille quotidienne sur les nouvelles technologies web et le développement.",
    tag: "Technologique",
    tagClass: "tag-tech",
    link: "https://www.lafermeduweb.net/",
  },
  {
    title: "Developpez.com",
    text: "Ressources pour tout types de développement informatique (Data, Cloud, IA etc.).",
    tag: "Technologique",
    tagClass: "tag-tech",
    link: "https://www.developpez.com/",
  },
  {
    title: "Blogs du Web Design",
    text: "Pour les passionnés de blogs, d’inspirations et de ressources en web design.",
    tag: "Technologique",
    tagClass: "tag-tech",
    link: "https://www.blogduwebdesign.com/",
  },
  {
    title: "Techworld with Nana",
    text: "Chaîne YouTube expliquant des concepts technologiques complexes de manière simple.",
    tag: "Technologique",
    tagClass: "tag-tech",
    link: "https://www.youtube.com/c/techworldwithnana",
  },
  {
    title: "ThePrimeTime",
    text: "Chaîne YouTube axée sur la technologie, la programmation et les tendances numériques.",
    tag: "Technologique",
    tagClass: "tag-tech",
    link: "https://www.youtube.com/@ThePrimeTimeagen",
  },
];

/* Construction dynamique*/
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("veilles-grid");

  VEILLES.forEach((v) => {
    const article = document.createElement("article");
    article.className = "card veille-card fade-in";

    article.innerHTML = `
      <div class="card__body">
        <h2 class="card-title">${v.title}</h2>
        <p class="card-text">${v.text}</p>
      </div>

      <div class="card__footer">
        <span class="tag ${v.tagClass}">${v.tag}</span>
        <a href="${v.link}" target="_blank" class="btn btn-light">
          ${
            v.link.includes("youtube.com") ? "Voir la chaîne" : "Voir l’article"
          }
        </a>
      </div>
    `;

    container.appendChild(article);
  });

  /* Animation d’apparition (fade-in)*/
  const cards = document.querySelectorAll(".veille-card");

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
