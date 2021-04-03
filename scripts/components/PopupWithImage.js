import Popup from "../components/Popup.js"
export default class PopupWithImage extends Popup {
    constructor(cardSelector) {
        super(cardSelector)
        this._image = this._popupElement.querySelector(".preview__image")
        this._title = this._popupElement.querySelector(".preview__title")
    }
    handleCardClick(name, link, alt) {
        super.openPopup()
        this._image.src = link;
        this._image.alt = alt;
        this._title.textContent = name;
    }
}