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
              } tabindex="0" role="button" aria-label="${
      this._media.title
    }, close-up view">
            <img src="${this._media.media}" alt="le titre de l'image est: ${
      this._media.title
    }" data-date="${this._media.date}"/>
          </div>
          <div class="text-container">
            <h2 class="titre" tabindex="0">${this._media.title}</h2>
            <span class="like" data-likeId= ${this._media.id}>${
      this._media.likes + (this._media.liked ? 1 : 0)
    }
              </span>
              <button class="likeBtn" data-mediaId= ${this._media.id}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="likeFull ${
                this._media.liked ? 'active' : ''
              }"  data-mediaId= ${
      this._media.id
    } aria-label="likes"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" data-mediaId= ${
      this._media.id
    }/></svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="likeEmpty ${
                this._media.liked ? '' : 'active'
              }" data-mediaId= ${
      this._media.id
    } aria-label="unlikes"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" data-mediaId= ${
      this._media.id
    }/></svg>
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
          <img src="${this._media.media}" alt="le titre de l'image est: ${this._media.title}" tabindex="0"/>
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

{
  /* <i class="fa-solid fa-heart likeFull ${
                this._media.liked ? 'active' : ''
              }" data-mediaId= ${this._media.id} aria-label="likes"></i>
              <i class="fa-regular fa-heart likeEmpty ${
                this._media.liked ? '' : 'active'
              }" data-mediaId= ${this._media.id} aria-label="unlikes"></i> */
}
