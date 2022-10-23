async function getPhotographers() {
  // récupération des données via fichier json
  return fetch('../data/photographers.json')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    }) //end pomise then
    .then((res) => res.photographers) //end promise then
    .catch(function (error) {
      console.log(`erreur: ${error}`);
    }); // end catch

  //   const photographers = [
  //     {
  //       name: 'Ma data test',
  //       id: 1,
  //       city: 'Paris',
  //       country: 'France',
  //       tagline: 'Ceci est ma data test',
  //       price: 400,
  //       portrait: 'account.png',
  //     },
  //     {
  //       name: 'Autre data test',
  //       id: 2,
  //       city: 'Londres',
  //       country: 'UK',
  //       tagline: 'Ceci est ma data test 2',
  //       price: 500,
  //       portrait: 'account.png',
  //     },
  //   ];
  // et bien retourner le tableau photographers seulement une fois
  //   return {
  //     photographers: [...photographers, ...photographers, ...photographers],
  //   };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    // const photographerModel = photographerFactory(photographer);

    const photographerModel = new Photographers(photographer);
    console.log(photographerModel);

    // const userCardDOM = photographerModel.getUserCardDOM();
    const userCardDOM = new PhotographersCard(photographerModel);
    const photographerCardDOM = userCardDOM.createPhotographerCard();
    console.log(photographerCardDOM);
    photographersSection.appendChild(photographerCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  console.log(`----- init data ------`);
  console.log(photographers);
  displayData(photographers);
  //   console.log(photographers);
}

init();
