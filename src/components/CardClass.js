export default class Card {
  constructor({title, imageSrc, id, likesArray, cardOwnerId}, selector) {
    this._title = title;
    this._imageSrc = imageSrc;
    this._id = id;
    this._likesArray = likesArray;
    this._cardOwnerId = cardOwnerId;

    this._selector = selector;
  }

  //Метод _getElementMarkup получает шаблон элемента "карточки места" из HTML-разметки
  //и возвращает клон соотв. узла DOM.
  _getElementMarkup() {
    return document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
  }

  //Метод _isLikedByCurrentUser принимает на вход параметр currentUserId (уникальный идентификатор текущего пользователя).
  //Возвращает true, если текущий пользователь есть среди пользователей, лайкнувших данную карточку, иначе - false.
  _isLikedByCurrentUser(currentUserId) {
    return this._likesArray.some((arrItem) => {
      return arrItem._id === currentUserId;
    });
  }

  //Метод _currentUserIsOwner проверяет факт того, является ли текущий пользователь - владельцем данной карточки.
  //Принимает на вход параметр currentUserId (уникальный идентификатор текущего пользователя).
  //Возвращает true, если является, иначе - false.
  _currentUserIsOwner(currentUserId) {
    return this._cardOwnerId === currentUserId;
  }

  //Метод _setEventListeners задает обработчики событий интерактивным элементам, присутствующим на карточке.
  _setEventListeners() {
    const cardImage = this._element.querySelector('.card__image');

    cardImage.addEventListener('click', () => {
      /* const imageToPreview = imagePreviewPopup.querySelector('.popup__image');
      const imageHeadingToPreview = imagePreviewPopup.querySelector('.popup__image-heading');

      imageToPreview.src = imgSrcValue;
      imageToPreview.alt = titleValue;
      imageHeadingToPreview.textContent = titleValue;

      openImagePreviewPopup(); */
    });

    const cardLikeButton = this._element.querySelector('.card__like-button');

    cardLikeButton.addEventListener('click', () => {
      cardLikeButton.classList.toggle('like-button_active');

      //Определяем метод запроса (что будем делать с лайками - добавлять, или удалять).
      const queryMethod = cardLikeButton.classList.contains('like-button_active') ? 'PUT' : 'DELETE';

      //Изменяем информацию о лайках на сервере.
/*       changeLikesData(evt.target.closest('.card').id, queryMethod)
        .then((result) => {
          //Обновляем отображение значения счетчика лайков в карточке (на клиенте).
          const likesCountElement = evt.target.closest('.card').querySelector('.card__likes-count');
          likesCountElement.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        }); */
    });

    const cardDeleteButton = this._element.querySelector('.card__delete-button');

    if (cardDeleteButton) {
      cardDeleteButton.addEventListener('click', () => {
        console.log('Removing card... id:', cardDeleteButton.closest('.card').id);
        //deletedCardId = evt.target.closest('.card').id;
        //openDeleteConfirmPopup();
      });
    }
  }


  //Метод generateCard выполняет создание элемента новой "карточки места", заполняя шаблон данными,
  //и устанавливая обработчики интерактивных событий.
  //Возвращает HTML-разметку готового элемента "карточки места".
  generateCard(currentUserId) {
    this._element = this._getElementMarkup();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').src = this._imageSrc;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.id = this._id;

    //Задаем состояние кнопки лайка (лайкнул ли карточку текущий пользователь) и количество лайков в целом.
    if (this._isLikedByCurrentUser(currentUserId)) {
      this._element.querySelector('.card__like-button').classList.add('like-button_active');
    } else {
      this._element.querySelector('.card__like-button').classList.remove('like-button_active');
    };

    this._element.querySelector('.card__likes-count').textContent = this._likesArray.length;

    //Определяем наличие кнопки удаления карточки (по условию: удалять можно только свои карточки).
    if (!this._currentUserIsOwner(currentUserId)) {
      this._element.querySelector('.card__delete-button').remove();
    };

    //Устанавливаем обработчики событий для активных элементов карточки.
    this._setEventListeners();

    return this._element;
  }
}
