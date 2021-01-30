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
let ClosePopup = function () { 
  popup.classList.toggle("popup_opened");
}
let OpenPopup = function () { 
    popup.classList.toggle("popup_opened");
    nameInput.value = nameParagraph.textContent;
    jobInput.value = jobParagraph.textContent;
  }


//отправка формы редактирования информации профиля

function submitForm(evt) {
    evt.preventDefault();

    nameParagraph.textContent = nameInput.value;
    jobParagraph.textContent = jobInput.value;
    ClosePopup();
}

//слушатели  - открытие и закрытие попап
popupOpenButton.addEventListener("click", OpenPopup);
popupCloseButton.addEventListener("click", ClosePopup);

//слушатели  - отпрака формы
formElement.addEventListener('submit', submitForm);
