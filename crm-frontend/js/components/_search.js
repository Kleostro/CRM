import { createClients } from "./_render.js";

import { URL } from "./_settings.js";

const searchInp = document.querySelector('.header__input');

export const searching = () => {
  let delayTimeout;

    clearTimeout(delayTimeout);

    const searchString = searchInp.value;

    delayTimeout = setTimeout( async () => {
      fetch(`${URL}/api/clients/?search=${searchString}`)
        .then(response => response.json())
        .then(data => {
         createClients(data);
        })
        .catch(error => {
          console.error('Ошибка при запросе к API:', error);
        });
    }, 300);

}
