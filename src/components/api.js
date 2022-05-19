export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl,
        this._headers = headers
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfileData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    editProfileData(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(profileData)
        })
        .then(this._checkResponse);
    }

    editAvatarData(avatarData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatarData)
        })
        .then(this._checkResponse);
    }
    addNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardData)
        })
        .then(this._checkResponse)
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    changeLikesData(cardId, queryMethod) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: queryMethod,
        headers: this._headers
      })
      .then(this._checkResponse);
    }
}
