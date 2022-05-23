//Класс UserInfo отвечает за управление информацией о пользователе на странице.
export default class UserInfo {
  constructor({userNameSelector, aboutUserSelector, userAvatarSelector}) {
    this._userNameSelector = userNameSelector;
    this._aboutUserSelector = aboutUserSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userId = undefined;

    this._userName = document.querySelector(this._userNameSelector);
    this._aboutUser = document.querySelector(this._aboutUserSelector);
    this._userAvatar = document.querySelector(this._userAvatarSelector);
  }

  //Метод getUserInfo отвечает за получение данных пользователя.
  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      aboutUser: this._aboutUser.textContent,
      userAvatar: this._userAvatar.src,
      userId: this._userId
    };

    return userData;
  }

  //Метод setUserInfo отвечает за установку данных пользователя.
  setUserInfo({name, about, avatar, _id}) {
    this._userName.textContent = name;
    this._aboutUser.textContent = about;
    this._userAvatar.src = avatar;
    this._userId = _id;
  }
}
