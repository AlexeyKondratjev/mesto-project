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

function openProfileEditPopup() {
  const userName = profileEditForm.userName;
  const aboutYourself = profileEditForm.aboutYourself;
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  userName.value = profileTitle.textContent;
  aboutYourself.value = profileSubtitle.textContent;

  profileEditPopup.classList.add('popup_opened');
}

function closeProfileEditPopup() {
  profileEditPopup.classList.remove('popup_opened');
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();

  const userName = profileEditForm.userName;
  const aboutYourself = profileEditForm.aboutYourself;
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = aboutYourself.value;

  closeProfileEditPopup();
}

function openElementAddPopup() {
  elementAddPopup.classList.add('popup_opened');
}

function closeElementAddPopup() {
  elementAddForm.elementSrc.value = '';
  elementAddForm.elementName.value = '';

  elementAddPopup.classList.remove('popup_opened');
}

function openImagePreviewPopup() {
  imagePreviewPopup.classList.add('popup_opened');
}

function closeImagePreviewPopup() {
  imagePreviewPopup.classList.remove('popup_opened');
}

function elementAddFormSubmitHandler(evt) {
  evt.preventDefault();

  const imgSrcValue = elementAddForm.elementSrc.value;
  const titleValue = elementAddForm.elementName.value;
  const newElementMarkup = getElementMarkup();

  insertNewElement(newElementMarkup, imgSrcValue, titleValue);

  closeElementAddPopup();
}

function getElementMarkup() {
  const elementTemplate = document.querySelector('#element-template').content;

  return elementTemplate.querySelector('.element').cloneNode(true);
}

function insertNewElement(elementMarkup, imgSrcValue, titleValue) {
  const elementContainer = document.querySelector('.elements');

  const elementImage = elementMarkup.querySelector('.element__image');
  elementImage.src = imgSrcValue;

  elementImage.addEventListener('click', function () {
    const imageToPreview = imagePreviewPopup.querySelector('.popup__image');
    const imageHeadingToPreview = imagePreviewPopup.querySelector('.popup__image-heading');

    imageToPreview.src = imgSrcValue;
    imageHeadingToPreview.textContent = titleValue;

    openImagePreviewPopup();
  });

  elementMarkup.querySelector('.element__title').textContent = titleValue;

  elementMarkup.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-button_active');
  });

  elementMarkup.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const deletedElement = evt.target.closest('.element');
    deletedElement.remove();
  });

  elementContainer.prepend(elementMarkup);
}

function renderInitialElements() {
  initialCards.forEach((item) => {
    const newElementMarkup = getElementMarkup();

    insertNewElement(newElementMarkup, item.link, item.name);
  });
}


profileEditButton.addEventListener('click', openProfileEditPopup);
profileEditPopupCloseButton.addEventListener('click', closeProfileEditPopup);
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);

elementAddButton.addEventListener('click', openElementAddPopup);
elementAddPopupCloseButton.addEventListener('click', closeElementAddPopup);
elementAddForm.addEventListener('submit', elementAddFormSubmitHandler);

imagePreviewPopupCloseButton.addEventListener('click', closeImagePreviewPopup);

renderInitialElements();
