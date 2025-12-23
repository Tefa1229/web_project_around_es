class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }
  //show error
  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#error-${input.name}`
    );
    if (errorElement) {
      // Verificar que existe
      errorElement.classList.add(this._config.errorClass);
      errorElement.textContent = errorMessage;
      input.classList.add(this._config.inputErrorClass);
    }
  }

  // hide error
  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(
      `#error-${input.name}`
    );
    if (errorElement) {
      // Verificar que existe
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    }
  }

  // is valid
  _checkisValid(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  }
  //validate form (All)
  _hasFormErrors() {
    return this._inputList.some((input) => !input.validity.valid);
  }
  //button state
  _toggleButtonState() {
    if (this._hasFormErrors()) {
      // Si HAY errores → deshabilitar botón
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      // Si NO HAY errores → habilitar botón
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }
  //set event listeners to each form
  setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkisValid(input);
        this._toggleButtonState();
      });
    });
  }
  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}
//final
export default FormValidator;
