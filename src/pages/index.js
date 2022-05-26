//Импорт главного файла стилей.
import '../pages/index.css';


//Импорт данных из других модулей.
import {
  avatarEditButton,
  profileEditButton,
  cardAddButton,
  /*deleteConfirmPopup,*/
  avatarEditPopup,
  /*profileEditPopup,*/
  avatarEditForm,
  profileEditForm,
  cardAddForm,
  deleteConfirmForm,
  popups,
  /*cardAddPopup,*/
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

import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import PopupWithImage from '../components/PopupWithImage';



const allFetches = new Api(configData);
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  aboutUserSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});



//Активация валидации форм.
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
            previewPopup.open(cardData.imageSrc, cardData.title);
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
            sessionStorage.setItem('deletedCardId', cardData.id);
            deleteConfirmPopup.open();
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



//Попап редактирования аватарки.
const avaEditPopup = new PopupWithForm('.popup_type_avatarEdit',
  (evt) => {
    evt.preventDefault();

    const previousButtonTextContent = renderLoadingProcess(true, avatarEditForm, '');

    //Сохраняем отредактированные данные на сервере...
    allFetches.editAvatarData({ avatar: avatarEditForm.avatarSrc.value })
      .then((result) => {
        //... а затем - на клиенте.
        const userData = {
          name: undefined,
          about: undefined,
          avatar: result.avatar,
          _id: undefined
        };

        userInfo.setUserInfo(userData);
        avaEditPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingProcess(false, avatarEditForm, previousButtonTextContent);
      });
  },
  () => {
    avatarEditForm.avatarSrc.value = userInfo.getUserInfo().userAvatar;
  });

avaEditPopup.setEventListeners();



//Попап редактирования данных профиля.
const profileEditPopup = new PopupWithForm('.popup_type_profileEdit',
  (evt) => {
    evt.preventDefault();

    const previousButtonTextContent = renderLoadingProcess(true, profileEditForm, '');

    //Сохраняем отредактированные данные на сервере...
    allFetches.editProfileData({ name: profileEditForm.userName.value, about: profileEditForm.aboutYourself.value })
      .then((result) => {
        //... а затем - на клиенте.
        const userData = {
          name: result.name,
          about: result.about,
          avatar: undefined,
          _id: undefined
        };

        userInfo.setUserInfo(userData);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingProcess(false, profileEditForm, previousButtonTextContent);
      });
  },
  () => {
    profileEditForm.userName.value = userInfo.getUserInfo().userName;
    profileEditForm.aboutYourself.value = userInfo.getUserInfo().aboutUser;
  });

profileEditPopup.setEventListeners();



//Попап добавления карточки.
const cardAddPopup = new PopupWithForm('.popup_type_cardAdd',
  (evt) => {
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
        const cardList = new Section({
          items: [result],
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
                previewPopup.open(cardData.imageSrc, cardData.title);
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
                sessionStorage.setItem('deletedCardId', cardData.id);
                deleteConfirmPopup.open();
              }
            }, '#card-template');

            const cardElement = card.generateCard(userInfo.getUserInfo().userId);

            cardList.addItem(cardElement);
          }
        },
          '.elements');

        cardList.renderItems();

        cardAddPopup.close();

        cardAddFormValidator.resetValidation();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingProcess(false, cardAddForm, previousButtonTextContent);
      });
  },
  () => {});

cardAddPopup.setEventListeners();



//Попап просмотра изображения карточки.
const previewPopup = new PopupWithImage('.popup_type_imagePreview');
previewPopup.setEventListeners();



const deleteConfirmPopup = new PopupWithDelete('.popup_type_deleteConfirm',
  (evt) => {
    evt.preventDefault();

    const previousButtonTextContent = renderLoadingProcess(true, deleteConfirmForm, '');
    const deletedCardId = sessionStorage.getItem('deletedCardId');

    //Удаляем карточку на сервере.
    allFetches.removeCard(deletedCardId)
      .then((result) => {
        //Удаляем карточку на клиенте.
        document.getElementById(deletedCardId).remove();
        deleteConfirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingProcess(false, deleteConfirmForm, previousButtonTextContent);
      });
  });

deleteConfirmPopup.setEventListeners();



//Функция insertNewCard принимает на вход параметры card (HTML-разметку нового элемента "карточка места")
//и container (узел DOM). Выполняет вставку card в container.
//function insertNewCard(card, container) {
//  container.prepend(card);
//}


//Функция-обработчик события "submit" формы добавления данных нового "места".
// function cardAddFormSubmitHandler(evt) {
//   evt.preventDefault();

//   const previousButtonTextContent = renderLoadingProcess(true, cardAddForm, '');

//   //Сохраняем данные карточки на сервере.
//   const newCardData = {
//     name: cardAddForm.cardName.value,
//     link: cardAddForm.cardSrc.value
//   };
//   allFetches.addNewCard(newCardData)
//     .then((result) => {
//       //Добавляем карточку на страницу.
//       const newCardMarkup = getCardMarkup();
//       const newCard = createCard(newCardMarkup, result.link, result.name, result._id, [], currentUserId, result.owner._id);
//       insertNewCard(newCard, elementContainer);
//       //cardAddForm.reset();
//       //После программной очистки полей ввода кнопка на форме должна перейти в неактивное состояние.
//       const inputList = Array.from(cardAddForm.querySelectorAll('.form__item'));
//       const buttonElement = cardAddForm.querySelector('.form__button');
//       toggleButtonState(inputList, buttonElement, { inactiveButtonClass: 'form__button_disabled' });
//       cardAddPopup.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoadingProcess(false, cardAddForm, previousButtonTextContent);
//     });
// }

//Функция-обработчик события "submit" формы подтверждения удаления карточки "места".
// function deleteConfirmFormSubmitHandler() {
//   const previousButtonTextContent = renderLoadingProcess(true, deleteConfirmForm, '');
//   //Удаляем карточку на сервере.
//   allFetches.removeCard(deletedCardId)
//     .then((result) => {
//       //Удаляем карточку на клиенте.
//       document.getElementById(deletedCardId).remove();
//       closePopup(deleteConfirmPopup);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoadingProcess(false, deleteConfirmForm, previousButtonTextContent);
//     });
// }



//Назначение обработчиков событий для элементов интерфейса.
avatarEditButton.addEventListener('click', () => {
  //avaEditPopup.open.bind(avaEditPopup);
  avaEditPopup.formPrefill();
  avaEditPopup.open();
});
profileEditButton.addEventListener('click', () => {
  //profileEditPopup.open.bind(profileEditPopup);
  profileEditPopup.formPrefill();
  profileEditPopup.open();
});
cardAddButton.addEventListener('click', () => {
  //cardAddPopup.open.bind(cardAddPopup);
  cardAddPopup.formPrefill();
  cardAddPopup.open();
});

//avatarEditForm.addEventListener('submit', avatarEditFormSubmitHandler);
//profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
//cardAddForm.addEventListener('submit', cardAddPopup.cardAddFormSubmitHandler);
//deleteConfirmForm.addEventListener('submit', deleteConfirmFormSubmitHandler);
