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

const popupWithImage = new PopupWithImage(".popup_preview")


function createCard(item) {
    const card = new Card(item, cardSelector, {
        handleOpenPreview: popupWithImage.openPopup.bind(popupWithImage),
        handleSetLike: () => {
            api.setLike(card.getCardId())
                .then(result => card.countLikes(result.likes.length))
                .catch(error => console.log(error))

        },
        handleRemoveLike: () => {
            api.removeLike(card.getCardId())
                .then(result => card.countLikes(result.likes.length))
                .catch(error => console.log(error))

        }

    })
    const cardElement = card.generateCard();
    return cardElement

}


const initalCardList = new Section({

    renderer: (item) => {
        const newCard = createCard(item, cardSelector)
        initalCardList.addItem(newCard)

    },
    containerSelector: ".places"
})


/* 
  api.getCards()
    .then(cards => {
        initalCardList.renderItems(cards)

    })
    .catch(error => console.log("Ошибка загрузки карточек")) */




//работа с формой добавления карточки 

const popupWithCard = new PopupWithForm({
    popupSelector: ".popup_add-place",
    handleSubmitForm: (data) => {
        api.addCard(data)
            .then(result => {

                const newCard = createCard({...data, _id: result._id, likes: result.likes })

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

const userInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userJobSelector: ".profile__job",
    userAvatarSelector: ".profile__photo"
})

/* api.getUsersInfo()
    .then((usersData) => {
        userInfo.setUserInfo(usersData)
    })
    .catch(error => console.log("Ошибка загрузки информации профиля")) */



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
            .then((userData) => {
                userInfo.setUserInfo(userData)
            })
            .catch(error => console.log("Ошибка редактирования информации профиля"))
        popupWithProfile.closePopup()
    }
})


Promise.all(
        [api.getUsersInfo(),
            api.getCards()
        ]
    ).then(result => {
        const [userData, initialCards] = result;
        userInfo.setUserInfo(userData);
        initalCardList.renderItems(initialCards);
        const user = userData

    })
    .catch(error => console.log(error))



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