export class PhotographerProfilCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerProfilCard() {
    const div = document.createElement('div');
    div.classList.add('photograph-profil');
    const photographerProfilCard = `
    <div class="text-container"> 
          <h1>${this._photographer.name}</h1>
          <p class="city">${this._photographer.city}, ${this._photographer.country}</p>
          <p class="tagline">${this._photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">
          Contactez-moi
        </button>
        <img
          src="${this._photographer.portrait}"
          alt="photo de profil de ${this._photographer.name}"
        />
        <div class="popinInfo">
        <div>
          <span id="counterLike">20000</span>
          <i class="fa-solid fa-heart"></i>
          </div>
          <span>${this._photographer.price}€ / jour</span>
        </div>
      </div>
    `;
    div.innerHTML = photographerProfilCard;
    return div;
  }
}
