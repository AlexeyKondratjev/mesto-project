import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, callbackDeleteConfirm) {
    super(popupSelector);
    this._deleteConfirm = callbackDeleteConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._deleteConfirm);
  }
}
