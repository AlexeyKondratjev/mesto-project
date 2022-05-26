import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(imgSrcValue, titleValue) {
    // Метод open перезаписывает родительский метод, вставляет в попап картинку с src изображения и подписью к картинке.
    const imageToPreview = this._popup.querySelector('.popup__image');
    const imageHeadingToPreview = this._popup.querySelector('.popup__image-heading');

    imageToPreview.src = imgSrcValue;
    imageToPreview.alt = titleValue;
    imageHeadingToPreview.textContent = titleValue;
    super.open();
  }
}
