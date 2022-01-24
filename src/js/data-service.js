
export default class DataApiService {
    constructor() {
        
        this.queryValue = '';
        
        this.page = 1;

    }

    async fetchCards() {
        const axios = require('axios').default;
        const options = {
            method: 'get',
            url: 'https://pixabay.com/api/',
            params: {
                key: '25379085-c749ac0d740d0e6dce2355ae5',
                q: this.queryValue,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 40,
                page: this.page,
            },
        };
        
        const startSearch = await axios(options);
        this.page += 1;
        return startSearch.data.hits;
    }

    
        
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.queryValue; 
    }

    set query(newQueryValue) {
        this.queryValue = newQueryValue;
    }
}