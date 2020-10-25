'use strict';

const DEBOUNCE_INTERVAL = 500;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function debounce(cb) {
  let timeout = null;
  return function () {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = setTimeout(cb, DEBOUNCE_INTERVAL);
  };
}

window.util = {
  getRandomInt,
  debounce
};
