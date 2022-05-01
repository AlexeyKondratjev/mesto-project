//Функция hasInvalidInput принимает на вход параметр inputList (массив полей).
//Возвращает true в случае, если хотя бы одно поле из массива не валидно. В противном случае - возвращает false.
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
  })
};

//Функция принимает на вход параметры inputList (массив полей ввода), buttonElement (элемент кнопки) и
//settingsObject (настройки значений классов). В зависимости от валидности полей делает кнопку активной, либо нет.
function toggleButtonState(inputList, buttonElement, settingssObject) {
   if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingssObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settingssObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//Функция showInputError принимает на вход параметры formElement (форму), inputElement (поле ввода),
//errorMessage (текст сообщения об ошибке) и settingsObject (настройки значений классов).
//Стилизует поле ввода для отображения наличия ошибки, а также стилизует элемент отображения сообщения об ошибке и
//задает ему соответствующий текст.
function showInputError(formElement, inputElement, errorMessage, settingsObject) {
  //Находим элемент отображения сообщения об ошибке.
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.classList.add(settingsObject.errorClass);
  errorElement.textContent = errorMessage;
};

//Функция hideInputError принимает на вход параметры formElement (форму), inputElement (поле ввода) и
//settingsObject (настройки значений классов).
//Стилизует полле ввода, скрывая отображение наличия ошибки, а также скрывает элемент отображения сообщения об ошибке, очищая
//при этом его текст.
function hideInputError(formElement, inputElement, settingsObject) {
  //Находим элемент отображения сообщения об ошибке.
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.classList.remove(settingsObject.errorClass);
  errorElement.textContent = '';
};

//Функция isValid принимает на вход параметры formElement (форму), inputElement (поле ввода)
//и settingsObject (настройки значений классов).
//Проверяет валидность поля ввода и, в зависимости, от результата - вызывает
//функцию showInputError (отображения ошибки), либо функцию hideInputError (сокрытия ошибки).
function isValid(formElement, inputElement, settingsObject) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  }
};

//Функция setEventListeners принимает на вход параметры formElement (форму) и settingsObject (настройки значений классов)
// и добавляет обработчик события 'input' для всех полей ввода данной формы.
function setEventListeners(formElement, settingsObject) {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settingsObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settingsObject);
      toggleButtonState(inputList, buttonElement, settingsObject);
    });
  });
};

//Функция глобального включения валидации данных всех форм. Принимает на вход параметр settingsObject (настройки значений классов).
//Находит все формы документа. Для каждой задает обработчик события 'submit', отменяя при этом стандартное поведение,
//а также вызывает функцию setEventListeners.
function enableValidation(settingsObject) {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settingsObject);
  });
};

//Экспорт функций из модуля.
export {toggleButtonState, enableValidation};
