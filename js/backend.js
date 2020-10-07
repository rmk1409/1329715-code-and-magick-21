'use strict';

(function () {
  const errorPopup = document.querySelector(`.error-popup`);
  const errorMsg = errorPopup.querySelector(`.error-popup--msg`);
  const errorButton = errorPopup.querySelector(`.error-popup--button`);

  function load(onLoad, onError = onLoadError) {
    const URL_DATA = `https://21.javascript.pages.academy/code-and-magick/data`;
    const TIMEOUT = 10000;
    const request = new XMLHttpRequest();

    request.addEventListener(`load`, function () {
      const SUCCESS_STATUS_CODE = 200;
      const currentStatusCode = request.status;

      switch (currentStatusCode) {
        case SUCCESS_STATUS_CODE:
          onLoad(request.response);
          break;
        default:
          onError(`There is an error, status code is - ${currentStatusCode}.`);
      }
    });

    request.addEventListener(`error`, function () {
      onError(`There is connection error`);
    });

    request.addEventListener(`timeout`, function () {
      onError(`There is timeout error, passed more than ${TIMEOUT / 1000} sec.`);
    });

    request.responseType = `json`;
    request.timeout = TIMEOUT;
    request.open(`GET`, URL_DATA);
    request.send();
  }

  function save(data, onLoad, onError = onLoadError) {
    const URL_FORM = `https://21.javascript.pages.academy/code-and-magick`;
    const TIMEOUT = 10000;
    const request = new XMLHttpRequest();

    request.addEventListener(`load`, function () {
      const SUCCESS_STATUS_CODE = 200;
      const currentStatusCode = request.status;

      switch (currentStatusCode) {
        case SUCCESS_STATUS_CODE:
          onLoad();
          break;
        default:
          onError(`There is an error, status code is - ${currentStatusCode}.`);
      }
    });

    request.addEventListener(`error`, function () {
      onError(`There is connection error`);
    });

    request.addEventListener(`timeout`, function () {
      onError(`There is timeout error, passed more than ${TIMEOUT / 1000} sec.`);
    });

    request.timeout = TIMEOUT;
    request.open(`POST`, URL_FORM);
    request.send(data);
  }

  function onErrorButtonClick() {
    errorPopup.classList.add(`error-popup--hidden`);

    errorButton.removeEventListener(`click`, onErrorButtonClick);
  }

  function onLoadError(errorMessage) {
    errorMsg.textContent = errorMessage;
    errorPopup.classList.remove(`error-popup--hidden`);

    errorButton.addEventListener(`click`, onErrorButtonClick);
  }

  window.backend = {
    load,
    save
  };
})();
