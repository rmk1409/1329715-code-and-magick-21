'use strict';

(function () {
  const setupWindow = document.querySelector(`.setup`);

  const setupOpen = document.querySelector(`.setup-open`);
  const setupOpenIcon = document.querySelector(`.setup-open-icon`);
  const setupClose = setupWindow.querySelector(`.setup-close`);
  const setupUserName = setupWindow.querySelector(`.setup-user-name`);
  const setupWizardForm = setupWindow.querySelector(`.setup-wizard-form`);

  const setupWizard = setupWindow.querySelector(`.setup-wizard`);
  const setupWizardCoat = setupWizard.querySelector(`.wizard-coat`);
  const setupWizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const setupFireball = setupWindow.querySelector(`.setup-fireball-wrap`);
  const inputCoatColor = setupWindow.querySelector(`input[name='coat-color']`);
  const inputEyesColor = setupWindow.querySelector(`input[name='eyes-color']`);
  const inputFireballColor = setupWindow.querySelector(`input[name='fireball-color']`);

  function openSetup() {
    setupWindow.classList.remove(`hidden`);

    window.addEventListener(`keydown`, onWindowKeydown);
    setupClose.addEventListener(`keydown`, onCloseButtonKeydown);
    setupClose.addEventListener(`click`, onCloseButtonClick);

    setupWizardCoat.addEventListener(`click`, onWizardCoatClick);
    setupWizardEyes.addEventListener(`click`, onWizardEyesClick);
    setupFireball.addEventListener(`click`, onFireballClick);

    window.move.upload.addEventListener(`mousedown`, window.move.onUploadMousedown);
    setupWizardForm.addEventListener(`submit`, onFormSubmit);
  }

  function closeSetup() {
    setupWindow.classList.add(`hidden`);

    window.removeEventListener(`keydown`, onWindowKeydown);
    setupClose.removeEventListener(`keydown`, onCloseButtonKeydown);
    setupClose.removeEventListener(`click`, onCloseButtonClick);

    setupWizardCoat.removeEventListener(`click`, onWizardCoatClick);
    setupWizardEyes.removeEventListener(`click`, onWizardEyesClick);
    setupFireball.removeEventListener(`click`, onFireballClick);

    window.move.upload.removeEventListener(`mousedown`, window.move.onUploadMousedown);
    resetSetupPosition();
    setupWizardForm.removeEventListener(`submit`, onFormSubmit);
  }

  function resetSetupPosition() {
    setupWindow.style.top = ``;
    setupWindow.style.left = ``;
  }

  function onWindowKeydown(evt) {
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

  function onWizardCoatClick() {
    const newColor = window.colorGenerator.getRandomCoat();
    setupWizardCoat.style.fill = newColor;
    inputCoatColor.value = newColor;
  }

  function onWizardEyesClick() {
    const newColor = window.colorGenerator.getRandomEyes();
    setupWizardEyes.style.fill = newColor;
    inputEyesColor.value = newColor;
  }

  function onFireballClick() {
    const newColor = window.colorGenerator.getRandomFireball();
    setupFireball.style.backgroundColor = newColor;
    inputFireballColor.value = newColor;
  }

  function run() {
    setupOpen.addEventListener(`click`, onOpenButtonClick);
    setupOpenIcon.addEventListener(`keydown`, onOpenIconKeydown);
  }

  window.setup = {
    run
  };
})();
