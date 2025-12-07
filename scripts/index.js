import Card from "./Card.js";
import {
  initialCards,
  openModal,
  closeModal,
  closeModalOnEscape,
  closeModalOnOverlay,
} from "./utils.js";
import { enableValidation, resetValidation } from "./FormValidator.js";

//calls to close modals with Escape and overlay
document.addEventListener("keydown", closeModalOnEscape);
document.addEventListener("click", closeModalOnOverlay);

//config validation

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const openFormButton = document.querySelector(".profile__edit-button");
const fName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about");
const inputName = document.querySelector("#fname");
const inputaboutMe = document.querySelector("#aboutMe");

//popup
const popupProfile = document.querySelector("#popup__profile");
const closeButtonProfile = popupProfile.querySelector(".popup__close-button");
const form = document.querySelector(".popup__form");

//cards

const cardsContainer = document.querySelector(".gallery__container");

//new cards
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#popup__new-card");
const closeButtonCard = newCardPopup.querySelector(".popup__close-button");
const formNewCard = document.forms["new-card"];

//edit functionality
function openProfilePopup() {
  inputName.value = fName.textContent;
  inputaboutMe.value = aboutMe.textContent;

  openModal(popupProfile);
}

openFormButton.addEventListener("click", openProfilePopup);
closeButtonProfile.addEventListener("click", closeProfilePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  fName.textContent = inputName.value;
  aboutMe.textContent = inputaboutMe.value;
  closeProfilePopup();
}

function closeProfilePopup() {
  closeModal(popupProfile);
  inputName.value = fName.textContent;
  inputaboutMe.value = aboutMe.textContent;
  resetValidation(form, validationConfig);
}

form.addEventListener("submit", handleFormSubmit);

// Cards functionality
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

//new card functionality

addButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const titleValue = evt.target.title.value;
  const imageLinkValue = evt.target.imageLink.value;
  const newCardData = {
    name: titleValue,
    link: imageLinkValue,
  };
  const card = new Card(newCardData, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closeNewCardPopup();
});

function closeNewCardPopup() {
  closeModal(newCardPopup);
  formNewCard.reset();
  resetValidation(formNewCard, validationConfig);
}
closeButtonCard.addEventListener("click", closeNewCardPopup);

//Popup Images
const imagePopup = document.querySelector("#popup__image");
const closeButtonImage = imagePopup.querySelector(".popup__close-button");

//popup imagenes
cardsContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("gallery__image")) {
    openModal(imagePopup);

    const popupImage = imagePopup.querySelector(".popup__images");
    const caption = imagePopup.querySelector(".popup__caption");
    const cardTitle = evt.target
      .closest(".gallery__card")
      .querySelector(".gallery__title");

    popupImage.src = evt.target.src;
    popupImage.alt = cardTitle.textContent;
    caption.textContent = cardTitle.textContent;
  }
});
closeButtonImage.addEventListener("click", function () {
  closeModal(imagePopup);
});

enableValidation(validationConfig);
