//Mettre le code JavaScript lié à la page photographer.html

//DOM element
const photographerId = getId();
const ProfilContainer = document.querySelector('.photograph-header');
const mediaSection = document.querySelector('.media');

//function
/**
 * return the id from the url
 */
function getId() {
  const url = window.location.search;
  const urlSearchParamsId = new URLSearchParams(url);
  const Id = urlSearchParamsId.get('id');
  return Id;
}

/**
 * gets user data in array according to his id and the type of data
 * @param {string} type: type of data => 'profil' or 'media'
 * @param {string} id: user id
 */
async function getData(type, id) {
  const photographers = new PhotographersApi('./data/photographers.json');
  let data = [];
  if (type === 'profil') {
    data = await photographers.getOnePhotographerProfil(id);
    return data;
  }
  if (type === 'media') {
    data = await photographers.getOnePhotographerMedias(id);
    return data;
  }
}
/**
 * creates an array with all medias of a photograph
 * @param {array} array with all medias from one photograph
 * @returns
 */
async function mediasArrayCreation(array) {
  let newArray = [];
  array.forEach((index) => {
    const media = new MediasFactory(index, 'json');
    newArray.push(media);
  });
  return newArray;
}

/**
 * creates an array with all data of a photograph
 * @param {array} array with all data from one photograph
 * @returns
 */
async function ProfilArrayCreation(array) {
  let newArray = [];
  array.forEach((index) => {
    const profil = new PhotographersFactory(index, 'json');
    newArray.push(profil);
  });
  return newArray;
}

/**
 * creates the profil HTML template of the photograph and joines it to the DOM
 * @param {array} array created with the photographer datas
 */
async function displayProfilData(array) {
  array.forEach((index) => {
    const userProfilTemplate = new PhotographerProfilCard(index);
    const userProfil = userProfilTemplate.createPhotographerProfilCard();
    ProfilContainer.appendChild(userProfil);
  });
}

/**
 * creates all medias HTML template of the photograph and joines them to the DOM
 * @param {array} array created with the photographer medias datas
 */
async function formatMediaData(array) {
  array.forEach((index) => {
    const media = index.getMediaTemplate();
    mediaSection.appendChild(media);
  });
}

async function init() {
  const dataProfil = await getData('profil', photographerId);
  const dataMedia = await getData('media', photographerId);
  const mediaArray = await mediasArrayCreation(dataMedia);
  const photographerProfil = await ProfilArrayCreation(dataProfil);
  await displayProfilData(photographerProfil);
  await formatMediaData(mediaArray);

  // console.log('----step1: get photograph id-----');
  // console.log(photographerId);
  // console.log('----step2: get photograph profil data-----');
  // console.log(dataProfil);
  // console.log('----step3: get photograph medias data-----');
  // console.log(dataMedia);
  // console.log('----step4: get photograph medias array-----');
  // console.log(mediaArray);
  // console.log('----step5: get photograph profil array-----');
  // console.log(photographerProfil);
}

// call functions
init();
