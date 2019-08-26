import { httpGetConfig, renderHTTPPostConfig } from './http.config';

const url = 'http://localhost:3383/preferences';

async function fetchPreferences(url = '', callbackFunc) {
    // Default options are marked with *
      await fetch( url, httpGetConfig )
        .then(response =>  {
          return response.json();
        })
        .then(data => {
          callbackFunc(data);
        });      
  }

  
  async function postData (url = '', data = {}, callbackFunc) {
    await fetch(url, renderHTTPPostConfig(data))
    .then(response =>  {
      return response.json();
    })
    .then(success => {
      callbackFunc(success);
    });      
  }

  export const getPreferences = callbackFunc => {
    fetchPreferences(url, callbackFunc);
  }

  export const savePreferences = (layoutConfig, callbackFunc) => {
    postData(url, layoutConfig, callbackFunc);  
  }  

