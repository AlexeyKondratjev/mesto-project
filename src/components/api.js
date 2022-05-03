const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '15079f84-7c32-450a-9816-73a1a409c0ce',
    'Content-Type': 'application/json'
  }
}

function getInitialCards() {
  return fetch('', {});
} 

export {getInitialCards};