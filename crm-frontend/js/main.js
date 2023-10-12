import { openClientModal, closeClientModal, animationFocusLabelClientModalInp, addClient } from "./components/_add-client.js";
import { getClients, createClients } from "./components/_render.js";
import { validateAddClientForm } from "./components/_add-client-form-validate.js";
import { sortClientsId, sortClientsFullName, sortClientsCreate, sortClientsChange} from "./components/_sort-table.js";
import { searching } from "./components/_search.js";

const addClientModalBtn = document.querySelector('.clients__btn');

const saveClientBtn = document.querySelector('.add-contacts__btn-save');

const clientNameInp = document.querySelector('.client-modal__input-name');
const clientLastNameInp = document.querySelector('.client-modal__input-lastname');
const clientMiddleNameInp = document.querySelector('.client-modal__input-middlename');

const sortTdId = document.querySelector('.clients__table-thead-td-id');
const sortTdFullName = document.querySelector('.clients__table-thead-td-fio');
const sortTdCreate = document.querySelector('.clients__table-thead-td-create');
const sortTdChange = document.querySelector('.clients__table-thead-td-change');

const searchInp = document.querySelector('.header__input');




addClientModalBtn.onclick = () => {
  openClientModal()
  animationFocusLabelClientModalInp()
  validateAddClientForm()
};

saveClientBtn.onclick = (e) => {
  e.preventDefault()

  let clientNameValue = clientNameInp.value;
  let clientLastNameValue = clientLastNameInp.value;
  let clientMiddleNameValue = clientMiddleNameInp.value;

  let contactsArr = [];


  const contactChangeBtns = document.querySelectorAll('.add-contacts__change-btn');
  const contactInputs = document.querySelectorAll('.add-contacts__input');

  contactInputs.forEach((e, index) => {
    let contact = contactChangeBtns[index].textContent.trim();
    let contactValue = e.value;

    let ClientContact = {
      type: contact,
      value: contactValue
    };

    contactsArr.push(ClientContact);
  });

  addClient(clientNameValue, clientLastNameValue, clientMiddleNameValue, contactsArr)
  clientNameInp.value = '';
  clientLastNameInp.value = '';
  clientMiddleNameInp.value = '';

  closeClientModal()

  document.querySelectorAll('.client-modal__input--active').forEach((el) => {
    el.classList.remove('client-modal__input--active');
  });
};


sortTdId.onclick = async () => {
  const clientsArr = await getClients()
  sortClientsId(clientsArr)
  createClients(clientsArr)
};

sortTdFullName.onclick = async () => {
  const clientsArr = await getClients()
  sortClientsFullName(clientsArr)
  createClients(clientsArr)
};

sortTdCreate.onclick = async () => {
  const clientsArr = await getClients()
  sortClientsCreate(clientsArr)
  createClients(clientsArr)
};

sortTdChange.onclick = async () => {
  const clientsArr = await getClients()
  sortClientsChange(clientsArr)
  createClients(clientsArr)
};

searchInp.addEventListener('input', searching)

getClients()
