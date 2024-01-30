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

  //*******************************************
  // J'ai ajouté pas mal de code ici
  // *********************************************

  const bottomRightLabel = document.createElement("div");
  bottomRightLabel.classList.add("bottom-right-label");

  const priceDiv = document.createElement("div"); // on créé une div qu'on stock dans la variable priceDiv
  priceDiv.textContent = `${price}€ / jour`; // on donne la valeur stockée dans la variable price comme contenu de la div priceDiv
  priceDiv.classList.add("tarif"); // on ajoute la class "tarif" à la div priceDiv

  const totalLikes = document.createElement("div");
  totalLikes.textContent = "hello"; // la, il va falloir que je mette une fonction à la place de "hello". cette fonction devra additionner l'ensemble des likes des toutes les photos d'un photographe
  totalLikes.classList.add("total-likes");

  bottomRightLabel.appendChild(priceDiv);
  bottomRightLabel.appendChild(totalLikes);

  // ***************************************
  // ***************************************
  // ***************************************

  article.appendChild(img); // on rattache la balise img stockée dans la variable img à l'élément parent article créé plus tôt
  article.appendChild(bottomRightLabel); // on rattache la balise div stockée dans la variable priceDiv à l'élément parent article créé plus tôt
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
  const { name } = photographer; // on destructure l'éléments name. c'est comme si on déclarait la varibale comme ceci :
  //const name = photographer.name

  const nameForm = document.getElementById("name-form"); // On récupère la div avec l'id name-form et on la stock dans la variable nameForm
  nameForm.textContent = name; // on donne la valeur de name comme texte de la div nameForm récupérée juste au dessus
}

function createMedia(media) {
  // on déclare la fonction createMedia avec le paramètre media (cette fonction créera une balise vidéo ou une balise img en fonction de la nature du media que l'on voudra créer. A l'intérieur de cette balise, on viendra ajouter un attribut src défini sur l'emplacement exact des vidéos et photos d'un photographe en particulier grace à la variable photographerId)
  const { id, photographerId, title, image, video, likes, date, price } = media; // on destructure les éléments photographerId, image et video. c'est comme si on déclarait les varibales comme ceci :
  //const photographerId = media.photographerId
  //const image = media.image
  //const video = media.video

  if (video) {
    // si la fonction trouve un élément media.video alors on execute le code qui suit
    const videoElement = document.createElement("video"); // on crée une balise vidéo et on la stock dans la variable videoElement
    videoElement.setAttribute("controls", "true"); // on assigne les attributs controls et true à la variable videoElement
    videoElement.classList.add("artist-video"); // on ajoute la class artist-video à la variable videoElement

    const sourceElement = document.createElement("source"); // on crée une balise source et on la stock dans la variable sourceElement
    sourceElement.setAttribute(
      // on assigne l'attribut src à la variable sourceElement et on lui donne l'emplacement de la vidéo grace au variables photographerId et video
      "src",
      `assets/images/${photographerId}/${video}`
    );
    sourceElement.setAttribute("type", "video/mp4"); // on paramètre l'attribut type avec le type video/mp4 à la variable sourceElement

    videoElement.appendChild(sourceElement); // on rattache l'élément sourceElement à l'élément parent videoElement
    return videoElement; // on met fin à la fonction et on retourne la variable videoElement
  } else if (image) {
    // si la fonction trouve un élément media.image alors on execute le code qui suit
    const img = document.createElement("img"); // on crée une balise img et on la stock dans la variable img
    img.setAttribute("src", `assets/images/${photographerId}/${image}`); // on paramètre l'attribut src à la variable img et on lui ajoute l'emplacement de la photo grace aux variable photographerId et image
    img.setAttribute("alt", ""); // on paramètre l'attribut alt à la variable img et on le défini sur ""
    img.classList.add("artist-pic"); // on ajoute la class artist-pic à la variable img
    return img; // on met fin à la fonction et on retourne la variable img
  }
}

function mediaCard(media) {
  const { id, photographerId, title, image, video, likes, date, price } = media;

  const superCard = document.createElement("div"); //********************** ici aussi */
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

  // ***********************************
  // code ajouté ici aussi
  // ***********************************

  likesDiv.addEventListener("click", (e) => {
    console.log("hello");
    coeur.textContent = likes + 1;
  });

  superCard.appendChild(card); //********************** ici aussi */
  superCard.appendChild(legend); //********************** ici aussi */
  legend.appendChild(titre);
  legend.appendChild(likesDiv);
  likesDiv.appendChild(coeur);
  likesDiv.appendChild(icon);
  return superCard;
}

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
      const superCard = mediaCard(media); //********************** ici aussi */
      const card = createMedia(media); //********************** ici aussi */
      photoGrid.appendChild(superCard); //********************** ici aussi */

      addClickEvent(card, media); // ici j'ai tout cassé... le click sur l'image n'ouvre plus la ligthbox... :'(
    }

    const galleryGridImages = document.querySelector(".gallery-container");

    galleryGridImages.appendChild(photoGrid);
  }
}

getPhotographer();
