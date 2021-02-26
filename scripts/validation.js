const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationSettings)
    })
}


const setEventListeners = (formElement, validationSettings) => {
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));



    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", (event) => {
            checkInputValidity(formElement, inputElement, validationSettings)
            toggleButtonState(inputList, buttonElement)
        })
        toggleButtonState(inputList, buttonElement)
    })
}


const checkInputValidity = (formElement, inputElement, validationSettings) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, validationSettings)
    } else {
        hideInputError(formElement, inputElement, validationSettings)
    }

}

const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    console.log(inputElement.name, errorMessage);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
}
const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(validationSettings.errorClass);
}


const toggleButtonState = (inputList, buttonElement) => {
    const hasNotValidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid)

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true)
    } else {
        buttonElement.removeAttribute("disabled", true)
    }
}


enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
})