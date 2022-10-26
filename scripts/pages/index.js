async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographersFactory(photographer, 'json');
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
  const photographers = new PhotographersApi('./data/photographers.json');
  const photographersData = await photographers.getPhotographers()
  //console.log à supprimer
  console.log(`----- init data ------`);
  console.log(photographersData);
  displayData(photographersData);
}

init();
