async function getPhotographers() {
  // récupération des données via fichier json
  return fetch('../data/photographers.json')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    }) //end pomise then
    .then((res) => res) //end promise then
    .catch(function (error) {
      console.log(`erreur: ${error}`);
    }); // end catch
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographersFactory(
      photographer,
      'photographers'
    );
    //console.log à supprimer
    console.log(photographerModel);
    const userCardDOM = new PhotographersCard(photographerModel);
    const photographerCardDOM = userCardDOM.createPhotographerCard();
    //console.log à supprimer
    console.log(photographerCardDOM);
    photographersSection.appendChild(photographerCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  //console.log à supprimer
  console.log(`----- init data ------`);
  console.log(photographers.photographers);
  displayData(photographers.photographers);
}

init();
