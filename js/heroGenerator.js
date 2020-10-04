'use strict';

(function () {
  const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const FAMILY_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const HERO_COUNT = 4;

  const setupWindow = document.querySelector(`.setup`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const setupWizardList = document.querySelector(`.setup-similar-list`);
  const setupSimilar = setupWindow.querySelector(`.setup-similar`);

  function generateHeroes(count) {
    const heroes = [];
    for (let i = 0; i < count; i++) {
      const generatedNameValue = `${NAMES[window.util.getRandomInt(NAMES.length)]} ${FAMILY_NAMES[window.util.getRandomInt(FAMILY_NAMES.length)]}`;
      const generatedCoatColorValue = window.colorGenerator.getRandomCoat();
      const generatedEyesColorValue = window.colorGenerator.getRandomEyes();
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
})();
