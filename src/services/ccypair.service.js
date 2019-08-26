import { httpGetConfig } from './http.config';

async function fetchCCYPairs(url = '', callbackFunc) {
    // Default options are marked with *
      await fetch(url, httpGetConfig) 
      .then(response =>  {
        return response.json();
      })
      .then(data => {
        callbackFunc(data);
      });      
  }

  export default function getCCYPairs(callbackFunc) {
    fetchCCYPairs('http://localhost:3383/currencypairs', callbackFunc);
  }
