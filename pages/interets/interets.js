/* INTERETS — Voyages + Carte + Filtrage + Carrousels*/

document.addEventListener("DOMContentLoaded", () => {
  const user = window.USER_CONFIG;
  document.title = `Centres d’intérêts — ${user.fullName}`;


  /* INIT MAP */
  const map = L.map("map", {
    center: [20, 0],
    zoom: 2,
    worldCopyJump: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap France",
  }).addTo(map);

  const markerIcon = L.divIcon({
    className: "custom-marker",
    iconSize: [16, 16],
  });

  /* LISTE DES VOYAGES */
  const trips = [
    {
      id: "barcelone",
      city: "Barcelone",
      country: "Espagne",
      coords: [41.3874, 2.1686],
      desc: "Séjour en Catalogne.",
      photos: ["/assets/images/interets/barcelone-1.jpg"],
    },
    {
      id: "newyork",
      city: "New York",
      country: "USA",
      coords: [40.7128, -74.006],
      desc: "New-York : 'Empire State of Mind'",
      photos: [
        "/assets/images/interets/newyork-1.jpg",
        "/assets/images/interets/newyork-2.jpg",
        "/assets/images/interets/newyork-3.jpg",
      ],
    },
    {
      id: "montreal",
      city: "Montréal",
      country: "Canada",
      coords: [45.5017, -73.5673],
      desc: "Immersion culturelle.",
      photos: [
        "/assets/images/interets/montreal-1.jpg",
        "/assets/images/interets/montreal-2.jpg",
        "/assets/images/interets/montreal-3.jpg",
      ],
    },
    {
      id: "bruxelles",
      city: "Bruxelles",
      country: "Belgique",
      coords: [50.8503, 4.3517],
      desc: "Meilleur chocolat et gaufres.",
      photos: [
        "/assets/images/interets/bruxelles-1.jpg",
        "/assets/images/interets/bruxelles-2.jpg",
        "/assets/images/interets/bruxelles-3.jpg",
      ],
    },
    {
      id: "parcprinces",
      city: "Parc des Princes",
      country: "France",
      coords: [48.8414, 2.253],
      desc: "Ici C'est Paris (PSG).",
      photos: [
        "/assets/images/interets/parcdesprinces-0.jpg",
        "/assets/images/interets/parcdesprinces-1.jpg",
        "/assets/images/interets/parcdesprinces-2.jpg",
      ],
    },
    {
      id: "seattle",
      city: "Seattle",
      country: "USA",
      coords: [47.6062, -122.3321],
      desc: "Nord-ouest américain.",
      photos: [
        "/assets/images/interets/seattle-1.jpg",
        "/assets/images/interets/seattle-2.jpg",
      ],
    },
    {
      id: "sanfrancisco",
      city: "San Francisco",
      country: "USA",
      coords: [37.7749, -122.4194],
      desc: "Golden Gate Bridge.",
      photos: [
        "/assets/images/interets/sanfrancisco-1.jpg",
        "/assets/images/interets/sanfrancisco-2.jpg",
        "/assets/images/interets/sanfrancisco-3.jpg",
      ],
    },
    {
      id: "malaga",
      city: "Malaga",
      country: "Espagne",
      coords: [36.7213, -4.4214],
      desc: "Plages et soleil.",
      photos: [
        "/assets/images/interets/malaga-1.jpg",
        "/assets/images/interets/malaga-2.jpg",
        "/assets/images/interets/malaga-3.jpg",
      ],
    },
    {
      id: "seville",
      city: "Séville",
      country: "Espagne",
      coords: [37.3891, -5.9845],
      desc: "Plaza de España.",
      photos: [
        "/assets/images/interets/seville-1.jpg",
        "/assets/images/interets/seville-2.jpg",
        "/assets/images/interets/seville-3.jpg",
      ],
    },
    {
      id: "niagara",
      city: "Chutes du Niagara",
      country: "USA",
      coords: [43.0962, -79.0377],
      desc: "Côté américain.",
      photos: [
        "/assets/images/interets/niagara-1.jpg",
        "/assets/images/interets/niagara-2.jpg",
        "/assets/images/interets/niagara-3.jpg",
      ],
    },
    {
      id: "gibraltar",
      city: "Gibraltar",
      country: "Gibraltar",
      coords: [36.1408, -5.3536],
      desc: "Territoire britannique.",
      photos: [
        "/assets/images/interets/gibraltar-1.jpg",
        "/assets/images/interets/gibraltar-2.jpg",
      ],
    },
    {
      id: "bordeaux",
      city: "Bordeaux",
      country: "France",
      coords: [44.8378, -0.5792],
      desc: "Place de la Bourse et Cité du Vin.",
      photos: [
        "/assets/images/interets/bordeaux-1.jpg",
        "/assets/images/interets/bordeaux-2.jpg",
      ],
    },
    {
      id: "collioure",
      city: "Collioure",
      country: "France",
      coords: [42.5263, 3.082],
      desc: "Village catalan.",
      photos: [
        "/assets/images/interets/collioure-1.jpg",
        "/assets/images/interets/collioure-2.jpg",
      ],
    },
    {
      id: "londres",
      city: "Londres",
      country: "Angleterre",
      coords: [51.5074, -0.1278],
      desc: "Séjour étudiant 2022.",
      photos: [
        "/assets/images/interets/londres-1.jpg",
        "/assets/images/interets/londres-2.jpg",
        "/assets/images/interets/londres-3.jpg",
        "/assets/images/interets/londres-4.jpg",
        "/assets/images/interets/londres-5.jpg",
      ],
    },
    {
      id: "harvard",
      city: "Harvard",
      country: "USA",
      coords: [42.377, -71.1167],
      desc: "Campus mythique.",
      photos: [
        "/assets/images/interets/harvard-1.jpg",
        "/assets/images/interets/harvard-2.jpg",
        "/assets/images/interets/harvard-3.jpg",
      ],
    },
    {
      id: "fortboyard",
      city: "Fort Boyard",
      country: "France",
      coords: [45.996, -1.25],
      desc: "Tour en bateau.",
      photos: ["/assets/images/interets/fortboyard.jpg"],
    },
    {
      id: "eirandonan",
      city: "Eilean Donan Castle",
      country: "Écosse",
      coords: [57.2737, -5.5161],
      desc: "Château iconique.",
      photos: ["/assets/images/interets/ecosse-eileandonancastle.jpg"],
    },
    {
      id: "lochness",
      city: "Loch Ness",
      country: "Écosse",
      coords: [57.3249, -4.4401],
      desc: "Urquhart Castle.",
      photos: ["/assets/images/interets/ecosse-lochnessurquhartcastle.jpg"],
    },
    {
      id: "losangeles",
      city: "Los Angeles",
      country: "USA",
      coords: [34.0522, -118.2437],
      desc: "Hollywood Vibe.",
      photos: [
        "/assets/images/interets/losangeles-1.jpg",
        "/assets/images/interets/losangeles-2.jpg",
      ],
    },
    {
      id: "lewarde",
      city: "Lewarde",
      country: "France",
      coords: [50.3317869, 3.1707202],
      desc: "Centre minier.",
      photos: [
        "/assets/images/interets/lewarde-1.jpg",
        "/assets/images/interets/lewarde-2.jpg",
      ],
    },
    {
      id: "pierremauroy",
      city: "Stade Pierre Mauroy",
      country: "France",
      coords: [50.611, 3.13],
      desc: "Match LOSC.",
      photos: [
        "/assets/images/interets/pierremauroy-1.jpg",
        "/assets/images/interets/pierremauroy-2.jpg",
        "/assets/images/interets/pierremauroy-3.jpg",
      ],
    },
    {
      id: "toulouse",
      city: "Toulouse",
      country: "France",
      coords: [43.6045, 1.444],
      desc: "La ville rose.",
      photos: [
        "/assets/images/interets/toulouse-1.jpg",
        "/assets/images/interets/toulouse-2.jpg",
      ],
    },
    {
      id: "toulon",
      city: "Toulon",
      country: "France",
      coords: [43.1242, 5.928],
      desc: "Randonnée.",
      photos: [
        "/assets/images/interets/toulon-1.jpg",
        "/assets/images/interets/toulon-2.jpg",
      ],
    },
    {
      id: "hyeres",
      city: "Hyères",
      country: "France",
      coords: [43.1204, 6.1286],
      desc: "Îles d’or.",
      photos: [
        "/assets/images/interets/hyeres-1.jpg",
        "/assets/images/interets/hyeres-2.jpg",
        "/assets/images/interets/hyeres-3.jpg",
      ],
    },
  ];

  const travelList = document.getElementById("travelList");
  const countryFilter = document.getElementById("filterCountries");

  const markers = {};

  /* POPUP CONTENT*/
  function popupHTML(t) {
    return `
      <h3 class="popup-title">${t.city}, ${t.country}</h3>
      <p class="popup-desc">${t.desc}</p>

      <div class="popup-carousel">
        ${t.photos
          .map(
            (src, i) => `
          <img src="${src}" alt="${t.city}" class="popup-photo ${
              i === 0 ? "active" : ""
            }" data-index="${i}">`
          )
          .join("")}

        ${
          t.photos.length > 1
            ? `
        <button class="popup-nav popup-prev">‹</button>
        <button class="popup-nav popup-next">›</button>`
            : ""
        }
      </div>
    `;
  }

  /* BUILD COUNTRY FILTER*/
  const uniqueCountries = [...new Set(trips.map((t) => t.country))];

  uniqueCountries.forEach((country) => {
    const opt = document.createElement("option");
    opt.value = country;
    opt.textContent = country;
    countryFilter.appendChild(opt);
  });

  /* SYNC MAP + SIDEBAR*/
  function buildTravelList(filter = "all") {
    travelList.innerHTML = "";

    trips
      .filter((t) => filter === "all" || t.country === filter)
      .forEach((trip) => {
        const li = document.createElement("li");
        li.textContent = `${trip.city}, ${trip.country}`;
        li.dataset.id = trip.id;

        li.addEventListener("click", () => {
          map.flyTo(trip.coords, 6, { duration: 1.2 });
          markers[trip.id].openPopup();

          travelList
            .querySelectorAll("li")
            .forEach((l) =>
              l.classList.toggle("active", l.dataset.id === trip.id)
            );
        });

        travelList.appendChild(li);
      });
  }

  /* Initialisation de la liste */
  buildTravelList();

  /* Filtrage */
  countryFilter.addEventListener("change", (e) => {
    buildTravelList(e.target.value);
  });

  /* MARKERS */
  trips.forEach((trip) => {
    const marker = L.marker(trip.coords, { icon: markerIcon }).addTo(map);
    marker.bindPopup(popupHTML(trip));
    markers[trip.id] = marker;
  });

  /* POPUP CARROUSEL */
  map.on("popupopen", (e) => {
    const popup = e.popup.getElement();
    const photos = popup.querySelectorAll(".popup-photo");

    if (photos.length <= 1) return;

    const prev = popup.querySelector(".popup-prev");
    const next = popup.querySelector(".popup-next");

    let index = 0;

    const show = (i) => {
      photos.forEach((img, idx) => img.classList.toggle("active", idx === i));
    };

    prev?.addEventListener("click", () => {
      index = (index - 1 + photos.length) % photos.length;
      show(index);
    });

    next?.addEventListener("click", () => {
      index = (index + 1) % photos.length;
      show(index);
    });

    enableSwipe(".popup-carousel", ".popup-photo", (dir) => {
      index =
        dir === "next"
          ? (index + 1) % photos.length
          : (index - 1 + photos.length) % photos.length;

      show(index);
    });
  });

  /* SPORTS */
  const sports = [
    {
      id: "karaté",
      title: "Karaté",
      desc: "Sport qui m'a enseigné la discipline, la confiance en soi et le respect; pratiqué de mes 7ans à mes 18ans.",
      photos: ["/assets/images/interets/sport-4.jpg"],
    },
    {
      id: "football",
      title: "Football",
      desc: "Supporter du PSG, pratique en FSGT (amical) et Club Etoile Sportive de Paris",
      photos: [
        "/assets/images/interets/soccer-1.jpg",
        "/assets/images/interets/soccer-2.jpg",
        "/assets/images/interets/soccer-3.jpg",
      ],
    },
    {
      id: "escalade",
      title: "Escalade",
      desc: "Passion familiale pratiquée à quelques l'occasions (Colonnie, Club Familial de Condé).",
      photos: ["/assets/images/interets/sport-1.jpg"],
    },
    {
      id: "design",
      title: "Design & Création",
      desc: "Compte professionnel Instagram de Design sur la thématique du Sport (DesignFlex&Sport). <br> <a href='https://www.instagram.com/designflexsport/' target='_blank'>Lien du Compte</a>",
      photos: [
        "/assets/images/interets/design-1.png",
        "/assets/images/interets/design-2.png",
        "/assets/images/interets/design-3.png",
      ],
    },
  ];

  const sportsContainer = document.getElementById("sportsContainer");

  sports.forEach((sport) => {
    const card = document.createElement("article");
    card.className = "sport-card";

    card.innerHTML = `
      <h3 class="sport-title">${sport.title}</h3>

      <div class="sport-carousel">
        ${sport.photos
          .map(
            (src, i) =>
              `<img src="${src}" class="sport-photo ${
                i === 0 ? "active" : ""
              }">`
          )
          .join("")}

        ${
          sport.photos.length > 1
            ? `
        <button class="sport-nav sport-prev">‹</button>
        <button class="sport-nav sport-next">›</button>`
            : ""
        }
      </div>

      <p class="sport-desc">${sport.desc}</p>
    `;

    sportsContainer.appendChild(card);
  });

  setTimeout(() => {
    document.querySelectorAll(".sport-carousel").forEach((carousel) => {
      const photos = carousel.querySelectorAll(".sport-photo");
      if (photos.length <= 1) return;

      const prev = carousel.querySelector(".sport-prev");
      const next = carousel.querySelector(".sport-next");

      let index = 0;

      const show = (i) => {
        photos.forEach((img, idx) => img.classList.toggle("active", idx === i));
      };

      prev.onclick = () => {
        index = (index - 1 + photos.length) % photos.length;
        show(index);
      };

      next.onclick = () => {
        index = (index + 1) % photos.length;
        show(index);
      };
    });
  }, 150);
});
