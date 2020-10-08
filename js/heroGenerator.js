'use strict';

(function () {
  const HERO_COUNT = 4;

  const setupWindow = document.querySelector(`.setup`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const setupWizardList = document.querySelector(`.setup-similar-list`);
  const setupSimilar = setupWindow.querySelector(`.setup-similar`);

  function addHero(heroData) {
    const hero = wizardTemplate.cloneNode(true);
    hero.querySelector(`.setup-similar-label`).textContent = heroData.name;
    hero.querySelector(`.wizard-coat`).style.fill = heroData.colorCoat;
    hero.querySelector(`.wizard-eyes`).style.fill = heroData.colorEyes;
    return hero;
  }

  function shuffleHeroes(heroes) {
    heroes.sort(() => Math.random() - 0.5);
  }

  function addHeroes(heroes) {
    const fragment = document.createDocumentFragment();
    const minShownHeroesCount = Math.min(heroes.length, HERO_COUNT);
    shuffleHeroes(heroes);
    for (let i = 0; i < minShownHeroesCount; i++) {
      fragment.appendChild(addHero(heroes[i]));
    }
    setupWizardList.appendChild(fragment);
  }

  function addHeroesToSetupSimilar() {
    window.backend.load(addHeroes, window.error.onLoadError);
    setupSimilar.classList.remove(`hidden`);
  }

  window.heroGenerator = {
    addHeroesToSetupSimilar
  };
})();
