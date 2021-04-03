// переменные - открытие и закрытие попап редактирования профиля
export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const editProfileOpenButton = document.querySelector(".profile__edit-button");


//переменные -   открытие и закрытие попап добавления места
export const popupAddPlace = document.querySelector(".popup_add-place");
export const addPlaceOpenButton = document.querySelector(".profile__add-button");


//переменные добавления места
export const formAddPlace = document.querySelector(".form_add-place");
export const placeTitleInput = document.querySelector(".popup__input_type_place-title");
export const placeImageInput = document.querySelector(".popup__input_type_place-image");
export const placeContainer = document.querySelector('.places');
export const cardSelector = '.template_type_default';

//переменные -открытие и закрыте попап предпросмотра
export const popupPreview = document.querySelector(".popup_preview");
export const popupPreviewImage = popupPreview.querySelector(".preview__image");
export const popupPreviewTitle = popupPreview.querySelector(".preview__title");

// форма редактирование информации профиля
export const formEditProfile = document.querySelector(".form_edit-profile");
export const nameInput = formEditProfile.querySelector(".popup__input_type_name");
export const jobInput = formEditProfile.querySelector(".popup__input_type_job");
export const nameParagraph = document.querySelector(".profile__name");
export const jobParagraph = document.querySelector(".profile__job");