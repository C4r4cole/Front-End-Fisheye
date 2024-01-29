function displayModal(id) {
  const modal = document.getElementById(id);
  const overlay = document.getElementById("overlay");

  overlay.style.display = "block";

  if (id === "contact_modal") {
    modal.style.display = "block";
    window.addEventListener("keyup", keyPressContact);
  } else {
    modal.style.display = "flex";
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

function closeModal(id) {
  const modal = document.getElementById(id);
  const overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
  window.removeEventListener("keyup", keyPressContact);
  window.removeEventListener("keyup", keyPressLightbox);
}
