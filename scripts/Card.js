export default class Card {
    constructor(data, cardSelector, openPreviewPopup) {
        this._name = data.name
        this._image = data.link
        this._alt = data.alt
        this._cardSelector = cardSelector;
        this._openPreviewPopup = openPreviewPopup;

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
        return this._element;

    }


    _setEventListeners() {
        this._removeButton.addEventListener("click", () => {
            this._removeCard()
        })

        this._likeButton.addEventListener("click", () => {
            this._likeCard()
        })

        this._popupPreviewOpenButton.addEventListener("click", () => {
            this._openPreviewPopup(this._name, this._image, this._alt)
        })
    }


    _removeCard() {
        this._element.remove()
        this._element = null;
    }

    _likeCard() {
        this._likeButton.classList.toggle("place__like-icon_liked");
    }

}