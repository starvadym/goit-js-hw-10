// // Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name и возвращает
// //  промис с массивом стран - результатом запроса.Вынеси её в отдельный файл fetchCountries.js
// //  и сделай именованный экспорт.

import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const onInputDebounced = debounce(onInputHandle, DEBOUNCE_DELAY);
const refsInput = document.querySelector('#search-box');
const refsList = document.querySelector('.country-list');
const refsInfo = document.querySelector('.country-info');
let name = null;

refsInput.addEventListener('input', onInputDebounced);

function onInputHandle(e) {
    e.preventDefault();
        if (e.target.value.trim() === '') {
        updateCountries();
        return
    };
    name = e.target.value.trim();
    fetchCountries(name).then(onSuccess).catch(onError);
}

function onSuccess(data) {
    console.log(data.length);
    if (data.length === 1) {
      updateCountries();
      createCountryInfo(data);
    return;
  }
    if (data.length > 10) {
    updateCountries();
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
    }
   updateCountries();
   createCountryList(data);
}

function onError() {
  updateCountries();
  Notiflix.Notify.failure('Oops, there is no country with that name');
 }

function createCountryInfo (data) {
 const markup = data.map(country => {
        return `<img src="${country.flags.svg}" alt="Flag" width="30" height="24"></img>
                <h2 class="country-info-title">${country.name.official}</h2>
            <p>Capital: <span>${country.capital}</span></p>
            <p>Population: <span>${country.population}</span></p>
            <p>Languages: <span>${Object.values(country.languages)}</span></p>`
 })
     .join('');
    refsInfo.insertAdjacentHTML('beforeend', markup);
}

function createCountryList (data) {
    const markup = data.map(country => {
        return `<li class="country-list-item">
        <img class="flag" src="${country.flags.svg}" alt="Flag" width="20" height="16"></img>
        ${country.name.official}</li>`
    }).join('');
    refsList.insertAdjacentHTML('beforeend', markup);
}

function updateCountries() {
    refsList.innerHTML = '';
    refsInfo.innerHTML = '';
}


