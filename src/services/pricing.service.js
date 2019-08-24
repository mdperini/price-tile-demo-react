import * as nes from '@hapi/nes/lib/client';
import { Subject } from 'rxjs';

let client;

export async function connect() {
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