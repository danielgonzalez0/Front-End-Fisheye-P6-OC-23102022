export class ImagesCard {
  constructor(media) {
    this._media = media;
  }

  createImageCard() {
    const article = document.createElement('article');
    const likeStoreCheck = localStorage.getItem(
      `${this._media.photographerId}_${this._media.id}`
    );
    article.setAttribute('id', `${this._media.id}`);
    const imageCard = ` 
              <div class="img-container">
            <img src="${this._media.media}" alt="${this._media.title}" />
          </div>
          <div class="text-container">
            <p class="titre">${this._media.title}</p>
            <span class="like"
              >${
                this._media.likes +
                (likeStoreCheck ? parseInt(likeStoreCheck) : 0)
              }
              </span>
              <button class="likeBtn">
              <i class="fa-solid fa-heart likeFull ${
                likeStoreCheck ? 'active' : ''
              }" aria-label="likes"></i>
              <i class="fa-regular fa-heart likeEmpty ${
                likeStoreCheck ? '' : 'active'
              }" aria-label="unlike"></i>
              </button>
          </div>
   `;
    article.innerHTML = imageCard;
    return article;
  }
}
