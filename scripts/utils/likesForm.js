//import

import { photographerId } from '../pages/photographer.js';
import { counterLike } from '../pages/photographer.js';
import { totalLikeContainer } from '../pages/photographer.js';

//functions

//page initialization

/**
 * the function sums up the number of likes in the array of the photographer's media
 * @param {array} array with all the photographer's media
 */
export async function totalLikeInit(array) {
  let counter = 0;
  array.forEach((index) => {
    const nbLike = parseInt(index._likes);
    counter += parseInt(nbLike);
  });
  return counter;
}

/**
 * addition of all likes at initialization and of all likes in localStorage then addition of the amount in HTML
 * @param {string} counter is the sum of all likes from a photographer at the page initialization
 */

export async function totalLikePhotographInit(counter) {
  if (localStorage.getItem(photographerId)) {
    totalLikeContainer.innerText =
      counter + parseInt(localStorage.getItem(photographerId));
  } else {
    totalLikeContainer.textContent = counter;
  }
}

//update like counter of the photograph

/**
 * add or remove a like on the photographer counter in the localstorage
 * @param {number} boolean is 0 for an unlike and 1 for a like
 */
async function updateLikePhotographerCount(boolean) {
  let localStorageCounter = parseInt(localStorage.getItem(photographerId));
  if (boolean === 1) {
    //case 1 LScounter doesn't exist and like + 1
    if (!localStorageCounter) {
      localStorage.setItem(photographerId, 1);
    } else {
      //case 2 LScounter exists and like + 1
      localStorage.setItem(photographerId, localStorageCounter + 1);
    }
  }
  if (boolean === 0) {
    //case 3 LScounter exist and > 0 and like - 1
    if (localStorageCounter && parseInt(localStorageCounter) > 0) {
      localStorage.setItem(photographerId, localStorageCounter - 1);
    }
    //case 4 LScounter exist and = 1 and like - 1
    if (localStorageCounter && localStorageCounter === 1) {
      localStorage.removeItem(photographerId);
    }
  }
}

/**
 *function that updates the total of photographer's like & pushes it in HTML
 */
async function totalLikeUpdate() {
  let localStorageCounter = localStorage.getItem(photographerId); //cannot get before initialization
  let likeApi = counterLike;
  //case 1 Api 0 like & localStorage 0 like
  if (!localStorageCounter && !likeApi) totalLikeContainer.textContent = 0;
  //case 2 Api n likes & localStorage n likes
  if (localStorageCounter && likeApi)
    totalLikeContainer.textContent =
      parseInt(localStorageCounter) + parseInt(likeApi);
  //case 3 Api n likes & localStorage 0 like
  if (!localStorageCounter && likeApi)
    totalLikeContainer.textContent = parseInt(likeApi);
}

/**
 * logic of like btn at the eventListner on click
 */
export async function likeMedia() {
  //DOM
  const likes = document.querySelectorAll('.likeBtn');
  //event listener on click
  likes.forEach((like) => {
    like.addEventListener('click', (e) => {
      //-----------  variables definion --------------
      //id of an image liked
      const idImageLiked = `${photographerId}_${e.currentTarget.dataset.mediaid}`;
      // like number element
      let likeElement = document.querySelector(
        `[data-likeid="${e.currentTarget.dataset.mediaid}"]`
      );
      // number of like of the media liked
      let likeNumber = parseInt(likeElement.outerText);
      //number of like stored in local storage for the media liked
      const likeStored = localStorage.getItem(idImageLiked);

      //------------- like btn logic ---------------------
      //change css style of the like btn
      like.children[0].classList.toggle('active');
      like.children[1].classList.toggle('active');
      for (let i = 0; i < like.children.length; i++) {
        if (like.children[i].getAttribute('class').includes('active')) {
          like.children[i].setAttribute('aria-hidden', false);
        } else {
          like.children[i].setAttribute('aria-hidden', true);
        }
      }

      if (!likeStored) {
        //create like in localStorage and add 1 like in media HTML counter
        localStorage.setItem(idImageLiked, 1);
        likeElement.innerText = likeNumber + 1;
        //update photograph counter in localStorage
        updateLikePhotographerCount(1);
      } else {
        localStorage.removeItem(idImageLiked);
        likeElement.innerText = likeNumber - 1;
        updateLikePhotographerCount(0);
      }
      totalLikeUpdate();
    });
  });
}
