import { nextImage, previousImage } from "../templates/lightbox.js";

export function displayModal(id) {
	const modal = document.getElementById(id);
	const overlay = document.getElementById("overlay");
	const main = document.getElementById("main-photographer-page");

	overlay.style.display = "block";

	if (id === "contact_modal") {
		// add all the elements inside modal which you want to make focusable
		const focusableElements =
			"button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";

		const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
		const focusableContent = modal.querySelectorAll(focusableElements);
		const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

		console.log(lastFocusableElement);
		
		document.addEventListener("keydown", function (e) {
			
			let isTabPressed = e.key === "Tab" || e.keyCode === 9;
			
			if (!isTabPressed) {
				return;
			}
			
			console.log(document.activeElement);
			console.log("toto");
			if (e.shiftKey) { // if shift key pressed for shift + tab combination
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus(); // add focus for the last focusable element
					e.preventDefault();
				}
			} else { // if tab key is pressed
				console.log("a");
				if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
					console.log("b");
					firstFocusableElement.focus(); // add focus for the first focusable element
					e.preventDefault();
				}
			}
		});

		modal.style.display = "block";
		main.setAttribute("aria-hidden", "true"); // a revoir avec Vincent
		main.setAttribute("tabindex", "-1");
		modal.setAttribute("aria-hidden", "false"); // a revoir avec Vincent
		window.addEventListener("keyup", keyPressContact);
		firstFocusableElement.focus();
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
