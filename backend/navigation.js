/*  NAVIGATION – Gestion du lien actif dans le menu
   Compatible GitHub Pages et sous-dossiers*/

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  if (!links.length) return;

  const current = window.location.pathname;

  links.forEach((link) => {
    const href = link.getAttribute("href");

    // Active si le début du chemin correspond
    if (current === href || current.endsWith(href)) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
});
