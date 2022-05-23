//Импорт данных из других модулей.
import {
  /*avatarEditPopup,*/ profileEditPopup, cardAddPopup, imagePreviewPopup, elementContainer, avatarSrc,
  userName, aboutYourself, profileTitle, profileSubtitle, profileAvatar, deleteConfirmPopup, popups
} from '../utils/constants.js';
import { renderLoadingProcess } from './utils.js';
import { toggleButtonState } from './validate.js';



// const avaEditPopup = new PopupWithForm('.popup_type_avatarEdit',(evt) => {
//   evt.preventDefault();
//   const previousButtonTextContent = renderLoadingProcess(true, avatarEditForm, '');
//   //Сохраняем отредактированные данные на сервере.
//   allFetches.editAvatarData({ avatar: avatarSrc.value })
//     .then((result) => {
//       profileAvatar.src = result.avatar;
//       avaEditPopup.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoadingProcess(false, avatarEditForm, previousButtonTextContent);
//     });
// });
// avaEditPopup.setEventListeners();

//Функция closePopupByEscapeKey - обработчик закрытия попапа по нажатию на клавишу "Escape".
function closePopupByEscapeKey(evt) {
  console.log(evt.key);
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
// function openAvatarEditPopup() {
//   avatarSrc.value = profileAvatar.src;

//   openPopup(avatarEditPopup);
// }
// function openAvatarEditPopup() {
//   avaEditPopup.open();
// }

//Функция открывает попап редактирования данных профиля пользователя.
function openProfileEditPopup() {
  userName.value = profileTitle.textContent;
  aboutYourself.value = profileSubtitle.textContent;

  openPopup(profileEditPopup);
}

//Функция открывает попап добавления карточки нового "места".
function openCardAddPopup() {
  openPopup(cardAddPopup);
}

//Функция открывает попап просмотра изображения "места".
// function openImagePreviewPopup() {
//   openPopup(imagePreviewPopup);
// }

//Функция открывает попап подтверждения удаления карточки.
function openDeleteConfirmPopup() {
  openPopup(deleteConfirmPopup);
}


//Задаем для всех попапов обработчики события "mousedown" для возможности закрытия по клику на оверлее.
// popups.forEach((popupItem) => {
//   popupItem.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__toggle')) {
//       closePopup(popupItem);
//     }
//   });
// });



//Экспорт функций из модуля.
export {
  /*openAvatarEditPopup,*/ openProfileEditPopup, closePopup, openCardAddPopup, /*openImagePreviewPopup,*/ openDeleteConfirmPopup
};
