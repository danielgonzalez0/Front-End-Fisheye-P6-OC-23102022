//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from './index';

//DOM element

//function
/**
 * return the id of from the url
 */
function getId() {
  const url = window.location.search;
  const urlSearchParamsId = new URLSearchParams(url);
  const Id = urlSearchParamsId.get('id');
  console.log(`----Url ID----`);
  console.log(Id);
  return Id;
}

// call functions
const photographerId = getId();
console.log(photographerId);
getPhotographers();
