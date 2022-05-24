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
  configData
} from '../utils/constants.js'
import renderLoadingProcess from '../utils/utils.js';
import {
  openAvatarEditPopup,
  openProfileEditPopup,
  closePopup,
  openCardAddPopup,
  openImagePreviewPopup
} from '../components/modal.js';
//import { toggleButtonState, enableValidation } from '../components/validate.js';
//import { deletedCardId, getCardMarkup, createCard } from '../components/__card.js';

import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';


//Идентификатор текущего пользователя.
//let currentUserId = ''; currentUserId теперь в userInfo -> userInfo.getUserInfo().userId;
const allFetches = new Api(configData);
const avaEditPopup = new PopupWithForm('.popup_type_avatarEdit', (evt) => {
  evt.preventDefault();
  const previousButtonTextContent = renderLoadingProcess(true, avatarEditForm, '');
  //Сохраняем отредактированные данные на сервере.
  allFetches.editAvatarData({ avatar: avatarSrc.value })
    .then((result) => {
      profileAvatar.src = result.avatar;
      avaEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProcess(false, avatarEditForm, previousButtonTextContent);
    });
});
avaEditPopup.setEventListeners();
const userInfo = new UserInfo({
  userNameSelector: '.profile__title', aboutUserSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});



//Функция insertNewCard принимает на вход параметры card (HTML-разметку нового элемента "карточка места")
//и container (узел DOM). Выполняет вставку card в container.
function insertNewCard(card, container) {
  container.prepend(card);
}

//Функция-обработчик события "submit" формы редактирования данных аватара профиля пользователя.
// function avatarEditFormSubmitHandler(evt) {
//   evt.preventDefault();

//   const previousButtonTextContent = renderLoadingProcess(true, avatarEditForm, '');

//   //Сохраняем отредактированные данные на сервере.
//   allFetches.editAvatarData({ avatar: avatarSrc.value })
//     .then((result) => {
//       profileAvatar.src = result.avatar;
//       closePopup(avatarEditPopup);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoadingProcess(false, avatarEditForm, previousButtonTextContent);
//     });
// }

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


      //cardAddForm.reset();
      avaEditPopup.close();

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
avatarEditButton.addEventListener('click', avaEditPopup.open.bind(avaEditPopup));
profileEditButton.addEventListener('click', openProfileEditPopup);
cardAddButton.addEventListener('click', openCardAddPopup);

//avatarEditForm.addEventListener('submit', avatarEditFormSubmitHandler);
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
cardAddForm.addEventListener('submit', cardAddFormSubmitHandler);
deleteConfirmForm.addEventListener('submit', deleteConfirmFormSubmitHandler);



//Активация валидации форм.
//enableValidation(validationOptions);
const avatarEditFormValidator = new FormValidator(validationOptions, avatarEditForm);
const profileEditFormValidator = new FormValidator(validationOptions, profileEditForm);
const cardAddFormValidator = new FormValidator(validationOptions, cardAddForm);

avatarEditFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();



//Подгрузка и отображение на странице данных профиля текущего пользователя и массива карточек по умолчанию.
Promise.all([allFetches.getProfileData(), allFetches.getInitialCards()])
  .then(([profileData, initialCardsData]) => {
    //Отрисовываем данные профиля текущего пользователя.
    userInfo.setUserInfo(profileData);

    //Отрисовываем массив карточек по умолчанию.
    const cardList = new Section({
      items: initialCardsData,
      renderer: (cardItem) => {
        const cardData = {
          title: cardItem.name,
          imageSrc: cardItem.link,
          id: cardItem._id,
          likesArray: cardItem.likes,
          cardOwnerId: cardItem.owner._id
        };
        const card = new Card({
          data: cardData,
          handleCardClick: () => {
            ////// TEMP CODE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> /////
            //Прописать логику открытия попапа с картинкой.
            console.log('Открылся попап с картинкой!');
            ////// TEMP CODE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< /////
          },
          handleLikeClick: (queryMethod) => {
            allFetches.changeLikesData(cardData.id, queryMethod)
              .then((result) => {
                //Обновляем отображение значения счетчика лайков в карточке (на клиенте).
                card.renderLikesCount(result.likes.length);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          handleDeleteClick: () => {
            ////// TEMP CODE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> /////
            //Прописать логику открытия попапа подтверждения удаления.
            console.log('Открылся попап подтверждения удаления!');
            ////// TEMP CODE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< /////
          }
        }, '#card-template');
        const cardElement = card.generateCard(userInfo.getUserInfo().userId);

        cardList.addItem(cardElement);
      }
    },
      '.elements');

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
