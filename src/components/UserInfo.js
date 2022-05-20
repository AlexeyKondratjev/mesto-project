//Класс UserInfo отвечает за управление информацией о пользователе на странице.
export default class UserInfo {
  constructor({userNameSelector, aboutUserSelector}, getDataFromSource) {
    this._userNameSelector = userNameSelector;
    this._aboutUserSelector = aboutUserSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._aboutUser = document.querySelector(this._aboutUserSelector);
    this._getDataFromSource = getDataFromSource;
  }

  getUserInfo() {
    this._getDataFromSource();
  }

  setUserInfo() {

  }
}
