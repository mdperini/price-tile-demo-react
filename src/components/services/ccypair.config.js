export const HTTPGetConfig = {
    URL: 'http://localhost:3383/currencypairs',
    GetConfig : {
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
    }
    
}
