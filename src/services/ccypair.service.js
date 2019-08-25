async function fetchCCYPairs(url = '', callbackFunc) {
    // Default options are marked with *
      await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'userid': 'maria'
        },
        redirect: 'follow',
        referrer: 'no-referrer'
      })
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
