//Импорт главного файла стилей.
import '../pages/index.css';


//Импорт данных из других модулей.
import {
  avatarEditButton,
  profileEditButton,
  cardAddButton,
  deleteConfirmPopup,
  avatarEditPopup,
  profileEditPopup,
  avatarEditForm,
  profileEditForm,
  cardAddForm,
  deleteConfirmForm,
  cardAddPopup,
  elementContainer,
  avatarSrc,
  userName,
  aboutYourself,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  validationOptions,
  configData
} from '../utils/constants.js'
import { renderLoadingProcess } from '../components/utils.js';
import { deletedCardId, getElementMarkup, createCard } from '../components/card.js';
import {
  openAvatarEditPopup, openProfileEditPopup, closePopup, openElementAddPopup, openImagePreviewPopup
} from '../components/modal.js';
import { toggleButtonState, enableValidation } from '../components/validate.js';
import Api from '../components/Api';
import Section from '../components/Section.js';



//Идентификатор текущего пользователя.
let currentUserId = '';
const allFetches = new Api(configData);

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
  allFetches.editAvatarData({ avatar: avatarSrc.value })
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

  allFetches.editProfileData(editedProfileData)
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

  const previousButtonTextContent = renderLoadingProcess(true, cardAddForm, '');

  //Сохраняем данные карточки на сервере.
  const newCardData = {
    name: cardAddForm.elementName.value,
    link: cardAddForm.elementSrc.value
  };

  allFetches.addNewCard(newCardData)
    .then((result) => {
      //Добавляем карточку на страницу.
      const newElementMarkup = getElementMarkup();
      const newElement = createCard(newElementMarkup, result.link, result.name, result._id, [], currentUserId, result.owner._id);

      insertNewElement(newElement, elementContainer);

      cardAddForm.reset();

      //После программной очистки полей ввода кнопка на форме должна перейти в неактивное состояние.
      const inputList = Array.from(cardAddForm.querySelectorAll('.form__item'));
      const buttonElement = cardAddForm.querySelector('.form__button');

      toggleButtonState(inputList, buttonElement, { inactiveButtonClass: 'form__button_disabled' });

      closePopup(cardAddPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProcess(false, cardAddForm, previousButtonTextContent);
    });
}

//Функция-обработчик события "submit" формы подтверждения удаления карточки "места".
function deleteConfirmFormSubmitHandler() {
  const previousButtonTextContent = renderLoadingProcess(true, deleteConfirmForm, '');

  //Удаляем карточку на сервере.
  allFetches.removeCard(deletedCardId)
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
cardAddButton.addEventListener('click', openElementAddPopup);

avatarEditForm.addEventListener('submit', avatarEditFormSubmitHandler);
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
cardAddForm.addEventListener('submit', elementAddFormSubmitHandler);
deleteConfirmForm.addEventListener('submit', deleteConfirmFormSubmitHandler);



//Подгрузка и отображение на странице данных профиля текущего пользователя и массива карточек по умолчанию.
Promise.all([allFetches.getProfileData(), allFetches.getInitialCards()])
  .then((result) => {
    const profileData = result[0];
    const initialCardsData = result[1];
    // const cardList = new Section({
    //   items: initialCardsData,
    //   renderer: (item) => {
    //     const card = item.isOwner
    //   },
    // }, 'elements' );
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
