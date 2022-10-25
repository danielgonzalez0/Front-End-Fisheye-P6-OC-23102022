class PhotographersCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    const article = document.createElement('article');
    const photographerCard = ` 
    <a href="#" class="link-container" aria-label="page du photographe ${this._photographer.name}">         
      <img
        src="${this._photographer.portrait}"
        alt="image de profil de ${this._photographer.name}"
      />
       <h2>${this._photographer.name}</h2>
       </a>
       <div class="text-container">
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
