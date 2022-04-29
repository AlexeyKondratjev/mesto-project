//Объявление констант.
const profileEditButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__add-button');

const profileEditPopup = document.querySelector('.popup_type_profileEdit');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__toggle');
const profileEditForm = document.forms.profileEditForm;

const elementAddPopup = document.querySelector('.popup_type_elementAdd');
const elementAddPopupCloseButton = elementAddPopup.querySelector('.popup__toggle');
const elementAddForm = document.forms.elementAddForm;

const imagePreviewPopup = document.querySelector('.popup_type_imagePreview');
const imagePreviewPopupCloseButton = imagePreviewPopup.querySelector('.popup__toggle');

const elementContainer = document.querySelector('.elements');

const userName = profileEditForm.userName;
const aboutYourself = profileEditForm.aboutYourself;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Массив с данными карточек "мест", заполняемых по умолчанию.
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//Экспорт констант из модуля.
export {profileEditButton, elementAddButton, profileEditPopup, profileEditPopupCloseButton, profileEditForm,
  elementAddPopup, elementAddPopupCloseButton, elementAddForm, imagePreviewPopup, imagePreviewPopupCloseButton,
  elementContainer, userName, aboutYourself, profileTitle, profileSubtitle, initialCards};
