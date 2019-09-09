import * as nes from '@hapi/nes/lib/client';
import { Subject } from 'rxjs';;

var priceSubscribers = new Map();

export const renderPips = (price, part) => {
  if (!price) {
    // display dashes until data is received
    return '--';
  }

  const strPrice = price.toString();

  if (part === 1) {
    return strPrice.substring(0, 4);
   } else if (part === 2) {
    return strPrice.substring(4, 4 + 2);
   }

  return strPrice.substring(4 + 2, strPrice.length);
}  

let client;

async function connect() {
  if (!client) {
    client = new nes.Client('ws://localhost:3383');
    await client.connect();
  }

  return client;
}

const addSubscribers = (symbol) => {
  let count = priceSubscribers.get(symbol);
  if (isNaN(count)) {
    count = 0;
  }
  
  priceSubscribers.set(symbol, ++count);
}

const removeSubscribers = (symbol) => {
  let count = priceSubscribers.get(symbol);
  if (isNaN(count) || count === 0) {
    return;
  }
  
  priceSubscribers.set(symbol, --count);
}

export function subscribeForLivePrices(symbol) {
  const subject = new Subject();
  addSubscribers(symbol);
  connect().then(() => {
    const tickHandler = (update, flags) => {
      const count = priceSubscribers.get(symbol);
      if (isNaN(count) || count < 1)
        return;
        
        console.log(`price tick =>${JSON.stringify(update)}`);
        subject.next(update);
    };

    client.subscribe('/price/' + symbol, tickHandler);
  });

  return subject;
}

export function unsubscribeForLivePrices(symbol) {
  if (symbol) 
    removeSubscribers(symbol);    
}
