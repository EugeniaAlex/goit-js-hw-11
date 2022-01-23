// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const divGaleryEl = document.querySelector('.gallery');

function makeGaleryElementMarkup(item) {
    
    return `
  <a class="gallery__item" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      alt="${item.description}"
    />
  </a>`;
};

const makeGaleryElements = galleryItems.map(makeGaleryElementMarkup).join('');

divGaleryEl.insertAdjacentHTML('beforeend', makeGaleryElements);

let gallery = new SimpleLightbox('.gallery a', { captionsData: "alt", captionPosition: "bottom", captionDelay: "500"});


    
    


