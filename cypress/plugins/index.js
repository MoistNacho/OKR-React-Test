/* eslint-disable import-helpers/order-imports */
/* eslint-disable global-require */
const wp = require("@cypress/webpack-preprocessor");

module.exports = (on, config) => {
  const options = {
    webpackOptions: require("../webpack.cypress.js"),
  };
  on("file:preprocessor", wp(options));
  return config;
};
