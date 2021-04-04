import { initialCards } from "../components/initialCards.js";
import Card from "../components/Card.js";
import { validationSettings } from "../components/validationSettings.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"
import {
    editProfileOpenButton,
    addPlaceOpenButton,
    formAddPlace,
    cardSelector,
    formEditProfile,
    nameInput,
    jobInput,

} from "../utilits/constants.js"

//работа с карточками (отрисовка изначальных карточек, превью)

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


//работа с формой добавления карточки 

const popupWithCard = new PopupWithForm({
    popupSelector: ".popup_add-place",
    handleSubmitForm: (inputValues) => {
        const newCard = new Card({ name: inputValues.placeTitle, link: inputValues.placeImage }, cardSelector, popupWithImage.handleCardClick.bind(popupWithImage))
        const cardElement = newCard.generateCard();
        initalCardList.addItem(cardElement, true)
        popupWithCard.closePopup()
    }

})

const openAddPlacePopup = function() {
    addPlaceFormValidator.cleanErrors()
    addPlaceFormValidator.resetSubmitButton()
    formAddPlace.reset()
    popupWithCard.openPopup()
}


// работа с формой добавления информации пользователя

const userInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userJobSelector: ".profile__job"
})

const openProfilePopup = function() {
    editProfileFormValidator.cleanErrors()
    popupWithProfile.openPopup()
    setProfileInputs()
}

const setProfileInputs = () => {
    nameInput.value = userInfo.getUserInfo().userName
    jobInput.value = userInfo.getUserInfo().userJob
}

const popupWithProfile = new PopupWithForm({
    popupSelector: ".popup_edit-profile",
    handleSubmitForm: (inputValues) => {
        userInfo.setUserInfo({
            name: inputValues.name,
            job: inputValues.job
        });
        popupWithProfile.closePopup()
    }
})


popupWithProfile.setEventListeners()
popupWithCard.setEventListeners()
popupWithImage.setEventListeners()

//работа с валидацией форм добавления места и редактирования профайла

const addPlaceFormValidator = new FormValidator(validationSettings, formAddPlace)
addPlaceFormValidator.enableValidation()
const editProfileFormValidator = new FormValidator(validationSettings, formEditProfile)
editProfileFormValidator.enableValidation()

// слушатели

editProfileOpenButton.addEventListener("click", openProfilePopup);
addPlaceOpenButton.addEventListener("click", openAddPlacePopup);