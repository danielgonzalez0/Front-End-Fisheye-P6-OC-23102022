class Medias {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._date = data.date;
    this._title = data.title;
    this._image = data.image;
    this._video = data.video;
    this._likes = data.likes;
    this._price = data.price;
  }
  //ajout des getter pour accéder aux propriétés
  get id() {
    return this._id;
  }
  get photographerId() {
    return this._photographerId;
  }
  get date() {
    return this._date;
  }
  get title() {
    return this._title;
  }
  get likes() {
    return this._likes;
  }
  get price() {
    return this._price;
  }
  get image() {
    return this._image;
  }
  get video() {
    return this._video;
  }
  get type() {
    return this._image ? 'image' : 'video';
  }
  get media() {
    return `./assets/media/id_${this._photographerId}/${
      this._image ? this._image : this._video
    }`;
  }

  getMediaTemplate() {
    if (this.type === 'image') {
      const mediaTemplate = new ImagesCard(this);
      return mediaTemplate.createImageCard();
    } else if (this.type === 'video') {
      const mediaTemplate = new VideosCard(this);
      return mediaTemplate.createVideoCard();
    } else {
      throw 'Unknown type format';
    }
  }
}
