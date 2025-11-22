/*  Utils.js — Convertisseur intelligent texte → HTML riche*/

export function convertRichText(text = "") {
  if (!text || typeof text !== "string") return "";

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l, i, arr) => !(l === "" && arr[i + 1] === ""));

  let html = "";
  let inList = false;

  lines.forEach((line) => {
    const isBullet = line.startsWith("- ");

    if (isBullet) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${line.replace("- ", "")}</li>`;
      return;
    }

    if (inList) {
      html += "</ul>";
      inList = false;
    }

    if (line === "") {
      html += "<br/>";
      return;
    }

    html += `<p>${line}</p>`;
  });

  if (inList) html += "</ul>";

  return html;
}
