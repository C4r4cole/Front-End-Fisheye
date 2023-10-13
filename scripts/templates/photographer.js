function photographerTemplate(data) {
  const { name, portrait, city, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const focusedArea = document.createElement("div");
    focusedArea.classList.add("focused-area");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "image du photographe");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("aria-label", `nom du photographe : ${name}`);
    const h3 = document.createElement("h3");
    h3.textContent = city;
    h3.setAttribute("aria-label", `ville du photographe : ${city}`);
    const paragraphe1 = document.createElement("p");
    paragraphe1.textContent = tagline;
    paragraphe1.setAttribute(
      "aria-label",
      `citation du photographe : ${tagline}`
    );
    const paragraphe2 = document.createElement("p");
    paragraphe2.textContent = `${price}€/jour`;
    paragraphe2.classList.add("price");
    paragraphe2.setAttribute(
      "aria-label",
      `prix de la prestation du photographe : ${price}€/jour`
    );
    article.appendChild(focusedArea);
    focusedArea.appendChild(img);
    focusedArea.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(paragraphe1);
    article.appendChild(paragraphe2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
