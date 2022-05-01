//Импорт данных из других модулей.
import { imagePreviewPopup } from './utils.js';
import { openImagePreviewPopup } from './modal.js';

//Функция getElementMarkup получает шаблон элемента "карточка места" из HTML-разметки
//и возвращает клон соотв. узла DOM.
function getElementMarkup() {
  const elementTemplate = document.querySelector('#element-template').content;

  return elementTemplate.querySelector('.element').cloneNode(true);
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
  });

  elementMarkup.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const deletedElement = evt.target.closest('.element');
    deletedElement.remove();
  });
}

//Функция createCard принимает на вход параметры elementMarkup (HTML-разметка (шаблон) нового элемента "карточка места"),
//imgSrcValue (URL-адрес "карточки места") и titleValue (название "карточки места").
//Выполняет создание элемента новой "карточки места", заполняя шаблон данными, и устанавливая обработчики интерактивных событий.
//Возвращает HTML-разметку готового элемента "карточки места".
function createCard(elementMarkup, imgSrcValue, titleValue) {
  elementMarkup.querySelector('.element__title').textContent = titleValue;

  setEventListeners(elementMarkup, imgSrcValue, titleValue);

  return elementMarkup;
}


//Экспорт функций из модуля.
export { getElementMarkup, createCard };
