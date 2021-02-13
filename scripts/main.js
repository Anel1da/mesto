// открытие и закрытие попап редактирования профиля
const popupEditProfile = document.querySelector(".popup_edit-profile");
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const editProfileCloseButton = popupEditProfile.querySelector(".popup__close-button");

//  редактирование информации профиля
const formEditProfile = document.querySelector(".form_edit-profile")
const nameInput = formEditProfile.querySelector(".popup__input_type_name")
const jobInput = formEditProfile.querySelector(".popup__input_type_job")
const nameParagraph = document.querySelector(".profile__name");
const jobParagraph = document.querySelector(".profile__job");
const closeProfilePopup = function() {
    closePopup(popupEditProfile)
}

const openProfilePopup = function() {
    openPopup(popupEditProfile)
    nameInput.value = nameParagraph.textContent;
    jobInput.value = jobParagraph.textContent;
}


//  открытие и закрытие попап добавления места
const popupAddPlace = document.querySelector(".popup_add-place");
const addPlaceOpenButton = document.querySelector(".profile__add-button");
const addPlaceCloseButton = popupAddPlace.querySelector(".popup__close-button");
const addPlaceClosePopup = function() {
    closePopup(popupAddPlace)
}
const addPlaceOpenPopup = function() {
    openPopup(popupAddPlace)
}

//добавление места
const formAddPlace = document.querySelector(".form_add-place")
const placeTitleInput = document.querySelector(".popup__input_type_place-title")
const placeImageInput = document.querySelector(".popup__input_type_place-image")

//открытие и закрыте попап предпросмотра
const popupPreview = document.querySelector(".popup_preview");
const popupPreviewCloseButton = popupPreview.querySelector(".popup__close-button");
const popupPreviewImage = popupPreview.querySelector(".preview__image");
const popupPreviewTitle = popupPreview.querySelector(".preview__title");




// функции открытия и закрытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}


//отправка формы редактирования информации профиля

function submitForm(evt) {
    evt.preventDefault();
    nameParagraph.textContent = nameInput.value;
    jobParagraph.textContent = jobInput.value;
    closeProfilePopup()
}



//переменные массива с карточками

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


// функция добавления  карточек

function getPlace(item) {
    const newPlace = templatePlace.content.cloneNode(true);
    const placeTitle = newPlace.querySelector(".place__title");
    const placeImage = newPlace.querySelector(".place__image");
    const removeButton = newPlace.querySelector(".place__remove-icon");
    const likeButton = newPlace.querySelector(".place__like-icon");
    const popupPreviewOpenButton = newPlace.querySelector(".place__image");

    placeTitle.textContent = item.name;
    placeImage.src = item.link;
    placeImage.alt = item.alt;

    // функция удаления карточки

    function removePlace() {
        let listItem = removeButton.closest(".place");
        listItem.remove()
    }

    //функция добавления лайка  

    function addLike(evt) {
        evt.target.classList.toggle("place__like-icon_liked");
    }

    //превью карточки


    popupPreviewOpenButton.addEventListener("click", () => {
        openPopup(popupPreview)
        popupPreviewImage.src = item.link;
        popupPreviewTitle.textContent = item.name;
    })
    likeButton.addEventListener("click", addLike)
    removeButton.addEventListener("click", removePlace)

    return newPlace;
}


function render() {
    let initialPlaces = initialCards.map(getPlace)
    placesContainer.append(...initialPlaces);

}
render()


//отправка формы добавления места

function addPlace(evt) {
    evt.preventDefault();

    const newPlace = getPlace({ name: placeTitleInput.value, link: placeImageInput.value });
    placesContainer.prepend(newPlace);
    placeTitleInput.value = "";
    placeImageInput.value = "";
    addPlaceClosePopup();
}




//слушатели  - открытие и закрытие попапов
editProfileOpenButton.addEventListener("click", openProfilePopup);
editProfileCloseButton.addEventListener("click", closeProfilePopup);
addPlaceOpenButton.addEventListener("click", addPlaceOpenPopup);
addPlaceCloseButton.addEventListener("click", addPlaceClosePopup);
formAddPlace.addEventListener("submit", addPlace)
popupPreviewCloseButton.addEventListener("click", () => { closePopup(popupPreview) })

//слушатели  - отправка формы
formEditProfile.addEventListener('submit', submitForm);