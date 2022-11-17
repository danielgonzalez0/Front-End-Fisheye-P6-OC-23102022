import { Medias } from '../models/medias.js';
export class MediasFactory {
  constructor(data, type) {
    if (type === 'json') {
      return new Medias(data);
    } else {
      throw 'Unknown type format';
    }
  }
}
