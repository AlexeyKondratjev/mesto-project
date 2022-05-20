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
  profileEditPopupCloseButton,
  avatarEditForm,
  profileEditForm,
  cardAddForm,
  deleteConfirmForm,
  popups,
  cardAddPopup,
  cardAddPopupCloseButton,
  imagePreviewPopup,
  imagePreviewPopupCloseButton,
  elementContainer,
  avatarSrc,
  userName,
  aboutYourself,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  validationOptions,
  allFetches,
} from '../utils/constants.js'
import { renderLoadingProcess } from '../components/utils.js';
import { deletedCardId, getCardMarkup, createCard } from '../components/card.js';
import {
  openAvatarEditPopup, openProfileEditPopup, closePopup, openCardAddPopup, openImagePreviewPopup
} from '../components/modal.js';
import { toggleButtonState, enableValidation } from '../components/validate.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

/////////// TEMP CODE >>>>>>>>>//////////////////////////////////////
import Card from '../components/CardClass.js';
/////////// TEMP CODE <<<<<<<<<//////////////////////////////////////


//Идентификатор текущего пользователя.
let currentUserId = '';
const userInfo = new UserInfo({userNameSelector: '#userName-input', aboutUserSelector: '#aboutYourself-input'});

//Функция insertNewCard принимает на вход параметры card (HTML-разметку нового элемента "карточка места")
//и container (узел DOM). Выполняет вставку card в container.
function insertNewCard(card, container) {
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

  ///////// ---> setUserInfo() ?? ///////////////////
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
function cardAddFormSubmitHandler(evt) {
  evt.preventDefault();

  const previousButtonTextContent = renderLoadingProcess(true, cardAddForm, '');

  //Сохраняем данные карточки на сервере.
  const newCardData = {
    name: cardAddForm.cardName.value,
    link: cardAddForm.cardSrc.value
  };

  allFetches.addNewCard(newCardData)
    .then((result) => {
      //Добавляем карточку на страницу.
      const newCardMarkup = getCardMarkup();
      const newCard = createCard(newCardMarkup, result.link, result.name, result._id, [], currentUserId, result.owner._id);

      insertNewCard(newCard, elementContainer);

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
cardAddButton.addEventListener('click', openCardAddPopup);

avatarEditForm.addEventListener('submit', avatarEditFormSubmitHandler);
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
cardAddForm.addEventListener('submit', cardAddFormSubmitHandler);
deleteConfirmForm.addEventListener('submit', deleteConfirmFormSubmitHandler);



//Подгрузка и отображение на странице данных профиля текущего пользователя и массива карточек по умолчанию.
Promise.all([allFetches.getProfileData(), allFetches.getInitialCards()])
  .then(([profileData, initialCardsData]) => {
    //Отрисовываем данные профиля текущего пользователя.
    /////////// TEMP CODE >>>>>>////////////////////
    //---> getUserInfo() ???
          /*  profileTitle.textContent = profileData.name;
              profileSubtitle.textContent = profileData.about;
              profileAvatar.src = profileData.avatar;
              currentUserId = profileData._id; */
    const userInfo = new UserInfo();
    /////////

    //Отрисовываем массив карточек по умолчанию.
    /*     initialCardsData.forEach((cardItem) => {
          const newCard = createCard(getCardMarkup(), cardItem.link, cardItem.name, cardItem._id,
            cardItem.likes, currentUserId, cardItem.owner._id);

          insertNewCard(newCard, elementContainer);
        }); */

    initialCardsData.forEach((cardItem) => {
      const cardData = {
        title: cardItem.name,
        imageSrc: cardItem.link,
        id: cardItem._id,
        likesArray: cardItem.likes,
        cardOwnerId: cardItem.owner._id
      };
      const card = new Card(cardData, '#card-template');
      const cardElement = card.generateCard(currentUserId);

      insertNewCard(cardElement, elementContainer);
    });
    /////////// TEMP CODE <<<<<<////////////////////
  })
  .catch((err) => {
    console.log(err);
  });



//Активация валидации форм.
/////////// TEMP CODE >>>>>>////////////////////
  //-- enableValidation(validationOptions);
const avatarEditFormValidator = new FormValidator(validationOptions, avatarEditForm);
const profileEditFormValidator = new FormValidator(validationOptions, profileEditForm);
const cardAddFormValidator = new FormValidator(validationOptions, cardAddForm);

avatarEditFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();
/////////// TEMP CODE <<<<<<////////////////////

//-------------------------------------------//
Promise.all([
  api.getUser(),
  api.getCards()
])
.then(([user, cards]) => {
  const cardList = new Section({
    data: cards,
    renderer: (cardDetail) => {
      const card = new Card({
        data: cardDetail,
        userId: user._id,
        rendererLike: (cardId) => {
          api.putLike(cardId)
          .then(data => card.renderLike({ countOfLikes: data.likes.length, liked: true }))
          .catch(err => console.log(err))
        },
        rendererUnlike: (cardId) => {
          api.deleteLike(cardId)
          .then(data => card.renderLike({ countOfLikes: data.likes.length, liked: false }))
          .catch(err => console.log(err))
        }
      }, CARD_CONFIG);

      const cardElement = card.generate();

      cardList.addItem(cardElement);

    }
  }, '.gallery');

  cardList.renderItems();

})
.catch(err => console.log(err))
//-------------------------------------------//
