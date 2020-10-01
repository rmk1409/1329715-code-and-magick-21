'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const FAMILY_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const HERO_COUNT = 4;

const setupWindow = document.querySelector(`.setup`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const setupWizardList = document.querySelector(`.setup-similar-list`);
const setupSimilar = setupWindow.querySelector(`.setup-similar`);

setupWindow.classList.remove(`hidden`);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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
