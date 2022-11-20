// import

//DOM element
export const carouselModal = document.getElementById('lightbox-modal');

// global functions

/**
 * remove class hidden to the carousel DOM element
 */
function displayLightbox() {
  carouselModal.classList.remove('hidden');
  document.body.style.overflowY = 'hidden';
//   document.body.style.overflowX = 'auto';
}

/**
 * add class hidden to the carousel DOM element
 */
function closeLightbox() {
  carouselModal.classList.add('hidden');
  //   document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'auto';
}

/**
 * creates all medias carousel template  and joines them to the DOM
 * @param {array} array created with the photographer medias datas
 */
export async function formatMediaCarousel(array) {
  array.forEach((index) => {
    const media = index.getMediaCarousel();
    carouselModal.appendChild(media);
  });
}

// event listener

/**
 * open the carousel lightbox
 */
export async function carouselOpen() {
  const carouselImage = document.querySelectorAll('.carousel-link');
  carouselImage.forEach((img) => {
    img.addEventListener('click', () => {
      displayLightbox();
      console.log(img);
      console.log();
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
    });
  });
}
