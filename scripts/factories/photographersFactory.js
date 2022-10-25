class PhotographersFactory {
  constructor(data, type) {
    if (type === 'json') {
      return new Photographers(data);
    } else {
      throw 'Unknown type format';
    }
  }
}
