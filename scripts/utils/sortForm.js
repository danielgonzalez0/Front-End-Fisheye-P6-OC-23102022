//import
// const filterBtn = document.querySelector('.select-value');
import { filterBtn } from '../pages/photographer.js';
import { selectOption } from '../pages/photographer.js';

//Dom elements
const selectContainer = document.querySelector('.select-container');
let filterValue = document.getElementById('valueText');

// global functions

/**
 * return last index of an array
 * @param {array} array
 */
function lastArrayIndex(array) {
  return array.length - 1;
}

//listbox navigation functions

/**
 * change the visibity of the filter DOM element selected (default class must be implemented in HTML first)
 * @param {*} selector corresponds to the DOM element you want to select
 */
function toggleFilterClass(selector) {
  selector.classList.toggle('visible');
  selector.classList.toggle('hidden');
}
/**
 * change in the DOM the filter type value according to the event listened
 * @param {event} e event parameter of the event listener
 * @param {*} selector corresponds to the DOM element where the filter value is stored
 */
function addSelectedFilterValue(e, selector) {
  let newFilterValue = e.target.innerHTML;
  selector.innerHTML = newFilterValue;
}

/**
 * accessibility: add the id of the selected option to the attribute 'aria-activedescendant'
 * @param {event} e event parameter of the event listener
 */
function updateAriaActiveDescendant(e) {
  let activeDescendantValue = e.target.id;
  filterBtn.setAttribute('aria-activedescendant', activeDescendantValue);
}
/**
 * accessibility:update the value true or false of the the attribute aria-expended
 * @param {*} selector corresponds to the DOM element where the attribute aria-expended is stored
 * @param {*} boolean : true or false
 */
function ariaExpandedSetValue(selector, boolean) {
  selector.removeAttribute('aria-expanded');
  selector.setAttribute('aria-expanded', boolean);
}
/**
 * accessibility: handle value of the the attribute aria-selected in the option list
 * @param {*} selector corresponds to the DOM element where the attribute aria-selected is stored
 * @param {*} boolean : true or false
 */
function ariaSelectedSetValue(selector, boolean) {
  selector.removeAttribute('aria-selected');
  selector.setAttribute('aria-selected', boolean);
}

//listbox navigation events handling

// mouse navigation behavior

filterBtn.addEventListener('click', () => {
  toggleFilterClass(filterBtn);
  toggleFilterClass(selectContainer);
  ariaExpandedSetValue(filterBtn, true);
});

selectContainer.addEventListener('click', (e) => {
  addSelectedFilterValue(e, filterValue);
  toggleFilterClass(filterBtn);
  toggleFilterClass(selectContainer);
  ariaExpandedSetValue(filterBtn, false);
});

selectOption.forEach((index) => {
  index.addEventListener('click', (e) => {
    updateAriaActiveDescendant(e);
    selectOption.forEach((i) => {
      ariaSelectedSetValue(i, false);
    });
    ariaSelectedSetValue(index, true);
  });
});

// keyboard navigation behaviour

filterBtn.addEventListener('keydown', () => {
  toggleFilterClass(filterBtn);
  toggleFilterClass(selectContainer);
  ariaExpandedSetValue(filterBtn, true);
});

const lastIndex = lastArrayIndex(selectOption);
selectOption[lastIndex].addEventListener('keydown', (e) => {
  if (e.code === 'Tab') {
    e.preventDefault();
    toggleFilterClass(filterBtn);
    toggleFilterClass(selectContainer);
    ariaExpandedSetValue(filterBtn, false);
  }
});

selectContainer.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    addSelectedFilterValue(e, filterValue);
    toggleFilterClass(filterBtn);
    toggleFilterClass(selectContainer);
    ariaExpandedSetValue(filterBtn, false);
  }
});

selectOption.forEach((index) => {
  index.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      updateAriaActiveDescendant(e);
      selectOption.forEach((i) => {
        ariaSelectedSetValue(i, false);
      });
      ariaSelectedSetValue(index, true);
    }
  });
});
