const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = popup.querySelector(".popup__close-button");

const togglePopup = function() {
popup.classList.toggle("popup_opened");
}

popupOpenButton.addEventListener("click", togglePopup);  
popupCloseButton.addEventListener("click", togglePopup); 

