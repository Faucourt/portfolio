/*  SWIPE – Gestion du swipe mobile pour carrousels
   Utilisation : enableSwipe(".carousel", ".slide", callback)*/

function enableSwipe(containerSelector, slideSelector, callback) {
  let startX = 0;
  let endX = 0;

  function onStart(e) {
    startX = e.touches[0].clientX;
  }

  function onEnd(e) {
    endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    // Seuil minimal pour valider un swipe
    if (Math.abs(diff) > 40) {
      callback(diff < 0 ? "next" : "prev");
    }
  }

  document.querySelectorAll(containerSelector).forEach((carousel) => {
    carousel.addEventListener("touchstart", onStart, { passive: true });
    carousel.addEventListener("touchend", onEnd, { passive: true });
  });
}
