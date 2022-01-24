import './sass/main.scss';
import cardElementTpl from './templates/card-element.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import DataApiService from './js/data-service.js';
import axios from "axios";

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galaryEl = document.querySelector('.gallery');

const dataApiService = new DataApiService();

searchForm.addEventListener('submit', onCardSearch);
loadMoreBtn.addEventListener('click', onLoadMore);



function onCardSearch(event) {
    event.preventDefault();
    clearGalary();

    dataApiService.query = event.currentTarget.elements.query.value;
    dataApiService.resetPage();
    dataApiService.fetchCards().then(makeGalaryMarkup);
    event.currentTarget.elements.query.value = "";

};
 
function onLoadMore() {
  
    dataApiService.fetchCards().then(makeGalaryMarkup);

};

function makeGalaryMarkup(hits) { 
    

    const markup = hits.map(element => {return cardElementTpl(element);}).join('');
    galaryEl.insertAdjacentHTML("beforeend", markup) ;
    console.log(markup);

};

function clearGalary() {
    galaryEl.innerHTML = "";
 };
 













// const axios = require('axios');

// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   }); 

// --------------------------

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }


