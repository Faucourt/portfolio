/*  FOOTER – dynamique via USER_CONFIG*/

document.addEventListener("DOMContentLoaded", () => {
  const user = window.USER_CONFIG;
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <footer class="site-footer">
      <div class="socials">
        <a href="${user.social.github}" target="_blank">GitHub</a>
        <a href="${user.social.linkedin}" target="_blank">LinkedIn</a>
        <a href="mailto:${user.social.email}">Email</a>
      </div>

      <p>© ${new Date().getFullYear()} – ${
    user.fullName
  }. Tous droits réservés.</p>
    </footer>
  `;
});
