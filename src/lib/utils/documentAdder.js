import { serviceUrl } from '../Config';

const documentAdder = (path,token,doc) => { 
  return new Promise((resolve,reject) => {
    fetch(serviceUrl + path+ '/data' , {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body:JSON.stringify(doc)
    })
    .then(response => response.json())
    .then(data => {
      if(data.ok) resolve(data)
      else reject();
    })
    .catch(err => reject(err))
  })
}

export default documentAdder; 
