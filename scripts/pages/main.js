import { initialCards } from "../components/initialCards.js";
import Card from "../components/Card.js";
import { validationSettings } from "../components/validationSettings.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import {
    popupEditProfile,
    editProfileOpenButton,
    popupAddPlace,
    addPlaceOpenButton,
    formAddPlace,
    placeTitleInput,
    placeImageInput,
    placeContainer,
    cardSelector,
    popupPreview,
    popupPreviewImage,
    popupPreviewTitle,
    formEditProfile,
    nameInput,
    jobInput,
    nameParagraph,
    jobParagraph
} from "../utilits/constants.js"

// функция отрисовки изначальных
const popupWithImage = new PopupWithImage(".popup_preview")

const initalCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardSelector, popupWithImage.handleCardClick.bind(popupWithImage))
        const cardElement = card.generateCard();
        initalCardList.addItem(cardElement)
    }
}, ".places")

initalCardList.renderItems()


popupWithImage.setEventListeners()


/* 
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
 */

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


/* const closeProfilePopup = function() {
    closePopup(popupEditProfile)
}

 */


/* initialCards.forEach((item) => {
    const newCard = createCard(item)
    placeContainer.append(newCard);
})

function createCard(item) {
    const card = new Card(item, cardSelector, openPreviewPopup);
    const cardElement = card.generateCard();
    return cardElement
} */


//функции для работы с попап добавления места
const openAddPlacePopup = function() {
        addPlaceFormValidator.cleanErrors()
        addPlaceFormValidator.resetSubmitButton()
        formAddPlace.reset()

        openPopup(popupAddPlace)
    }
    /* 
    function submitNewCard(evt) {
        evt.preventDefault();
        const newCard = createCard({ name: placeTitleInput.value, link: placeImageInput.value })
        placeContainer.prepend(newCard);
        placeTitleInput.value = "";
        placeImageInput.value = "";
        closePopup(popupAddPlace)
    }
     */

// функция открытия попап-превью
/* function openPreviewPopup(name, link, alt) {
    popupPreviewImage.src = link;
    popupPreviewImage.alt = alt;
    popupPreviewTitle.textContent = name;
    openPopup(popupPreview)
}

 */

//работа с валидацией форм добавления места и редактирования профайла
const addPlaceFormValidator = new FormValidator(validationSettings, formAddPlace)
addPlaceFormValidator.enableValidation()
const editProfileFormValidator = new FormValidator(validationSettings, formEditProfile)
editProfileFormValidator.enableValidation()

// слушатели
editProfileOpenButton.addEventListener("click", openProfilePopup);
formEditProfile.addEventListener('submit', submitEditProfileForm);
addPlaceOpenButton.addEventListener("click", openAddPlacePopup);
/* formAddPlace.addEventListener("submit", submitNewCard) */