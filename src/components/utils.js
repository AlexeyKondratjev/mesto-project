

//Функция отображает процесс загрузки данных в модальных окнах.
//Принимает на вход параметры isLoading (булев тип данных; признак того - загрузка активна, или нет),
//formElement (элемент - форма, текст кнопки сабмита, которой изменяется в соответствии со статусом загрузки)
//и previousTextContent (предыдущее значение текста кнопки).
//Возвращает предыдущее значение текста кнопки (до изменения в теле функции).
function renderLoadingProcess(isLoading, formElement, previousTextContent) {
  const buttonElement = formElement.querySelector('.form__button');
  const previousValue = buttonElement.textContent;

  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = previousTextContent;
  }

  return previousValue;
}

//Экспорт констант из модуля.
export {
 renderLoadingProcess
};
