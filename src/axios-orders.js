import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-awesome-burger-in-react.firebaseio.com/'
});

export default instance;