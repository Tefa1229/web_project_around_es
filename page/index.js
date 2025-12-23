import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//data
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Colorado",
    link: "images/colorado.jpg",
  },
  {
    name: "Vail",
    link: "images/vail.jpg",
  },
  {
    name: "Utah",
    link: "images/utah.jpg",
  },
  {
    name: "Gran Cañón",
    link: "images/grandCanyon.jpg",
  },
  {
    name: "Mill Valley",
    link: "images/millValley.jpg",
  },
];

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

//popup

const editProfilePopup = new PopupWithForm(
  "#popup__profile",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm("#popup__new-card", handleAddCardSubmit);
const imagePopup = new PopupWithImage("#popup__image");

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// Crear instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about",
});

// Configurar event listeners para cada popup
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

function handleProfileFormSubmit(inputData) {
  userInfo.setUserInfo({
    name: inputData.fname,
    job: inputData.aboutMe,
  });
  editProfilePopup.close();
}

function handleAddCardSubmit(inputData) {
  const newCardData = {
    name: inputData.title,
    link: inputData.imageLink,
  };

  const card = new Card(newCardData, "#card-template", handleCardClick);
  const newElement = card.generateCard();
  cardSection.addItem(newElement);
  addCardPopup.close();
}
//cards

const cardsContainer = document.querySelector(".gallery__container");

// Cards functionality
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      return card.generateCard();
    },
  },
  ".gallery__container"
);
cardSection.renderItems();

// Crear instancias de FormValidator
const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#popup__profile form")
);
const cardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#popup__new-card form")
);

// Activar validación
profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

// Conectar botón de editar perfil
openFormButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editProfilePopup.open();

  editProfilePopup.fillInputs({
    fname: userData.name,
    aboutMe: userData.job,
  });

  profileFormValidator.resetValidation();
});

// Conectar botón de agregar tarjeta
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
  addCardPopup.open();
});
