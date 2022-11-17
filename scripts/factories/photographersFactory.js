import { Photographers } from '../models/photographers.js';
export class PhotographersFactory {
  constructor(data, type) {
    if (type === 'json') {
      return new Photographers(data);
    } else {
      throw 'Unknown type format';
    }
  }
}
