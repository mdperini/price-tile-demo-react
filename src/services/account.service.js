import { httpGetConfig } from './http.config';

async function fetchAccounts(url = '', callbackFunc) {
    await fetch(url, httpGetConfig)
        .then(response => {
            return response.json();
        })
        .then(data => {
            callbackFunc(data)
        });
}

export default function getAccounts(callbackFunc) {
    fetchAccounts('http://localhost:3383/accounts', callbackFunc);
}