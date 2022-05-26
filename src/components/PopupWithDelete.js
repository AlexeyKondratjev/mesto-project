import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector);
    this._formSubmit = callbackFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._formSubmit);
  }
}
