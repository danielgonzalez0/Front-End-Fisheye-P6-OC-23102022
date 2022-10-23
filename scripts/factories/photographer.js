function photographerFactory(data) {
  const { name, portrait } = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

class Photographers {
  // ajout constuctor
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagLine = data.tagLine;
    this._price = data.price;
    this._picture = data.picture;
  }
  //ajout des getter pour accéder aux propriétés
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get city() {
    return this._city;
  }
  get country() {
    return this._country;
  }
  get tagLine() {
    return this._tagLine;
  }
  get price() {
    return this._price;
  }
  get picture() {
    return `./assets/photographers/${this._picture}`;
  }
}


