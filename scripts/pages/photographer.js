//Mettre le code JavaScript lié à la page photographer.html
import { PhotographersApi } from '../api/api.js';
import { MediasFactory } from '../factories/mediasFactory.js';
import { PhotographersFactory } from '../factories/photographersFactory.js';
import { PhotographerProfilCard } from '../templates/photographerProfilCard.js';
import { totalLikeInit } from '../utils/likesForm.js';
import { logLike } from '../utils/likesForm.js';
import { sorter } from '../utils/sortFunction.js';

//DOM element
export const photographerId = getId();
const ProfilContainer = document.querySelector('.photograph-header');
const mediaSection = document.querySelector('.media');
export const filterBtn = document.querySelector('.select-value');
export const selectOption = document.querySelectorAll('.select-option');
let counterPhotoLikedByPhotographer = 0;
let counterLike = 0;

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

// ------------  sort functions -------------------

/**
 * clear all medias template of the page
 */
function clearMediasTemplate() {
  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.firstChild);
  }
}
/**
 * create array with all medias of a photograph
 */
async function createArraySort() {
  const dataMedia = await getData('media', photographerId);
  const mediaArray = await mediasArrayCreation(dataMedia);
  return mediaArray;
}

// -------------- init function -------------------
async function init() {
  const dataProfil = await getData('profil', photographerId);
  const dataMedia = await getData('media', photographerId);
  const mediaArray = await mediasArrayCreation(dataMedia);
  const photographerProfil = await ProfilArrayCreation(dataProfil);
  await displayProfilData(photographerProfil);
  await formatMediaData(mediaArray);

  //counter like logic init

  //count all the like of a phograph in json data
  counterLike = await totalLikeInit(mediaArray);
  //add the total of like in the localStorage
  const photographerInit = `${photographerId}_init`;
  if (localStorage.getItem(photographerInit)) {
    localStorage.removeItem(photographerInit);
    localStorage.setItem(photographerInit, parseInt(counterLike));
  } else {
    localStorage.setItem(photographerInit, parseInt(counterLike));
  }
  //add this total in the html element
  const totalLikeContainer = document.getElementById('counterLike');
  if (localStorage.getItem(photographerId)) {
    totalLikeContainer.textContent =
      counterLike + parseInt(localStorage.getItem(photographerId));
  } else {
    totalLikeContainer.textContent = counterLike;
  }
  //
  await logLike();

  //counter like for one photograph
  // console.log('----step1: get photograph id-----');
  // console.log(photographerId);
  // console.log('----step2: get photograph profil data-----');
  // console.log(dataProfil);
  // console.log('----step3: get photograph medias data-----');
  // console.log(dataMedia);
  // console.log('----step4: get photograph medias array-----');
  // console.log(parseInt(mediaArray[0]._likes));
  // console.log('----step5: get photograph profil array-----');
  // console.log(photographerProfil);
}

// call functions
init();

// sort event handler
selectOption.forEach((index) => {
  index.addEventListener('click', async () => {
    clearMediasTemplate();
    const sortArray = await createArraySort();
    const sorterType = index.attributes['data-value'].value;
    await sorter(sortArray, sorterType);
    await formatMediaData(sortArray);
    await logLike();
    console.log(sortArray);
    console.log(sorterType);
  });
});

selectOption.forEach((index) => {
  index.addEventListener('keydown', async (e) => {
    if (e.code === 'Enter') {
      clearMediasTemplate();
      const sortArray = await createArraySort();
      const sorterType = index.attributes['data-value'].value;
      await sorter(sortArray, sorterType);
      await formatMediaData(sortArray);
      await logLike();
      console.log(sortArray);
      console.log(sorterType);
    }
  });
});

console.log(mediaSection);
