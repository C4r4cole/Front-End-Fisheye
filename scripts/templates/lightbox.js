import { createMedia, getPhotographerMedia } from "../pages/photographer.js";
import { displayModal } from "../utils/contactForm.js";

export async function addClickEvent(card, media) {
	card.setAttribute("tabindex", "0");
	card.addEventListener("click", () => {
		const element = createMedia(media);
		const photoLightbox = document.querySelector(".photo-center");
		photoLightbox.replaceChildren(element);
		displayModal("lightbox");	

	});
}

export async function previousImage() {
	const {photographerPhotos} = await getPhotographerMedia();
	const lightboxMedia = document.querySelector(".photo-center");
	let media = lightboxMedia.firstChild;

	if (!media.src) {
		media = media.firstChild;
	}
	console.log(media.src);

	const src = media.src.split("/").at(-1);

	const index = photographerPhotos.findIndex(
		(e) => src === e.image || src === e.video,
	);
	const previousPhoto = photographerPhotos.at(index - 1);

	lightboxMedia.replaceChildren(createMedia(previousPhoto));
}

export async function nextImage() {
	const {photographerPhotos} = await getPhotographerMedia();
	const lightboxMedia = document.querySelector(".photo-center");
	let media = lightboxMedia.firstChild;

	if (!media.src) {
		media = media.firstChild;
	}
	console.log(media.src);

	const src = media.src.split("/").at(-1);

	const index = photographerPhotos.findIndex(
		(e) => src === e.image || src === e.video,
	);
	let nextPhoto = photographerPhotos.at(index + 1);

	console.log(index, photographerPhotos.length);
	if (index + 1 >= photographerPhotos.length) {
		nextPhoto = photographerPhotos[0];
	}

	lightboxMedia.replaceChildren(createMedia(nextPhoto));
}
