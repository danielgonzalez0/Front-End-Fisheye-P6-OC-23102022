//Mettre le code JavaScript lié à la page photographer.html

//DOM element
//   const mediasData = photographers.getMedias();
const photographerId = getId();
const ProfilContainer = document.querySelector('.photograph-header');
const mediaSection = document.querySelector('.media');

//function
/**
 * return the id of from the url
 */
function getId() {
  const url = window.location.search;
  const urlSearchParamsId = new URLSearchParams(url);
  const Id = urlSearchParamsId.get('id');
  return Id;
}

/**
 * get user data in array according to his id and the type of data
 * @param {string} type: type of data => 'profil' or 'media'
 * @param {string} id: user id
 */
async function getData(type, id) {
  // Récupère les datas des photographes
  const photographers = new PhotographersApi('./data/photographers.json');
  let data = [];
  if (type === 'profil') {
    data = await photographers.getPhotographers();
    const userData = data.filter((data) => {
      return data.id === parseInt(id);
    });
    return userData;
  }
  if (type === 'media') {
    data = await photographers.getMedias();
    const userMediaData = data.filter((data) => {
      return data.photographerId === parseInt(id);
    });
    return userMediaData;
  }
}

async function displayData(array) {
  array.forEach((index) => {
    const photographerModel = new PhotographersFactory(index, 'json');
    //console.log à supprimer
    console.log(photographerModel);
    const userProfilTemplate = new PhotographerProfilCard(photographerModel);
    const userProfil = userProfilTemplate.createPhotographerProfilCard();
    //console.log à supprimer
    console.log(userProfil);
    ProfilContainer.appendChild(userProfil);
  });
}

async function formatMediaData(array) {
  array.forEach((index) => {
    const mediaModel = new Medias(index);
    const mediaTemplate = new MediasCard(mediaModel);
    const media = mediaTemplate.createMediaCard();
    console.log(mediaModel);
    console.log(media);
    mediaSection.appendChild(media);
  });
}

async function init() {
  const dataProfil = await getData('profil', photographerId);
  const dataMedia = await getData('media', photographerId);
  await displayData(dataProfil);
  await formatMediaData(dataMedia);
  console.log(dataProfil);
  console.log(dataMedia);
}

// call functions
init();
