export default class Api {
    constructor({ adress, token, groupId }) {
        this._adress = adress
        this._token = token
        this._groupId = groupId
    }

    // загрузка информации о пользователе с сервера
    getUsersInfo() {
            return fetch(`${this._adress}${this._groupId}/users/me `, {
                    headers: {
                        authorization: this._token
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(`Ошибка ${response.status}`)
                })

        }
        // загрузка карточек с сервера
    getCards() {
        return fetch(`${this._adress}${this._groupId}/cards`, {
                headers: {
                    authorization: this._token
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(`Ошибка ${response.status}`)
            })

    }

    // редактирование профиля
    editUsersProfile({ name, about }) {
        return fetch(`${this._adress}${this._groupId}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, about })

            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(`Ошибка ${response.status}`)
            })

    }

    // добавление новой карточки
    addCard(data) {
            return fetch(`${this._adress}${this._groupId}/cards`, {
                    method: "POST",
                    headers: {
                        authorization: this._token,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ name: data.name, link: data.link })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(`Ошибка ${response.status}`)
                })

        }
        // добавление лайка карточке
    setLike(cardId) {
        return fetch(`${this._adress}${this._groupId}/cards/likes/${cardId}`, {
                method: "PUT",
                headers: {
                    authorization: this._token,
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(`Ошибка ${response.status}`)
            })
    }


    // удаление лайка карточки
    removeLike(cardId) {
        return fetch(`${this._adress}${this._groupId}/cards/likes/${cardId}`, {
                method: "DELETE",
                headers: {
                    authorization: this._token,
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(`Ошибка ${response.status}`)
            })
    }





}