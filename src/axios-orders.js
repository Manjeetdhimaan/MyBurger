import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-d52c7-default-rtdb.firebaseio.com/'
});


export default instance;