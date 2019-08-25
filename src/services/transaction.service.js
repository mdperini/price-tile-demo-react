const userid = 'maria'

const renderHttpPostConfig = data => {
    return {
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
    }
  }

async function postData(url = '', data = {}, callbackFunc) {
    // Default options are marked with *
      try {
        console.log(JSON.stringify(renderHttpPostConfig(data)));
      await fetch(url, renderHttpPostConfig(data))
      .then(response =>  {
          return response.json();
        })
        .then(result => {
          callbackFunc(result);
        });    
    }
    catch (errorResponse) {
      callbackFunc(errorResponse);
    }      
  }

  export default function postTransaction(symbol, side, amount, callbackFunc) {
    const payload = {
      symbol: symbol,
      priceType: 'SPOT',
      side: side,
      amount
    };

    // console.log(JSON.stringify(payload));
    postData('http://localhost:3383/transactions', payload, callbackFunc);  
  }
