import * as nes from '@hapi/nes/lib/client';
import { Subject } from 'rxjs';

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

export function subscribeForLivePrices(symbol) {
    const subject = new Subject();
    console.log('getLivePrices', symbol);
   
    connect().then(() => {
      const handler = (update, flags) => {
        subject.next(update);
      };
      client.subscribe('/price/' + symbol, handler);
    });

    return subject;
  }
