import { addClickEvent, nextImage, previousImage } from "../templates/lightbox.js";
import { closeModal, displayModal } from "../utils/contactForm.js";

// Mettre le code JavaScript lié à la page photographer.html
const params = new URL(document.location).searchParams;
const id = parseInt(params.get("id"));

function photographerCardLeft(photographer) {
	// on déclare la fonction photographerCardLeft avec le paramètre photographer (cette fonction permettra de créer la partie de gauche de la fiche d'identité du photographe sur la page photographe)
	const {name, city, tagline} = photographer;

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

export async function photographerCardRight(photographer) {
	const {photographerPhotos} = await getPhotographerMedia();
	// on déclare la fonction photographerCardRight avec le paramètre photographer (cette fonction permettra de créer la partie de droite de la fiche d'identité du photographe sur la page photographe)
	const {portrait, price} = photographer;

	const picture = `assets/photographers/${portrait}`;

	const article = document.createElement("article");
	const img = document.createElement("img");
	img.setAttribute("src", picture);
	img.setAttribute("alt", "");
	img.classList.add("profile-pic");

	const bottomRightLabel = document.createElement("div");
	bottomRightLabel.classList.add("bottom-right-label");
	bottomRightLabel.style.zIndex = "10";

	const priceDiv = document.createElement("div");
	priceDiv.textContent = `${price}€ / jour`;
	priceDiv.classList.add("tarif");

	const totalLikes = document.createElement("div");
	totalLikes.textContent = getTotalLikes(photographerPhotos);
	totalLikes.classList.add("total-likes");

	bottomRightLabel.appendChild(totalLikes);
	bottomRightLabel.appendChild(createHeartIcon());
	bottomRightLabel.appendChild(priceDiv);

	article.appendChild(img);
	document.body.appendChild(bottomRightLabel);
	return article;
}

// eslint-disable-next-line no-unused-vars
function submitForm() {
	// on déclare une fonction submitForm (cette fonction va afficher le contenu des champs dans la console)
	const inputName = document.getElementById("name").value;
	const inputFirstname = document.getElementById("prenom").value;
	const inputEmail = document.getElementById("email").value;
	const textareaMessage = document.getElementById("message").value;

	const isName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;

	if(!isName.test(inputName)||!isName.test(inputFirstname)){
		console.error("invalid name");
		return;
	}

	console.log(inputName);
	console.log(inputFirstname);
	console.log(inputEmail);
	console.log(textareaMessage);
}

function photographerModal(photographer) {
	// on déclare la fonction photographerModal avec le paramètre photographer (Cette fonction va permettre d'afficher le nom du photographe en dessous du texte "contactez-moi" dans le formulaire)
	const {name} = photographer;

	const nameForm = document.getElementById("name-form");
	nameForm.textContent = name;
}

export function createMedia(media) {
	// on déclare la fonction createMedia avec le paramètre media (cette fonction créera une balise vidéo ou une balise img en fonction de la nature du media que l'on voudra créer. A l'intérieur de cette balise, on viendra ajouter un attribut src défini sur l'emplacement exact des vidéos et photos d'un photographe en particulier grace à la variable photographerId)
	const {photographerId, title, image, video} = media;

	if (video) {
		// si la fonction trouve un élément media.video alors on execute le code qui suit
		const videoElement = document.createElement("video");
		videoElement.setAttribute("controls", "true");
		videoElement.classList.add("artist-video");

		const sourceElement = document.createElement("source");
		sourceElement.setAttribute(
			"src",
			`assets/images/${photographerId}/${video}`,
		);
		sourceElement.setAttribute("type", "video/mp4");

		sourceElement.setAttribute("aria-label", `${title}, closeup view`); // a revoir avec Vincent
		videoElement.appendChild(sourceElement);
		return videoElement;
	} else if (image) {
		// si la fonction trouve un élément media.image alors on execute le code qui suit
		const img = document.createElement("img");
		img.setAttribute("src", `assets/images/${photographerId}/${image}`);
		img.setAttribute("alt", "");
		img.setAttribute("aria-label", `${title}, closeup view`);
		img.classList.add("artist-pic");
		return img;
	}
}

function createHeartIcon() {
	const icon = document.createElement("i");
	icon.classList.add("fa-solid", "fa-heart");
	icon.setAttribute("aria-label", "likes");
	
	return icon;
}

function addOnlyOneLike(coeur, likes){
	if (parseInt(coeur.textContent) !== likes) return;

	coeur.textContent = likes + 1;
	const sum = document.querySelector(".total-likes");
	const sumString = sum.textContent;
	sum.textContent = parseInt(sumString) + 1;
}

function mediaCard(media) {
	const {title, likes} = media;

	const superCard = document.createElement("div");
	const card = document.createElement("div");
	const legend = document.createElement("div");
	const titre = document.createElement("h2");
	const likesDiv = document.createElement("div");
	const coeur = document.createElement("div");

	const element = createMedia(media);

	superCard.classList.add("super-card");

	card.appendChild(element);

	legend.classList.add("legend");
	titre.textContent = title;
	coeur.textContent = likes;
	likesDiv.classList.add("likes-div");
	likesDiv.setAttribute("tabindex", "0");
	coeur.classList.add("likes");

	likesDiv.addEventListener("click", () => {
		addOnlyOneLike(coeur, likes);
	});

	likesDiv.addEventListener("keyup", (e) => {
		if (e.key !== "Enter") return;
		addOnlyOneLike(coeur, likes);

	});

	superCard.appendChild(card);
	superCard.appendChild(legend);
	legend.appendChild(titre);
	legend.appendChild(likesDiv);
	likesDiv.appendChild(coeur);
	likesDiv.appendChild(createHeartIcon());

	addClickEvent(element, media);

	return superCard;
}

function getTotalLikes(media) {
	let sumLikes = 0;

	for (let i = 0; i < media.length; i++) {
		const element = media[i].likes;
		sumLikes += element;
	}
	return sumLikes;
}

export async function getPhotographerMedia() {
	const response = await fetch("data/photographers.json");
	const data = await response.json();

	const photographers = data.photographers;
	const medias = data.media;

	const photographer = photographers.find((item) => item.id === id);
	const photographerPhotos = medias.filter(
		(item) => item.photographerId === id,
	).sort(function(a, b) {
		return b.likes - a.likes;});

	return {photographer, photographerPhotos};
}

async function sortBy() {
	// const { id, photographerId, title, image, video, likes, date, price } = media;
	const {photographerPhotos} = await getPhotographerMedia();

	const selectList = document.getElementById("photo-select");

	const photographerPhotosSorted = Array.from(photographerPhotos);

	const defaultChoice = document.querySelector(".default");

	const chevron = document.createElement("i");
	chevron.classList.add("fa-solid", "fa-chevron-up");

	selectList.addEventListener("click", (e) => {
		const choice = e.target.innerText;

		defaultChoice.innerHTML = choice;

		switch (choice) {
		case "Date":
			defaultChoice.appendChild(chevron);
			selectList.children[0].innerHTML = "Popularité";
			selectList.children[1].innerHTML = "Titre";
			photographerPhotosSorted.sort(function(a, b) {
				return a.date.localeCompare(b.date);
			});
			break;

		case "Titre":
			defaultChoice.appendChild(chevron);
			selectList.children[0].innerHTML = "Popularité";
			selectList.children[1].innerHTML = "Date";
			photographerPhotosSorted.sort(function(a, b) {
				return a.title.localeCompare(b.title);
			});
			break;

		case "Popularité":
		default:
			defaultChoice.appendChild(chevron);
			selectList.children[0].innerHTML = "Date";
			selectList.children[1].innerHTML = "Titre";
			photographerPhotosSorted.sort(function(a, b) {
				return b.likes - a.likes;
			});
			break;
		}
		selectList.blur();
		e.target.blur();
		// document.querySelector(".wrapper ul").style.display = "none";
		document.querySelector(".gallery-container").innerHTML = "";
		generateGrid(photographerPhotosSorted);
	});

	selectList.addEventListener("keyup", (e) => {
		if (e.key !== "Enter"){
			return;
		}
		
		const choice = e.target.innerText;


		defaultChoice.innerHTML = choice;

		switch (choice) {
		case "Date":
			defaultChoice.appendChild(chevron);
			selectList.children[0].innerHTML = "Popularité";
			selectList.children[1].innerHTML = "Titre";
			photographerPhotosSorted.sort(function(a, b) {
				return a.date.localeCompare(b.date);
			});
			break;

		case "Titre":
			defaultChoice.appendChild(chevron);
			selectList.children[0].innerHTML = "Popularité";
			selectList.children[1].innerHTML = "Date";
			photographerPhotosSorted.sort(function(a, b) {
				return a.title.localeCompare(b.title);
			});
			break;

		case "Popularité":
		default:
			defaultChoice.appendChild(chevron);
			selectList.children[0].innerHTML = "Date";
			selectList.children[1].innerHTML = "Titre";
			photographerPhotosSorted.sort(function(a, b) {
				return b.likes - a.likes;
			});
			break;
		}
		selectList.blur();
		e.target.blur();
		// document.querySelector(".wrapper ul").style.display = "none";
		document.querySelector(".gallery-container").innerHTML = "";
		generateGrid(photographerPhotosSorted);
	});
}

function generateGrid(mediatable) {
	if (mediatable.length > 0) {
		// Vérifie s'il y a des photos
		const photoGrid = document.createElement("article");
		photoGrid.classList.add("photo-grid");

		for (const media of mediatable) {
			const superCard = mediaCard(media);
			photoGrid.appendChild(superCard);
		}

		const galleryGridImages = document.querySelector(".gallery-container");

		galleryGridImages.appendChild(photoGrid);
	}
}

async function getPhotographer() {
	const {photographer, photographerPhotos} = await getPhotographerMedia();
	const photographHeaderLeft = document.querySelector(
		".photograph-header_left",
	);
	const photographHeaderRight = document.querySelector(
		".photograph-header_right",
	);
	const photographerArticleLeft = photographerCardLeft(photographer);
	const photographerArtcileRight = await photographerCardRight(photographer);
	photographHeaderLeft.appendChild(photographerArticleLeft);
	photographHeaderRight.appendChild(photographerArtcileRight);
	photographerModal(photographer);

	generateGrid(photographerPhotos);

	// const selectList = document.getElementById("photo-select");

	// selectList.addEventListener("click", () => {
	// 	sortBy();
	// });
}

document.querySelector(".contact_button").addEventListener("click", ()=>
	displayModal("contact_modal")
);

document.querySelector(".left-arrow").addEventListener("click",
	previousImage
);

document.querySelector(".right-arrow").addEventListener("click",
	nextImage
);

document.querySelector(".cross").addEventListener("click", ()=>{
	closeModal("lightbox");
});

document.querySelector(".cross-form").addEventListener("click", ()=>{
	closeModal("contact_modal");
});

document.getElementById("contact-form").addEventListener("submit", (e)=>{
	
	submitForm();
	e.preventDefault();
	closeModal("contact_modal");
}
);

document.addEventListener("keyup", (e)=>{
	if (e.key !== "Enter"){
		return;
	}

	if(!document.activeElement || !document.activeElement.classList){
		return;
	}

	const classList = [...document.activeElement.classList];
	if (!classList.find((c) => c === "artist-pic" || c === "artist-video"
	)){
		return;
	}
	const element = document.activeElement.cloneNode(true);
	const photoLightbox = document.querySelector(".photo-center");
	photoLightbox.replaceChildren(element);
	displayModal("lightbox");
});

sortBy();
getPhotographer();