class PhotographersCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    const article = document.createElement('article');
    //img
    const img = document.createElement('img');
    img.setAttribute('src', this._photographer.portrait);
    img.setAttribute('alt', `portrait de ${this._photographer.name}`);
    //text content elt creation
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    const h2 = document.createElement('h2');
    const city = document.createElement('p');
    const tagline = document.createElement('p');
    const price = document.createElement('p');
    //text content value
    h2.textContent = this._photographer.name;
    city.textContent = `${this._photographer.city}, ${this._photographer.country}`;
    tagline.textContent = this._photographer.tagline;
    price.textContent = `${this._photographer.price}€/jour`;
    article.appendChild(img);
    article.appendChild(textContainer);
    textContainer.appendChild(h2);
    textContainer.appendChild(city);
    textContainer.appendChild(tagline);
    textContainer.appendChild(price);

    return article;
  }
}
