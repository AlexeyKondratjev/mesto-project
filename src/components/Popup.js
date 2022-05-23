import { closePopupByEscapeKey } from "./modal";
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };
  _closePopupByEscapeKey(evt) {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      close(popupOpened);
    }
  }
  open() {
    debugger;
    //document.querySelector('.page').addEventListener('keydown', closePopupByEscapeKey);
    this._popup.classList.add('popup_opened');
    //look at func openPopup
  };
  close() {
    this._popup.classList.remove('popup_opened');
    //document.querySelector('.page').removeEventListener('keydown', closePopupByEscapeKey);
    //look at closePopup
  };
  _handleEscClose(evt) {
    // Содержит логику закрытия попапа клавишей Esc.
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      this.close(this._popup);
    }
  }
  setEventListeners() {
    // добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          close(this._popup)
      }
      if (evt.target.classList.contains('.popup__toggle')) {
        close(this._popup)
      }
    })
  }
}
