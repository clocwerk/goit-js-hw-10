import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './API/fetchCountries';
import Notiflix from 'notiflix';
//++++++++++++++++++++++++++++++++++++++++++//

const refs = {
  input: document.querySelector('#search-box'),
  DEBOUNCE_DELAY: 300,
  list: document.querySelector('.country-list'),
  box: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, refs.DEBOUNCE_DELAY));

function onInput(e) {
  const query = e.target.value.trim();
  refs.box.innerHTML = '';
  refs.list.innerHTML = '';
  if (query === '') {
    return;
  }

  fetchCountries(query)
    .then(createMakpUp)
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function createList(arr) {
  return arr
    .map(item => {
      return `<li class="country-item"><img class="country-img" src="${item.flags.svg}" alt="${item.name}" width="60"> <p class="country-title">${item.name}</pc></li>`;
    })
    .join('');
}

function createCountyCard(arr) {
  return `<article class="card"><h2 class="title">
            <img class="box-img" src="${arr[0].flags.svg}" alt="${
    arr[0].name
  }" width="60">${arr[0].name}
          </h2>
          <p class="text"> <span class="forhand">Capital: </span>${
            arr[0].capital
          }</p>
          <p class="text"> <span class="forhand">Population: </span>${
            arr[0].population
          }</p>
            <p class="text"> <span class="forhand">Languages: </span>${arr[0].languages
              .map(item => item.name)
              .join(' ,')}</p></article>`;
}

function createMakpUp(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length >= 2) {
    refs.list.innerHTML = createList(data);
  } else {
    refs.box.innerHTML = createCountyCard(data);
  }
}
