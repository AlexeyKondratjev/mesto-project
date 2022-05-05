//Импорт главного файла стилей. 
import '../pages/index.css';


//Импорт данных из других модулей.
import {
  avatarEditButton, profileEditButton, elementAddButton, profileEditPopup, profileEditPopupCloseButton, avatarEditForm,
  profileEditForm, elementAddPopup, elementAddPopupCloseButton, elementAddForm, imagePreviewPopup, imagePreviewPopupCloseButton,
  elementContainer, avatarSrc, userName, aboutYourself, profileTitle, profileSubtitle, profileAvatar, avatarEditPopup,
  deleteConfirmPopup, deleteConfirmForm, validationOptions, renderLoadingProcess
} from './utils.js';
import { deletedCardId, getElementMarkup, createCard } from './card.js';
import {
  openAvatarEditPopup, openProfileEditPopup, closePopup, openElementAddPopup, openImagePreviewPopup
} from './modal.js';
import { toggleButtonState, enableValidation } from './validate.js';
import { getInitialCards, getProfileData, editAvatarData, editProfileData, addNewCard, removeCard } from './api.js';



//Идентификатор текущего пользователя.
let currentUserId = '';


//Функция insertNewElement принимает на вход параметры card (HTML-разметку нового элемента "карточка места")
//и container (узел DOM). Выполняет вставку card в container.
function insertNewElement(card, container) {
  container.prepend(card);
}

//Функция-обработчик события "submit" формы редактирования данных аватара профиля пользователя.
function avatarEditFormSubmitHandler(evt) {
  evt.preventDefault();

  const previousButtonTextContent = renderLoadingProcess(true, avatarEditForm, '');

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
      renderLoadingProcess(false, avatarEditForm, previousButtonTextContent);
    });
}

//Функция-обработчик события "submit" формы редактирования данных профиля пользователя.
function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();

  const previousButtonTextContent = renderLoadingProcess(true, profileEditForm, '');

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
      renderLoadingProcess(false, profileEditForm, previousButtonTextContent);
    });
}

//Функция-обработчик события "submit" формы добавления данных нового "места".
function elementAddFormSubmitHandler(evt) {
  evt.preventDefault();

  const previousButtonTextContent = renderLoadingProcess(true, elementAddForm, '');

  //Сохраняем данные карточки на сервере.
  const newCardData = {
    name: elementAddForm.elementName.value,
    link: elementAddForm.elementSrc.value
  };

  addNewCard(newCardData)
    .then((result) => {
      //Добавляем карточку на страницу.  
      const newElementMarkup = getElementMarkup();
      const newElement = createCard(newElementMarkup, result.link, result.name, result._id, [], currentUserId, result.owner._id);

      insertNewElement(newElement, elementContainer);

      elementAddForm.reset();

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
      renderLoadingProcess(false, elementAddForm, previousButtonTextContent);
    });
}

//Функция-обработчик события "submit" формы подтверждения удаления карточки "места".
function deleteConfirmFormSubmitHandler() {
  const previousButtonTextContent = renderLoadingProcess(true, deleteConfirmForm, '');

  //Удаляем карточку на сервере.
  removeCard(deletedCardId)
    .then((result) => {
      //Удаляем карточку на клиенте.
      document.getElementById(deletedCardId).remove();
      closePopup(deleteConfirmPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProcess(false, deleteConfirmForm, previousButtonTextContent);
    });
}



//Назначение обработчиков событий для элементов интерфейса.
avatarEditButton.addEventListener('click', openAvatarEditPopup);
profileEditButton.addEventListener('click', openProfileEditPopup);
elementAddButton.addEventListener('click', openElementAddPopup);

avatarEditForm.addEventListener('submit', avatarEditFormSubmitHandler);
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
elementAddForm.addEventListener('submit', elementAddFormSubmitHandler);
deleteConfirmForm.addEventListener('submit', deleteConfirmFormSubmitHandler);



//Подгрузка и отображение на странице данных профиля текущего пользователя и массива карточек по умолчанию.
Promise.all([getProfileData(), getInitialCards()])
  .then((result) => {
    const profileData = result[0];
    const initialCardsData = result[1];

    //Отрисовываем данных профиля текущего пользователя.
    profileTitle.textContent = profileData.name;
    profileSubtitle.textContent = profileData.about;
    profileAvatar.src = profileData.avatar;
    currentUserId = profileData._id;

    //Отрисовываем массив карточек по умолчанию.
    initialCardsData.forEach((cardItem) => {
      const newElement = createCard(getElementMarkup(), cardItem.link, cardItem.name, cardItem._id,
        cardItem.likes, currentUserId, cardItem.owner._id);

      insertNewElement(newElement, elementContainer);
    });
  })
  .catch((err) => {
    console.log(err);
  });



//Активация валидации форм.
enableValidation(validationOptions);