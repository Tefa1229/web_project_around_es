class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".gallery__image").src = this._link;
    this._element.querySelector(".gallery__title").textContent = this._name;
    return this._element;
  }
  _setEventListeners() {
    const likeButton = this._element.querySelector(".gallery__icon-like");
    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    const deleteButton = this._element.querySelector(".gallery__icon-delete");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    const cardImage = this._element.querySelector(".gallery__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".gallery__icon-like")
      .classList.toggle("gallery__icon-like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}

// Export the Card class

export default Card;
