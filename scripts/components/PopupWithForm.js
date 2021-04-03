import Popup from "../components/Popup.js"
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector)
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popupElement.querySelector(".form")
        this._popupInputList = this._popupElement.querySelectorAll(".popup__input");
        this._submitForm = this._submitForm.bind(this)

    }
    _getInputValues() {
        this._inputValues = {}
        this._popupInputList.forEach(input => { this._inputValues[input.name] = input.value });
        return this._inputValues
    }

    _submitForm(evt) {
        evt.preventDefault();
        this._handleSubmitForm(this._getInputValues())
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', this._submitForm);

    }

    closePopup() {
        super.closePopup()
        this._popupForm.reset()

    }

}