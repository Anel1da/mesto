export default class FormValidator {
    constructor(validationSettings, formElement) {
        this._formElement = formElement;
        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._inputErrorSelector = validationSettings.inputErrorSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._inputErrorClassActive = validationSettings.inputErrorClassActive;
        this._inputErrorStyleActive = validationSettings.inputErrorStyleActive
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }
    enableValidation() {
        this._setEventListeners()

    }

    cleanErrors() {

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        })
    }

    resetSubmitButton() {
        this._buttonElement.setAttribute("disabled", true);

    }

    _setEventListeners() {
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault()
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState(this._inputList, this._buttonElement)
            })
        })
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this._hideInputError(inputElement)
        }
    }
    _showInputError(inputElement) {
        inputElement.classList.add(this._inputErrorStyleActive)
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._inputErrorClassActive)
    }

    _hideInputError(inputElement) {
        inputElement.classList.remove(this._inputErrorStyleActive)
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._errorElement.textContent = "";
        this._errorElement.classList.remove(this._inputErrorClassActive)
    }

    _hasNotValidInput(inputList) {
        return inputList.some(
            (inputElement) => !inputElement.validity.valid)
    }


    _toggleButtonState(inputList, buttonElement) {
        if (this._hasNotValidInput(inputList)) {
            buttonElement.setAttribute("disabled", true)
        } else {
            buttonElement.removeAttribute("disabled", true)
        }

    }
}