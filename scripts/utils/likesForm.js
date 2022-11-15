//Dom elements

/**
 * return the sum of the key _likes in a array
 * @param {array} array
 */
async function totalLikeInit(array) {
  let counter = 0;
  array.forEach((index) => {
    const nbLike = parseInt(index._likes);
    counter += parseInt(nbLike);
  });
  return counter;
}

async function totalLikeUpdate() {
  let localStorageCounter = localStorage.getItem(photographerId);
  if (!localStorageCounter) {
  }
}

/**
 * add a like on the photographer counter in the localstorage
 */
async function addLikeByPhotographer() {
  let localStorageCounter = localStorage.getItem(photographerId);
  if (!localStorageCounter) {
    localStorage.setItem(photographerId, 1);
  } else {
    let counter = parseInt(localStorage.getItem(photographerId));
    localStorage.removeItem(photographerId);
    localStorage.setItem(photographerId, counter + 1);
  }
}

/**
 * remove a like on the photographer counter in the localstorage
 */
async function removeLikeByPhotographer() {
  let localStorageCounter = localStorage.getItem(photographerId);
  if (localStorageCounter && parseInt(localStorageCounter) > 0) {
    let counter = parseInt(localStorage.getItem(photographerId));
    localStorage.removeItem(photographerId);
    localStorage.setItem(photographerId, counter - 1);
  }
  if (localStorageCounter === '0') {
    localStorage.removeItem(photographerId);
  }
}

async function logLike() {
  //DOM
  const likes = document.querySelectorAll('.likeBtn');

  console.log(likes);

  //event listener on click
  likes.forEach((like) => {
    like.addEventListener('click', (e) => {
      //-----------  variables definion --------------

      //id of an image liked
      const idImageLiked = `${photographerId}_${
        e.pointerType === 'mouse'
          ? e.composedPath()[3].id
          : e.composedPath()[2].id
      }`;
      // like icon clicked
      let likeElement =
        e.pointerType === 'mouse'
          ? e.composedPath()[2].children[1]
          : e.composedPath()[2].children[1];
      // number of like of the media liked
      let likeNumber = parseInt(likeElement.outerText);
      // total like of the page
      let counterLikes = e.composedPath()[5].querySelector('#counterLike');
      //number of like stored in local storagefor the media liked
      const likeStored = localStorage.getItem(idImageLiked);

      // console.log(e.composedPath()[3].id);
      //   console.log(idImageLiked);
      // console.log(likeElement);
      //   console.log(likeNumber);
      console.log(counterLikes.innerText);
      console.log(photographerId); // déclarer dans photographer

      //   // like btn style
      //   like.children[0].classList.toggle('active');
      //   like.children[1].classList.toggle('active');

      console.log(likeStored);

      //like btn logic

      if (!likeStored) {
        //create like in localStorage
        localStorage.setItem(idImageLiked, 1);
        //change css style of the like btn
        like.children[0].classList.toggle('active');
        like.children[1].classList.toggle('active');
        // add 1 like in the like number
        likeElement.innerText = likeNumber + 1;
        //update photograph counter in localStorage
        addLikeByPhotographer();
        //

        console.log(likeNumber);
      } else {
        localStorage.removeItem(idImageLiked);
        like.children[0].classList.toggle('active');
        like.children[1].classList.toggle('active');
        likeElement.innerText = likeNumber - 1;
        removeLikeByPhotographer();
      }
    });
  });
}
