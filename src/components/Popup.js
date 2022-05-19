export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };
  open() {
    document.addEventListener('keydown', closePopupByEscapeKey);
    this._popup.classList.add('popup_opened');
    //look at func openPopup
  };
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscapeKey);
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
//принесла от себя, перепиши
popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
  }
  if (evt.target.classList.contains('popup__button-close')) {
    closePopup(popup)
  }
  })}
}
