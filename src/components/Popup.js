export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // Метод open открывает popup, устанавливая слушатель на нажатие Esc
    document.addEventListener('keydown', this._handlEscClose);
    this._popup.classList.add('popup_opened');
  };

  close() {
    // Метод close закрывает popup, снимая слушатель на нажатие Esc
    document.removeEventListener('keydown', this._handlEscClose);
    this._popup.classList.remove('popup_opened');
  };

  _handleEscClose(evt) {
    // Метод _handleEscClose содержит логику закрытия попапа клавишей Esc.
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    // Метод добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
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
