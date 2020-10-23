'use strict';

(function () {
  const HERO_COUNT = 4;
  const COAT_RANK_WEIGHT = 10;
  const EYES_RANK_WEIGHT = 1;

  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const setupWindow = document.querySelector(`.setup`);
  const setupWizardList = setupWindow.querySelector(`.setup-similar-list`);
  const setupSimilar = setupWindow.querySelector(`.setup-similar`);
  const inputCoatColor = setupWindow.querySelector(`input[name='coat-color']`);
  const inputEyesColor = setupWindow.querySelector(`input[name='eyes-color']`);
  const inputFireballColor = setupWindow.querySelector(`input[name='fireball-color']`);
  const setupWizard = setupWindow.querySelector(`.setup-wizard`);
  const setupWizardCoat = setupWizard.querySelector(`.wizard-coat`);
  const setupWizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const setupFireball = setupWindow.querySelector(`.setup-fireball-wrap`);

  const coatClickDebounce = window.util.debounce(updateWizards);
  const eyesClickDebounce = window.util.debounce(updateWizards);

  let currentWizardCoatColor = `rgb(101, 137, 164)`;
  let currentWizardEyesColor = `black`;
  let wizards = [];

  function addWizard(wizardData) {
    const hero = wizardTemplate.cloneNode(true);
    hero.querySelector(`.setup-similar-label`).textContent = wizardData.name;
    hero.querySelector(`.wizard-coat`).style.fill = wizardData.colorCoat;
    hero.querySelector(`.wizard-eyes`).style.fill = wizardData.colorEyes;
    return hero;
  }

  function sortWizards() {
    wizards.sort((left, right) => getRank(right) - getRank(left));
  }

  function getRank(wizard) {
    let rank = 0;
    rank = currentWizardCoatColor === wizard.colorCoat ? rank + COAT_RANK_WEIGHT : rank;
    rank = currentWizardEyesColor === wizard.colorEyes ? rank + EYES_RANK_WEIGHT : rank;
    return rank;
  }

  function updateWizards() {
    sortWizards();
    const fragment = document.createDocumentFragment();
    const minShownHeroesCount = Math.min(wizards.length, HERO_COUNT);
    for (let i = 0; i < minShownHeroesCount; i++) {
      fragment.appendChild(addWizard(wizards[i]));
    }
    setupWizardList.innerHTML = ``;
    setupWizardList.appendChild(fragment);
  }

  function addWizards(wizardsData) {
    if (wizardsData) {
      wizards = Array.from(wizardsData);
      updateWizards();
    }
  }

  function addWizardsToSetupSimilar() {
    setupSimilar.classList.remove(`hidden`);
    window.backend.load(addWizards, window.error.onLoad);
  }

  function onWizardCoatClick() {
    const newColor = window.colorGenerator.getRandomCoat();
    setupWizardCoat.style.fill = newColor;
    inputCoatColor.value = newColor;

    currentWizardCoatColor = newColor;
    coatClickDebounce();
  }

  function onWizardEyesClick() {
    const newColor = window.colorGenerator.getRandomEyes();
    setupWizardEyes.style.fill = newColor;
    inputEyesColor.value = newColor;

    currentWizardEyesColor = newColor;
    eyesClickDebounce();
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
    addSimilarData: addWizardsToSetupSimilar,
    addListeners: addWizardListeners,
    removeListeners: removeWizardListeners
  };
})();
