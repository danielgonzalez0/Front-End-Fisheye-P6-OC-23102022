class MediasCard {
  constructor(media) {
    this._media = media;
  }

  createMediaCard() {
    const article = document.createElement('article');
    const mediaCard = ` 
    <a href="./photographer.html?id=${this._media._id}" class="link-container" aria-label="page du photographe">         
      <img
        src=""
        alt="image de profil de "
      />
       <h2></h2>
       </a>
       <div class="text-container">
        <p class="photographer-city"></p>
        <p class="photographer-tagline">
        </p>
        <p class="photographer-price">€/jour</p>
    </div>`;
    article.innerHTML = mediaCard;
    return article;
  }
}
