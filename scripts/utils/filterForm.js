const filterBtn = document.querySelector('.select-value');
const selectContainer = document.querySelector('.select-container');
let filterValue = document.getElementById('valueText');
console.log(filterValue);

function toggleFilterClass() {
  filterBtn.classList.toggle('visible');
  filterBtn.classList.toggle('hidden');
  selectContainer.classList.toggle('visible');
  selectContainer.classList.toggle('hidden');
}

filterBtn.addEventListener('click', () => {
  toggleFilterClass();
});

selectContainer.addEventListener('click', (e) => {
  let newFilterValue = e.target.innerHTML;
  filterValue.innerHTML = newFilterValue;
  toggleFilterClass();
});
