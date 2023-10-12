import { openDeleteClientModal } from "./_delete-client.js";

import { openChangeClientModal } from "./_change-client-form.js";

import { URL } from "./_settings.js";

const clientTableBody = document.querySelector('.clients__table-tbody');

export const getClients = async () => {
  document.querySelector('.clients__loader').classList.add('clients__loader--active');


  try {
    const response = await fetch(`${URL}/api/clients`);
    const clientsArr = await response.json();

    createClients(clientsArr);
    document.querySelector('.clients__loader').classList.remove('clients__loader--active');
    document.querySelector('.clients__loader').style.top = '20%'
    document.querySelector('.clients__table').classList.add('clients__table--active');
    document.querySelector('.clients__table-thead').classList.remove('clients__table-thead--active');
    document.querySelector('.clients__table-thead-tr').classList.remove('clients__table-thead-tr--active');
    document.querySelector('.clients__btn').classList.remove('clients__btn--hidden');
    document.querySelector('.clients__table').style.display = 'block'

    return clientsArr;
  } catch (error) {
    console.error(error);
    document.querySelector('.clients__loader').classList.remove('clients__loader--active');
    document.querySelector('.clients__loader').style.top = '20%'
    document.querySelector('.clients__table').classList.add('clients__table--active');
    document.querySelector('.clients__table-thead').classList.remove('clients__table-thead--active');
    document.querySelector('.clients__table-thead-tr').classList.remove('clients__table-thead-tr--active');
    document.querySelector('.clients__btn').classList.remove('clients__btn--hidden');
    document.querySelector('.clients__table').style.display = 'block'
    throw error;
  }
};

