/**
 * create an array with all the photographers data
 * @param {array} array with the photographers list from the API
 *
 */
async function arrayCreation(array) {
  let newArray = [];
  array.forEach((index) => {
    const photographerModel = new PhotographersFactory(index, 'json');
    newArray.push(photographerModel);
  });
  return newArray;
}

/**
 * created all HTML templates and joines them to the DOM
 * @param {array} photographers: array created with all the photographers
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  photographers.forEach((photographer) => {
    const userCardDOM = new PhotographersCard(photographer);
    const photographerCardDOM = userCardDOM.createPhotographerCard();
    photographersSection.appendChild(photographerCardDOM);
    //test => console.log
    // console.log('---step4----');
    // console.log('---create html template----');
    // console.log(photographerCardDOM);
  });
}

async function init() {
  const photographers = new PhotographersApi('./data/photographers.json');
  const photographersData = await photographers.getPhotographers();
  let photographersArray = await arrayCreation(photographersData);
  displayData(photographersArray);

  // test => console.log
  // console.log('---step1----');
  // console.log('---url api----');
  // console.log(photographers._url);
  // console.log('---step2----');
  // console.log(`----- init data format jon------`);
  // console.log(photographersData);
  // console.log('---- step3 array creation-----');
  // console.log('---- array-----');
  // console.log(photographersArray);
}
init();
