const showInputError = (formElement, inputElement, errorMessage) => {
    console.log(inputElement.name, errorMessage);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
}
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
}


const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage)
    } else {
        hideInputError(formElement, inputElement)
    }

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

const setEventListeners = (formElement) => {
    formElement.addEventListener("submit", (event) => {
        event.preventDefault()
    })
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__submit-button");


    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", (event) => {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        })
        toggleButtonState(inputList, buttonElement)
    })



}


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));
    formList.forEach(setEventListeners)
}

enableValidation()


formAddPlace.addEventListener("submit", addPlace)