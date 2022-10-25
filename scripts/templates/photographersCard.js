class PhotographersCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    const article = document.createElement('article');
    const photographerCard = `          
      <img
        src="${this._photographer.portrait}"
        alt="portrait de ${this._photographer.name}"
      />
    <div class="text-container">
       <h2>${this._photographer.name}</h2>
        <p class="photographer-city">${this._photographer.city}, ${this._photographer.country}</p>
        <p class="photographer-tagline">
        ${this._photographer.tagline}
        </p>
        <p class="photographer-price">${this._photographer.price}€/jour</p>
    </div>`;
    article.innerHTML = photographerCard;
    return article;
  }
}
