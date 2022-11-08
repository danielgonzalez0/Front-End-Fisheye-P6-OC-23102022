class MediasFactory {
  constructor(data, type) {
    if (type === 'json') {
      return new Medias(data);
    } else {
      throw 'Unknown type format';
    }
  }
}
