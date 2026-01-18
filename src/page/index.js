// IMPORTS
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";

// API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "a2c0143d-35cc-46a3-b06d-53668390077c",
    "Content-Type": "application/json",
  },
});

//  VALIDATION CONFIG
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// DOM ELEMENTS
const openFormButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

// USER INFO
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

// HANDLERS
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleDeleteCard(cardId, cardElement) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => deleteCardPopup.renderLoading(false));
  });
}

function handleAvatarFormSubmit(inputData) {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(inputData.imageLink)
    .then((userData) => {
      userInfo.setUserInfo({ avatar: userData.avatar });
      avatarPopup.close();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => avatarPopup.renderLoading(false));
}

function handleProfileFormSubmit(inputData) {
  editProfilePopup.renderLoading(true);
  api
    .updateUserInfo({
      name: inputData.fname,
      about: inputData.aboutMe,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => editProfilePopup.renderLoading(false));
}

function handleAddCardSubmit(inputData) {
  addCardPopup.renderLoading(true);
  api
    .addCard({
      name: inputData.title,
      link: inputData.imageLink,
    })
    .then((newCardData) => {
      const card = new Card(
        newCardData,
        "#card-template",
        handleCardClick,
        handleDeleteCard,
        handleLikeClick,
        currentUserId
      );
      cardSection.addItem(card.generateCard());
      addCardPopup.close();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => addCardPopup.renderLoading(false));
}
function handleLikeClick(cardId, isLiked) {
  if (isLiked) {
    api
      .removeLike(cardId)
      .then(() => {
        const cardElement = document.querySelector(
          `[data-card-id="${cardId}"]`
        );
        const card = cardElement._cardInstance;
        card.updateLikeState(false);
      })
      .catch((err) => console.log(`Error: ${err}`));
  } else {
    api
      .addLike(cardId)
      .then(() => {
        const cardElement = document.querySelector(
          `[data-card-id="${cardId}"]`
        );
        const card = cardElement._cardInstance;
        card.updateLikeState(true);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }
}

// SECTION FOR CARDS
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleCardClick,
        handleDeleteCard,
        handleLikeClick,
        currentUserId
      );
      return card.generateCard();
    },
  },
  ".gallery__container"
);

//  POP UPS
const editProfilePopup = new PopupWithForm(
  "#popup__profile",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm("#popup__new-card", handleAddCardSubmit);
const avatarPopup = new PopupWithForm("#popup__avatar", handleAvatarFormSubmit);
const imagePopup = new PopupWithImage("#popup__image");
const deleteCardPopup = new PopupWithConfirmation("#popup__delete-card");

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();

//  INITIAL LOAD
let currentUserId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardsData.forEach((cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleCardClick,
        handleDeleteCard,
        handleLikeClick,
        currentUserId
      );
      cardSection.addItem(card.generateCard());
    });
  })
  .catch((err) => console.log(`Error: ${err}`));

//  VALIDATORS
const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#popup__profile form")
);
const cardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#popup__new-card form")
);
const avatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#popup__avatar form")
);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();
avatarFormValidator.setEventListeners();

// BUTTON EVENTS
openFormButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editProfilePopup.open();
  editProfilePopup.fillInputs({
    fname: userData.name,
    aboutMe: userData.job,
  });
  profileFormValidator.resetValidation();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
  cardFormValidator.resetValidation();
});

avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidator.resetValidation();
});
