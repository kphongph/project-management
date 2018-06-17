import { serviceUrl } from '../Config';

const documentLoader = (path,token,docId) => { 
  return new Promise((resolve,reject) => {
    fetch(serviceUrl + path+ '/data/' + docId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    })
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(err))
  })
}

export default documentLoader; 
