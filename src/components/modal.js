//Импорт данных из других модулей.
import {
  avatarEditPopup, profileEditPopup, elementAddPopup, elementAddForm, imagePreviewPopup, elementContainer, avatarSrc,
  userName, aboutYourself, profileTitle, profileSubtitle, profileAvatar
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

//Функция открывает попап редактирования данных аватара профиля пользователя.
function openAvatarEditPopup() {
  avatarSrc.value = profileAvatar.src;

  openPopup(avatarEditPopup);
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

//Функция отображает процесс загрузки данных в модальных окнах.
//Принимает на вход параметры isLoading (булев тип данных; признак того - загрузка активна, или нет) и 
//formElement (элемент - форма, отображение кнопки сабмита, которой изменяется в соответствии со статусом загрузки).
function renderLoadingProcess(isLoading, formElement) {
 const buttonElement = formElement.querySelector('.form__button');

  if (isLoading) {
    buttonElement.textContent = buttonElement.textContent + '...';
  } else {
    buttonElement.textContent = buttonElement.textContent.replace('...', '');
  }
}



//Экспорт функций из модуля.
export {
  openAvatarEditPopup, openProfileEditPopup, closePopup, openElementAddPopup, openImagePreviewPopup,
  renderLoadingProcess
};
