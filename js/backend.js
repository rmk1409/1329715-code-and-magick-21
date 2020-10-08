'use strict';

(function () {
  const SUCCESS_STATUS_CODE = 200;
  const TIMEOUT = 10000;
  const URL_DATA = `https://21.javascript.pages.academy/code-and-magick/data`;
  const URL_FORM = `https://21.javascript.pages.academy/code-and-magick`;

  const errorPopup = document.querySelector(`.error-popup`);
  const errorMsg = errorPopup.querySelector(`.error-popup--msg`);
  const errorButton = errorPopup.querySelector(`.error-popup--button`);

  function requestErrorCB(onError) {
    onError(`There is connection error`);
  }

  function requestTimeoutCB(onError) {
    onError(`There is timeout error, passed more than ${TIMEOUT / 1000} sec.`);
  }

  function generalRequestLoadCB(request, onLoad, onError, isRequestResponse) {
    const currentStatusCode = request.status;

    switch (currentStatusCode) {
      case SUCCESS_STATUS_CODE:
        if (isRequestResponse) {
          onLoad(request.response);
        } else {
          onLoad();
        }
        break;
      default:
        onError(`There is an error, status code is - ${currentStatusCode}.`);
    }
  }

  function generalLoad(onLoad, onError, loadCB, errorCB, timeoutCB, url, methodType, responseType, data) {
    const request = new XMLHttpRequest();
    if (responseType) {
      request.responseType = responseType;
    }
    request.timeout = TIMEOUT;

    request.addEventListener(`load`, loadCB.bind(null, request, onLoad, onError));
    request.addEventListener(`error`, errorCB.bind(null, onError));
    request.addEventListener(`timeout`, timeoutCB.bind(null, onError));

    request.open(methodType, url);
    if (data) {
      request.send(data);
    } else {
      request.send();
    }
  }

  function requestLoadCB(request, onLoad, onError) {
    generalRequestLoadCB(request, onLoad, onError, true);
  }

  function saveRequestLoadCB(request, onLoad, onError) {
    generalRequestLoadCB(request, onLoad, onError);
  }

  function load(onLoad, onError = onLoadError) {
    generalLoad(onLoad, onError, requestLoadCB, requestErrorCB, requestTimeoutCB, URL_DATA, `GET`, `json`);
  }

  function save(data, onLoad, onError = onLoadError) {
    generalLoad(onLoad, onError, saveRequestLoadCB, requestErrorCB, requestTimeoutCB, URL_FORM, `POST`, undefined, data);
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
