export class ImagesCard {
  constructor(media) {
    this._media = media;
  }

  createImageCard() {
    const article = document.createElement('article');
    article.setAttribute('id', `${this._media.id}`);
    const imageCard = ` 
              <div class="img-container carousel-link" data-mediaId= ${
                this._media.id
              } tabindex="0" role="button" aria-label="${this._media.title}, close-up view">
            <img src="${this._media.media}" alt="${this._media.title}"/>
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
    article.innerHTML = imageCard;
    return article;
  }

  createImgCarousel() {
    const div = document.createElement('div');
    div.classList.add('lightbox-container');
    div.classList.add('hidden');
    div.setAttribute('data-carouselId', `${this._media.id}`);
    div.setAttribute('aria-hidden', 'true');
    const imgCarousel = `
         <!-- Next/previous controls -->
        <div class="img-container">
          <img src="${this._media.media}" alt="${this._media.title}" tabindex="0"/>
         </div>
         <div class="carousel-text">${this._media.title}</div>
      </div>
    `;
    div.innerHTML = imgCarousel;
    return div;
  }
}

{
  /* <button class="close-carousel">
           <i class="fa-solid fa-xmark"></i>
         </button>
         <a href="#" class="arrow-prev">&#10094;</a>
         <a href="#" class="arrow-next">&#10095;</a> */
}
