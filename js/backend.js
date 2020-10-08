'use strict';

(function () {
  const SUCCESS_STATUS_CODE = 200;
  const TIMEOUT = 10000;
  const GET_DATA_URL = `https://21.javascript.pages.academy/code-and-magick/data`;
  const POST_FORM_URL = `https://21.javascript.pages.academy/code-and-magick`;

  function onRequestLoadCb(request, onLoad, onError) {
    const currentStatusCode = request.status;
    switch (currentStatusCode) {
      case SUCCESS_STATUS_CODE:
        if (request.responseURL === GET_DATA_URL) {
          onLoad(request.response);
        } else {
          onLoad();
        }
        break;
      default:
        onError(`There is an error, status code is - ${currentStatusCode}.`);
    }
  }

  function sendRequest(methodType, onLoad, onError, url, data) {
    const request = new XMLHttpRequest();
    request.timeout = TIMEOUT;
    if (methodType === `GET`) {
      request.responseType = `json`;
    }

    request.addEventListener(`load`, () => onRequestLoadCb(request, onLoad, onError));
    request.addEventListener(`error`, () => onError(`There is connection error`));
    request.addEventListener(`timeout`, () => onError(`There is timeout error, passed more than ${TIMEOUT / 1000} sec.`));

    request.open(methodType, url);
    if (data) {
      request.send(data);
    } else {
      request.send();
    }
  }

  function load(onLoad, onError) {
    sendRequest(`GET`, onLoad, onError, GET_DATA_URL);
  }

  function save(data, onLoad, onError) {
    sendRequest(`POST`, onLoad, onError, POST_FORM_URL, data);
  }

  window.backend = {
    load,
    save
  };
})();
