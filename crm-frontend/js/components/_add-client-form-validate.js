const saveClientBtn = document.querySelector('.add-contacts__btn-save');

const clientNameInp = document.querySelector('.client-modal__input-name');
const clientLastNameInp = document.querySelector('.client-modal__input-lastname');
const clientMiddleNameInp = document.querySelector('.client-modal__input-middlename');

const addContactsInputs = document.querySelectorAll('.add-contacts__input');

export const validateAddClientForm = () => {

  saveClientBtn.disabled = true;

  let isValidName = false;
  let isValidLastName = false;
  let isValidMiddleName = false;
  let allValidName = false;
  let allValidLastName = false;
  let allValidateInputs = false;

  clientNameInp.oninput = () => {
    if (clientNameInp.value === '') {
      clientNameInp.style.borderBottom = '1px solid #F06A4D';
      isValidName = true;
      allValidName = false;
    } else if (!/^[а-яА-Я]+$/.test(clientNameInp.value)) {
      clientNameInp.style.borderBottom = '1px solid #F06A4D';
      isValidName = true;
      allValidName = false;
    } else {
      clientNameInp.style.borderBottom = '1px solid #cbc5d17d';
      isValidName = false;
      allValidName = true;
    }

    addContactsInputs.forEach((input) => {
      if (input.value === '') {
        allValidateInputs = true;
        return allValidateInputs;
      } else {
        allValidateInputs = false;
      }
    })

    if (allValidName && allValidLastName && !allValidateInputs) {
      if (!isValidMiddleName) {
        saveClientBtn.disabled = false;
      }
    } else {
      saveClientBtn.disabled = true;
    }
  };

  clientLastNameInp.oninput = () => {
    if (clientLastNameInp.value === '') {
      clientLastNameInp.style.borderBottom = '1px solid #F06A4D';
      isValidLastName = true;
      allValidLastName = false;
    } else if (!/^[а-яА-Я]+$/.test(clientLastNameInp.value)) {
      clientLastNameInp.style.borderBottom = '1px solid #F06A4D';
      isValidLastName = true;
      allValidLastName = false;
    } else {
      clientLastNameInp.style.borderBottom = '1px solid #cbc5d17d';
      isValidLastName = false;
      allValidLastName = true;
    }

    addContactsInputs.forEach((input) => {
      if (input.value === '') {
        allValidateInputs = true;
        return allValidateInputs;
      } else {
        allValidateInputs = false;
      }
    })

    if (allValidName && allValidLastName && !allValidateInputs) {
      if (!isValidMiddleName) {
        saveClientBtn.disabled = false;
      }
    } else {
      saveClientBtn.disabled = true;
    }
  };

  clientMiddleNameInp.oninput = () => {
    if (!/^(|[а-яА-Я]+)$/.test(clientMiddleNameInp.value)) {
      clientMiddleNameInp.style.borderBottom = '1px solid #F06A4D';
      isValidMiddleName = true;
    } else {
      clientMiddleNameInp.style.borderBottom = '1px solid #cbc5d17d';
      isValidMiddleName = false;
    }
    if (!isValidName && !isValidLastName && !isValidMiddleName) {
      saveClientBtn.disabled = false;
    } else {
      saveClientBtn.disabled = true;
    }
  };
};
