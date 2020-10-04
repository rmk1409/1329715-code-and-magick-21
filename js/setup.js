'use strict';

(function () {
  const setupWindow = document.querySelector(`.setup`);

  const setupOpen = document.querySelector(`.setup-open`);
  const setupOpenIcon = document.querySelector(`.setup-open-icon`);
  const setupClose = setupWindow.querySelector(`.setup-close`);
  const setupUserName = setupWindow.querySelector(`.setup-user-name`);
  const setupWizardForm = setupWindow.querySelector(`.setup-wizard-form`);
  const submitButton = setupWindow.querySelector(`.setup-submit`);

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
    submitButton.addEventListener(`click`, onSubmitButtonClick);
    submitButton.addEventListener(`keydown`, onSubmitButtonKeydown);

    setupWizardCoat.addEventListener(`click`, onWizardCoatClick);
    setupWizardEyes.addEventListener(`click`, onWizardEyesClick);
    setupFireball.addEventListener(`click`, onFireballClick);

    window.move.upload.addEventListener(`mousedown`, window.move.onUploadMousedown);
  }

  function closeSetup() {
    setupWindow.classList.add(`hidden`);

    window.removeEventListener(`keydown`, onWindowKeydown);
    setupClose.removeEventListener(`keydown`, onCloseButtonKeydown);
    setupClose.removeEventListener(`click`, onCloseButtonClick);
    submitButton.removeEventListener(`click`, onSubmitButtonClick);
    submitButton.removeEventListener(`keydown`, onSubmitButtonKeydown);

    setupWizardCoat.removeEventListener(`click`, onWizardCoatClick);
    setupWizardEyes.removeEventListener(`click`, onWizardEyesClick);
    setupFireball.removeEventListener(`click`, onFireballClick);

    window.move.upload.removeEventListener(`mousedown`, window.move.onUploadMousedown);
    resetSetupPosition();
  }

  setupOpen.addEventListener(`click`, onOpenButtonClick);
  setupOpenIcon.addEventListener(`keydown`, onOpenIconKeydown);

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

  function submitForm() {
    const validity = setupUserName.validity;
    if (!(validity.tooShort || validity.tooLong || validity.valueMissing)) {
      setupWizardForm.submit();
    }
  }

  function onSubmitButtonClick() {
    submitForm();
  }

  function onSubmitButtonKeydown(evt) {
    if (evt.key === `Enter`) {
      submitForm();
    }
  }

  function onOpenButtonClick() {
    openSetup();
  }

  function onOpenIconKeydown(evt) {
    if (evt.key === `Enter`) {
      openSetup();
    }
  }

  setupOpen.addEventListener(`click`, onOpenButtonClick);
  setupOpenIcon.addEventListener(`keydown`, onOpenIconKeydown);

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
})();
