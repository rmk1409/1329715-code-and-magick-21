'use strict';

const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

function getRandomCoat() {
  return COAT_COLORS[window.util.getRandomInt(COAT_COLORS.length)];
}

function getRandomEyes() {
  return EYE_COLORS[window.util.getRandomInt(EYE_COLORS.length)];
}

function getRandomFireball() {
  return FIREBALL_COLORS[window.util.getRandomInt(FIREBALL_COLORS.length)];
}

window.colorGenerator = {
  getRandomCoat,
  getRandomEyes,
  getRandomFireball
};
