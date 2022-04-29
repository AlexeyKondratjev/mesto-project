//Импорт данных из других модулей.
import {
  profileEditPopup, elementAddPopup, elementAddForm, imagePreviewPopup, elementContainer, userName,
  aboutYourself, profileTitle, profileSubtitle
} from './utils.js';
import { getElementMarkup, createCard, insertNewElement } from './card.js';
import { toggleButtonState } from './validate.js';



//Функция closePopupByMouseDown - обработчик закрытия попапа щелчком мыши
//за пределами контейнера формы (на оверлее).
function closePopupByMouseDown(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

//Функция closePopupByEscapeKey - обработчик закрытия попапа по нажатию на клавишу "Escape".
function closePopupByEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
}

//Функция открывает попап (popup).
function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEscapeKey);
  document.addEventListener('mousedown', closePopupByMouseDown);

  popup.classList.add('popup_opened');
}

//Функция закрывает попап (popup).
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscapeKey);
  document.removeEventListener('mousedown', closePopupByMouseDown);

  popup.classList.remove('popup_opened');
}

//Функция открывает попап редактирования данных профиля пользователя.
function openProfileEditPopup() {
  userName.value = profileTitle.textContent;
  aboutYourself.value = profileSubtitle.textContent;
  const button = profileEditPopup.querySelector('.form__button');

  toggleButtonState([userName, aboutYourself], button, { inactiveButtonClass: 'form__button_disabled' });
  openPopup(profileEditPopup);
}

//Функция закрывает попап редактирования данных профиля пользователя.
function closeProfileEditPopup() {
  closePopup(profileEditPopup);
}

//Функция-обработчик события "submit" формы редактирования данных профиля пользователя.
function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();

  //У неактивной кнопки не должен срабатывать обработчик клика.
  if (evt.submitter.classList.contains('form__button_disabled')) return;

  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = aboutYourself.value;

  closeProfileEditPopup();
}

//Функция открывает попап добавления карточки нового "места".
function openElementAddPopup() {
  openPopup(elementAddPopup);
}

//Функция закрывает попап добавления карточки нового "места".
function closeElementAddPopup() {
  elementAddForm.elementSrc.value = '';
  elementAddForm.elementName.value = '';

  closePopup(elementAddPopup);
}

//Функция открывает попап просмотра изображения "места".
function openImagePreviewPopup() {
  openPopup(imagePreviewPopup);
}

//Функция закрывает попап просмотра изображения "места".
function closeImagePreviewPopup() {
  closePopup(imagePreviewPopup);
}

//Функция-обработчик события "submit" формы добавления данных нового "места".
function elementAddFormSubmitHandler(evt) {
  evt.preventDefault();

  //У неактивной кнопки не должен срабатывать обработчик клика.
  if (evt.submitter.classList.contains('form__button_disabled')) return;

  const imgSrcValue = elementAddForm.elementSrc.value;
  const titleValue = elementAddForm.elementName.value;

  const newElementMarkup = getElementMarkup();
  const newElement = createCard(newElementMarkup, imgSrcValue, titleValue);

  insertNewElement(newElement, elementContainer);

  closeElementAddPopup();
}

//Экспорт функций из модуля.
export {
  openProfileEditPopup, closeProfileEditPopup, openElementAddPopup, closeElementAddPopup, profileEditFormSubmitHandler,
  elementAddFormSubmitHandler, openImagePreviewPopup, closeImagePreviewPopup
};
