const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/avatar.js",
    "./js/error.js",
    "./js/colorGenerator.js",
    "./js/move.js",
    "./js/wizard.js",
    "./js/setup.js",
    "./js/stat.js",
    "./js/backend.js",
    "./js/main.js",
    "./js/game.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
