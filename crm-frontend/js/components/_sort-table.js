const sortTdId = document.querySelector('.clients__table-thead-td-id');
const sortTdFullName = document.querySelector('.clients__table-thead-td-fio');
const sortTdCreate = document.querySelector('.clients__table-thead-td-create');
const sortTdChange = document.querySelector('.clients__table-thead-td-change');



export const sortClientsId = (clientsArr) => {
  sortTdFullName.classList.remove('clients__table-thead-td-fio--active');
  sortTdFullName.getElementsByTagName('span')[0].textContent = 'А-Я';
  sortTdCreate.classList.remove('clients__table-thead-td-create--active');
  sortTdChange.classList.remove('clients__table-thead-td-change--active');
  if (sortTdId.classList.contains('clients__table-thead-td-id--active')) {
    clientsArr.sort((a, b) => clientsArr.indexOf(b) - clientsArr.indexOf(a));
    sortTdId.classList.remove('clients__table-thead-td-id--active');
  } else {
    sortTdId.classList.add('clients__table-thead-td-id--active');
    clientsArr.sort((a, b) => clientsArr.indexOf(a) - clientsArr.indexOf(b));
  }
};

export const sortClientsFullName = (clientsArr) => {
  sortTdId.classList.remove('clients__table-thead-td-id--active');
  sortTdCreate.classList.remove('clients__table-thead-td-create--active');
  sortTdChange.classList.remove('clients__table-thead-td-change--active');
  if (sortTdFullName.classList.contains('clients__table-thead-td-fio--active')) {
    clientsArr.sort((a, b) => {
      const fullNameA = `${a.lastname} ${a.name} ${a.middlename}`;
      const fullNameB = `${b.lastname} ${b.name} ${b.middlename}`;
      return fullNameA.localeCompare(fullNameB);
    });
    sortTdFullName.classList.remove('clients__table-thead-td-fio--active');
    sortTdFullName.getElementsByTagName('span')[0].textContent = 'А-Я';
  } else {
    sortTdFullName.classList.add('clients__table-thead-td-fio--active');
    sortTdFullName.getElementsByTagName('span')[0].textContent = 'Я-А';
    clientsArr.sort((a, b) => {
      const fullNameA = `${a.lastname} ${a.name} ${a.middlename}`;
      const fullNameB = `${b.lastname} ${b.name} ${b.middlename}`;
      return fullNameB.localeCompare(fullNameA);
    })
  }
};

export const sortClientsCreate = (clientsArr) => {
  sortTdId.classList.remove('clients__table-thead-td-id--active');
  sortTdFullName.classList.remove('clients__table-thead-td-fio--active');
  sortTdFullName.getElementsByTagName('span')[0].textContent = 'А-Я';
  sortTdChange.classList.remove('clients__table-thead-td-change--active');
  if (sortTdCreate.classList.contains('clients__table-thead-td-create--active')) {
    clientsArr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    sortTdCreate.classList.remove('clients__table-thead-td-create--active');
  } else {
    sortTdCreate.classList.add('clients__table-thead-td-create--active');
    clientsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

export const sortClientsChange = (clientsArr) => {
  sortTdId.classList.remove('clients__table-thead-td-id--active');
  sortTdCreate.classList.remove('clients__table-thead-td-create--active');
  sortTdFullName.classList.remove('clients__table-thead-td-fio--active');
  sortTdFullName.getElementsByTagName('span')[0].textContent = 'А-Я';
  if (sortTdChange.classList.contains('clients__table-thead-td-change--active')) {
    clientsArr.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    sortTdChange.classList.remove('clients__table-thead-td-change--active');
  } else {
    sortTdChange.classList.add('clients__table-thead-td-change--active');
    clientsArr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
};
