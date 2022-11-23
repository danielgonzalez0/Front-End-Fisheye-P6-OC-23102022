// import

//DOM element
export const carouselModal = document.getElementById('lightbox-modal');
export const carouselSideContainer = document.querySelector(
  '.lightbox-slide-container'
);

// global functions

/**
 * remove class hidden to the carousel DOM element
 */
function displayLightbox() {
  carouselModal.classList.remove('hiddenVisibility');
  document.body.style.overflowY = 'hidden';
  //   document.body.style.overflowX = 'auto';
}

/**
 * add class hidden to the carousel DOM element
 */
function closeLightbox() {
  carouselModal.classList.add('hiddenVisibility');
  //   document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'auto';
}

/**
 * creates all medias carousel template  and joines them to the DOM
 * @param {array} mediaArray created with the photographer medias datas
 */
export async function formatMediaCarousel(mediaArray) {
  console.log(mediaArray);
  mediaArray.forEach((index) => {
    const media = index.getMediaCarousel();
    media.setAttribute('data-index', mediaArray.indexOf(index));
    carouselSideContainer.appendChild(media);
  });
}

/**
 * displays the carousel slide media corresponding to the image clicked by the user
 * @param {HTMLElement} media template media clicked by the user
 * @param {array} mediaArray array of medias used by the carousel
 */
async function goToSlideWhenCarouselIsOpen(media, mediaArray) {
  console.log(media.dataset.mediaid);
  console.log(media);
  let mediaIndex = media.dataset.mediaid;
  mediaArray = carouselSideContainer.children;
  console.log(mediaArray);
  console.log(mediaIndex);

  for (let i = 0; i < mediaArray.length; i++) {
    if (mediaArray[i].dataset.carouselid === mediaIndex) {
      console.log(mediaArray[i]);
      mediaArray[i].classList.remove('hidden');
    }
  }
}

async function removeCurrentSlideWhenCarouselIsClosed() {
  console.log('test');
}

// event listener

/**
 * open the carousel lightbox
 */
export async function carouselOpen() {
  const carouselImage = document.querySelectorAll('.carousel-link');
  carouselImage.forEach((media) => {
    media.addEventListener('click', () => {
      displayLightbox();
      goToSlideWhenCarouselIsOpen(media);
    });
  });
}

/**
 * close the carousel lightbox
 */
export function carouselClose() {
  const carouselCross = document.querySelectorAll('.close-carousel');
  carouselCross.forEach((cross) => {
    cross.addEventListener('click', () => {
      closeLightbox();
      removeCurrentSlideWhenCarouselIsClosed();
    });
  });
}
