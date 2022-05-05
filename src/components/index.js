//Импорт главного файла стилей. 
import '../pages/index.css';


//Импорт данных из других модулей.
import {
  avatarEditButton, profileEditButton, elementAddButton, profileEditPopup, profileEditPopupCloseButton, avatarEditForm,
  profileEditForm, elementAddPopup, elementAddPopupCloseButton, elementAddForm, imagePreviewPopup, imagePreviewPopupCloseButton,
  elementContainer, avatarSrc, userName, aboutYourself, profileTitle, profileSubtitle, profileAvatar, popups, avatarEditPopup
} from './utils.js';
import { getElementMarkup, createCard } from './card.js';
import { 
  openAvatarEditPopup, openProfileEditPopup, closePopup, openElementAddPopup, openImagePreviewPopup, renderLoadingProcess
} from './modal.js';
import { toggleButtonState, enableValidation } from './validate.js';
import { getInitialCards, getProfileData, editAvatarData, editProfileData, addNewCard } from './api.js';



//Идентификатор текущего пользователя.
let currentUserId = '';



//Функция insertNewElement принимает на вход параметры card (HTML-разметку нового элемента "карточка места")
//и container (узел DOM). Выполняет вставку card в container.
export default function insertNewElement(card, container) {
  container.prepend(card);
}

//Функция-обработчик события "submit" формы редактирования данных аватара профиля пользователя.
function avatarEditFormSubmitHandler(evt) {
  evt.preventDefault();

  renderLoadingProcess(true, avatarEditForm);

  //Сохраняем отредактированные данные на сервере.
  editAvatarData({ avatar: avatarSrc.value })
    .then((result) => {
      profileAvatar.src = result.avatar;
      closePopup(avatarEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProcess(false, avatarEditForm);
    });
}

//Функция-обработчик события "submit" формы редактирования данных профиля пользователя.
function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();

  renderLoadingProcess(true, profileEditForm);

  //Сохраняем отредактированные данные на сервере.
  const editedProfileData = {
    name: userName.value,
    about: aboutYourself.value
  };

  editProfileData(editedProfileData)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileSubtitle.textContent = result.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProcess(false, profileEditForm);
    });
}

//Функция-обработчик события "submit" формы добавления данных нового "места".
function elementAddFormSubmitHandler(evt) {
  evt.preventDefault();

  renderLoadingProcess(true, elementAddForm);

  //Сохраняем данные карточки на сервере.
  const newCardData = {
    name: elementAddForm.elementName.value,
    link: elementAddForm.elementSrc.value
  };

  addNewCard(newCardData)
    .then((result) => {
      //Добавляем карточку на страницу.  
      const newElementMarkup = getElementMarkup(true);
      const newElement = createCard(newElementMarkup, result.link, result.name, result._id, [], currentUserId);

      insertNewElement(newElement, elementContainer);

      elementAddForm.elementSrc.value = '';
      elementAddForm.elementName.value = '';

      //После программной очистки полей ввода кнопка на форме должна перейти в неактивное состояние. 
      const inputList = Array.from(elementAddForm.querySelectorAll('.form__item'));
      const buttonElement = elementAddForm.querySelector('.form__button');

      toggleButtonState(inputList, buttonElement, { inactiveButtonClass: 'form__button_disabled' });

      closePopup(elementAddPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProcess(false, elementAddForm);
    });
}



//Назначение обработчиков событий для элементов интерфейса.
avatarEditButton.addEventListener('click', openAvatarEditPopup);
profileEditButton.addEventListener('click', openProfileEditPopup);
elementAddButton.addEventListener('click', openElementAddPopup);

popups.forEach((popupItem) => {
  popupItem.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__toggle')) {
      closePopup(popupItem);
    }
  });
});

avatarEditForm.addEventListener('submit', avatarEditFormSubmitHandler);
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
elementAddForm.addEventListener('submit', elementAddFormSubmitHandler);



//Подгрузка и отображение на странице данных профиля текущего пользователя.
getProfileData()
  .then((result) => {
    profileTitle.textContent = result.name;
    profileSubtitle.textContent = result.about;
    profileAvatar.src = result.avatar;
    currentUserId = result._id;
  })
  .catch((err) => {
    console.log(err);
  });

//Подгрузка и отображение на странице массива карточек по умолчанию.
getInitialCards()
  .then((result) => {
    result.forEach((cardItem) => {
      const deleteButtonAvailable = cardItem.owner._id === currentUserId;
      const newElement = createCard(getElementMarkup(deleteButtonAvailable), cardItem.link, cardItem.name, cardItem._id,
        cardItem.likes, currentUserId);

      insertNewElement(newElement, elementContainer);
    });
  })
  .catch((err) => {
    console.log(err);
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

