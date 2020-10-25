'use strict';

const errorPopup = document.querySelector(`.error-popup`);
const errorMsg = errorPopup.querySelector(`.error-popup--msg`);
const errorButton = errorPopup.querySelector(`.error-popup--button`);

function onErrorButtonClick() {
  errorPopup.classList.add(`error-popup--hidden`);

  errorButton.removeEventListener(`click`, onErrorButtonClick);
}

function onLoad(errorMessage) {
  errorMsg.textContent = errorMessage;
  errorPopup.classList.remove(`error-popup--hidden`);

  errorButton.addEventListener(`click`, onErrorButtonClick);
}

window.error = {
  onLoad
};
