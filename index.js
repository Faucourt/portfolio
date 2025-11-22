/* INDEX – Remplissage dynamique*/
document.addEventListener("DOMContentLoaded", () => {
  const U = window.USER_CONFIG;

  // HERO
  document.getElementById("hero-name").textContent = U.fullName;
  document.getElementById("hero-intro").textContent = U.heroIntro;

  // ABOUT
  document.getElementById("about-text").textContent = U.studyTitle;

  // FEATURED PROJECT
  document.getElementById("featured-img").src = U.featuredProject.image;
  document.getElementById("featured-img").alt = U.featuredProject.title;

  document.getElementById("featured-title").textContent =
    U.featuredProject.title;

  document.getElementById("featured-desc").textContent =
    U.featuredProject.description;

  document.getElementById("featured-link").href = U.featuredProject.github;

  // FADE-IN ANIMATION
  const targets = document.querySelectorAll(".fade-target");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach((el) => observer.observe(el));
});
