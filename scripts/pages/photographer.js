//Mettre le code JavaScript lié à la page photographer.html
const params = new URL(document.location).searchParams;
const id = parseInt(params.get("id"));

function photographerCardLeft(photographer) {
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

function photographerCardRight(photographer) {
  const { portrait, price } = photographer;

  const picture = `assets/photographers/${portrait}`;

  const article = document.createElement("article");
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", "");
  img.classList.add("profile-pic");
  const priceDiv = document.createElement("div");
  priceDiv.textContent = `${price}€ / jour`;
  priceDiv.classList.add("tarif");

  article.appendChild(img);
  article.appendChild(priceDiv);
  return article;
}

function submitForm() {
  const inputName = document.getElementById("name").value;
  const inputFirstname = document.getElementById("prenom").value;
  const inputEmail = document.getElementById("email").value;
  const textareaMessage = document.getElementById("message").value;

  console.log(inputName);
  console.log(inputFirstname);
  console.log(inputEmail);
  console.log(textareaMessage);
}

function photographerModal(photographer) {
  const { name } = photographer;
  const nameForm = document.getElementById("name-form");
  nameForm.textContent = name;
}

function createMedia(media) {
  const { id, photographerId, title, image, video, likes, date, price } = media;

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
    return videoElement;
  } else if (image) {
    const img = document.createElement("img");
    img.setAttribute("src", `assets/images/${photographerId}/${image}`);
    img.setAttribute("alt", "");
    img.classList.add("artist-pic");
    return img;
  }
}

function mediaCard(media) {
  const { id, photographerId, title, image, video, likes, date, price } = media;

  const card = document.createElement("div");
  const legend = document.createElement("div");
  const titre = document.createElement("h2");
  const likesDiv = document.createElement("div");
  const coeur = document.createElement("div");
  const icon = document.createElement("i");

  // Détermine si c'est une vidéo ou une image
  const element = createMedia(media);

  card.appendChild(element);

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
  return card;
}

//******************************/
//******************************/
async function getPhotographerMedia() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographers = data.photographers;
  const medias = data.media;

  const photographer = photographers.find((item) => item.id === id);
  const photographerPhotos = medias.filter(
    (item) => item.photographerId === id
  );
  return { photographer, photographerPhotos };
}

async function getPhotographer() {
  const { photographer, photographerPhotos } = await getPhotographerMedia();
  const photographHeaderLeft = document.querySelector(
    ".photograph-header_left"
  );
  const photographHeaderRight = document.querySelector(
    ".photograph-header_right"
  );
  const photographerArticleLeft = photographerCardLeft(photographer);
  const photographerArtcileRight = photographerCardRight(photographer);
  photographHeaderLeft.appendChild(photographerArticleLeft);
  photographHeaderRight.appendChild(photographerArtcileRight);
  photographerModal(photographer);

  if (photographerPhotos.length > 0) {
    // Vérifie s'il y a des photos
    const photoGrid = document.createElement("article");
    photoGrid.classList.add("photo-grid");

    for (const media of photographerPhotos) {
      // pas besoin de déclarer la variable de type const media = "" ?
      const card = mediaCard(media);
      photoGrid.appendChild(card);

      addClickEvent(card, media);
    }

    const galleryGridImages = document.querySelector(".gallery-container");

    galleryGridImages.appendChild(photoGrid);
  }
}

getPhotographer();
