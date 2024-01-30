//Mettre le code JavaScript lié à la page photographer.html
const params = new URL(document.location).searchParams; // on stock le fait de pouvoir chercher un paramètre de l'URL dans la variable params
const id = parseInt(params.get("id")); // On recherche l'id contenu dans l'URL et on le stock dans la variable id. cette variable est déclarée en dehors d'un scope de fonction, elle s'applique donc  à tout le code js

function photographerCardLeft(photographer) {
  // on déclare la fonction photographerCardLeft avec le paramètre photographer (cette fonction permettra de créer la partie de gauche de la fiche d'identité du photographe sur la page photographe)
  const { name, city, tagline } = photographer; // on destructure les éléments name, city et tagline. c'est comme si on déclarait 3 varibales comme ceci :
  //const name = photographer.name
  //const city = photographer.city
  //const tagline = photographer.tagline

  const article = document.createElement("article"); // on créé un élément "article" dans le DOM et on le stock dans la variable article
  const h2 = document.createElement("h2"); // on créé un élément h2 dans le DOM et on le stock dans la variable h2
  h2.textContent = name; // on donne la valeur de name comme texte du h2
  const h3 = document.createElement("h3"); // on créé un élément h3 dans le DOM et on le stock dans la variable h3
  h3.textContent = city; // on donne la valeur de city comme texte du h3
  const p = document.createElement("p"); // on créé un élément p dans le DOM et on le stock dans la variable p
  p.textContent = tagline; // on donne la valeur de tagline comme texte du p

  article.appendChild(h2); // on rattache le h2 à l'élément parent article créé plus tôt
  article.appendChild(h3); // on rattache le h3 à l'élément parent article créé plus tôt
  article.appendChild(p); // on rattache le p à l'élément parent article créé plus tôt
  return article; // on met fin à la fonction et on lui dit de renvoyer l'article créé précédemment
}

function photographerCardRight(photographer) {
  // on déclare la fonction photographerCardRight avec le paramètre photographer (cette fonction permettra de créer la partie de droite de la fiche d'identité du photographe sur la page photographe)
  const { portrait, price } = photographer; // on destructure les éléments name, city et tagline. c'est comme si on déclarait 3 varibales comme ceci :
  //const portrait = photographer.portrait
  //const price = photographer.price

  const picture = `assets/photographers/${portrait}`; //on stock l'emplacement de la photo du photographe dans la variable picture

  const article = document.createElement("article"); // On créé un élément article qu'on stock dans la variable article (déjà fait plus haut. Doublon ?)
  const img = document.createElement("img"); // on créé un élément img qu'on stock dans la variable img
  img.setAttribute("src", picture); // on ajoute l'attribue src à la balise image créée juste au dessus et on lui attribue la valeur stocké dans la variable picture (l'emplacement de la photo du photographe)
  img.setAttribute("alt", ""); // on lui ajoute aussi l'attribut alt et on défini sa valeur sur ""
  img.classList.add("profile-pic"); // on ajoute la class "profile-pic" à la balise img
  const priceDiv = document.createElement("div"); // on créé une div qu'on stock dans la variable priceDiv
  priceDiv.textContent = `${price}€ / jour`; // on donne la valeur stockée dans la variable price comme contenu de la div priceDiv
  priceDiv.classList.add("tarif"); // on ajoute la class "tarif" à la div priceDiv

  article.appendChild(img); // on rattache la balise img stockée dans la variable img à l'élément parent article créé plus tôt
  article.appendChild(priceDiv); // on rattache la balise div stockée dans la variable priceDiv à l'élément parent article créé plus tôt
  return article; // on met fin à la fonction et on lui dit de renvoyer l'article créé précédemment
}

function submitForm() {
  // on déclare une fonction submitForm (cette fonction va afficher le contenu des champs dans la console)
  const inputName = document.getElementById("name").value; // On stock la valeur du champs name rempli par l'utilisateur dans la variable inputName
  const inputFirstname = document.getElementById("prenom").value; // On stock la valeur du champs prénom rempli par l'utilisateur dans la variable inputFirstName
  const inputEmail = document.getElementById("email").value; // On stock la valeur du champs email rempli par l'utilisateur dans la variable inputEmail
  const textareaMessage = document.getElementById("message").value; // On stock la valeur du champs message rempli par l'utilisateur dans la variable textareaMessage

  console.log(inputName); // On affiche la valeur de la variable inputName dans la console
  console.log(inputFirstname); // On affiche la valeur de la variable inputFirstName dans la console
  console.log(inputEmail); // On affiche la valeur de la variable inputEmail dans la console
  console.log(textareaMessage); // On affiche la valeur de la variable textareaMessage dans la console
}

function photographerModal(photographer) {
  // on déclare la fonction photographerModal avec le paramètre photographer (Cette fonction va permettre d'afficher le nom du photographe en dessous du texte "contactez-moi" dans le formulaire)
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