export const createClients = (clientsArr) => {
  console.log(clientsArr)

  clientTableBody.innerHTML = '';
  clientsArr.forEach((client) => {

    const clientTr = document.createElement('tr');
    clientTr.classList.add('clients__table-tbody-tr');

    const clientIndexTd = document.createElement('td');
    const clientFullNameTd = document.createElement('td');
    const clientDataCreateTd = document.createElement('td');
    const clientDataChangeTd = document.createElement('td');
    const clientContactsTd = document.createElement('td');
    const clientChangeTd = document.createElement('td');
    const clientDeleteTd = document.createElement('td');
    const clientActionsTd = document.createElement('td');

    clientIndexTd.classList.add('clients__table-tbody-td');
    clientFullNameTd.classList.add('clients__table-tbody-td');
    clientDataCreateTd.classList.add('clients__table-tbody-td');
    clientDataChangeTd.classList.add('clients__table-tbody-td');
    clientContactsTd.classList.add('clients__table-tbody-td', 'clients__table-tbody-td-contacs');
    clientActionsTd.classList.add('clients__table-tbody-td');

    const clientIndexSpan = document.createElement('span');
    const clientFullNameSpan = document.createElement('span');
    const clientDataChangeSpan = document.createElement('span');

    const clientContactsBtn = document.createElement('button');

    clientIndexSpan.classList.add('clients__table-tbody-td-id');
    clientFullNameSpan.classList.add('clients__table-tbody-td-fullname');
    clientDataChangeSpan.classList.add('clients__table-tbody-td-time-change');

    clientContactsBtn.classList.add('clients__table-tbody-td-contacs-btn');


    clientIndexSpan.textContent = client.id.slice(-5);


    clientFullNameSpan.textContent = `${client.lastname} ${client.name} ${client.middlename}`;


    const clientDataCreate = client.createdAt;
    const partsDataCreate = clientDataCreate.split('T')[0].split('-');
    const formattedDataCreate = `${partsDataCreate[2]}.${partsDataCreate[1]}.${partsDataCreate[0]}`;

    const clientDataTimeCreate = clientDataCreate.slice(11, 16);

    clientDataCreateTd.innerHTML = `
        ${formattedDataCreate}
        <span class="clients__table-tbody-td-time-create">${clientDataTimeCreate}</span>
      `;


    const clientDataChange = client.updatedAt;
    const partsDataChange = clientDataChange.split('T')[0].split('-');
    const formattedDataChange = `${partsDataChange[2]}.${partsDataChange[1]}.${partsDataChange[0]}`;

    const clientDataTimeChange = clientDataChange.slice(11, 16);

    clientDataChangeTd.innerHTML = `
        ${formattedDataChange}
        <span class="clients__table-tbody-td-time-create">${clientDataTimeChange}</span>
      `;

      const contactsBtnsBox = document.createElement('div');
      contactsBtnsBox.classList.add('contacts-btns-box');

    for (let i = 0; i < client.contacts.length; i++) {
      const contactBtn = document.createElement('button');
      contactBtn.classList.add('btn-reset', 'contact-btn');
      const contactLink = document.createElement('a');
      contactLink.classList.add('contact-btn__info');
      const contactLinkSpan = document.createElement('span');
      contactLinkSpan.classList.add('contact-btn__info-span');

      switch (client.contacts[i].type) {
        case 'Телефон':
          contactLink.href = `tel:${client.contacts[i].value}`
          contactLink.classList.add('contact-btn__info-phone');
        break;
        case 'Доп. телефон':
           contactLink.href = `tel:${client.contacts[i].value}`
           contactLink.classList.add('contact-btn__info-phone');
        break;
        case 'Email':
           contactLink.href = `mailto:${client.contacts[i].value}`
           contactLink.classList.add('contact-btn__info-mail');
        break;
        case 'Vk':
           contactLink.href = `https://vk.com/${client.contacts[i].value}`
           contactLink.classList.add('contact-btn__info-vk');
           contactLink.target = '_blank';
        break;
        case 'Facebook':
           contactLink.href = `https://facebook.com/${client.contacts[i].value}`
           contactLink.classList.add('contact-btn__info-fb');
           contactLink.target = '_blank';
        break;
      };
      contactLinkSpan.textContent = client.contacts[i].value;
      contactLink.innerHTML = `${client.contacts[i].type}: `;
      let visuallyContact = '';
      contactBtn.onclick = () => {
        document.querySelectorAll('.contact-btn__info').forEach((span) => {
          span.classList.remove('contact-btn__info--active');
        });
        contactLink.classList.add('contact-btn__info--active');
        setTimeout(() => {
          contactLink.classList.remove('contact-btn__info--active');
        }, 3500);
      };
      if (i < 4) {
        switch (client.contacts[i]?.type) {
          case 'Телефон': visuallyContact = `
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
              <circle cx="8" cy="8" r="8" fill="#9873FF"/>
              <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
              </g>
              </svg>
            `;
            break;
          case 'Доп. телефон': visuallyContact = `
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
              <circle cx="8" cy="8" r="8" fill="#9873FF"/>
              <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
              </g>
              </svg>
            `;
            break;
          case 'Email': visuallyContact = `
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
              </svg>
            `;
            break;
          case 'Vk': visuallyContact = `
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
              <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
              </g>
              </svg>
            `;
            break;
          case 'Facebook': visuallyContact = `
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
              <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
              </g>
              </svg>
            `;
            break;
        };
        contactBtn.innerHTML = visuallyContact;
        contactLink.appendChild(contactLinkSpan);
        contactBtn.append(contactLink);
        contactsBtnsBox.append(contactBtn);
        clientContactsTd.append(contactsBtnsBox);

        if (i === 3 && client.contacts.length > 5) {
          const contactBtn = document.createElement('button');

          const contactLink = document.createElement('a');
          contactLink.classList.add('contact-btn__info');
          contactLink.textContent = `${client.contacts[i + 1].type}: `;
          const contactLinkSpan = document.createElement('span');
          contactLinkSpan.classList.add('contact-btn__info-span');
          contactLinkSpan.textContent = client.contacts[i + 1].value;
          contactBtn.classList.add('btn-reset', 'contact-btn-count');
          contactBtn.textContent = `+${client.contacts.length - 4}`;
          contactBtn.addEventListener('click',() => {
            contactBtn.classList.add('contact-btn');
            contactBtn.classList.remove('contact-btn-count');
            let visuallyContact = '';
            switch (client.contacts[i + 1].type) {
              case 'Телефон':
                contactLink.href = `tel:${client.contacts[i + 1].value}`
                contactLink.classList.add('contact-btn__info-phone');
              break;
              case 'Доп. телефон':
                 contactLink.href = `tel:${client.contacts[i + 1].value}`
                 contactLink.classList.add('contact-btn__info-phone');
              break;
              case 'Email':
                 contactLink.href = `mailto:${client.contacts[i + 1].value}`
                 contactLink.classList.add('contact-btn__info-mail');
              break;
              case 'Vk':
                 contactLink.href = `https://vk.com/${client.contacts[i + 1].value}`
                 contactLink.classList.add('contact-btn__info-vk');
                 contactLink.target = '_blank';
              break;
              case 'Facebook':
                 contactLink.href = `https://facebook.com/${client.contacts[i + 1].value}`
                 contactLink.classList.add('contact-btn__info-fb');
                 contactLink.target = '_blank';
              break;
            };
            switch (client.contacts[i+1]?.type) {
              case 'Телефон': visuallyContact = `
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7">
                  <circle cx="8" cy="8" r="8" fill="#9873FF"/>
                  <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
                  </g>
                  </svg>
                `;
                break;
              case 'Доп. телефон': visuallyContact = `
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7">
                  <circle cx="8" cy="8" r="8" fill="#9873FF"/>
                  <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
                  </g>
                  </svg>
                `;
                break;
              case 'Email': visuallyContact = `
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
                  </svg>
                `;
                break;
              case 'Vk': visuallyContact = `
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7">
                  <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
                  </g>
                  </svg>
                `;
                break;
              case 'Facebook': visuallyContact = `
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7">
                  <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
                  </g>
                  </svg>
                `;
                break;
            };
            contactBtn.innerHTML = visuallyContact;
            contactLink.appendChild(contactLinkSpan);
            contactBtn.append(contactLink);
            for (let j = i + 2; j < client.contacts.length; j++) {
              const contactBtn = document.createElement('button');
              contactBtn.classList.add('btn-reset', 'contact-btn');

              const contactLink = document.createElement('a');
              contactLink.classList.add('contact-btn__info');
              const contactLinkSpan = document.createElement('span');
              contactLinkSpan.classList.add('contact-btn__info-span');
              contactLink.textContent = `${client.contacts[j].type}: `;
              contactLinkSpan.textContent = client.contacts[j].value;
              let visuallyContact = '';

              contactBtn.onclick = () => {
                document.querySelectorAll('.contact-btn__info').forEach((span) => {
                  span.classList.remove('contact-btn__info--active');
                });
                contactLink.classList.add('contact-btn__info--active');
                setTimeout(() => {
                  contactLink.classList.remove('contact-btn__info--active');
                }, 3500);
              };
              switch (client.contacts[j].type) {
                case 'Телефон':
                  contactLink.href = `tel:${client.contacts[j].value}`
                  contactLink.classList.add('contact-btn__info-phone');
                break;
                case 'Доп. телефон':
                   contactLink.href = `tel:${client.contacts[j].value}`
                   contactLink.classList.add('contact-btn__info-phone');
                break;
                case 'Email':
                   contactLink.href = `mailto:${client.contacts[j].value}`
                   contactLink.classList.add('contact-btn__info-mail');
                break;
                case 'Vk':
                   contactLink.href = `https://vk.com/${client.contacts[j].value}`
                   contactLink.classList.add('contact-btn__info-vk');
                   contactLink.target = '_blank';
                break;
                case 'Facebook':
                   contactLink.href = `https://facebook.com/${client.contacts[j].value}`
                   contactLink.classList.add('contact-btn__info-fb');
                   contactLink.target = '_blank';
                break;
              };
              switch (client.contacts[j]?.type) {
                case 'Телефон': visuallyContact = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7">
                    <circle cx="8" cy="8" r="8" fill="#9873FF"/>
                    <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
                    </g>
                    </svg>
                  `;
                  break;
                case 'Доп. телефон': visuallyContact = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7">
                    <circle cx="8" cy="8" r="8" fill="#9873FF"/>
                    <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
                    </g>
                    </svg>
                  `;
                  break;
                case 'Email': visuallyContact = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
                    </svg>
                  `;
                  break;
                case 'Vk': visuallyContact = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7">
                    <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
                    </g>
                    </svg>
                  `;
                  break;
                case 'Facebook': visuallyContact = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7">
                    <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
                    </g>
                    </svg>
                  `;
                  break;
              };
              contactBtn.innerHTML = visuallyContact;
              contactLink.appendChild(contactLinkSpan);
              contactBtn.append(contactLink);
              contactsBtnsBox.append(contactBtn);
            }
            contactBtn.onclick = () => {
              document.querySelectorAll('.contact-btn__info').forEach((span) => {
                span.classList.remove('contact-btn__info--active');
              });
              contactLink.classList.add('contact-btn__info--active');
              setTimeout(() => {
                contactLink.classList.remove('contact-btn__info--active');
              }, 3500);
            };
          }, { once: true });
          contactsBtnsBox.appendChild(contactBtn);
          continue
        }
      }
    };

    stateDeleteTd(clientDeleteTd)
    stateChangeTd(clientChangeTd)

    clientDeleteTd.onclick = async () => {
      clientDeleteTd.classList.add('clients__table-tbody-td-delete--active');
      clientDeleteTd.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="load" clip-path="url(#clip0_224_2792)">
        <path id="Vector" d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#F06A4D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </g>
        <defs>
        <clipPath id="clip0_224_2792">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        Удалить
      `;

      try {
        const response = await fetch(`${URL}/api/clients/${client.id}`);
        const currentClient = await response.json();

        openDeleteClientModal(currentClient)

        clientDeleteTd.classList.remove('clients__table-tbody-td-delete--active');
        clientDeleteTd.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="cancel" opacity="0.7" clip-path="url(#clip0_121_2305)">
          <path id="Vector" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
          </g>
          <defs>
          <clipPath id="clip0_121_2305">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          Удалить
        `;

      } catch (error) {
        console.error(error);
        clientDeleteTd.classList.remove('clients__table-tbody-td-delete--active');
        clientDeleteTd.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="cancel" opacity="0.7" clip-path="url(#clip0_121_2305)">
          <path id="Vector" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
          </g>
          <defs>
          <clipPath id="clip0_121_2305">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          Удалить
        `;
        throw error;
      }
    };

    clientChangeTd.onclick = async () => {
      clientChangeTd.classList.add('clients__table-tbody-td-change--active');
      clientChangeTd.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="load" clip-path="url(#clip0_224_2787)">
        <path id="Vector" d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </g>
        <defs>
        <clipPath id="clip0_224_2787">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        Изменить
      `;

      try {
        const response = await fetch(`${URL}/api/clients/${client.id}`);
        const currentClient = await response.json();

        openChangeClientModal(currentClient)

        clientChangeTd.classList.remove('clients__table-tbody-td-change--active');
        clientChangeTd.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="edit" opacity="0.7" clip-path="url(#clip0_121_2280)">
          <path id="Vector" d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
          </g>
          <defs>
          <clipPath id="clip0_121_2280">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          Изменить
        `;

      } catch (error) {
        console.error(error);
        clientChangeTd.classList.remove('clients__table-tbody-td-change--active');
        clientChangeTd.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="edit" opacity="0.7" clip-path="url(#clip0_121_2280)">
          <path id="Vector" d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
          </g>
          <defs>
          <clipPath id="clip0_121_2280">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          Изменить
        `;
        throw error;
      }
    };

    clientFullNameTd.append(clientFullNameSpan);
    clientIndexTd.append(clientIndexSpan);
    clientActionsTd.append(clientChangeTd, clientDeleteTd)
    clientTr.append(clientIndexTd, clientFullNameTd, clientDataCreateTd, clientDataChangeTd, clientContactsTd, clientActionsTd);
    clientTableBody.append(clientTr);
  });
};

function stateDeleteTd(clientDeleteTd) {
  // default
  clientDeleteTd.classList.add('clients__table-tbody-td-delete');
  clientDeleteTd.innerHTML = `
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <g id="cancel" clip-path="url(#clip0_121_1083)">
  <path id="Vector" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
  </g>
  <defs>
  <clipPath id="clip0_121_1083">
  <rect width="16" height="16" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  Удалить
`;
};

function stateChangeTd(clientChangeTd) {
  // default
  clientChangeTd.classList.add('clients__table-tbody-td-change');
  clientChangeTd.innerHTML = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="edit" opacity="0.7" clip-path="url(#clip0_121_2280)">
  <path id="Vector" d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
  </g>
  <defs>
  <clipPath id="clip0_121_2280">
  <rect width="16" height="16" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  Изменить
`;
};
