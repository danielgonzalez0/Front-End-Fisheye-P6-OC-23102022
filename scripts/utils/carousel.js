// import
import { mainContainer } from './contactForm.js';
import { mediaSection } from '../pages/photographer.js';
//DOM element
export const carouselModal = document.getElementById('lightbox-modal');
export const carouselSideContainer = document.querySelector(
  '.lightbox-slide-container'
);
const nextSlideBtn = document.querySelector('.arrow-next');
const prevSlideBtn = document.querySelector('.arrow-prev');
const closeCarousel = document.querySelector('.close-carousel');
let currentSlide = 0;

// global functions

/**
 * remove class hidden to the carousel DOM element
 */
function displayLightbox() {
  carouselModal.classList.remove('hiddenVisibility');
  carouselModal.ariaHidden = false;
  document.body.style.overflowY = 'hidden';
  closeCarousel.focus();
  mainContainer.setAttribute('inert', '');
  mainContainer.setAttribute('aria-hidden', 'true');
}

/**
 * add class hidden to the carousel DOM element
 */
function closeLightbox() {
  carouselModal.classList.add('hiddenVisibility');
  carouselModal.ariaHidden = true;
  document.body.style.overflowY = 'auto';
  mainContainer.removeAttribute('inert');
  mainContainer.setAttribute('aria-hidden', 'false');
 
}

/**
 * creates all medias carousel template  and joines them to the DOM
 * @param {array} mediaArray created with the photographer medias datas
 */
export async function formatMediaCarousel(mediaArray) {
  mediaArray.forEach((index) => {
    const media = index.getMediaCarousel();
    carouselSideContainer.appendChild(media);
  });
}

/**
 * displays the carousel slide media corresponding to the image clicked by the user
 * 
 * @param {HTMLElement} media template media clicked by the user
 * @param {array} mediaArray array of medias used by the carousel
 * @returns current slide index position
 */
async function goToSlideWhenCarouselIsOpen(media) {
  let mediaId = media.dataset.mediaid;
  const mediaArray = carouselSideContainer.children;

  for (let i = 0; i < mediaArray.length; i++) {
    if (mediaArray[i].dataset.carouselid === mediaId) {
      mediaArray[i].classList.remove('hidden');
      mediaArray[i].ariaHidden = false;
      return (currentSlide = i);
    }
  }
}

/**
 * put the focus on the last image viewed when the carousel is closed
 */
async function getFocusOnthelastImageWhenCarouselClosed() {
  mediaSection.children[currentSlide].firstElementChild.focus();
}

/**
 * change the class of the current slide between visible or hidden & change aria-hidden
 */
async function toggleClassCurrentSlide() {
  const mediaArray = carouselSideContainer.children;
  mediaArray[currentSlide].classList.toggle('hidden');
  if (mediaArray[currentSlide].className.includes('hidden')) {
    mediaArray[currentSlide].ariaHidden = true;
  } else {
    mediaArray[currentSlide].ariaHidden = false;
  }
}

// event listener

/**
 * open the carousel lightbox
 */
export async function carouselOpen() {
  const carouselImage = document.querySelectorAll('.carousel-link');
  carouselImage.forEach((media) => {
    media.addEventListener('click', (e) => {
      e.preventDefault;
      if (e.type === 'click') {
        displayLightbox();
        goToSlideWhenCarouselIsOpen(media);
      }
    });
  });

  carouselImage.forEach((media) => {
    media.addEventListener('keydown', (e) => {
      e.preventDefault;
      if (e.code === 'Enter') {
        displayLightbox();
        goToSlideWhenCarouselIsOpen(media);
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
    cross.addEventListener('mousedown', () => {
      closeLightbox();
      toggleClassCurrentSlide();
    });

    cross.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        closeLightbox();
        toggleClassCurrentSlide();
        getFocusOnthelastImageWhenCarouselClosed();
      }
    });

    cross.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        closeLightbox();
        toggleClassCurrentSlide();
        getFocusOnthelastImageWhenCarouselClosed();
      }
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
      // mediaArray[currentSlide].ariaHidden = true;
      currentSlide += 1;
      toggleClassCurrentSlide();
      // mediaArray[currentSlide].ariaHidden = false;
    } else if (currentSlide === mediaLength - 1) {
      toggleClassCurrentSlide();
      // mediaArray[currentSlide].ariaHidden = true;
      currentSlide = 0;
      toggleClassCurrentSlide();
      // mediaArray[currentSlide].ariaHidden = false;
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
    } else if (currentSlide === 0) {
      toggleClassCurrentSlide();
      currentSlide = mediaLength - 1;
      toggleClassCurrentSlide();
    }
  });
}
