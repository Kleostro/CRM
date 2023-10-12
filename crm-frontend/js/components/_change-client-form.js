import { getClients } from "./_render.js";

import { openDeleteClientModal } from "./_delete-client.js";

import { URL } from "./_settings.js";

const changeClientModal = document.querySelector('.change-client-modal');
const changeClientModalOverlay = document.querySelector('.change-client-modal__overlay');
const changeClientModalContent = document.querySelector('.change-client-modal__content');


const clientNameInp = document.querySelector('.change-client-modal__input-name');
const clientLastNameInp = document.querySelector('.change-client-modal__input-lastname');
const clientMiddleNameInp = document.querySelector('.change-client-modal__input-middlename');

const contactsList = document.querySelector('.change-client-modal__add-contacts__list');
const addContactsBtn = document.querySelector('.change-client-modal__add-contacts__btn');
const changeClientBtn = document.querySelector('.change-client-modal__add-contacts__btn-save');

const showChangeContactListChange = (changeContactBtn, changeContactList) => {
  changeContactBtn.classList.toggle('add-contacts__change-btn--active');
  changeContactList.classList.toggle('change-client-modal__add-contacts__change-list--active');

  const changeContactListsArr = changeContactBtn.nextSibling;
  const changeContactItems = changeContactListsArr.querySelectorAll('.change-client-modal__add-contacts__change-list-item');
  changeContactItems.forEach((e) => {

    e.onclick = () => {
      let currentType = changeContactBtn.textContent.trim()
      let changeType = e.textContent;

      changeContactBtn.textContent = changeType;

      changeContactList.classList.toggle('change-client-modal__add-contacts__change-list--active')
      changeContactBtn.classList.toggle('add-contacts__change-btn--active');
      e.textContent = currentType;
    };
  });
};

