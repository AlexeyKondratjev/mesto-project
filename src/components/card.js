//Импорт данных из других модулей.
import { imagePreviewPopup, allFetches } from '../utils/constants.js';
import { openImagePreviewPopup, openDeleteConfirmPopup } from './modal.js';


let deletedCardId = '';

//Функция getElementMarkup получает шаблон элемента "карточка места" из HTML-разметки
//и возвращает клон соотв. узла DOM.
function getElementMarkup() {
  const elementTemplate = document.querySelector('#element-template').content;
  const cloneNode = elementTemplate.querySelector('.element').cloneNode(true);

  return cloneNode;
}

//Функция setEventListeners принимает на вход параметр elementMarkup (HTML-разметка (шаблон) нового элемента "карточка места")
//и задает обработчики событий интерактивным элементам, присутствующим на карточке.
function setEventListeners(elementMarkup, imgSrcValue, titleValue) {
  const elementImage = elementMarkup.querySelector('.element__image');
  elementImage.src = imgSrcValue;
  elementImage.alt = titleValue;

  elementImage.addEventListener('click', function () {
    const imageToPreview = imagePreviewPopup.querySelector('.popup__image');
    const imageHeadingToPreview = imagePreviewPopup.querySelector('.popup__image-heading');

    imageToPreview.src = imgSrcValue;
    imageToPreview.alt = titleValue;
    imageHeadingToPreview.textContent = titleValue;

    openImagePreviewPopup();
  });

  elementMarkup.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-button_active');

    //Определяем метод запроса (что будем делать с лайками - добавлять, или удалять).
    const queryMethod = evt.target.classList.contains('like-button_active') ? 'PUT' : 'DELETE';

    //Изменяем информацию о лайках на сервере.
    allFetches.changeLikesData(evt.target.closest('.element').id, queryMethod)
      .then((result) => {
        //Обновляем отображение значения счетчика лайков в карточке (на клиенте).
        const likesCountElement = evt.target.closest('.element').querySelector('.element__likes-count');
        likesCountElement.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const deleteButton = elementMarkup.querySelector('.element__delete-button');

  if (deleteButton) {
    deleteButton.addEventListener('click', (evt) => {
      deletedCardId = evt.target.closest('.element').id;
      openDeleteConfirmPopup();
    });
  }
}

//Функция likedByCurrentUser принимает на вход параметры currentUserId (уникальный идентификатор текущего пользователя)
//и cardLikesArray (массив данных о пользователях, лайкнувших данную карточку).
//Возвращает true, если текущий пользователь есть среди пользователей, лайкнувших карточку, иначе - false.
function likedByCurrentUser(currentUserId, cardLikesArray) {
  return cardLikesArray.some((arrItem) => {
    return arrItem._id === currentUserId;
  });
}

//Функция createCard принимает на вход параметры elementMarkup (HTML-разметка (шаблон) нового элемента "карточка места"),
//imgSrcValue (URL-адрес "карточки места"), titleValue (название "карточки места"), idValue (уникальный идентификатор
//"карточки места") и likesCountValue (количество лайеков).
//Выполняет создание элемента новой "карточки места", заполняя шаблон данными, и устанавливая обработчики интерактивных событий.
//Возвращает HTML-разметку готового элемента "карточки места".
function createCard(elementMarkup, imgSrcValue, titleValue, idValue, likesArray, currentUserId, cardOwnerId) {
  elementMarkup.querySelector('.element__title').textContent = titleValue;
  elementMarkup.id = idValue;

  //Задаем состояние кнопки лайка (лайкнул ли карточку текущий пользователь) и количество лайков в целом.
  if (likedByCurrentUser(currentUserId, likesArray)) {
    elementMarkup.querySelector('.element__like-button').classList.add('like-button_active');
  } else {
    elementMarkup.querySelector('.element__like-button').classList.remove('like-button_active');
  };

  elementMarkup.querySelector('.element__likes-count').textContent = likesArray.length;

  //Определяем наличие кнопки удаления карточки (по условию: удалять можно только свои карточки).
  if (currentUserId !== cardOwnerId) {
    elementMarkup.querySelector('.element__delete-button').remove();
  }

  //Устанавливаем обработчики событий для активных элементов карточки.
  setEventListeners(elementMarkup, imgSrcValue, titleValue);

  return elementMarkup;
}


//Экспорт функций из модуля.
export { deletedCardId, getElementMarkup, createCard };
