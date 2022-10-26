class MediaTemplateFactory {
  constructor(media) {
    this._media = media;
  }
  getMedia() {
    if (this._media.image) {
      const mediaTemplate = new ImagesCard(this._media);
      return mediaTemplate.createImageCard();
    } else if (this._media.video) {
      const mediaTemplate = new VideosCard(this._media);
      return mediaTemplate.createVideoCard();
    } else {
      throw 'Unknown type format';
    }
  }
}