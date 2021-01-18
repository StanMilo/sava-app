import {Storage} from './Storage';

export function HttpClient(url) {

    const token = Storage().get('access_token')

    const fetchApi = (method, params) => {
      const options = { 
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
      if(params) {
        options.body = JSON.stringify(params)
      }

      if(token) {
        options.headers.Authorization = `${token}`
      }
    
      return fetch(url, options)
        .then(response => response.json());
    }

    const post = (params) => {
      return fetchApi('POST', params)
    }  

    const get = () => {
      return fetchApi('GET')
    }  
      
    return {
      post,
      get
    }  

}