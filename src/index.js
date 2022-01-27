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
const totalHitsEl = document.querySelector('.total-hits');

const dataApiService = new DataApiService();

// let totalHitsResult = 0;

searchForm.addEventListener('submit', onCardSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

disable();


function onCardSearch(event) {
    event.preventDefault();
    disable();
    clearGalary();
    const inputElValue = event.currentTarget.elements.query.value;

    dataApiService.query = inputElValue;
    dataApiService.resetPage();
    dataApiService.fetchCards().then(object => {
        if (inputElValue === "" || inputElValue === " ") {
            Notify.info('You need tipe something');
            return;
        };
        Notify.success(`Hooray! We found ${object.totalHits} images.`);
        enable();
        makeGalaryMarkup(object.hits);
        
        
        // const pagesPerPage = dataApiService.queryPage * object.hits.length;
        // totalHitsResult += pagesPerPage;
    
    }).catch(error => {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    });
    event.currentTarget.elements.query.value = "";

};



function onLoadMore() {
    dataApiService.fetchCards().then(object => {
        makeGalaryMarkup(object.hits)
            
            .catch(error => {
            disable();
            totalHitsEl.textContent = "We're sorry, but you've reached the end of search results.";
        });

        // const pagesPerPage = dataApiService.queryPage * object.hits.length;
        // totalHitsResult += pagesPerPage;
        // if (totalHitsResult === object.totalHits) { 
        //     disable();
        //     totalHitsEl.textContent = "We're sorry, but you've reached the end of search results.";
        // };
    });

};

function makeGalaryMarkup(hits) { 
    const markup = hits.map(element => {return cardElementTpl(element);}).join('');
    galaryEl.insertAdjacentHTML("beforeend", markup) ;
    // console.log(markup);
    let gallery = new SimpleLightbox('.galary a', { captionsData: "alt", captionPosition: "bottom", captionDelay: "500"});

};



function clearGalary() {
    galaryEl.innerHTML = "";
};
 

function disable() {
    loadMoreBtn.classList.add('is-hidden');
};

function enable() { 
    loadMoreBtn.classList.remove('is-hidden');
};




















