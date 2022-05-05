const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '15079f84-7c32-450a-9816-73a1a409c0ce',
    'Content-Type': 'application/json'
  }
}

//Функция getInitialCards обращается к серверу и получает данные всех карточкек учебной группы.
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Функция getProfileData обращается к серверу и получает данные профиля текущего пользователя.
const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Функция editAvatarData обращается к серверу и сохраняет там измененные на клиенте 
//данные аватара профиля текущего пользователя (ссылку на изображение).
//Принимает на вход параметр avatarData (объект со сcылкой на изображение (ключ: "avatar"), которое необходимо сохранить).
const editAvatarData = (avatarData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, { 
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify(avatarData)})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Функция editProfileData обращается к серверу и сохраняет там измененные на клиенте 
//данные профиля текущего пользователя.
//Принимает на вход параметр profileData (объект с данными пользователя (ключи: "name", "about"), которые необходимо сохранить).
const editProfileData = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, { 
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify(profileData)})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Функция addNewCard обращается к серверу и сохраняет там данные новой карточки.
//Принимает на вход параметр cardData (объект с данными карточки (ключи: "name", "link"), которые необходимо сохранить).
const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, { 
    method: 'POST', 
    headers: config.headers,
    body: JSON.stringify(cardData)})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Функция removeCard обращается к серверу и удаляет там данные карточки.
//Принимает на вход параметр cardId (уникальный идентификатор карточки, которую нужно удалить).
const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Функция changeLikesData обращается к серверу и изменяет там данные о лайках карточки.
//Принимает на вход параметры cardId (уникальный идентификатор карточки, информацию о лайках которой надо изменить) и
//queryMethod (метод запроса: "PUT" - для добавления лайка, "DELETE" - для удаления лайка).
const changeLikesData = (cardId, queryMethod) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: queryMethod, 
    headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export { getInitialCards, getProfileData, editAvatarData, editProfileData, addNewCard, removeCard, changeLikesData };