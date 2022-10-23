class PhotographersFactory {
  constructor(data, type) {
    if (type === 'photographers') {
      return new Photographers(data);
    } else if (type === 'nmedia') {
      return new Media(data);
    } else {
      throw 'Unknown type format';
    }
  }
}
