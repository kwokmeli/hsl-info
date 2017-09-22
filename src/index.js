"use strict";
const Alexa = require("alexa-sdk");
const util = require("util");

var intentHandlers = require("./intentHandlers");

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = constants.APP_ID;
  alexa.registerHandlers(intentHandlers.newSessionHandlers, intentHandlers.startSearchHandlers, intentHandlers.descriptionHandlers, intentHandlers.multipleSearchResultsHandlers);
  alexa.execute();
};
