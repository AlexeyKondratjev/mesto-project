import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector);
    this._formSubmit = callbackFormSubmit;
    // Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
  }

  _getInputValues() {
    //собирает данные всех полей формы.
    const inputsList = this._popup.querySelectorAll('.form__item');
    const inputValues = inputsList.map(input => input.value);
    return inputValues;
  }
  setEventListeners() {
    // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    super.setEventListeners();
    this._popup.addEventListener('submit', this._formSubmit);
  }
  close() {
    // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    const form = this._popup.querySelector('.popup__form');
    super.close();
    form.reset();
  }
}

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
