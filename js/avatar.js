'use strict';

const upload = document.querySelector(`.upload`);
const avatar = upload.querySelector(`.setup-user-pic`);
const file = upload.querySelector(`input[name='avatar']`);
const reader = new FileReader();

function onFileChange() {
  reader.readAsDataURL(file.files[0]);
}

function onReaderLoad() {
  avatar.src = reader.result;
}

function addListeners() {
  file.addEventListener(`change`, onFileChange);
  reader.addEventListener(`load`, onReaderLoad);
}

function removeListeners() {
  file.removeEventListener(`change`, onFileChange);
  reader.removeEventListener(`load`, onReaderLoad);
}

window.avatar = {
  addListeners,
  removeListeners
};
