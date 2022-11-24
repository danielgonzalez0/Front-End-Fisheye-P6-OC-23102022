//import

// DOM Element
const contactBtnClose = document.querySelector('.contact_btn_close');
const contactBtnSubmit = document.querySelector('.contact_btn_submit');
//functions

/**
 * open contact modal
 */
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
}

/**
 * close contact modal
 */
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

/**
 * behaviour of contact modal with event listener
 */
export async function contactModalEventListener() {
  //modal open
  const contactBtnOpen = document.getElementById('contactBtn');
  console.log(contactBtn);
  contactBtnOpen.addEventListener('click', () => {
    displayModal();
  });
  //modal close
  contactBtnClose.addEventListener('click', () => {
    closeModal();
  });
  //modal submit
  contactBtnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
  });
}
