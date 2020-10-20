'use strict';

(function () {
  // const DEBOUNCE_INTERVAL = 1000;

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // function debounce(cb, newColor) {
  //   let timeout;
  //
  //   return function () {
  //     let color = newColor;
  //     if (timeout) {
  //       window.clearTimeout(timeout);
  //     }
  //     timeout = window.setTimeout(function () {
  //       cb(color);
  //     });
  //   };
  // }

  window.util = {
    getRandomInt,
    // debounce
  };
})();
