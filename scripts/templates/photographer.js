function photographerTemplate(data) {
  const { name, portrait, city, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = city;
    const paragraphe1 = document.createElement("p");
    paragraphe1.textContent = tagline;
    const paragraphe2 = document.createElement("p");
    paragraphe2.textContent = `${price}€/jour`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(paragraphe1);
    article.appendChild(paragraphe2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
