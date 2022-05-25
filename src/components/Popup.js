export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    //alert('in open Popup')
    const context = this;
    this._handleEscClose();
    this._popup.classList.add('popup_opened');
    //look at func openPopup
  };
  close() {
    //alert('in close')
    const context = this;
    this._handleEscClose();
    this._popup.classList.remove('popup_opened');
    //look at func closePopup
  };
  _handleEscClose() {
    // Содержит логику закрытия попапа клавишей Esc.
    const that = this;
    function closePopupByEscapeKey(evt) {
      //console.log(evt);
      if (evt.key === 'Escape') {
        that.close();
      }
    }
    if(!this._popup.classList.contains('popup_opened')) {
      //alert('in add');
      //console.log(closePopupByEscapeKey);
      document.addEventListener('keydown', closePopupByEscapeKey);
    }
    else {
      //alert('in remove');
      //console.log(closePopupByEscapeKey);
      document.removeEventListener('keydown', closePopupByEscapeKey);

    }
  }
  setEventListeners() {
    // добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__toggle')) {
        this.close()
      }
    })
  }
}
