// import

//DOM element
export const carouselModal = document.getElementById('lightbox-modal');
export const carouselSideContainer = document.querySelector(
  '.lightbox-slide-container'
);
const nextSlideBtn = document.querySelector('.arrow-next');
const prevSlideBtn = document.querySelector('.arrow-prev');
let currentSlide = 0;

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
    // media.setAttribute('data-index', mediaArray.indexOf(index));
    carouselSideContainer.appendChild(media);
  });
}

/**
 * displays the carousel slide media corresponding to the image clicked by the user
 * @param {HTMLElement} media template media clicked by the user
 * @param {array} mediaArray array of medias used by the carousel
 * @returns current slide index position
 */
async function goToSlideWhenCarouselIsOpen(media) {
  console.log(media.dataset.mediaid);
  console.log(media);
  let mediaIndex = media.dataset.mediaid;
  const mediaArray = carouselSideContainer.children;
  console.log(mediaArray);
  console.log(mediaIndex);

  for (let i = 0; i < mediaArray.length; i++) {
    if (mediaArray[i].dataset.carouselid === mediaIndex) {
      console.log(mediaArray[i]);
      mediaArray[i].classList.remove('hidden');
      return (currentSlide = i);
    }
  }
}

/**
 * close the carousel and add the css class hidden to the current slide
 */
async function toggleClassCurrentSlide() {
  const mediaArray = carouselSideContainer.children;
  mediaArray[currentSlide].classList.toggle('hidden');
}

async function next() {}

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
      console.log('current slide = ' + currentSlide);
    });
  });

  carouselImage.forEach((media) => {
    media.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        displayLightbox();
        goToSlideWhenCarouselIsOpen(media);
        console.log('current slide = ' + currentSlide);
      }
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
      toggleClassCurrentSlide();
    });
  });
}

/**
 * go to the next slide and update currentSlide value
 */
export async function goToNextSlide() {
  nextSlideBtn.addEventListener('click', () => {
    const mediaArray = carouselSideContainer.children;
    let mediaLength = mediaArray.length;
    if (currentSlide < mediaLength - 1) {
      toggleClassCurrentSlide();
      currentSlide += 1;
      toggleClassCurrentSlide();
    }
  });
}

/**
 * go to the previous slide and update currentSlide value
 */
export async function goToPrevSlide() {
  prevSlideBtn.addEventListener('click', () => {
    const mediaArray = carouselSideContainer.children;
    let mediaLength = mediaArray.length;
    if (currentSlide <= mediaLength - 1 && currentSlide > 0) {
      toggleClassCurrentSlide();
      currentSlide -= 1;
      toggleClassCurrentSlide();
    }
  });
}
