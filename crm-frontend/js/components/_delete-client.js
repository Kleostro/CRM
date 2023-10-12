import { getClients } from "./_render.js";

import { URL } from "./_settings.js";

const deleteClientModal = document.querySelector('.delete-client-modal');
const deleteClientModalOverlay = document.querySelector('.delete-client-modal__overlay');
const deleteClientModalContent = document.querySelector('.delete-client-modal__content');

const deleteClientBtn = document.querySelector('.delete-client-modal__delete-btn');

export const openDeleteClientModal = (currentClient) => {
  deleteClientModal.classList.add('delete-client-modal--active');
  deleteClientModalOverlay.classList.add('delete-client-modal__overlay--active');
  deleteClientModalContent.classList.add('delete-client-modal__content--active');

  const idClient = currentClient.id;

  deleteClientBtn.onclick = () => {
    deleteClient(idClient)
    closeDeleteClientModal()
  };

  document.onclick = (e) => {
    if (e.target.closest('.delete-client-modal__overlay--active') && !e.target.closest('.delete-client-modal__content') || e.target.closest('.delete-client-modal__btn') ||  e.target.closest('.delete-client-modal__cancel-btn')) {
      closeDeleteClientModal()
    };
  };
};

export const closeDeleteClientModal = () => {
  deleteClientModal.classList.remove('delete-client-modal--active');
  deleteClientModalOverlay.classList.remove('delete-client-modal__overlay--active');
  deleteClientModalContent.classList.remove('delete-client-modal__content--active');
};


export const deleteClient = async (idClient) => {
  await fetch(`${URL}/api/clients/${idClient}`, {
      method: 'DELETE',
  });
  await getClients()
};