const createChangeNewContactElement = (currentClient, i) => {

  const newContactsItem = document.createElement('li');
  const changeContactBox = document.createElement('div');
  const newContactInp = document.createElement('input');

  const changeContactList = document.createElement('ul');

  const changeDeleteContactBtn = document.createElement('button');
  changeDeleteContactBtn.classList.add('btn-reset', 'add-contacts__delete-btn');
  changeDeleteContactBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_121_1083)">
        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"/>
      </g>
      <defs>
        <clipPath id="clip0_121_1083">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  `;


  newContactsItem.classList.add('add-contacts__list-item');
  changeContactBox.classList.add('add-contacts__change-box');

  const changeContactBtn = document.createElement('button');
  changeContactBtn.classList.add('btn-reset', 'add-contacts__change-btn');
  changeContactBtn.textContent = 'Телефон';

  newContactInp.classList.add('add-contacts__input');
  newContactInp.placeholder = 'Введите данные контакта';


  if (currentClient?.contacts) {
    changeContactBtn.textContent = currentClient?.contacts[i].type;
    newContactInp.value = currentClient?.contacts[i].value;
  }

  changeContactList.classList.add('list-reset', 'add-contacts__change-list', 'change-client-modal__add-contacts__change-list');

  for (let i = 1; i < 6; i++) {
    const changeContactItem = document.createElement('li');
    changeContactItem.classList.add('change-client-modal__add-contacts__change-list-item');

    switch (i) {
      case 1: changeContactItem.textContent = 'Доп. телефон';
        break;
      case 2: changeContactItem.textContent = 'Email';
        break;
      case 3: changeContactItem.textContent = 'Vk';
        break;
      case 4: changeContactItem.textContent = 'Facebook';
        break;
      case 5: changeContactItem.textContent = 'Телефон';
        break;
    };

    changeContactList.append(changeContactItem);
  };

  changeContactBtn.onclick = (e) => {
    e.preventDefault()
    showChangeContactListChange(changeContactBtn, changeContactList)
  };

  document.onclick = (e) => {
    if (!e.target.classList.contains('add-contacts__change-btn') && !e.target.closest('.add-contacts__change-list--active')) {
      changeContactList.classList.remove('change-client-modal__add-contacts__change-list--active')
      changeContactBtn.classList.remove('add-contacts__change-btn--active');
      if (e.target.closest('.change-client-modal__overlay--active') && !e.target.closest('.modal__content') || e.target.closest('.change-client-modal__btn') || e.target.closest('.change-client-modal__add-contacts__btn-delete')) {
        closeChangeClientModal()
      };
    }
  };

  changeContactBox.append(changeContactBtn, changeContactList);
  newContactsItem.append(changeContactBox, newContactInp, changeDeleteContactBtn);
  contactsList.append(newContactsItem);
};

export const openChangeClientModal = (currentClient) => {
  changeClientModal.classList.add('change-client-modal--active');
  changeClientModalOverlay.classList.add('change-client-modal__overlay--active');
  changeClientModalContent.classList.add('change-client-modal__content--active');

  addContactsBtn.classList.remove('change-client-modal__add-contacts__btn--hidden');
  contactsList.style.marginBottom = '0';

  const changeClientId = document.querySelector('.change-client-modal__id');
  changeClientId.textContent = `ID: ${currentClient.id}`

  const deleteClientBtn = document.querySelector('.change-client-modal__add-contacts__btn-delete');

  deleteClientBtn.onclick = (e) => {
    e.preventDefault()
    closeChangeClientModal()
    openDeleteClientModal(currentClient)
  };

  let contactsIndex = 1;

  for (let i = 0; i < currentClient.contacts.length; i++) {
    console.log(currentClient)
    createChangeNewContactElement(currentClient, i)
    contactsIndex++
    if (contactsIndex === 11) {
      addContactsBtn.classList.add('change-client-modal__add-contacts__btn--hidden');
      contactsList.style.marginBottom = '25px';
    }
  }

  document.onclick = (e) => {
    if (e.target.closest('.change-client-modal__overlay--active') && !e.target.closest('.modal__content') || e.target.closest('.change-client-modal__btn') || e.target.closest('.change-client-modal__add-contacts__btn-delete')) {
      closeChangeClientModal()
    };
  };

  addContactsBtn.onclick = (e) => {
    e.preventDefault()
    contactsIndex++
    if (contactsIndex === 11) {
      addContactsBtn.classList.add('change-client-modal__add-contacts__btn--hidden');
      contactsList.style.marginBottom = '25px';
    }

    if (contactsIndex < 12) {
      createChangeNewContactElement()

      changeClientBtn.disabled = true;
      const addContactsInputs = document.querySelectorAll('.add-contacts__input');
      let validateInput = false;
      let allValidateInputs = false;

      addContactsInputs.forEach((e) => {
          e.nextSibling.classList.add('add-contacts__delete-btn--active');
          document.querySelectorAll('.add-contacts__delete-btn').forEach((btn) => {
            btn.onclick = (e) => {
              e.preventDefault()
              btn.parentNode.remove()
              if (document.querySelectorAll('.add-contacts__input').length === 0) {
                changeClientBtn.disabled = false;
              }
            }
          })
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
            changeClientBtn.disabled = true;
          } else {
            validateInput = false
            e.style.outline = '1px solid #c8c5d1';
          }
          if (!validateInput && !allValidateInputs) {
            changeClientBtn.disabled = false;
          }

          if (contactsIndex === 11) {
            addContactsBtn.classList.add('change-client-modal__add-contacts__btn--hidden');
            contactsList.style.marginBottom = '25px';
          }

        }
      })
    }
  };

  const clientNameInp = document.querySelector('.change-client-modal__input-name');
  const clientLastNameInp = document.querySelector('.change-client-modal__input-lastname');
  const clientMiddleNameInp = document.querySelector('.change-client-modal__input-middlename');

  const contactInputs = document.querySelectorAll('.add-contacts__input');

  clientNameInp.value = currentClient.name;
  clientLastNameInp.value = currentClient.lastname;
  clientMiddleNameInp.value = currentClient.middlename;

  const changeDeleteContactBtn = document.querySelectorAll('.add-contacts__delete-btn');

  validateChangeClientForm()

  contactInputs.forEach((e) => {
      e.nextSibling.classList.add('add-contacts__delete-btn--active');
  });

  changeDeleteContactBtn.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault()
      btn.parentNode.remove()
    }
  })


  changeClientBtn.onclick = (e) => {
    e.preventDefault()
    let clientNameValue = clientNameInp.value;
    let clientLastNameValue = clientLastNameInp.value;
    let clientMiddleNameValue = clientMiddleNameInp.value;


    const contactChangeBtns = document.querySelectorAll('.add-contacts__change-btn');
    const contactInputs = document.querySelectorAll('.add-contacts__input');
    const contactsArr = [];

    contactInputs.forEach((e, index) => {
      let contact = contactChangeBtns[index].textContent.trim();
      let contactValue = e.value;

      let ClientContact = {
        type: contact,
        value: contactValue
      };

      contactsArr.push(ClientContact);
      return contactsArr;
    });

    addChangeClient(currentClient, clientNameValue, clientLastNameValue, clientMiddleNameValue, contactsArr)
  };


};

export const closeChangeClientModal = () => {
  contactsList.innerHTML = '';
  changeClientModal.classList.remove('change-client-modal--active');
  changeClientModalOverlay.classList.remove('change-client-modal__overlay--active');
  changeClientModalContent.classList.remove('change-client-modal__content--active');

  document.querySelectorAll('.add-contacts__change-list--active').forEach((el) => {
    el.classList.remove('add-contacts__change-list--active');
  });

  document.querySelectorAll('.add-contacts__change-btn--active').forEach((el) => {
    el.classList.remove('add-contacts__change-btn--active');
  });
};

export const validateChangeClientForm = () => {
  const contactInputs = document.querySelectorAll('.add-contacts__input');

  changeClientBtn.disabled = false;

  let isValidName = true;
  let isValidLastName = true;
  let isValidMiddleName = true;
  let allValidName = true;
  let allValidLastName = true;
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
      isValidName = true;
      allValidName = true;
    }

    contactInputs.forEach((input) => {
      if (input.value === '') {
        allValidateInputs = true;
        return allValidateInputs;
      } else {
        allValidateInputs = false;
      }
    })


    if (allValidName && allValidLastName && !allValidateInputs) {
      if (!isValidMiddleName) {
        changeClientBtn.disabled = false;
      }
    } else {
      changeClientBtn.disabled = true;
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
      isValidLastName = true;
      allValidLastName = true;
    }

    contactInputs.forEach((input) => {
      if (input.value === '') {
        allValidateInputs = true;
        return allValidateInputs;
      } else {
        allValidateInputs = false;
      }
    })

    if (allValidName && allValidLastName && !allValidateInputs) {
      if (!isValidMiddleName) {
        changeClientBtn.disabled = false;
      }
    } else {
      changeClientBtn.disabled = true;
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

    if (isValidName && isValidLastName && !isValidMiddleName) {
      changeClientBtn.disabled = false;
    } else {
      changeClientBtn.disabled = true;
    }
  };
};

const addChangeClient = async (currentClient, clientName, clientLastName, clientMiddleName, contactsArr) => {

  changeClientBtn.classList.add('change-client-modal__add-contacts__btn-save--visible');

  clientNameInp.disabled = true;
  clientLastNameInp.disabled = true;
  clientMiddleNameInp.disabled = true;
  changeClientBtn.disabled = true;
  addContactsBtn.disabled = true;


  try {
    await fetch(`${URL}/api/clients/${currentClient.id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: clientName,
        lastname: clientLastName,
        middlename: clientMiddleName,
        contacts: contactsArr,
        updatedAt: new Date().toISOString()
      })
    });
    await getClients()

    closeChangeClientModal()
    clientNameInp.disabled = false;
    clientLastNameInp.disabled = false;
    clientMiddleNameInp.disabled = false;
    changeClientBtn.disabled = false;
    addContactsBtn.disabled = false;

    changeClientBtn.classList.remove('change-client-modal__add-contacts__btn-save--visible');

  } catch (error) {
    console.error(error);
    changeClientBtn.classList.remove('change-client-modal__add-contacts__btn-save--visible');
    clientNameInp.disabled = false;
    clientLastNameInp.disabled = false;
    clientMiddleNameInp.disabled = false;
    changeClientBtn.disabled = false;
    addContactsBtn.disabled = false;
    throw error;
  }
};
