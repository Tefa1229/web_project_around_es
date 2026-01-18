class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
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
    this._element.setAttribute("data-card-id", this._id);
    this._element._cardInstance = this;

    // ocultar botón eliminar si no es propietario
    if (this._ownerId !== this._currentUserId) {
      this._element.querySelector(".gallery__icon-delete").style.display =
        "none";
    }

    // estado like
    if (this._isLiked) {
      this._element
        .querySelector(".gallery__icon-like")
        .classList.add("gallery__icon-like_active");
    }

    return this._element;
  }
  _setEventListeners() {
    const likeButton = this._element.querySelector(".gallery__icon-like");
    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    const deleteButton = this._element.querySelector(".gallery__icon-delete");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    const cardImage = this._element.querySelector(".gallery__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeIcon() {
    this._handleLikeClick(this._id, this._isLiked);
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  updateLikeState(isLiked) {
    this._isLiked = isLiked;
    const likeButton = this._element.querySelector(".gallery__icon-like");

    if (isLiked) {
      likeButton.classList.add("gallery__icon-like_active");
    } else {
      likeButton.classList.remove("gallery__icon-like_active");
    }
  }
}

// Export the Card class

export default Card;
