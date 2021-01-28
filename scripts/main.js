//закрытие и открытие попап
const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = popup.querySelector(".popup__close-button");

const togglePopup = function () {
    popup.classList.toggle("popup_opened");
}

popupOpenButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);

//редактирование информации профиля

let formElement = document.querySelector(".form")
let nameInput = formElement.querySelector(".popup__input_name")
let jobInput = formElement.querySelector(".popup__input_job")

function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameParagraph = document.querySelector(".profile__name");
    let jobParagraph = document.querySelector(".profile__job");

    nameParagraph.textContent = nameInput.value;
    jobParagraph.textContent = jobInput.value;

    popup.classList.toggle("popup_opened");
}
formElement.addEventListener('submit', formSubmitHandler);
