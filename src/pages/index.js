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
    popupUpdateAvatarOpenButton,
    formUpdateAvatar

} from "../scripts/utilits/constants.js"

import Api from "../scripts/components/Api.js"


let user = null


const api = new Api({
    adress: "https://mesto.nomoreparties.co/v1/",
    token: "4342b75a-e8c5-4095-978c-b573b1ddd509",
    groupId: "cohort-22"
})




//работа с карточками (отрисовка изначальных карточек, превью)

const popupWithImage = new PopupWithImage(".popup_preview")


function createCard(item, user) {
    const card = new Card(item, user, cardSelector, {
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

        },
        handleDeleteCard: () => {
            popupConfirmDelete.openPopup()
            cardToRemove = card

        }

    })
    const cardElement = card.generateCard();
    return cardElement

}


const initalCardList = new Section({

    renderer: (item) => {
        const newCard = createCard(item, user, cardSelector)
        initalCardList.addItem(newCard)


    },
    containerSelector: ".places"
})




//работа с формой добавления карточки 

const popupWithCard = new PopupWithForm({
    popupSelector: ".popup_add-place",
    handleSubmitForm: (data) => {
        popupWithCard.renderLoading(true, 'Сохранение...', "");
        api.addCard(data)
            .then(result => {
                const newCard = createCard(result, result.owner)
                initalCardList.addItem(newCard)
                popupWithCard.closePopup()
            })
            .catch(error => console.log(error))
            .finally(popupWithCard.renderLoading(false, 'Создать'))


    }

})

const openAddPlacePopup = function() {
    addPlaceFormValidator.cleanErrors()
    addPlaceFormValidator.resetSubmitButton()
    popupWithCard.openPopup()
}

//удаление карточек
let cardToRemove = null

const popupConfirmDelete = new PopupWithForm({
    popupSelector: ".popup_confim_delete",
    handleSubmitForm: () => {
        api.deleteCard(cardToRemove.getCardId())
            .then(() => {
                cardToRemove.removeCard()
                popupConfirmDelete.closePopup()
            })
            .catch(error => console.log(error))

    }
})




// работа информацией пользователя

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
        popupWithProfile.renderLoading(true, 'Сохранение...');
        api.editUsersProfile({
                name: nameInput.value,
                about: jobInput.value
            })
            .then((userData) => {
                userInfo.setUserInfo(userData)
                userInfo.setUserAvatar(userData)
                popupWithProfile.closePopup()
            })
            .catch(error => console.log(error))
            .finally(popupWithProfile.renderLoading(false, 'Сохранить'))


    }
})

//работа с обновлением аватара

const popupUpdateAvatar = new PopupWithForm({
    popupSelector: ".popup_update-avatar",
    handleSubmitForm: () => {
        popupUpdateAvatar.renderLoading(true, 'Сохранение...');
        api.updateAvatar(popupUpdateAvatar._getInputValues())
            .then((res) => {
                userInfo.setUserAvatar(res)
                popupUpdateAvatar.closePopup()
            })

        .catch(error => console.log(error))
            .finally(popupUpdateAvatar.renderLoading(false, 'Сохранить'))

    }

})

const openUpdateAvatarPopup = function() {
    updateAvatarFormValidator.cleanErrors()
    updateAvatarFormValidator.resetSubmitButton()
    popupUpdateAvatar.openPopup()
}



Promise.all(
        [api.getUsersInfo(),
            api.getCards()
        ]
    ).then(result => {
        const [userData, initialCards] = result;
        userInfo.setUserInfo(userData);
        userInfo.setUserAvatar(userData);
        user = userData
        initalCardList.renderItems(initialCards);


    })
    .catch(error => console.log(error))



popupWithProfile.setEventListeners()
popupWithCard.setEventListeners()
popupWithImage.setEventListeners()
popupUpdateAvatar.setEventListeners()
popupConfirmDelete.setEventListeners()


//работа с валидацией форм добавления места и редактирования профайла

const addPlaceFormValidator = new FormValidator(validationSettings, formAddPlace)
addPlaceFormValidator.enableValidation()
const editProfileFormValidator = new FormValidator(validationSettings, formEditProfile)
editProfileFormValidator.enableValidation()
const updateAvatarFormValidator = new FormValidator(validationSettings, formUpdateAvatar)
updateAvatarFormValidator.enableValidation()

// слушатели

editProfileOpenButton.addEventListener("click", openProfilePopup);
addPlaceOpenButton.addEventListener("click", openAddPlacePopup);
popupUpdateAvatarOpenButton.addEventListener("click", openUpdateAvatarPopup);