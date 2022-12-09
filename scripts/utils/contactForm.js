//import

// DOM Element
export const mainContainer = document.querySelector('main');
const formModal = document.getElementById('contact_modal');
const formTitle = document.getElementById('form-title');
const formContainer = document.querySelector('.form-container');
const contactCrossClose = document.querySelector('.contact_btn_close');
const contactBtnClose = document.querySelector('.formBtnClose');
const successMessage = document.querySelector('.succes-confirmation');
const contactBtnSubmit = document.querySelector('.contact_btn_submit');
const inputFormValue = document.querySelectorAll(
  'input[required], textarea[required]'
);
const inputFirstName = document.querySelector('#firstname');
const inputLastName = document.querySelector('#lastname');
const inputEmail = document.getElementById('email');
const inputMessage = document.querySelector('#message');

console.log(formModal);

// ----------------------functions-------------------------
/**
 * add the photographer name into the contact form title
 * @param {string} name photographer's name
 */
export async function getNamePhotographerIntoContactForm(name) {
  formTitle.innerHTML = `Contactez-moi <br /> ${name}`;
}

/**
 * function validate => show success message on form submit
 */
function validate() {
  successMessage.classList.replace('select-hide', 'success-show');
  formContainer.setAttribute('inert', '');
  contactBtnClose.focus();
}

/**
 * open contact modal
 */
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  //accessibility
  mainContainer.setAttribute('aria-hidden', 'true');
  mainContainer.setAttribute('inert', '');
  formModal.setAttribute('aria-hidden', 'false');
  contactCrossClose.focus();
}

/**
 * close contact modal
 */
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  successMessage.classList.replace('success-show', 'select-hide');
  //accessibility
  mainContainer.setAttribute('aria-hidden', 'false');
  formModal.setAttribute('aria-hidden', 'true');
  mainContainer.removeAttribute('inert');
  formContainer.removeAttribute('inert');
  document.getElementById('contactBtn').focus();
}
// error message display

/**
 * add error message of a form field
 * @param {Object} field - the form field to be controlled
 * @param {Object} errorMessage - the error message you want to add
 */
function addErrorMessage(field, errorMessage) {
  field.setAttribute('data-error-visible', 'true');
  field.parentElement.setAttribute('data-error', errorMessage);
}
/**
 * reset error message of a form field & the variable valid
 * @param {Object} field - the form field to be controlled
 */
function removeErrorMessage(field) {
  field.removeAttribute('data-error-visible', 'true');
  field.parentElement.removeAttribute('data-error');
}
// reset value function
/**
 * reset input value manually
 */
function resetInputForm() {
  inputFormValue.forEach((field) => {
    field.value = '';
  });
}

// specific functions
/**
 * check validity of input value type = text
 * @param {Object} input - the form field to be controlled => must be a text type
 */
function nameValidity(input) {
  const regexName = /^[-a-zA-ZÀ-ÿ ']{2,30}$/;
  const errorMessage = 'Veuillez entrer 2 caractères ou plus pour ce champ.';
  if (!regexName.test(input.value)) {
    addErrorMessage(input, errorMessage);
    return false;
  }
  return true;
}

/**
 * check validity of inputs type = email
 * @param {Object} input - the form field to be controlled => must be a email type
 */
function emailValidity(input) {
  const regexEmail = /^[\w-.]+@([\w-]+\.)[\w-]{2,4}$/; // https://regexr.com/3e48o
  const errorMessage = 'Veuillez entrer une adresse mail valide';
  if (!regexEmail.test(input.value)) {
    addErrorMessage(input, errorMessage);
    return false;
  }
  return true;
}

function textareaValidity(input) {
  const errorMessage = `Veuillez entrer un texte entre 0 et 500 caractères`;
  let text = input.value;
  if (text.length <= 0 || text.length > 500) {
    addErrorMessage(input, errorMessage);
    return false;
  }
  return true;
}

// global functions
/**
 * check if a form input is valid
 * @param {Object} input - the form field to be controlled
 * @param {string} type - type of the input: name, email, date, number, radio, checkbox
 */

function validateInput(input, type) {
  switch (type) {
    case 'name':
      return nameValidity(input);
    case 'email':
      return emailValidity(input);
    case 'textarea':
      return textareaValidity(input);
    default:
      return false;
  }
}

/**
 * check the validity of the form
 */
function validateForm() {
  const checkInputFirstName = validateInput(inputFirstName, 'name');
  const checkInputLastName = validateInput(inputLastName, 'name');
  const checkInputEmail = validateInput(inputEmail, 'email');
  const checkInputMessage = validateInput(inputMessage, 'textarea');

  if (
    checkInputFirstName &&
    checkInputLastName &&
    checkInputEmail &&
    checkInputMessage
  ) {
    // coding post steps process
    let formData = {
      firstname: inputFirstName.value,
      lastname: inputLastName.value,
      email: inputEmail.value,
      message: inputMessage.value,
    };
    console.log(formData);

    validate();
    resetInputForm();
  }
}

// ------------------- event listeners ----------------

/**
 * behaviour of contact modal with event listener
 */
export async function contactModalEventListener() {
  //modal open
  const contactBtnOpen = document.getElementById('contactBtn');
  contactBtnOpen.addEventListener('click', () => {
    displayModal();
  });

  //modal close
  contactBtnClose.addEventListener('click', () => {
    closeModal();
  });
  contactCrossClose.addEventListener('click', () => {
    closeModal();
  });

  // modal submit
  contactBtnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
  });

  //  on form field focus
  inputFirstName.addEventListener('focus', () => {
    removeErrorMessage(inputFirstName);
  });
  inputLastName.addEventListener('focus', () => {
    removeErrorMessage(inputLastName);
  });
  inputEmail.addEventListener('focus', () => {
    removeErrorMessage(inputEmail);
  });
  inputMessage.addEventListener('focus', () => {
    removeErrorMessage(inputMessage);
  });

  // on form field blur
  inputFirstName.addEventListener('blur', () => {
    validateInput(inputFirstName, 'name');
  });
  inputLastName.addEventListener('blur', () => {
    validateInput(inputLastName, 'name');
  });
  inputEmail.addEventListener('blur', () => {
    validateInput(inputEmail, 'email');
  });
  inputMessage.addEventListener('blur', () => {
    validateInput(inputMessage, 'textarea');
  });
}
