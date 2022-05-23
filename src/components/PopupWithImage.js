import Popup from "./Popup";
import {imagePreviewPopup} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(imgSrcValue, titleValue) {
    const imageToPreview = imagePreviewPopup.querySelector('.popup__image');
    const imageHeadingToPreview = imagePreviewPopup.querySelector('.popup__image-heading');

    imageToPreview.src = imgSrcValue;
    imageToPreview.alt = titleValue;
    imageHeadingToPreview.textContent = titleValue;
    super.open();
  }
}
