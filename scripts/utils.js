export const initialCards = [
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

// Función genérica para abrir cualquier modal
export function openModal(modal) {
  modal.classList.add("popup_visible");
}

// Función genérica para cerrar cualquier modal
export function closeModal(modal) {
  modal.classList.remove("popup_visible");
}

// Función para cerrar modal con tecla Escape
export function closeModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

// Función para cerrar modal al hacer clic en el overlay
export function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("popup_visible")) {
    closeModal(evt.target);
  }
}
