'use strict';

(function () {
  const setupWindow = document.querySelector(`.setup`);
  const upload = document.querySelector(`.upload`);

  function onUploadMousedown(evt) {
    evt.preventDefault();
    let dragged = false;

    function onDocumentMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      setupWindow.style.top = setupWindow.offsetTop + moveEvt.movementY + `px`;
      setupWindow.style.left = setupWindow.offsetLeft + moveEvt.movementX + `px`;
    }

    document.addEventListener(`mousemove`, onDocumentMove);
    document.addEventListener(`mouseup`, onDocumentMouseUp);

    function onDocumentMouseUp() {
      document.removeEventListener(`mousemove`, onDocumentMove);
      document.removeEventListener(`mouseup`, onDocumentMouseUp);

      function onUploadClick(clickEvt) {
        clickEvt.preventDefault();
        upload.removeEventListener(`click`, onUploadClick);
      }

      if (dragged) {
        upload.addEventListener(`click`, onUploadClick);
      }
    }
  }

  window.move = {
    upload,
    onUploadMousedown
  };

})();
