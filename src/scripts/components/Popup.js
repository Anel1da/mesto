export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector)
        this._handleEscClosePopup = this._handleEscClosePopup.bind(this);
    }
    openPopup() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClosePopup);

    }

    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClosePopup);
    }

    _handleEscClosePopup(evt) {
        if (evt.key === "Escape") {
            this.closePopup()
        }
    }

    _handleClickClosePopup(evt) {
        if (evt.target.classList.contains('popup__close-button') ||
            evt.target.classList.contains('popup')) {
            this.closePopup()
        }
    }
    setEventListeners() {
        this._popupElement.addEventListener('mousedown', this._handleClickClosePopup.bind(this))
    }
}