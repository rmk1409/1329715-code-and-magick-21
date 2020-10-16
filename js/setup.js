'use strict';

(function () {
  const setupWindow = document.querySelector(`.setup`);

  const setupOpen = document.querySelector(`.setup-open`);
  const setupOpenIcon = document.querySelector(`.setup-open-icon`);
  const setupClose = setupWindow.querySelector(`.setup-close`);
  const setupUserName = setupWindow.querySelector(`.setup-user-name`);
  const setupWizardForm = setupWindow.querySelector(`.setup-wizard-form`);

  function openSetup() {
    setupWindow.classList.remove(`hidden`);
    addSetupCloseListeners();
    window.wizard.addWizardListeners();
    window.move.upload.addEventListener(`mousedown`, window.move.onUploadMousedown);
    setupWizardForm.addEventListener(`submit`, onFormSubmit);
  }

  function closeSetup() {
    setupWindow.classList.add(`hidden`);
    removeSetupCloseListeners();
    window.wizard.removeWizardListeners();
    window.move.upload.removeEventListener(`mousedown`, window.move.onUploadMousedown);
    resetSetupPosition();
    setupWizardForm.removeEventListener(`submit`, onFormSubmit);
  }

  function addSetupCloseListeners() {
    window.addEventListener(`keydown`, onWindowEscKeydown);
    setupClose.addEventListener(`keydown`, onCloseButtonKeydown);
    setupClose.addEventListener(`click`, onCloseButtonClick);
  }

  function removeSetupCloseListeners() {
    window.removeEventListener(`keydown`, onWindowEscKeydown);
    setupClose.removeEventListener(`keydown`, onCloseButtonKeydown);
    setupClose.removeEventListener(`click`, onCloseButtonClick);
  }

  function resetSetupPosition() {
    setupWindow.style.top = ``;
    setupWindow.style.left = ``;
  }

  function onWindowEscKeydown(evt) {
    if (evt.key === `Escape` && (document.activeElement !== setupUserName)) {
      closeSetup();
    }
  }

  function onCloseButtonKeydown(evt) {
    if (evt.key === `Enter`) {
      closeSetup();
    }
  }

  function onCloseButtonClick() {
    closeSetup();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupWizardForm), function () {
      setupWindow.classList.add(`hidden`);
    }, window.error.onLoadError);
  }

  function onOpenButtonClick() {
    openSetup();
  }

  function onOpenIconKeydown(evt) {
    if (evt.key === `Enter`) {
      openSetup();
    }
  }

  function run() {
    setupOpen.addEventListener(`click`, onOpenButtonClick);
    setupOpenIcon.addEventListener(`keydown`, onOpenIconKeydown);
  }

  window.setup = {
    run
  };
})();
