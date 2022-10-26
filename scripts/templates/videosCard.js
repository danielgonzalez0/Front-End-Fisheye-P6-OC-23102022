class VideosCard {
  constructor(media) {
    this._media = media;
  }

  createVideoCard() {
    const article = document.createElement('article');
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
              >${this._media.likes} <i class="fa-solid fa-heart" aria-label="likes"></i
            ></span>
          </div>
   `;
    article.innerHTML = videoCard;
    return article;
  }
}
