'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const FAMILY_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const HERO_COUNT = 4;

const setupWindow = document.querySelector(`.setup`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const setupWizardList = document.querySelector(`.setup-similar-list`);
const setupSimilar = setupWindow.querySelector(`.setup-similar`);

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// OPEN & CLOSE SETUP POPUP WINDOW

const openSetup = () => {
  setupWindow.classList.remove(`hidden`);

  window.addEventListener(`keydown`, onWindowKeydown);
  setupClose.addEventListener(`keydown`, onCloseButtonKeydown);
  setupClose.addEventListener(`click`, onCloseButtonClick);
  submitButton.addEventListener(`click`, onSubmitButtonClick);
  submitButton.addEventListener(`keydown`, onSubmitButtonKeydown);

  setupWizardCoat.addEventListener(`click`, onWizardCoatClick);
  setupWizardEyes.addEventListener(`click`, onWizardEyesClick);
  setupFireball.addEventListener(`click`, onFireballClick);

  setupOpen.removeEventListener(`click`, onOpenButtonClick);
  setupOpenIcon.removeEventListener(`keydown`, onOpenIconKeydown);
};

const closeSetup = () => {
  setupWindow.classList.add(`hidden`);

  window.removeEventListener(`keydown`, onWindowKeydown);
  setupClose.removeEventListener(`keydown`, onCloseButtonKeydown);
  setupClose.removeEventListener(`click`, onCloseButtonClick);
  submitButton.removeEventListener(`click`, onSubmitButtonClick);
  submitButton.removeEventListener(`keydown`, onSubmitButtonKeydown);

  setupWizardCoat.removeEventListener(`click`, onWizardCoatClick);
  setupWizardEyes.removeEventListener(`click`, onWizardEyesClick);
  setupFireball.removeEventListener(`click`, onFireballClick);

  setupOpen.addEventListener(`click`, onOpenButtonClick);
  setupOpenIcon.addEventListener(`keydown`, onOpenIconKeydown);
};

const onWindowKeydown = (evt) => {
  if (evt.key === `Escape` && (document.activeElement !== setupUserName)) {
    closeSetup();
  }
};

const onCloseButtonKeydown = (evt) => {
  if (evt.key === `Enter`) {
    closeSetup();
  }
};

const onCloseButtonClick = () => closeSetup();

const submitForm = () => {
  let validity = setupUserName.validity;
  if (!(validity.tooShort || validity.tooLong)) {
    setupWizardForm.submit();
  }
};

const onSubmitButtonClick = () => submitForm();

const onSubmitButtonKeydown = function (evt) {
  if (evt.key === `Enter`) {
    submitForm();
  }
};

const onOpenButtonClick = () => openSetup();

const onOpenIconKeydown = (evt) => {
  if (evt.key === `Enter`) {
    openSetup();
  }
};

setupOpen.addEventListener(`click`, onOpenButtonClick);
setupOpenIcon.addEventListener(`keydown`, onOpenIconKeydown);

const onWizardCoatClick = function () {
  let newColor = COAT_COLORS[getRandomInt(COAT_COLORS.length)];
  setupWizardCoat.style.fill = newColor;
  inputCoatColor.value = newColor;
};

const onWizardEyesClick = function () {
  let newColor = EYE_COLORS[getRandomInt(EYE_COLORS.length)];
  setupWizardEyes.style.fill = newColor;
  inputEyesColor.value = newColor;
};

const onFireballClick = function () {
  let newColor = FIREBALL_COLORS[getRandomInt(FIREBALL_COLORS.length)];
  setupFireball.style.backgroundColor = newColor;
  inputFireballColor.value = newColor;
};

// GENERATE RANDOM HEROES

function generateHeroes(count) {
  const heroes = [];
  for (let i = 0; i < count; i++) {
    const generatedNameValue = `${NAMES[getRandomInt(NAMES.length)]} ${FAMILY_NAMES[getRandomInt(FAMILY_NAMES.length)]}`;
    const generatedCoatColorValue = COAT_COLORS[getRandomInt(COAT_COLORS.length)];
    const generatedEyesColorValue = EYE_COLORS[getRandomInt(EYE_COLORS.length)];
    heroes.push({
      name: generatedNameValue,
      coatColor: generatedCoatColorValue,
      eyesColor: generatedEyesColorValue
    });
  }
  return heroes;
}

function addHero(heroData) {
  const hero = wizardTemplate.cloneNode(true);
  hero.querySelector(`.setup-similar-label`).textContent = heroData.name;
  hero.querySelector(`.wizard-coat`).style.fill = heroData.coatColor;
  hero.querySelector(`.wizard-eyes`).style.fill = heroData.eyesColor;
  return hero;
}

function addHeroes(heroes) {
  const fragment = document.createDocumentFragment();
  for (let hero of heroes) {
    fragment.appendChild(addHero(hero));
  }
  setupWizardList.appendChild(fragment);
}

addHeroes(generateHeroes(HERO_COUNT));
setupSimilar.classList.remove(`hidden`);
