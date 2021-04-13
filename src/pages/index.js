import "../pages/index.css";
import { initialCards } from "../scripts/utilits/initalCards.js";
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

import Api from "../scripts/components/Api.js"


const api = new Api({
    adress: "https://mesto.nomoreparties.co/v1/",
    token: "4342b75a-e8c5-4095-978c-b573b1ddd509",
    groupId: "cohort-22"
})


//работа с карточками (отрисовка изначальных карточек, превью)

function createCard(item, cardSelector) {
    const card = new Card(item, cardSelector, popupWithImage.openPopup.bind(popupWithImage))
    const cardElement = card.generateCard();
    return cardElement

}

const popupWithImage = new PopupWithImage(".popup_preview")

const initalCardList = new Section({

    renderer: (item) => {
        const newCard = createCard(item, cardSelector)
        initalCardList.addItem(newCard)

    },
    containerSelector: ".places"
})


api.getCards()
    .then(cards => {
        initalCardList.renderItems(cards)

    })
    .catch(error => console.log("Ошибка загрузки карточек"))




//работа с формой добавления карточки 

const popupWithCard = new PopupWithForm({
    popupSelector: ".popup_add-place",
    handleSubmitForm: (inputValues) => {
        api.addCard({ name: inputValues.placeTitle, link: inputValues.placeImage })
            .then((cardData) => {
                const newCard = createCard(cardData, cardSelector)
                initalCardList.addItem(newCard)
            })

        popupWithCard.closePopup()
    }

})

const openAddPlacePopup = function() {
    addPlaceFormValidator.cleanErrors()
    addPlaceFormValidator.resetSubmitButton()
    popupWithCard.openPopup()
}


// работа информацией пользователя


api.getUsersInfo()
    .then((usersData) => {
        userInfo.setUserInfo(usersData)
    })
    .catch(error => console.log("Ошибка загрузки информации профиля"))






const userInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userJobSelector: ".profile__job",
    userAvatarSelector: ".profile__photo"
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
    handleSubmitForm: () => {
        api.editUsersProfile({
                name: nameInput.value,
                about: jobInput.value
            })
            .then((usersData) => {
                userInfo.setUserInfo(usersData)
            })
            .catch(error => console.log("Ошибка редактирования информации профиля"))
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