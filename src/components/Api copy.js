export default class Api {
    constructor() {
        this.baseUrl = 'https://nomoreparties.co/v1/plus-cohort-9',
        this.headers = {
            authorization: '15079f84-7c32-450a-9816-73a1a409c0ce',
            'Content-Type': 'application/json'
        }
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfileData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    editProfileData(profileData) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(profileData)
        })
        .then(this._checkResponse);
    }

    editAvatarData(avatarData) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatarData)
        })
        .then(this._checkResponse);
    }
    addNewCard(cardData) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(cardData)
        })
        .then(this._checkResponse)
    }

    removeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    changeLikesData(cardId, queryMethod) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: queryMethod,
        headers: this.headers
      })
      .then(this._checkResponse);
    }
}
