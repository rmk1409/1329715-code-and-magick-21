'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const FAMILY_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

let setup = document.querySelector(`.setup`);
setup.classList.remove(`hidden`);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Function generates an array of random data.
 * @param {number} number is size of the array.
 * @return {[]} array with random data.
 */
function generateHeroes(number) {
  let result = [];
  for (let i = 0; i < number; i++) {
    let heroObject = {};
    heroObject.name = `${NAMES[getRandomInt(NAMES.length)]} ${FAMILY_NAMES[getRandomInt(FAMILY_NAMES.length)]}`;
    heroObject.coatColor = COAT_COLORS[getRandomInt(COAT_COLORS.length)];
    heroObject.eyesColor = EYE_COLORS[getRandomInt(EYE_COLORS.length)];
    result.push(heroObject);
  }
  return result;
}

/**
 * Function creates a DOM element based on js object.
 * @param {object} template is an html template for the DOM element
 * @param {object} hero is the based js object
 * @return {ActiveX.IXMLDOMNode | Node} a ready node.
 */
function addHero(template, hero) {
  let result = template.cloneNode(true);
  result.querySelector(`.setup-similar-label`).textContent = hero.name;
  result.querySelector(`.wizard-coat`).style.fill = hero.coatColor;
  result.querySelector(`.wizard-eyes`).style.fill = hero.eyesColor;
  return result;
}

/**
 * Function fills a fragment by the objects and it adds the fragment to the page.
 * @param {[]} heroes is an array of the objects to fill the fragment.
 * @param {String} target is a class of the target element to add the fragment.
 */
function addHeroes(heroes, target) {
  let template = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  let fragment = document.createDocumentFragment();
  for (let hero of heroes) {
    fragment.appendChild(addHero(template, hero));
  }
  setup.querySelector(target).appendChild(fragment);
}

addHeroes(generateHeroes(4), `.setup-similar-list`);
setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
