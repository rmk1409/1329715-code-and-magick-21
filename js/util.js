'use strict';

(function () {
  const FREQUENCY = 500;

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function debounce(callback) {
    let timeout = setTimeout(callback, FREQUENCY);
  }

  window.util = {
    getRandomInt
  };
})();
