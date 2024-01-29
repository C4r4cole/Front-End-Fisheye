async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographers = data.photographers;

  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM(); //je ne trouve aucun endroit ou a été déclaré cette fonction getUserCardDOM
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
