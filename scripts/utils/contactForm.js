import { nextImage, previousImage } from "../templates/lightbox.js";

export function displayModal(id) {
	const modal = document.getElementById(id);
	const overlay = document.getElementById("overlay");

	overlay.style.display = "block";

	if (id === "contact_modal") {
		modal.style.display = "block";
		window.addEventListener("keyup", keyPressContact);
	} else {
		modal.style.display = "flex";
		modal.setAttribute("aria-label", "image closeup view"); // a revoir avec Vincent
		window.addEventListener("keyup", keyPressLightbox);
	}
}

function keyPressContact(e) {
	if (e.key === "Escape") {
		closeModal("contact_modal");
	}
}

function keyPressLightbox(e) {
	if (e.key === "Escape") {
		closeModal("lightbox");
		return;
	}

	if (e.key === "ArrowRight") {
		nextImage();
		return;
	}

	if (e.key === "ArrowLeft") {
		previousImage();
		return;
	}
}

export function closeModal(id) {
	const modal = document.getElementById(id);
	const overlay = document.getElementById("overlay");
	modal.style.display = "none";
	overlay.style.display = "none";
	window.removeEventListener("keyup", keyPressContact);
	window.removeEventListener("keyup", keyPressLightbox);
}
