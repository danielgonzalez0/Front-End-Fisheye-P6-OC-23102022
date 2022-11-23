//Mettre le code JavaScript lié à la page photographer.html

//import
import { PhotographersApi } from '../api/api.js';
import { MediasFactory } from '../factories/mediasFactory.js';
import { PhotographersFactory } from '../factories/photographersFactory.js';
import { PhotographerProfilCard } from '../templates/photographerProfilCard.js';
import { totalLikeInit } from '../utils/likesForm.js';
import { totalLikePhotographInit } from '../utils/likesForm.js';
import { likeMedia } from '../utils/likesForm.js';
import { sorter } from '../utils/sortFunction.js';
import { carouselModal, carouselSideContainer } from '../utils/carousel.js';
import { carouselClose, carouselOpen } from '../utils/carousel.js';
import { formatMediaCarousel } from '../utils/carousel.js';

//DOM element
export const photographerId = getId();
const ProfilContainer = document.querySelector('.photograph-header');
const mediaSection = document.querySelector('.media');
export const filterBtn = document.querySelector('.select-value');
console.log(filterBtn);
export const selectOption = document.querySelectorAll('.select-option');
export const totalLikeContainer = document.getElementById('counterLike');
const priceContainer = document.getElementById('price');
export let counterLike = 0;

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
 * creates an array with all data information of a photograph
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
 * clear all media templates of a specific selector
 * @param {DOM element} selector represents the parent element of the templates
 */
function clearMediasTemplate(selector) {
  while (selector.firstChild) {
    selector.removeChild(selector.firstChild);
  }
}
/**
 * get photographer datas & creates an array with all medias of this photographer
 */
async function createArraySort() {
  const dataMedia = await getData('media', photographerId);
  const mediaArray = await mediasArrayCreation(dataMedia);
  return mediaArray;
}

// -------------- init function -------------------

/**
 * initialization of the photographer page
 */
async function init() {
  //gets all datas, creates arrays to store datas, display datas in html templates
  const dataProfil = await getData('profil', photographerId);
  const dataMedia = await getData('media', photographerId);
  const mediaArray = await mediasArrayCreation(dataMedia);
  const photographerProfil = await ProfilArrayCreation(dataProfil);
  await displayProfilData(photographerProfil);
  await formatMediaData(mediaArray);
  priceContainer.textContent = `${photographerProfil[0]._price} € / jour`;

  //count all the like of a phograph in json data, display likes logic
  counterLike = await totalLikeInit(mediaArray);
  await totalLikePhotographInit(counterLike);
  await likeMedia();

  //init carousel data
  const carouselArray = mediaArray;
  await carouselOpen();
  await formatMediaCarousel(carouselArray);
  await carouselClose();

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
}

// call functions
init();

// sort event handler
selectOption.forEach((index) => {
  index.addEventListener('click', async () => {
    clearMediasTemplate(mediaSection);
    clearMediasTemplate(carouselSideContainer);
    const sortArray = await createArraySort();
    const sorterType = index.attributes['data-value'].value;
    await sorter(sortArray, sorterType);
    await formatMediaData(sortArray);
    await likeMedia();
    await formatMediaCarousel(sortArray);
    await carouselOpen();
    await carouselClose();
  });
});

selectOption.forEach((index) => {
  index.addEventListener('keydown', async (e) => {
    if (e.code === 'Enter') {
      clearMediasTemplate(mediaSection);
      clearMediasTemplate(carouselSideContainer);
      const sortArray = await createArraySort();
      const sorterType = index.attributes['data-value'].value;
      await sorter(sortArray, sorterType);
      await formatMediaData(sortArray);
      await likeMedia();
      await formatMediaCarousel(sortArray);
      await carouselOpen();
      await carouselClose();
    }
  });
});

console.log(mediaSection);
