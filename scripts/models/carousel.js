export class Carousel {
  /**
   * @param {HTMLElement} DOMelement carousel parent
   * @param {Object} options.slidesToScroll number of element to scroll
   * @param {Object} options.slidesVisible number of element visible on a slide
   */
  constructor(DOMelement, options = {}) {
    //idea : in the parent element, surround the slides with a div and move this div from right to left
    //1) store the parent Element in a variable
    this.element = DOMelement;
    //2) create an object for options where all options are merged (including default option)
    // first {} empty object that will receive the merged objects
    // second {} default options
    //third options = options on the constructor
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 1,
        slidesVisible: 1,
      },
      options
    );
    this.currentSlide = 0;
    this.children = [].slice.call(DOMelement.children); // to call all children except the container
    //5) calculation of the width of the carousel depending on the number of slides
    let ratio = this.children.length / this.options.slidesVisible;
    //3) creation of the div which includes the slides
    let container = this.createDivWithClass('carousel_container');
    container.style.width = ratio * 100 + '%';
    this.element.appendChild(container);
    //4) add children (slides) into the carrousel container
    this.children.forEach((child) => {
      container.appendChild(child);
    });
    this.createNavigation();
  }



  //6) create navigation arrow
  createNavigation() {
    let closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'close-carousel');
    closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    let nextButton = this.createDivWithClass('carousel_next');
    let prevButton = this.createDivWithClass('carousel_prev');
    nextButton.innerHTML = '&#10095;';
    prevButton.innerHTML = '&#10094;';
    nextButton.setAttribute('tabindex', '0');
    prevButton.setAttribute('tabindex', '0');
    this.element.appendChild(closeButton);
    this.element.appendChild(prevButton);
    this.element.appendChild(nextButton);

    nextButton.addEventListener('click', () => {
      this.next();
    }); // bind this to the class and not the button
    prevButton.addEventListener('click', () => {
      this.prev();
    });
  }

  //7) got to item
  next() {
    this.goToItem(this.currentSlide + this.options.slidesToScroll);
    console.log('test');
  }

  prev() {
    this.goToItem(this.currentSlide - this.options.slidesToScroll);
  }

  /**
   * move the carousel to the target slide
   * @param {number} index of the slide
   */
  goToItem(index) {
    console.log(this.element.firstChild);
    console.log(this.children.length);

    console.log(index);
    //   slide.classList.toggle('hidden');
    let translateX = (index * -100) / this.children.length;
    console.log(translateX);
    this.element.firstChild.style.transform =
      'translate3d(' + translateX + '%,0,0)';
    this.currentSlide += 1;
  }

  /**
   * create div with a class
   * @param {string} className
   * @returns {HTMLElement}
   */
  createDivWithClass(className) {
    let div = document.createElement('div');
    div.setAttribute('class', className);
    return div;
  }
}
