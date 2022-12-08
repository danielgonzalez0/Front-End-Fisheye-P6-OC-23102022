//import
import {
  filterBtn,
  focusFirstElementInMediaSection,
} from '../pages/photographer.js';
import { selectOption } from '../pages/photographer.js';

//Dom elements
const selectContainer = document.querySelector('.select-container');
const selectList = document.querySelector('.select-list');
let filterValue = document.getElementById('valueText');
let currentValue = filterValue.textContent;
export let keydownShifhtPressed = false;

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
  let newFilterValue = e.target.textContent;
  if (newFilterValue.length !== 0) {
    selector.textContent = newFilterValue;
    currentValue = newFilterValue;
  }
  selector.textContent = currentValue;
}

/**
 * accessibility: add the id of the selected option to the attribute 'aria-activedescendant'
 * @param {event} e event parameter of the event listener
 */
function updateAriaActiveDescendant(e) {
  let activeDescendantValue = e.target.id;
  selectList.setAttribute('aria-activedescendant', activeDescendantValue);
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

//open the select options div
filterBtn.addEventListener('click', () => {
  toggleFilterClass(filterBtn);
  toggleFilterClass(selectContainer);
  ariaExpandedSetValue(filterBtn, true);
});

//close select option div & change filter value on filter button
selectContainer.addEventListener('click', (e) => {
  addSelectedFilterValue(e, filterValue);
  toggleFilterClass(filterBtn);
  toggleFilterClass(selectContainer);
  ariaExpandedSetValue(filterBtn, false);
});

//update aria attributes when user click on a option
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

//open the select options div
filterBtn.addEventListener('keydown', (e) => {
  console.log(e.keyCode);
  console.log('keydownShifhtPressed avant test = ' + keydownShifhtPressed);
  if (e.keyCode === 16) {
    keydownShifhtPressed = true;
  }
  console.log('keydownShifhtPressed si click shift = ' + keydownShifhtPressed);
  if (
    e.code !== 'Escape' &&
    e.code !== 'Enter' &&
    e.code === 'Tab' &&
    keydownShifhtPressed === false
  ) {
    console.log(e);
    console.log('keydownShifhtPressed = ' + keydownShifhtPressed);
    toggleFilterClass(filterBtn);
    toggleFilterClass(selectContainer);
    ariaExpandedSetValue(filterBtn, true);
  }

  if (e.code === 'Tab' && keydownShifhtPressed === true) {
    keydownShifhtPressed = false;
  }

  if (e.code === 'Enter') {
    ariaExpandedSetValue(filterBtn, true);
    console.log(document.querySelector('.select-list').firstElementChild);
    setTimeout(() => {
      document.querySelector('.select-list').firstElementChild.focus();
    }, 100);
  }
});

//close the select options div & focus firt image when user is on the last options & push tab on the keyboard
const lastIndex = lastArrayIndex(selectOption);
selectOption[lastIndex].addEventListener('keydown', (e) => {
  if (e.keyCode === 16) {
    keydownShifhtPressed = true;
  }
  if (
    (e.code === 'Tab' && keydownShifhtPressed === false) ||
    e.code === 'ArrowDown'
  ) {
    e.preventDefault();
    toggleFilterClass(filterBtn);
    toggleFilterClass(selectContainer);
    ariaExpandedSetValue(filterBtn, false);
    focusFirstElementInMediaSection();
  }
});

//close the select options div & focus firt image when user is on the last options & push tab on the keyboard
selectOption[0].addEventListener('keydown', (e) => {
  if (e.keyCode === 16) {
    keydownShifhtPressed = true;
  }

  if (
    (e.code === 'Tab' && keydownShifhtPressed === true) ||
    e.code === 'ArrowUp'
  ) {
    e.preventDefault();
    console.log(e.code);
    toggleFilterClass(filterBtn);
    toggleFilterClass(selectContainer);
    ariaExpandedSetValue(filterBtn, false);
    console.log('keydownShifhtPressed = ' + keydownShifhtPressed);
    keydownShifhtPressed = false;
    console.log('keydownShifhtPressed = ' + keydownShifhtPressed);
    document.getElementById('contactBtn').focus();
  }
});

selectContainer.addEventListener('keydown', (e) => {
  if (e.keyCode === 16) {
    keydownShifhtPressed = true;
  }
  //push enter to close select options div & and change filter value
  if (e.code === 'Enter') {
    addSelectedFilterValue(e, filterValue);
    toggleFilterClass(filterBtn);
    toggleFilterClass(selectContainer);
    ariaExpandedSetValue(filterBtn, false);
  }
  //push escape to close select options div without change filter value & focus on first image of medias section
  if (e.code === 'Escape') {
    toggleFilterClass(filterBtn);
    toggleFilterClass(selectContainer);
    ariaExpandedSetValue(filterBtn, false);
    filterBtn.focus();
  }
});

//for each options if user press enter update the aria attributes
selectOption.forEach((index) => {
  index.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      updateAriaActiveDescendant(e);
      selectOption.forEach((i) => {
        ariaSelectedSetValue(i, false);
      });
      ariaSelectedSetValue(index, true);
    }
    //navigate in select options with arrows
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      if (index.nextElementSibling) index.nextElementSibling.focus();
    }
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      if (index.previousElementSibling) index.previousElementSibling.focus();
    }
  });
});
