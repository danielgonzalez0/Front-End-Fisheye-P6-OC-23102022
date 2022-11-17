export class VideosCard {
  constructor(media) {
    this._media = media;
  }

  createVideoCard() {
    const article = document.createElement('article');
    const likeStoreCheck = localStorage.getItem(
      `${this._media.photographerId}_${this._media.id}`
    );
    article.setAttribute('id', `${this._media.id}`);
    const videoCard = ` 
              <div class="img-container">
            <video title="${this._media.title}" preload="auto" controls>
              <source
                src="${this._media.media}"
                type="video/mp4"
                alt="${this._media.title}"
              />
            </video>
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
    article.innerHTML = videoCard;
    return article;
  }
}
