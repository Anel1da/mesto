// открытие и закрытие попап
let popup = document.querySelector(".popup");
let popupOpenButton = document.querySelector(".profile__edit-button");
let popupCloseButton = popup.querySelector(".popup__close-button");

// редактирование информации профиля
let formElement = document.querySelector(".form")
let nameInput = formElement.querySelector(".popup__input_type_name")
let jobInput = formElement.querySelector(".popup__input_type_job")
let nameParagraph = document.querySelector(".profile__name");
let jobParagraph = document.querySelector(".profile__job");
let closePopup = function () { 
  popup.classList.remove("popup_opened");
}
let openPopup = function () { 
    popup.classList.add("popup_opened");
    nameInput.value = nameParagraph.textContent;
    jobInput.value = jobParagraph.textContent;
  }


//отправка формы редактирования информации профиля

function submitForm(evt) {
    evt.preventDefault();

    nameParagraph.textContent = nameInput.value;
    jobParagraph.textContent = jobInput.value;
    closePopup();
}

//слушатели  - открытие и закрытие попап
popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);

//слушатели  - отпрака формы
formElement.addEventListener('submit', submitForm);
