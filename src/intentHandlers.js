"use strict";
const Alexa = require("alexa-sdk");
const util = require("util");

var constants = require("./constants");
var helperFunctions = require("./helperFunctions");
var speechGeneration = require("./speechGeneration");

var states = {
  SEARCHMODE: "_SEARCHMODE",
  DESCRIPTION: "_DESCRIPTION",
  MULTIPLE_RESULTS: "_MULTIPLE_RESULTS"
};

var newSessionHandlers = {
  "LaunchRequest": function() {
    this.handler.state = states.SEARCHMODE;
    this.emit(":ask", WELCOME_MESSAGE, speechGeneration.getGenericHelpMessage(constants.data));
    helperFunctions.printRequest(this.event.request);
  },

  "SearchByNameIntent": function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState("SearchByNameIntent");
    helperFunctions.printRequest(this.event.request);
  },

  "SearchBySpecialtyIntent": function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState("SearchBySpecialtyIntent");
    helperFunctions.printRequest(this.event.request);
  },

  "SearchHoursIntent": function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState("SearchHoursIntent");
    helperFunctions.printRequest(this.event.request);
  },

  "TellMeMoreIntent": function() {
    this.handler.state = states.SEARCHMODE;
    // this.emitWithState("SearchByNameIntent");
    this.emit(":ask", WELCOME_MESSAGE, getGenericHelpMessage(constants.data));
    helperFunctions.printRequest(this.event.request);
  },

  "TellHoursIntent": function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState("TellHoursIntent");
    helperFunctions.printRequest(this.event.request);
  },

  "TellMeThisIntent": function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState("SearchByNameIntent");
    helperFunctions.printRequest(this.event.request);
  },

  "SearchByInfoTypeIntent": function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState("SearchByInfoTypeIntent");
    helperFunctions.printRequest(this.event.request);
  },

  "AMAZON.YesIntent": function() {
    this.emit(":ask", speechGeneration.getGenericHelpMessage(constants.data), speechGeneration.getGenericHelpMessage(constants.data));
    helperFunctions.printRequest(this.event.request);
  },

  "AMAZON.NoIntent": function() {
    this.emit(":ask", SHUTDOWN_MESSAGE);
    helperFunctions.printRequest(this.event.request);
  },

  "AMAZON.RepeatIntent": function() {
    this.emit(":ask", HELP_MESSAGE, speechGeneration.getGenericHelpMessage(constants.data));
    helperFunctions.printRequest(this.event.request);
  },

  "AMAZON.StopIntent": function() {
    this.emit(":ask", EXIT_SKILL_MESSAGE);
    helperFunctions.printRequest(this.event.request);
  },

  "AMAZON.CancelIntent": function() {
    this.emit(":ask", EXIT_SKILL_MESSAGE);
    helperFunctions.printRequest(this.event.request);
  },

  "AMAZON.StartOverIntent": function() {
    this.handler.state = states.SEARCHMODE;
    // Reset the search
    if (this.attributes.lastSearch) {
      this.attributes.lastSearch = null;
    }
    var output = "Ok, starting over. I can help you find a librarian, or our opening hours. " + speechGeneration.getGenericHelpMessage(constants.data);
      this.emit(":ask", output, output);
      helperFunctions.printRequest(this.event.request);
  },

  "AMAZON.HelpIntent": function() {
    this.emit(":ask", HELP_MESSAGE + speechGeneration.getGenericHelpMessage(constants.data), speechGeneration.getGenericHelpMessage(constants.data));
    helperFunctions.printRequest(this.event.request);
  },

  "SessionEndedRequest": function() {
    this.emit("AMAZON.StopIntent");
    helperFunctions.printRequest(this.event.request);
  },
  
  "Unhandled": function() {
    this.handler.state = states.SEARCHMODE;
    this.emitWithState("SearchByNameIntent");
    helperFunctions.printRequest(this.event.request);
  }
};

module.exports = newSessionHandlers;
