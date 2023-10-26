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

    const photo = photos.find((item) => item.photographerId === id);

    if (photo) {
      const { id, photographerId, title, image, likes, date, price } = photo;

      const picture = `assets/images/${photographerId}/${image}`;

      const article = document.createElement("article");
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", "");
      img.classList.add("artist-pic");

      console.log(article);

      article.appendChild(img);
      return article;
    }
  }

  const galleryGridImages = document.querySelector(".gallery");
  const galleryArticle = await galleryGrid();
  galleryGridImages.appendChild(galleryArticle);
})();
