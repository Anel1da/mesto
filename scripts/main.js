// открытие и закрытие попап редактирования профиля
let popupEditProfile = document.querySelector(".popup_edit-profile");
let editProfileOpenButton = document.querySelector(".profile__edit-button");
let editProfileCloseButton = popupEditProfile.querySelector(".popup__close-button");

// редактирование информации профиля
let formEditProfile = document.querySelector(".form_edit-profile")
let nameInput = formEditProfile.querySelector(".popup__input_type_name")
let jobInput = formEditProfile.querySelector(".popup__input_type_job")
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
formEditProfile.addEventListener('submit', submitForm);


let placesContainer = document.querySelector(".places");
let templatePlace = document.querySelector("template");
let initialCards = [{
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
    let newPlace = templatePlace.content.cloneNode(true);
    let placeTitle = newPlace.querySelector(".place__title");
    let placeImage = newPlace.querySelector(".place__image");
    let removeButton = newPlace.querySelector(".place__remove-icon");
    let likeButton = newPlace.querySelector(".place__like-icon");

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


    likeButton.addEventListener("click", addLike)
    removeButton.addEventListener("click", removePlace)





    return newPlace;

}


function render() {
    let initialPlaces = initialCards.map(getPlace)
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


let formAddPlace = document.querySelector(".form_add-place")
let placeTitleInput = document.querySelector(".popup__input_type_place-title")
let placeImageInput = document.querySelector(".popup__input_type_place-image")



//отправка формы добавления места

function AddPlace(evt) {
    evt.preventDefault();

    const newPlace = getPlace({ name: placeTitleInput.value, link: placeImageInput.value });
    placesContainer.prepend(newPlace);
    placeTitleInput.value = "";
    placeImageInput.value = "";
    addPlaceClosePopup();
}


//слушатели на открытие и закрытие попап добавления места, jотправки формы
addPlaceOpenButton.addEventListener("click", addPlaceOpenPopup);
addPlaceCloseButton.addEventListener("click", addPlaceClosePopup);
formAddPlace.addEventListener("submit", AddPlace)