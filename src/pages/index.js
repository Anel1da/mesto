import "../pages/index.css";
import { initialCards } from "../scripts/utilits/initialCards.js";
import Card from "../scripts/components/Card.js";
import { validationSettings } from "../scripts/utilits/validationSettings.js"
import FormValidator from "../scripts/components/FormValidator.js"
import Section from "../scripts/components/Section.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import UserInfo from "../scripts/components/UserInfo.js"
import {
    editProfileOpenButton,
    addPlaceOpenButton,
    formAddPlace,
    cardSelector,
    formEditProfile,
    nameInput,
    jobInput,

} from "../scripts/utilits/constants.js"

//работа с карточками (отрисовка изначальных карточек, превью)

function createCard(item, cardSelector) {
    const card = new Card(item, cardSelector, popupWithImage.openPopup.bind(popupWithImage))
    const cardElement = card.generateCard();
    return cardElement

}

const popupWithImage = new PopupWithImage(".popup_preview")

const initalCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const newCard = createCard(item, cardSelector)
        initalCardList.addItem(newCard)
    }
}, ".places")

initalCardList.renderItems()


//работа с формой добавления карточки 

const popupWithCard = new PopupWithForm({
    popupSelector: ".popup_add-place",
    handleSubmitForm: (inputValues) => {
        const newCard = createCard({ name: inputValues.placeTitle, link: inputValues.placeImage }, cardSelector, popupWithImage.openPopup.bind(popupWithImage))
        initalCardList.addItem(newCard, true)
        popupWithCard.closePopup()
    }

})

const openAddPlacePopup = function() {
    addPlaceFormValidator.cleanErrors()
    addPlaceFormValidator.resetSubmitButton()
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