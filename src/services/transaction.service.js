import notificationService from './notification.service';

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

export async function postData(url = '', data = {}) {
    // Default options are marked with *
      try {
        console.log(JSON.stringify(renderHttpPostConfig(data)));
      await fetch(url, renderHttpPostConfig(data))
      .then(response =>  {
          return response.json();
        })
        .then(result => {
          notificationService.sendMessage(`order was executed! result ${JSON.stringify(result)}`);
        });    
    }
    catch (errorResponse) {
      //handle error
      console.log(errorResponse);
      notificationService.sendMessage('order failed???');
    }      
  }

  export function postTransaction(symbol, side, amount) {
    const payload = {
      symbol: symbol,
      priceType: 'SPOT',
      side: side,
      amount
    };

    // console.log(JSON.stringify(payload));
    postData('http://localhost:3383/transactions', payload);  
  }
