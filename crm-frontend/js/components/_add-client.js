import { getClients, createClients } from "./_render.js";

import { URL } from "./_settings.js";

const addClientModal = document.querySelector('.client-modal');
const addClientModalOverlay = document.querySelector('.client-modal__overlay');
const addClientModalContent = document.querySelector('.client-modal__content');


const addClientForm = document.forms.addClient;

const contactsList = document.querySelector('.add-contacts__list');
const addContactsBtn = document.querySelector('.add-contacts__btn');
const addContactsCancelBtn = document.querySelector('.add-contacts__btn-cancel');

addContactsCancelBtn.onclick = () => {
  contactsList.innerHTML = '';
};

const showChangeContactList = (changeContactBtn, changeContactList) => {
  changeContactBtn.classList.toggle('add-contacts__change-btn--active');
  changeContactList.classList.toggle('add-contacts__change-list--active');

  const changeContactListsArr = changeContactBtn.nextSibling;
  const changeContactItems = changeContactListsArr.querySelectorAll('.add-contacts__change-list-item');
  changeContactItems.forEach((e) => {

    e.onclick = () => {
      let currentType = changeContactBtn.textContent.trim()
      let changeType = e.textContent;

      changeContactBtn.textContent = changeType;

        changeContactList.classList.toggle('add-contacts__change-list--active')
        changeContactBtn.classList.toggle('add-contacts__change-btn--active');
        e.textContent = currentType;
    };
  });
};

const createNewContactElement = () => {

  const newContactsItem = document.createElement('li');
  const changeContactBox = document.createElement('div');
  const newContactInp = document.createElement('input');

  const changeContactList = document.createElement('ul');

  const changeDeleteContactBtn = document.createElement('button');
  changeDeleteContactBtn.classList.add('btn-reset', 'add-contacts__delete-btn');
  changeDeleteContactBtn.innerHTML = `
    <svg>
      <use xlink:href="img/sprite.svg#delete"></use>
    </svg>
  `;


  newContactsItem.classList.add('add-contacts__list-item');
  changeContactBox.classList.add('add-contacts__change-box');

  const changeContactBtn = document.createElement('button');
  changeContactBtn.classList.add('btn-reset', 'add-contacts__change-btn');
  changeContactBtn.textContent = 'Телефон';

  newContactInp.classList.add('add-contacts__input');
  newContactInp.placeholder = 'Введите данные контакта';

  changeContactList.classList.add('list-reset', 'add-contacts__change-list');

  for (let i = 1; i < 5; i++) {
    const changeContactItem = document.createElement('li');
    changeContactItem.classList.add('add-contacts__change-list-item');

    switch(i) {
      case 1: changeContactItem.textContent = 'Доп. телефон';
      break;
      case 2: changeContactItem.textContent = 'Email';
      break;
      case 3: changeContactItem.textContent = 'Vk';
      break;
      case 4: changeContactItem.textContent = 'Facebook';
      break;
    };

    changeContactList.append(changeContactItem);
  };

  changeContactBtn.onclick = (e) => {
    e.preventDefault()
    showChangeContactList(changeContactBtn, changeContactList)
  };

  document.onclick = (e) => {
    if (!e.target.classList.contains('add-contacts__change-btn') && !e.target.closest('.add-contacts__change-list--active')) {
      changeContactList.classList.remove('add-contacts__change-list--active')
      changeContactBtn.classList.remove('add-contacts__change-btn--active');
      if (e.target.closest('.client-modal__overlay--active') && !e.target.closest('.modal__content') || e.target.closest('.client-modal__btn') || e.target.closest('.add-contacts__btn-cancel')) {
        closeClientModal()
      }
    }
  };

  changeContactBox.append(changeContactBtn, changeContactList);
  newContactsItem.append(changeContactBox, newContactInp, changeDeleteContactBtn);
  contactsList.append(newContactsItem);
};

export const openClientModal = () => {
  addClientModal.classList.add('client-modal--active');
  addClientModalOverlay.classList.add('client-modal__overlay--active');
  addClientModalContent.classList.add('client-modal__content--active');

  addContactsBtn.classList.remove('add-contacts__btn--hidden');
  contactsList.style.marginBottom = '0';

  document.onclick = (e) => {
    if (e.target.closest('.client-modal__overlay--active') && !e.target.closest('.modal__content') || e.target.closest('.client-modal__btn') || e.target.closest('.add-contacts__btn-cancel')) {
      closeClientModal()
    };
  };
    let contactsIndex = 1;
    addContactsBtn.onclick = (e) => {
      e.preventDefault()
      if (contactsIndex < 11) {
        createNewContactElement()
        contactsIndex++

        document.querySelector('.add-contacts__btn-save').disabled = true;
        const addContactsInputs = document.querySelectorAll('.add-contacts__input');
        let validateInput = false;
        let allValidateInputs = false;

        addContactsInputs.forEach((e) => {
          e.oninput = () => {

            addContactsInputs.forEach((input) => {
              if (input.value === '') {
                allValidateInputs = true;
                return allValidateInputs;
              } else {
                allValidateInputs = false;
              }
            })

            if (e.value === '') {
              validateInput = true
              e.style.outline = '1px solid #f06a4d';
              document.querySelector('.add-contacts__btn-save').disabled = true;
            } else {
              validateInput = false
              e.style.outline = '1px solid #c8c5d1';
            }
            if (!validateInput && !allValidateInputs) {
              document.querySelector('.add-contacts__btn-save').disabled = false;
            }

          }
        })

        if (contactsIndex === 11) {
          addContactsBtn.classList.add('add-contacts__btn--hidden');
          contactsList.style.marginBottom = '25px';
        }
      }
    };
};

export const closeClientModal = () => {
  contactsList.innerHTML = '';
  addClientModal.classList.remove('client-modal--active');
  addClientModalOverlay.classList.remove('client-modal__overlay--active');
  addClientModalContent.classList.remove('client-modal__content--active');

  document.querySelectorAll('.add-contacts__change-list--active').forEach((el) => {
    el.classList.remove('add-contacts__change-list--active');
  });

  document.querySelectorAll('.add-contacts__change-btn--active').forEach((el) => {
    el.classList.remove('add-contacts__change-btn--active');
  });

  document.querySelectorAll('.client-modal__input--active').forEach((el) => {
    if (el.value === '') {
      el.classList.remove('client-modal__input--active');
    }
  });
};

export const animationFocusLabelClientModalInp = () => {
  addClientForm.addClientInput.forEach((element) => {

    element.addEventListener('focus', () => {
      addClientForm.addClientInput.forEach((input) => {
        if (input.value === '') {
          input.nextSibling.nextSibling.classList.remove('client-modal__input--active')
        }
      })
      const labelText = element.nextSibling.nextSibling;
      labelText.classList.add('client-modal__input--active')
    });
  });
};

export const addClient = async (clientName, clientLastName, clientMiddleName, contactsArr) => {

  const clientsArr = await getClients()

  const response = await fetch(`${URL}/api/clients`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
          name: clientName,
          lastname: clientLastName,
          middlename: clientMiddleName,
          contacts: contactsArr,
      })
  });
  const newClient = await response.json()
  clientsArr.push(newClient)
  createClients(clientsArr)
};
