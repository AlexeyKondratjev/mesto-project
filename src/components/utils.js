//Объявление констант.
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');

const avatarEditPopup = document.querySelector('.popup_type_avatarEdit');
const profileEditPopup = document.querySelector('.popup_type_profileEdit');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__toggle');
const avatarEditForm = document.forms.avatarEditForm;
const profileEditForm = document.forms.profileEditForm;

const popups = document.querySelectorAll('.popup');
const elementAddPopup = document.querySelector('.popup_type_elementAdd');
const elementAddPopupCloseButton = elementAddPopup.querySelector('.popup__toggle');
const elementAddForm = document.forms.elementAddForm;

const imagePreviewPopup = document.querySelector('.popup_type_imagePreview');
const imagePreviewPopupCloseButton = imagePreviewPopup.querySelector('.popup__toggle');

const elementContainer = document.querySelector('.elements');

const avatarSrc = avatarEditForm.avatarSrc;
const userName = profileEditForm.userName;
const aboutYourself = profileEditForm.aboutYourself;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

//Экспорт констант из модуля.
export {
  avatarEditButton, profileEditButton, elementAddButton, avatarEditPopup, profileEditPopup, profileEditPopupCloseButton,
  avatarEditForm, profileEditForm, elementAddPopup, elementAddPopupCloseButton, elementAddForm, imagePreviewPopup, 
  imagePreviewPopupCloseButton, popups, elementContainer, avatarSrc, userName, aboutYourself, profileTitle, profileSubtitle, 
  profileAvatar
};
