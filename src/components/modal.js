//Импорт данных из других модулей.
import {
  profileEditPopup, elementAddPopup, elementAddForm, imagePreviewPopup, elementContainer, userName,
  aboutYourself, profileTitle, profileSubtitle
} from './utils.js';
import { toggleButtonState } from './validate.js';



//Функция closePopupByEscapeKey - обработчик закрытия попапа по нажатию на клавишу "Escape".
function closePopupByEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    closePopup(popupOpened);
  }
}

//Функция открывает попап (popup).
function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEscapeKey);

  popup.classList.add('popup_opened');
}

//Функция закрывает попап (popup).
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscapeKey);

  popup.classList.remove('popup_opened');
}

//Функция открывает попап редактирования данных профиля пользователя.
function openProfileEditPopup() {
  userName.value = profileTitle.textContent;
  aboutYourself.value = profileSubtitle.textContent;

  openPopup(profileEditPopup);
}

//Функция открывает попап добавления карточки нового "места".
function openElementAddPopup() {
  openPopup(elementAddPopup);
}

//Функция открывает попап просмотра изображения "места".
function openImagePreviewPopup() {
  openPopup(imagePreviewPopup);
}



//Экспорт функций из модуля.
export {openProfileEditPopup, closePopup, openElementAddPopup, openImagePreviewPopup};
