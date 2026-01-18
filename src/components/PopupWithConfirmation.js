import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._confirmButton = this._form.querySelector(".popup__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmSubmit();
    });
  }

  setSubmitAction(action) {
    this._handleConfirmSubmit = action;
  }

  renderLoading(isLoading, loadingText = "Eliminando...") {
    if (isLoading) {
      this._confirmButton.textContent = loadingText;
      this._confirmButton.disabled = true;
    } else {
      this._confirmButton.textContent = "Si";
      this._confirmButton.disabled = false;
    }
  }
}
