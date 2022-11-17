//Dom elements
// const filterBtn = document.querySelector('.select-value');
import { filterBtn } from "../pages/photographer.js";
import { selectOption } from "../pages/photographer.js";


const selectContainer = document.querySelector('.select-container');
// const selectOption = document.querySelectorAll('.select-option');
let filterValue = document.getElementById('valueText');
const lastSelectOption = document.getElementById('listbox-3');

// global functions
function lastArrayIndex(array) {
  return array.length - 1;
}

//listbox navigation functions

function toggleFilterClass(selector) {
  selector.classList.toggle('visible');
  selector.classList.toggle('hidden');
}
function addSelectedFilterValue(e, selector) {
  let newFilterValue = e.target.innerHTML;
  selector.innerHTML = newFilterValue;
}
function updateAriaActiveDescendant(e) {
  let activeDescendantValue = e.target.id;
  filterBtn.setAttribute('aria-activedescendant', activeDescendantValue);
}
function ariaExpandedSetValue(selector, value) {
  selector.removeAttribute('aria-expanded');
  selector.setAttribute('aria-expanded', value);
}

function ariaSelectedSetValue(selector, value) {
  selector.removeAttribute('aria-selected');
  selector.setAttribute('aria-selected', value);
}

//listbox navigation events handling

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
