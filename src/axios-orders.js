import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://lestersburger.firebaseio.com/'
});

export default instance;