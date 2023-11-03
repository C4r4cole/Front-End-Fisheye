//Mettre le code JavaScript lié à la page photographer.html
(async function () {
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get("id"));

  console.log(id);

  async function photographerCardLeft() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();

    const photographers = data.photographers;

    const photographer = photographers.find((item) => item.id === id);

    if (photographer) {
      const { name, city, tagline } = photographer;

      const article = document.createElement("article");
      const h2 = document.createElement("h2");
      h2.textContent = name;
      const h3 = document.createElement("h3");
      h3.textContent = city;
      const p = document.createElement("p");
      p.textContent = tagline;

      article.appendChild(h2);
      article.appendChild(h3);
      article.appendChild(p);
      return article;
    }
  }

  async function photographerCardRight() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();

    const photographers = data.photographers;

    const photographer = photographers.find((item) => item.id === id);

    if (photographer) {
      const { portrait } = photographer;

      const picture = `assets/photographers/${portrait}`;

      const article = document.createElement("article");
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", "");
      img.classList.add("profile-pic");

      article.appendChild(img);
      return article;
    }
  }

  const photographHeaderLeft = document.querySelector(
    ".photograph-header_left"
  );
  const photographHeaderRight = document.querySelector(
    ".photograph-header_right"
  );
  const photographerArticleLeft = await photographerCardLeft();
  const photographerArtcileRight = await photographerCardRight();
  photographHeaderLeft.appendChild(photographerArticleLeft);
  photographHeaderRight.appendChild(photographerArtcileRight);

  async function galleryGrid() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();

    const photos = data.media;

    const photographerPhotos = photos.filter(
      (item) => item.photographerId === id
    );

    if (photographerPhotos.length > 0) {
      // Vérifie s'il y a des photos
      const photoGrid = document.createElement("article");
      photoGrid.classList.add("photo-grid");

      photographerPhotos.forEach((photo) => {
        const { id, photographerId, title, image, video, likes, date, price } =
          photo;

        const card = document.createElement("div");
        const legend = document.createElement("div");
        const titre = document.createElement("h2");
        const likesDiv = document.createElement("div");
        const coeur = document.createElement("div");
        const icon = document.createElement("i");

        // Déterminez si c'est une vidéo ou une image
        if (video) {
          const videoElement = document.createElement("video");
          videoElement.setAttribute("controls", "true");
          videoElement.classList.add("artist-video");

          const sourceElement = document.createElement("source");
          sourceElement.setAttribute(
            "src",
            `assets/images/${photographerId}/${video}`
          );
          sourceElement.setAttribute("type", "video/mp4");

          videoElement.appendChild(sourceElement);
          card.appendChild(videoElement);
        } else if (image) {
          const img = document.createElement("img");
          img.setAttribute("src", `assets/images/${photographerId}/${image}`);
          img.setAttribute("alt", "");
          img.classList.add("artist-pic");
          card.appendChild(img);
        }

        legend.classList.add("legend");
        titre.textContent = title;
        coeur.textContent = likes;
        likesDiv.classList.add("likes-div");
        coeur.classList.add("likes");
        icon.classList.add("fa-solid", "fa-heart");

        card.appendChild(legend);
        legend.appendChild(titre);
        legend.appendChild(likesDiv);
        likesDiv.appendChild(coeur);
        likesDiv.appendChild(icon);

        photoGrid.appendChild(card);
      });

      return photoGrid;
    }

    // Si aucune photo ou vidéo correspondante n'est trouvée
    return null;
  }

  const galleryGridImages = document.querySelector(".gallery-container");
  const galleryArticle = await galleryGrid();
  galleryGridImages.appendChild(galleryArticle);
})();
