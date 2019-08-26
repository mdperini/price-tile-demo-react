export const userid = 'maria';

export const httpGetConfig = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'userid': userid
  },
  redirect: 'follow',
  referrer: 'no-referrer'
};

export const renderHTTPPostConfig = data => {
    return  {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'userid': userid
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    };      
  }
