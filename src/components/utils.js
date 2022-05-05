//Объявление констант.
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');

const deleteConfirmPopup = document.querySelector('.popup_type_deleteConfirm');
const avatarEditPopup = document.querySelector('.popup_type_avatarEdit');
const profileEditPopup = document.querySelector('.popup_type_profileEdit');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__toggle');
const avatarEditForm = document.forms.avatarEditForm;
const profileEditForm = document.forms.profileEditForm;
const elementAddForm = document.forms.elementAddForm;
const deleteConfirmForm = document.forms.deleteConfirmForm;

const popups = document.querySelectorAll('.popup');
const elementAddPopup = document.querySelector('.popup_type_elementAdd');
const elementAddPopupCloseButton = elementAddPopup.querySelector('.popup__toggle');


const imagePreviewPopup = document.querySelector('.popup_type_imagePreview');
const imagePreviewPopupCloseButton = imagePreviewPopup.querySelector('.popup__toggle');

const elementContainer = document.querySelector('.elements');

const avatarSrc = avatarEditForm.avatarSrc;
const userName = profileEditForm.userName;
const aboutYourself = profileEditForm.aboutYourself;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

//Функция отображает процесс загрузки данных в модальных окнах.
//Принимает на вход параметры isLoading (булев тип данных; признак того - загрузка активна, или нет), 
//formElement (элемент - форма, текст кнопки сабмита, которой изменяется в соответствии со статусом загрузки)
//и previousTextContent (предыдущее значение текста кнопки).
//Возвращает предыдущее значение текста кнопки (до изменения в теле функции).
function renderLoadingProcess(isLoading, formElement, previousTextContent) {
  const buttonElement = formElement.querySelector('.form__button');
  const previousValue = buttonElement.textContent;

  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = previousTextContent;
  }

  return previousValue;
}

//Экспорт констант из модуля.
export {
  avatarEditButton, profileEditButton, elementAddButton, deleteConfirmPopup, avatarEditPopup, profileEditPopup, profileEditPopupCloseButton,
  avatarEditForm, profileEditForm, elementAddPopup, elementAddPopupCloseButton, elementAddForm, imagePreviewPopup,
  imagePreviewPopupCloseButton, popups, elementContainer, avatarSrc, userName, aboutYourself, profileTitle, profileSubtitle,
  profileAvatar, deleteConfirmForm, validationOptions, renderLoadingProcess
};
