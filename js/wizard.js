'use strict';

(function () {
  const setupWindow = document.querySelector(`.setup`);

  const inputCoatColor = setupWindow.querySelector(`input[name='coat-color']`);
  const inputEyesColor = setupWindow.querySelector(`input[name='eyes-color']`);
  const inputFireballColor = setupWindow.querySelector(`input[name='fireball-color']`);

  const setupWizard = setupWindow.querySelector(`.setup-wizard`);
  const setupWizardCoat = setupWizard.querySelector(`.wizard-coat`);
  const setupWizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const setupFireball = setupWindow.querySelector(`.setup-fireball-wrap`);

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

  function addWizardListeners() {
    setupWizardCoat.addEventListener(`click`, onWizardCoatClick);
    setupWizardEyes.addEventListener(`click`, onWizardEyesClick);
    setupFireball.addEventListener(`click`, onFireballClick);
  }

  function removeWizardListeners() {
    setupWizardCoat.removeEventListener(`click`, onWizardCoatClick);
    setupWizardEyes.removeEventListener(`click`, onWizardEyesClick);
    setupFireball.removeEventListener(`click`, onFireballClick);
  }

  window.wizard = {
    addWizardListeners,
    removeWizardListeners
  };
})();
