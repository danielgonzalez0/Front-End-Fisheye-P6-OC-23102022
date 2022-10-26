class ImagesCard {
  constructor(media) {
    this._media = media;
  }

  createImageCard() {
    const article = document.createElement('article');
    const imageCard = ` 
              <div class="img-container">
            <img src="${this._media.media}" alt="${this._media.title}" />
          </div>
          <div class="text-container">
            <p class="titre">${this._media.title}</p>
            <span class="like"
              >${this._media.likes}
              <i class="fa-solid fa-heart" aria-label="likes"></i>
            </span>
          </div>
   `;
    article.innerHTML = imageCard;
    return article;
  }
}
