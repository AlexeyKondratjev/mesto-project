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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfileEditPopup() {
  userName.value = profileTitle.textContent;
  aboutYourself.value = profileSubtitle.textContent;

  openPopup(profileEditPopup);
}

function closeProfileEditPopup() {
  closePopup(profileEditPopup);
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = aboutYourself.value;

  closeProfileEditPopup();
}

function openElementAddPopup() {
  openPopup(elementAddPopup);
}

function closeElementAddPopup() {
  elementAddForm.elementSrc.value = '';
  elementAddForm.elementName.value = '';

  closePopup(elementAddPopup);
}

function openImagePreviewPopup() {
  openPopup(imagePreviewPopup);
}

function closeImagePreviewPopup() {
  closePopup(imagePreviewPopup);
}

function elementAddFormSubmitHandler(evt) {
  evt.preventDefault();

  const imgSrcValue = elementAddForm.elementSrc.value;
  const titleValue = elementAddForm.elementName.value;

  const newElementMarkup = getElementMarkup();
  const newElement = createCard(newElementMarkup, imgSrcValue, titleValue);

  insertNewElement(newElement, elementContainer);

  closeElementAddPopup();
}

function getElementMarkup() {
  const elementTemplate = document.querySelector('#element-template').content;

  return elementTemplate.querySelector('.element').cloneNode(true);
}

function createCard(elementMarkup, imgSrcValue, titleValue) {
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

   elementMarkup.querySelector('.element__title').textContent = titleValue;

  elementMarkup.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-button_active');
  });

  elementMarkup.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const deletedElement = evt.target.closest('.element');
    deletedElement.remove();
  });

  return elementMarkup;
}

function insertNewElement(card, container) {
  container.prepend(card);
}



profileEditButton.addEventListener('click', openProfileEditPopup);
profileEditPopupCloseButton.addEventListener('click', closeProfileEditPopup);
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);

elementAddButton.addEventListener('click', openElementAddPopup);
elementAddPopupCloseButton.addEventListener('click', closeElementAddPopup);
elementAddForm.addEventListener('submit', elementAddFormSubmitHandler);

imagePreviewPopupCloseButton.addEventListener('click', closeImagePreviewPopup);



initialCards.forEach((item) => {
  const newElementMarkup = getElementMarkup();
  const newElement = createCard(newElementMarkup, item.link, item.name);

  insertNewElement(newElement, elementContainer);
});
