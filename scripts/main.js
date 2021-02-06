// открытие и закрытие попап редактирования профиля
let popupEditProfile = document.querySelector(".popup_edit-profile");
let editProfileOpenButton = document.querySelector(".profile__edit-button");
let editProfileCloseButton = popupEditProfile.querySelector(".popup__close-button");

// редактирование информации профиля
let formElement = document.querySelector(".form")
let nameInput = formElement.querySelector(".popup__input_type_name")
let jobInput = formElement.querySelector(".popup__input_type_job")
let nameParagraph = document.querySelector(".profile__name");
let jobParagraph = document.querySelector(".profile__job");
let closePopup = function() {
    popupEditProfile.classList.remove("popup_opened");
}
let openPopup = function() {
    popupEditProfile.classList.add("popup_opened");
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
editProfileOpenButton.addEventListener("click", openPopup);
editProfileCloseButton.addEventListener("click", closePopup);

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

//открытие и закрытие попап добавления места
let popupAddPlace = document.querySelector(".popup_add-place");
let addPlaceOpenButton = document.querySelector(".profile__add-button");
let addPlaceCloseButton = popupAddPlace.querySelector(".popup__close-button");
let addPlaceClosePopup = function() {
    popupAddPlace.classList.remove("popup_opened");
}
let addPlaceOpenPopup = function() {
    popupAddPlace.classList.add("popup_opened");

}

//слушатели на открытие и закрытие добавления места
addPlaceOpenButton.addEventListener("click", addPlaceOpenPopup);
addPlaceCloseButton.addEventListener("click", addPlaceClosePopup);