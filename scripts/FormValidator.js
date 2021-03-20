export default class FormValidator {
    constructor(validationSettings, formElement) {
        this._formElement = formElement;
        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._inputErrorClassActive = validationSettings.inputErrorClassActive;
        this._inputErrorStyleActive = validationSettings.inputErrorStyleActive
    }
    enableValidation() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        this._inputList.forEach((inputElement) => {
            this._setEventListeners(inputElement)
            this._toggleButtonState(this._inputList, this._buttonElement)
        })

    }
    cleanErrors() {

        this._inputList.forEach((inputElement) => inputElement.classList.remove(this._inputErrorStyleActive))
        this._errorList = Array.from(this._formElement.querySelectorAll('.popup__input-error_active'))
        this._errorList.forEach((errorElement) => {
            errorElement.classList.remove("popup__input-error_active")
            errorElement.textContent = "";
        })
    }

    resetSubmitButton() {
        this._formElement.querySelector(this._submitButtonSelector).setAttribute("disabled", true);

    }

    _setEventListeners(inputElement) {
        inputElement.addEventListener("input", (event) => {
            this._checkInputValidity(inputElement)
            this._toggleButtonState(this._inputList, this._buttonElement)
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