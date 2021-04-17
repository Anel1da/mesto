export default class Card {
    constructor(data, user, cardSelector, { handleOpenPreview, handleSetLike, handleRemoveLike, handleDeleteCard }) {
        this._name = data.name
        this._image = data.link
        this._alt = data.alt
        this._cardSelector = cardSelector;
        this._id = data._id;
        this._likes = data.likes
        this._ownerId = data.owner._id;
        this._user = user;
        this._handleOpenPreview = handleOpenPreview;
        this._handleSetLike = handleSetLike;
        this._handleRemoveLike = handleRemoveLike;
        this._handleDeleteCard = handleDeleteCard

    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        this._removeButton = cardElement.querySelector(".place__remove-icon");
        this._likeButton = cardElement.querySelector(".place__like-icon");
        this._popupPreviewOpenButton = cardElement.querySelector(".place__image");

        return cardElement
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".place__title").textContent = this._name;
        this._placeImage = this._element.querySelector(".place__image");
        this._placeImage.src = this._image;
        this._placeImage.alt = this._alt;
        this._element.querySelector('.place__like-counter').textContent = this._likes.length;
        this._showTrashCan()
        this._likes.forEach(item => {
            if (item._id === this._user._id) {
                this._element.querySelector('.place__like-icon').classList.add('place__like-icon_liked');
            }
        })

        return this._element;

    }





    getCardId() {
        return this._id;
    }


    countLikes(counter) {
        this._element.querySelector('.place__like-counter').textContent = counter;
    }


    _setEventListeners() {
        this._removeButton.addEventListener("click", this._handleDeleteCard)

        this._likeButton.addEventListener("click", this._likeCard.bind(this))

        this._popupPreviewOpenButton.addEventListener("click", () => {
            this._handleOpenPreview(this._name, this._image, this._alt)
        })
    }


    removeCard() {
        this._element.remove()
        this._element = null;
    }

    _likeCard(evt) {
        if (evt.target.classList.contains('place__like-icon_liked')) {
            this._likeButton.classList.remove("place__like-icon_liked")
            this._handleRemoveLike()
        } else {
            this._likeButton.classList.add("place__like-icon_liked")
            this._handleSetLike()
        }

    }

    _showTrashCan() {
        if (this._ownerId === this._user._id) {
            this._removeButton.classList.add('place__remove-icon_active');
        }
    }



}