//Импорт главного файла стилей. 
import '../pages/index.css';


//Импорт данных из других модулей.
import {profileEditButton, elementAddButton, profileEditPopup, profileEditPopupCloseButton, profileEditForm,
  elementAddPopup, elementAddPopupCloseButton, elementAddForm, imagePreviewPopup, imagePreviewPopupCloseButton,
  elementContainer, userName, aboutYourself, profileTitle, profileSubtitle, initialCards, popups} from './utils.js';
import {getElementMarkup, createCard} from './card.js';
import {openProfileEditPopup, closePopup, openElementAddPopup, openImagePreviewPopup} from './modal.js';
import {toggleButtonState, enableValidation} from './validate.js';
import {getInitialCards} from './api.js';



//Функция insertNewElement принимает на вход параметры card (HTML-разметку нового элемента "карточка места")
//и container (узел DOM). Выполняет вставку card в container.
export default function insertNewElement(card, container) {
  container.prepend(card);
}

//Функция-обработчик события "submit" формы редактирования данных профиля пользователя.
function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = aboutYourself.value;

  closePopup(profileEditPopup);
}

//Функция-обработчик события "submit" формы добавления данных нового "места".
function elementAddFormSubmitHandler(evt) {
  evt.preventDefault();

  const imgSrcValue = elementAddForm.elementSrc.value;
  const titleValue = elementAddForm.elementName.value;

  const newElementMarkup = getElementMarkup();
  const newElement = createCard(newElementMarkup, imgSrcValue, titleValue);

  insertNewElement(newElement, elementContainer);

  elementAddForm.elementSrc.value = '';
  elementAddForm.elementName.value = '';

  //После программной очистки полей ввода кнопка на форме должна перейти в неактивное состояние. 
  const inputList = Array.from(elementAddForm.querySelectorAll('.form__item'));
  const buttonElement = elementAddForm.querySelector('.form__button');
 
  toggleButtonState(inputList, buttonElement, { inactiveButtonClass: 'form__button_disabled' });

  closePopup(elementAddPopup);
}



//Назначение обработчиков событий для элементов интерфейса.
profileEditButton.addEventListener('click', openProfileEditPopup);
elementAddButton.addEventListener('click', openElementAddPopup);

popups.forEach((popupItem) => {
  popupItem.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__toggle')) {
      closePopup(popupItem);
    }
  });
});

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
elementAddForm.addEventListener('submit', elementAddFormSubmitHandler);




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
