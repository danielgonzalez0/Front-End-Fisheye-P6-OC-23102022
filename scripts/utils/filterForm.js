//Dom elements
const filterBtn = document.querySelector('.select-value');
const selectContainer = document.querySelector('.select-container');
const selectOption = document.querySelectorAll('.select-option');
let filterValue = document.getElementById('valueText');
const lastSelectOption = document.getElementById('listbox-3');

//listbox navigation functions

function toggleFilterClass() {
  filterBtn.classList.toggle('visible');
  filterBtn.classList.toggle('hidden');
  selectContainer.classList.toggle('visible');
  selectContainer.classList.toggle('hidden');
}
function addSelectedFilterValue(e) {
  let newFilterValue = e.target.innerHTML;
  filterValue.innerHTML = newFilterValue;
}
function updateAriaActiveDescendant(e) {
  let activeDescendantValue = e.target.id;
  filterBtn.setAttribute('aria-activedescendant', activeDescendantValue);
}
function updateAriaActiveDescendant(e) {
  let activeDescendantValue = e.target.id;
  filterBtn.setAttribute('aria-activedescendant', activeDescendantValue);
}
function ariaExpandedTrue(selector) {
  selector.removeAttribute('aria-expanded');
  selector.setAttribute('aria-expanded', true);
}
function ariaExpandedFalse(selector) {
  selector.removeAttribute('aria-expanded');
  selector.setAttribute('aria-expanded', false);
}
function ariaSelectedTrue(selector) {
  selector.removeAttribute('aria-selected');
  selector.setAttribute('aria-selected', true);
}
function ariaSelectedFalse(selector) {
  selector.removeAttribute('aria-selected');
  selector.setAttribute('aria-selected', false);
}

//listbox navigation events handling

filterBtn.addEventListener('click', (e) => {
  toggleFilterClass();
  ariaExpandedTrue(filterBtn);
});
selectContainer.addEventListener('click', (e) => {
  addSelectedFilterValue(e);
  toggleFilterClass();
  ariaExpandedFalse(filterBtn);
});
selectOption.forEach((index) => {
  index.addEventListener('click', (e) => {
    updateAriaActiveDescendant(e);
    selectOption.forEach((i) => {
      ariaSelectedFalse(i);
    });
    ariaSelectedTrue(index);
  });
});

filterBtn.addEventListener('keydown', () => {
  toggleFilterClass();
  ariaExpandedTrue(filterBtn);
});
lastSelectOption.addEventListener('keydown', (e) => {
  if (e.code === 'Tab') {
    toggleFilterClass();
    ariaExpandedFalse(filterBtn);
  }
});
selectContainer.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    addSelectedFilterValue(e);
    toggleFilterClass();
    ariaExpandedFalse(filterBtn);
  }
});
selectOption.forEach((index) => {
  index.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      updateAriaActiveDescendant(e);
      selectOption.forEach((i) => {
        ariaSelectedFalse(i);
      });
      ariaSelectedTrue(index);
    }
  });
});
