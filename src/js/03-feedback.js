import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');

formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onFormSubmit);

populateInput();

const formData = {};

function onInputChange(event) {
    
    formData[event.target.name] = event.target.value;
    // console.log(formData);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

};

function onFormSubmit(event) {
    event.preventDefault();
    
    console.log(formData);
    

    event.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
};

function populateInput() { 
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const parsedFormData = JSON.parse(savedFormData);

    if (parsedFormData && Object.values(parsedFormData) !== []) { 
        if (parsedFormData.email) {
            inputEl.value = parsedFormData.email;
        };
        if (parsedFormData.message) {
            textareaEl.value = parsedFormData.message;
        };
        

        // formData.email = parsedFormData.email;
        // formData.message = parsedFormData.message;
    };
};
