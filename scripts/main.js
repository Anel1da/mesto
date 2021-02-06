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
let closePopup = function() {
    popup.classList.remove("popup_opened");
}
let openPopup = function() {
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

//слушатели  - отправка формы
formElement.addEventListener('submit', submitForm);


const placesContainer = document.querySelector(".places");
const templatePlace = document.querySelector("template");
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: "Гора Архыз"

    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: "Фото реки зимой"
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: "Панельные дома"
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: "Горный пейзаж"
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: "Линия железной дороги в лесу"
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: "Скалистый берег озера Байкал"
    }
];


function getPlace(item) {
    const newPlace = templatePlace.content.cloneNode(true);
    const headerPlace = newPlace.querySelector(".place__title");
    const imagePlace = newPlace.querySelector(".place__image");
    headerPlace.textContent = item.name;
    imagePlace.src = item.link;
    imagePlace.alt = item.alt;

    return newPlace;
}

function render() {
    const initialPlaces = initialCards.map(getPlace)
    placesContainer.append(...initialPlaces);

}
render()