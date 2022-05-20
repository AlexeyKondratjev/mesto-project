import Api from '../components/Api copy.js'
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');

export const deleteConfirmPopup = document.querySelector('.popup_type_deleteConfirm');
export const avatarEditPopup = document.querySelector('.popup_type_avatarEdit');
export const profileEditPopup = document.querySelector('.popup_type_profileEdit');
export const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__toggle');
export const avatarEditForm = document.forms.avatarEditForm;
export const profileEditForm = document.forms.profileEditForm;
export const cardAddForm = document.forms.cardAddForm;
export const deleteConfirmForm = document.forms.deleteConfirmForm;

export const popups = document.querySelectorAll('.popup');
export const cardAddPopup = document.querySelector('.popup_type_cardAdd');
export const cardAddPopupCloseButton = cardAddPopup.querySelector('.popup__toggle');


export const imagePreviewPopup = document.querySelector('.popup_type_imagePreview');
export const imagePreviewPopupCloseButton = imagePreviewPopup.querySelector('.popup__toggle');

export const elementContainer = document.querySelector('.elements');

export const avatarSrc = avatarEditForm.avatarSrc;
export const userName = profileEditForm.userName;
export const aboutYourself = profileEditForm.aboutYourself;
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');

export const validationOptions = {
  //formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};
export const allFetches = new Api();
