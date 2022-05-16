export default class Api {
    constructor() {
        this.baseUrl = 'https://nomoreparties.co/v1/plus-cohort-9',
        this.headers = {
            authorization: '48b44853-052f-4cb6-9199-05fafd5281f2',
            'Content-Type': 'application/json'
        }
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    getINitialCards = () => {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    patchUser(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }, ['name', 'about'])
        })
        .then(this._checkResponse);
    }

    patchAvatar(avatarLink) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarLink
            }, ['avatar'])
        })
        .then(this._checkResponse);
    }
    postCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }, ['name', 'link'])
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    putLikeOnCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers,
        })
        .then(this._checkResponse)
    }

    deleteLikeOnCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._checkResponse)
    }
}