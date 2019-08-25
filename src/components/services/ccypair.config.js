export const HTTPGetConfig = {
    URL_CCYPAIRS: 'http://localhost:3383/currencypairs',
    URL_PREFERENCES: 'http://localhost:3383/preferences',

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
