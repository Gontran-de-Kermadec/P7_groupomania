import axios from 'axios';

let userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log(userInfo);
let apiCallToken
let apiCall
if(userInfo !== null) {
    apiCallToken = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {'Authorization': `Bearer ${userInfo.token}`}
    });
} else {
    apiCall = axios.create({
        baseURL: 'http://localhost:3000'
    });
}

export {apiCallToken, apiCall};