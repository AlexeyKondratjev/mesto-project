//Импорт данных из других модулей.
import { imagePreviewPopup, configData } from '../utils/constants.js';
import { openImagePreviewPopup, openDeleteConfirmPopup } from './modal.js';
import Api from './Api.js';
<<<<<<< HEAD:src/components/card.js
import PopupWithImage from './PopupWithImage.js';
=======
>>>>>>> 2adefd64224b4866ab8cace4daa4c9667adb86b4:src/components/__card.js

let deletedCardId = '';
const allFetches = new Api(configData);
const prewiewPopup = new PopupWithImage('.popup_type_imagePreview');
prewiewPopup.setEventListeners();
//Функция getElementMarkup получает шаблон элемента "карточка места" из HTML-разметки

//Функция getCardMarkup получает шаблон элемента "карточка места" из HTML-разметки
//и возвращает клон соотв. узла DOM.
function getCardMarkup() {
  const cardTemplate = document.querySelector('#card-template').content;
  const cloneNode = cardTemplate.querySelector('.card').cloneNode(true);
  return cloneNode;
}

//Функция setEventListeners принимает на вход параметр cardMarkup (HTML-разметка (шаблон) нового элемента "карточка места")
//и задает обработчики событий интерактивным элементам, присутствующим на карточке.
function setEventListeners(cardMarkup, imgSrcValue, titleValue) {
  const cardImage = cardMarkup.querySelector('.card__image');
  cardImage.src = imgSrcValue;
  cardImage.alt = titleValue;

  cardImage.addEventListener('click', function () {
    prewiewPopup.open(imgSrcValue, titleValue);
  });

  cardMarkup.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-button_active');

    //Определяем метод запроса (что будем делать с лайками - добавлять, или удалять).
    const queryMethod = evt.target.classList.contains('like-button_active') ? 'PUT' : 'DELETE';

    //Изменяем информацию о лайках на сервере.
    allFetches.changeLikesData(evt.target.closest('.card').id, queryMethod)

      .then((result) => {
        //Обновляем отображение значения счетчика лайков в карточке (на клиенте).
        const likesCountElement = evt.target.closest('.card').querySelector('.card__likes-count');
        likesCountElement.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const deleteButton = cardMarkup.querySelector('.card__delete-button');

  if (deleteButton) {
    deleteButton.addEventListener('click', (evt) => {
      deletedCardId = evt.target.closest('.card').id;
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

//Функция createCard принимает на вход параметры cardMarkup (HTML-разметка (шаблон) нового элемента "карточка места"),
//imgSrcValue (URL-адрес "карточки места"), titleValue (название "карточки места"), idValue (уникальный идентификатор
//"карточки места") и likesCountValue (количество лайеков).
//Выполняет создание элемента новой "карточки места", заполняя шаблон данными, и устанавливая обработчики интерактивных событий.
//Возвращает HTML-разметку готового элемента "карточки места".
function createCard(cardMarkup, imgSrcValue, titleValue, idValue, likesArray, currentUserId, cardOwnerId) {
  cardMarkup.querySelector('.card__title').textContent = titleValue;
  cardMarkup.id = idValue;

  //Задаем состояние кнопки лайка (лайкнул ли карточку текущий пользователь) и количество лайков в целом.
  if (likedByCurrentUser(currentUserId, likesArray)) {
    cardMarkup.querySelector('.card__like-button').classList.add('like-button_active');
  } else {
    cardMarkup.querySelector('.card__like-button').classList.remove('like-button_active');
  };

  cardMarkup.querySelector('.card__likes-count').textContent = likesArray.length;

  //Определяем наличие кнопки удаления карточки (по условию: удалять можно только свои карточки).
  if (currentUserId !== cardOwnerId) {
    cardMarkup.querySelector('.card__delete-button').remove();
  }

  //Устанавливаем обработчики событий для активных элементов карточки.
  setEventListeners(cardMarkup, imgSrcValue, titleValue);

  return cardMarkup;
}


//Экспорт функций из модуля.
export { deletedCardId, getCardMarkup, createCard };
