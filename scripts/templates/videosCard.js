export class VideosCard {
  constructor(media) {
    this._media = media;
  }

  createVideoCard() {
    const article = document.createElement('article');
    article.setAttribute('id', `${this._media.id}`);
    const videoCard = ` 
              <div class="img-container carousel-link" data-mediaId= ${
                this._media.id
              }>
            <video title="${this._media.title}" tabindex="0">
              <source
                src="${this._media.media}"
                type="video/mp4"
                alt="${this._media.title}"
              />
            </video>
          </div>
           <div class="text-container">
            <p class="titre">${this._media.title}</p>
            <span class="like" data-likeId= ${this._media.id}
              >${this._media.likes + (this._media.liked ? 1 : 0)}
              </span>
              <button class="likeBtn" data-mediaId= ${this._media.id}>
              <i class="fa-solid fa-heart likeFull ${
                this._media.liked ? 'active' : ''
              }" data-mediaId= ${this._media.id} aria-label="likes"></i>
              <i class="fa-regular fa-heart likeEmpty ${
                this._media.liked ? '' : 'active'
              }" data-mediaId= ${this._media.id} aria-label="unlike"></i>
              </button>
          </div>
   `;
    article.innerHTML = videoCard;
    return article;
  }

  createVideoCarousel() {
    const div = document.createElement('div');
    div.classList.add('lightbox-container');
    div.classList.add('hidden');
    div.setAttribute('data-carouselId', `${this._media.id}`);
    div.setAttribute('aria-hidden', 'true');
    const imgCarousel = `
         <!-- Next/previous controls -->
        <div class="img-container">
         <video
              <source
                src="${this._media.media}"
                type="video/mp4"
                alt="${this._media.title}"
                controls
              />
          ></video>
         </div>
         <div class="carousel-text">${this._media.title}</div>
      </div>
    `;
    div.innerHTML = imgCarousel;
    return div;
  }
}
