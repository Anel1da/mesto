const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = popup.querySelector(".popup__close-button");

const togglePopup = function () {
    popup.classList.toggle("popup_opened");
}

popupOpenButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);

// Находим форму в DOM
let formElement = document.querySelector(".form")// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".popup__input_name") // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".popup__input_job")// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();


    const nameParagraph = document.querySelector(".profile__name");
    console.log(nameInput.value);
    nameParagraph.textContent = nameInput.value;

    const jobParagraph = document.querySelector(".profile__job");
    console.log(jobInput.value);
    jobParagraph.textContent = jobInput.value;
}

// Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.
// О том, как это делать, расскажем позже.
// Получите значение полей jobInput и nameInput из свойства value
// Выберите элементы, куда должны быть вставлены значения полей
// Вставьте новые значения с помощью textContent
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);