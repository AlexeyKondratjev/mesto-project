//Импорт главного файла стилей. 
import '../pages/index.css';

//Импорт данных из других модулей.
import {profileEditButton, elementAddButton, profileEditPopup, profileEditPopupCloseButton, profileEditForm,
  elementAddPopup, elementAddPopupCloseButton, elementAddForm, imagePreviewPopup, imagePreviewPopupCloseButton,
  elementContainer, userName, aboutYourself, profileTitle, profileSubtitle, initialCards} from './utils.js';
import {getElementMarkup, createCard, insertNewElement} from './card.js';
import {openProfileEditPopup, closeProfileEditPopup, openElementAddPopup, closeElementAddPopup, profileEditFormSubmitHandler,
  elementAddFormSubmitHandler, openImagePreviewPopup, closeImagePreviewPopup} from './modal.js';
import {toggleButtonState, enableValidation} from './validate.js';



//Назначение обработчиков событий для элементов интерфейса.
profileEditButton.addEventListener('click', openProfileEditPopup);
elementAddButton.addEventListener('click', openElementAddPopup);

profileEditPopupCloseButton.addEventListener('click', closeProfileEditPopup);
elementAddPopupCloseButton.addEventListener('click', closeElementAddPopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
elementAddForm.addEventListener('submit', elementAddFormSubmitHandler);

imagePreviewPopupCloseButton.addEventListener('click', closeImagePreviewPopup);


//Вывод на страницу массива карточек по умолчанию.
initialCards.forEach((item) => {
  const newElementMarkup = getElementMarkup();
  const newElement = createCard(newElementMarkup, item.link, item.name);

  insertNewElement(newElement, elementContainer);
});

//Активация валидации форм.
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
});
