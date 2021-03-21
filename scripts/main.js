import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import { validationSettings } from "./validationSettings.js"
import FormValidator from "./FormValidator.js"


// переменные - открытие и закрытие попап редактирования профиля
const popupEditProfile = document.querySelector(".popup_edit-profile");
const editProfileOpenButton = document.querySelector(".profile__edit-button");


//переменные -   открытие и закрытие попап добавления места
const popupAddPlace = document.querySelector(".popup_add-place");
const addPlaceOpenButton = document.querySelector(".profile__add-button");


//переменные добавления места
const formAddPlace = document.querySelector(".form_add-place");
const placeTitleInput = document.querySelector(".popup__input_type_place-title");
const placeImageInput = document.querySelector(".popup__input_type_place-image");
const placeContainer = document.querySelector('.places');
const cardSelector = '.template_type_default';

//переменные -открытие и закрыте попап предпросмотра
const popupPreview = document.querySelector(".popup_preview");
const popupPreviewImage = popupPreview.querySelector(".preview__image");
const popupPreviewTitle = popupPreview.querySelector(".preview__title");

// форма редактирование информации профиля
const formEditProfile = document.querySelector(".form_edit-profile");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");
const nameParagraph = document.querySelector(".profile__name");
const jobParagraph = document.querySelector(".profile__job");


//функции открытия попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupWithEscape);
    popup.addEventListener('mousedown', closePopupWithClick);
}


//функциии закрытия попап
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keyup', closePopupWithEscape);
    popup.removeEventListener('mousedown', closePopupWithClick);
}

function closePopupWithEscape(evt, formElement) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup)

    }
}

function closePopupWithClick(evt) {
    if (evt.target.classList.contains('popup__close-button') ||
        evt.target.classList.contains('popup')) {
        const popupItem = evt.target.closest('.popup');
        closePopup(popupItem)
    }
}


//функции для работы с попап редактирования профиля

const setProfileInputs = () => {
    nameInput.value = nameParagraph.textContent;
    jobInput.value = jobParagraph.textContent;
}
const openProfilePopup = function() {
    editProfileFormValidator.cleanErrors()
    openPopup(popupEditProfile)
    setProfileInputs()
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    nameParagraph.textContent = nameInput.value;
    jobParagraph.textContent = jobInput.value;
    closeProfilePopup()
}


const closeProfilePopup = function() {
    closePopup(popupEditProfile)
}


// функция отрисовки изначальных
initialCards.forEach((item) => {
    const newCard = createCard(item)
    placeContainer.append(newCard);
})

function createCard(item) {
    const card = new Card(item, cardSelector, openPreviewPopup);
    const cardElement = card.generateCard();
    return cardElement
}

// функция открытия попап-превью
function openPreviewPopup(name, link, alt) {
    popupPreviewImage.src = link;
    popupPreviewImage.alt = alt;
    popupPreviewTitle.textContent = name;
    openPopup(popupPreview)
}


//функции для работы с попап добавления места
const openAddPlacePopup = function() {
    addPlaceFormValidator.cleanErrors()
    addPlaceFormValidator.resetSubmitButton()
    formAddPlace.reset()

    openPopup(popupAddPlace)
}

function submitNewCard(evt) {
    evt.preventDefault();
    const newCard = createCard({ name: placeTitleInput.value, link: placeImageInput.value })
    placeContainer.prepend(newCard);
    placeTitleInput.value = "";
    placeImageInput.value = "";
    closePopup(popupAddPlace)
}


//работа с валидацией форм добавления места и редактирования профайла
const addPlaceFormValidator = new FormValidator(validationSettings, formAddPlace)
addPlaceFormValidator.enableValidation()
const editProfileFormValidator = new FormValidator(validationSettings, formEditProfile)
editProfileFormValidator.enableValidation()

// слушатели
editProfileOpenButton.addEventListener("click", openProfilePopup);
formEditProfile.addEventListener('submit', submitEditProfileForm);
addPlaceOpenButton.addEventListener("click", openAddPlacePopup);
formAddPlace.addEventListener("submit", submitNewCard)