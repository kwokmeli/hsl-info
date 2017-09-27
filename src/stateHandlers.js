"use strict";

const Alexa = require("alexa-sdk");
const util = require("util");

var constants = require("./constants");
var helperFunctions = require("./helperFunctions");
var speechGeneration = require("./speechGeneration");
var intentFunctions = require("./intentFunctions");

var states = {
    SEARCHMODE: "_SEARCHMODE",
    DESCRIPTION: "_DESCRIPTION",
    MULTIPLE_RESULTS: "_MULTIPLE_RESULTS"
};

var stateHandlers = {
    startSearchHandlers: Alexa.CreateStateHandler(states.SEARCHMODE, {
    "AMAZON.YesIntent": function() {
      this.emit(":ask", NEW_SEARCH_MESSAGE, NEW_SEARCH_MESSAGE);
      helperFunctions.printRequest(this.event.request);
    },
    "AMAZON.NoIntent": function() {
      this.emit(":ask", SHUTDOWN_MESSAGE);
      helperFunctions.printRequest(this.event.request);
    },
    "AMAZON.RepeatIntent": function() {
      var output;
      if (this.attributes.lastSearch) {
        output = this.attributes.lastSearch.lastSpeech;
        // console.log("repeating last speech");
      } else {
        output = speechGeneration.getGenericHelpMessage(constants.data);
        // console.log("no last speech availble. outputting standard help message.");
      }
      this.emit(":ask",output, output);
      helperFunctions.printRequest(this.event.request);
    },
    "SearchByNameIntent": function() {
      intentFunctions.searchByNameIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },
    "SearchBySpecialtyIntent": function() {
      intentFunctions.searchBySpecialtyIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },
    "SearchHoursIntent": function() {
      intentFunctions.searchHoursIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },
    "SearchByInfoTypeIntent": function() {
      intentFunctions.searchByInfoTypeIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },
    "TellHoursIntent" : function() {
      intentFunctions.tellHoursIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },
    "TellMeThisIntent": function() {
      this.handler.state = states.DESCRIPTION;
      this.emitWithState("TellMeThisIntent");
      helperFunctions.printRequest(this.event.request);
    },
    "TellMeMoreIntent": function() {
      this.handler.state = states.DESCRIPTION;
      this.emitWithState("TellMeMoreIntent");
      helperFunctions.printRequest(this.event.request);
    },
    "AMAZON.HelpIntent": function() {
      this.emit(":ask", HELP_MESSAGE + speechGeneration.getGenericHelpMessage(constants.data), speechGeneration.getGenericHelpMessage(constants.data));
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
    "SessionEndedRequest": function() {
      this.emit("AMAZON.StopIntent");
      helperFunctions.printRequest(this.event.request);
    },
    "Unhandled": function() {
      // console.log("Unhandled intent in startSearchHandlers");
      this.emit(":ask", SEARCH_STATE_HELP_MESSAGE, SEARCH_STATE_HELP_MESSAGE);
      helperFunctions.printRequest(this.event.request);
    }
    }),

    multipleSearchResultsHandlers: Alexa.CreateStateHandler(states.MULTIPLE_RESULTS, {
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
    "AMAZON.YesIntent": function() {
      var output = "Hmm. I think you said - yes, but can you please say the name of the person you'd like to learn more about?";
      this.emit(":ask", output, output);
      helperFunctions.printRequest(this.event.request);
    },
    "AMAZON.NoIntent": function() {
      this.emit(":ask", SHUTDOWN_MESSAGE);
      helperFunctions.printRequest(this.event.request);
    },
    "AMAZON.RepeatIntent": function() {
      this.emit(":ask",this.attributes.lastSearch.lastSpeech, this.attributes.lastSearch.lastSpeech);
      helperFunctions.printRequest(this.event.request);
    },
    "SearchByNameIntent": function() {
      var slots = this.event.request.intent.slots;
      var firstName = helperFunctions.isSlotValid(this.event.request, "firstName");
      var lastName = helperFunctions.isSlotValid(this.event.request, "lastName");
      var infoType = helperFunctions.isSlotValid(this.event.request, "infoType");

      // console.log("Intent Name:" + this.event.request.intent.name);

      var canSearch = helperFunctions.figureOutWhichSlotToSearchBy(firstName,lastName);
      // console.log("Multiple results found. canSearch is set to = " + canSearch);
      var speechOutput;

      if (canSearch) {
        var searchQuery = slots[canSearch].value;
        var searchResults = helperFunctions.searchDatabase(this.attributes.lastSearch.results, searchQuery, canSearch);
        var lastSearch;
        var output;

        if (searchResults.count > 1) { // Multiple results found again
            // console.log("multiple results were found again");
            this.handler.state = states.MULTIPLE_RESULTS;
            output = this.attributes.lastSearch.lastSpeech;
            this.emit(":ask",output);
        } else if (searchResults.count == 1) { // One result found
            this.attributes.lastSearch = searchResults;
            lastSearch = this.attributes.lastSearch;
            this.handler.state = states.DESCRIPTION;
            output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results);
            this.attributes.lastSearch.lastSpeech = output;
            // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
            this.emit(":ask", output);

        } else { // No match found
            lastSearch = this.attributes.lastSearch;
            var listOfPeopleFound = helperFunctions.loopThroughArrayOfObjects(lastSearch.results);
            speechOutput = MULTIPLE_RESULTS_STATE_HELP_MESSAGE + ", " + listOfPeopleFound;
            this.emit(":ask", speechOutput);
        }
      }
      helperFunctions.printRequest(this.event.request);

    },
    "AMAZON.HelpIntent": function() {
      this.emit(":ask", MULTIPLE_RESULTS_STATE_HELP_MESSAGE, MULTIPLE_RESULTS_STATE_HELP_MESSAGE);
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
    "SessionEndedRequest": function() {
      this.emit("AMAZON.StopIntent");
      helperFunctions.printRequest(this.event.request);
    },
    "Unhandled": function() {
      // console.log("Unhandled intent in multipleSearchResultsHandlers");
      this.emit(":ask", MULTIPLE_RESULTS_STATE_HELP_MESSAGE, MULTIPLE_RESULTS_STATE_HELP_MESSAGE);
      helperFunctions.printRequest(this.event.request);
    }
    }),

  descriptionHandlers: Alexa.CreateStateHandler(states.DESCRIPTION, {
  "TellMeMoreIntent": function() {
    var person, newPerson;
    var speechOutput;
    var repromptSpeech;
    var cardContent;
    var strEmit;
    var firstName = helperFunctions.isSlotValid(this.event.request, "firstName");
    var lastName = helperFunctions.isSlotValid(this.event.request, "lastName");
    var canSearch = helperFunctions.figureOutWhichSlotToSearchBy(firstName,lastName);

    if (this.attributes.lastSearch && (this.attributes.lastSearch.count >= 1)) {
      person = this.attributes.lastSearch.results[0];
      // Even if a person has been previously saved in lastSearch, make sure that the requested person is the same as the saved one
      if (canSearch) {
        // A specific person's name was mentioned
        var searchQuery = this.event.request.intent.slots[canSearch].value;
        var searchResults = helperFunctions.searchDatabase(constants.data, searchQuery, canSearch);

        if (searchResults.count == 1) {
          // If one person was found in the database
          newPerson = searchResults.results[0];

          // If the last person saved == the person requested
          if ((person.firstName == newPerson.firstName) && (person.lastName == newPerson.lastName)) {
            // person = this.attributes.lastSearch.results[0];
            cardContent = helperFunctions.generateCard(person);
            speechOutput = speechGeneration.generateTellMeMoreMessage(person);
            repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no. ";

          } else {
            // Else someone requested information about a new person
            // Save the new person's information, for future follow-up questions
            var lastSearch = this.attributes.lastSearch = searchResults;
            this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

            cardContent = helperFunctions.generateCard(newPerson);
            speechOutput = speechGeneration.generateTellMeMoreMessage(newPerson);
            repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no. ";
            this.handler.state = states.SEARCHMODE;
            this.attributes.lastSearch.lastSpeech = speechOutput;
            this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
          }

        } else if (searchResults.count > 1) {
          var listOfPeopleFound = helperFunctions.loopThroughArrayOfObjects(lastSearch.results);
          output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
          this.handler.state = states.MULTIPLE_RESULTS; // Change state to MULTIPLE_RESULTS
          this.attributes.lastSearch.lastSpeech = output;
          this.emit(":ask", output);

        } else {
          // The requested person does not exist
          strEmit = "I'm sorry. I couldn't find anyone by that name. Please ask me again. " + speechGeneration.getLibrariansHelpMessage(constants.data, constants.index);
          this.emit(":ask", strEmit);
        }

      } else {
        person = this.attributes.lastSearch.results[0];
        cardContent = helperFunctions.generateCard(person); // Calling the helper function to generate the card content that will be sent to the Alexa app.
        speechOutput = speechGeneration.generateTellMeMoreMessage(person);
        repromptSpeech = "Do you still want to find more information? Say yes or no. ";
        this.handler.state = states.SEARCHMODE;
        this.attributes.lastSearch.lastSpeech = speechOutput;
        this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
      }

    } else { // REVIEW: Need to handle multiple search results?
      // No person was previously saved; a new person's information is being requested
      if (canSearch) {

        // A specific person's name was mentioned
        var searchQuery = this.event.request.intent.slots[canSearch].value;
        var searchResults = helperFunctions.searchDatabase(constants.data, searchQuery, canSearch);

        if (searchResults.count == 1) {
          // If one person was found in the database
          newPerson = searchResults.results[0];

          // Save the new person's information, for future follow-up questions
          var lastSearch = this.attributes.lastSearch = searchResults;
          this.attributes.lastSearch.lastIntent = "SearchByNameIntent";
          cardContent = helperFunctions.generateCard(newPerson);
          speechOutput = speechGeneration.generateTellMeMoreMessage(newPerson);
          repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no. ";
          this.handler.state = states.SEARCHMODE;
          this.attributes.lastSearch.lastSpeech = speechOutput;
          this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);


        } else if (searchResults.count > 1) {
          var listOfPeopleFound = helperFunctions.loopThroughArrayOfObjects(lastSearch.results);
          output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
          this.handler.state = states.MULTIPLE_RESULTS; // Change state to MULTIPLE_RESULTS
          this.attributes.lastSearch.lastSpeech = output;
          this.emit(":ask", output);

        } else {
          // The requested person does not exist
          strEmit = "I'm sorry. I couldn't find anyone by that name. Please ask me again. " + speechGeneration.getLibrariansHelpMessage(constants.data, constants.index);
          this.emit(":ask", strEmit);
        }

      } else {
        // Person does not exist
        strEmit = "Sorry. I couldn't find anyone by that name. Please try again. " + speechGeneration.getLibrariansHelpMessage(constants.data, constants.index);
        this.emit(":ask", strEmit);

      }

      helperFunctions.printRequest(this.event.request);
      // speechOutput = getGenericHelpMessage(data);
      // repromptSpeech = getGenericHelpMessage(data);
      // this.handler.state = states.SEARCHMODE;
      // this.emit(":ask", speechOutput, repromptSpeech);
    }
  },

    "TellMeThisIntent": function() {
      var slots = this.event.request.intent.slots;
      var person;
      var infoType = helperFunctions.isSlotValid(this.event.request, "infoType");
      var speechOutput;
      var repromptSpeech;
      var cardContent;
      var newPerson;
      var strEmit;

      var firstName = helperFunctions.isSlotValid(this.event.request, "firstName");
      var lastName = helperFunctions.isSlotValid(this.event.request, "lastName");
      var canSearch = helperFunctions.figureOutWhichSlotToSearchBy(firstName,lastName);
console.log("firstName: " + firstName);
console.log("lastName: " + lastName);
      // If a person was saved and the requested infoType is valid
      if ((this.attributes.lastSearch && helperFunctions.isInfoTypeValid(infoType) && (this.attributes.lastSearch.count >= 1)) || ((firstName != false) || (lastName != false))) {
        if (this.attributes.lastSearch.count >= 1) {
          person = this.attributes.lastSearch.results[0];
        } else {
          // Make person an object with null values so that comparisons can still be made
          person = {
            firstName: null,
            lastName: null
          };
        }

        if (canSearch) {
          var searchQuery = this.event.request.intent.slots[canSearch].value;
          var searchResults = helperFunctions.searchDatabase(constants.data, searchQuery, canSearch);

          if (searchResults.count == 1) {
            // If one person was found in the database
            newPerson = searchResults.results[0];

            // If the last person saved == the person requested
            if ((person.firstName == newPerson.firstName) && (person.lastName == newPerson.lastName)) {
              // person = this.attributes.lastSearch.results[0];
              cardContent = helperFunctions.generateCard(person);
              speechOutput = speechGeneration.generateSpecificInfoMessage(slots,person);
              repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no. ";
              this.handler.state = states.SEARCHMODE;
              this.attributes.lastSearch.lastSpeech = speechOutput;
              this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);

            } else {
              // Else someone requested information about a new person
              // Save the new person's information, for future follow-up questions
              var lastSearch = this.attributes.lastSearch = searchResults;
              this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

              cardContent = helperFunctions.generateCard(newPerson);
              speechOutput = speechGeneration.generateSpecificInfoMessage(slots,newPerson);
              repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no. ";
              this.handler.state = states.SEARCHMODE;
              this.attributes.lastSearch.lastSpeech = speechOutput;
              this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
            }

          } else if (searchResults.count > 1) {
            var listOfPeopleFound = helperFunctions.loopThroughArrayOfObjects(lastSearch.results);
            output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
            this.handler.state = states.MULTIPLE_RESULTS; // Change state to MULTIPLE_RESULTS
            this.attributes.lastSearch.lastSpeech = output;
            this.emit(":ask", output, repromptSpeech);

          } else {
            // The requested person does not exist
            strEmit = "I'm sorry. I couldn't find anyone by that name. Would you like to try again? " + speechGeneration.getLibrariansHelpMessage(constants.data, constants.index);
            repromptSpeech = "<break time=\"0.5s\"/> Would you still like to find more information? Say yes or no. ";
            this.emit(":ask", strEmit, repromptSpeech);
          }

        } else {
          // Else a specific person was not mentioned
          cardContent = helperFunctions.generateCard(person);
          speechOutput = speechGeneration.generateSpecificInfoMessage(slots,person);
          repromptSpeech = "<break time=\"0.5s\"/> Would you like to find more information? Say yes or no. ";
          this.handler.state = states.SEARCHMODE;
          this.attributes.lastSearch.lastSpeech = speechOutput;
          this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
        }

      } else {
        // Not a valid slot, no card needs to be set up, respond with simply a voice response
        strEmit = "Sorry, I don't understand which person you are asking about. Please ask me again and specify their name. " + speechGeneration.getLibrariansHelpMessage(constants.data, constants.index);
        this.emit(":ask", strEmit, repromptSpeech);
      }
      helperFunctions.printRequest(this.event.request);
    },
    "TellHoursIntent": function() {
      intentFunctions.tellHoursIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },

    "SearchByNameIntent": function() {
      intentFunctions.searchByNameIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },

    "SearchBySpecialtyIntent": function() {
      intentFunctions.searchBySpecialtyIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },

    "SearchHoursIntent": function() {
      intentFunctions.searchHoursIntentHandler.call(this);
      helperFunctions.printRequest(this.event.request);
    },

    "AMAZON.HelpIntent": function() {
      var slots = this.event.request.intent.slots;
      var person = this.attributes.lastSearch.results[0];
      this.emit(":ask", speechGeneration.generateNextPromptMessage(person,"current"), speechGeneration.generateNextPromptMessage(person,"current"));
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

    "AMAZON.NoIntent": function() {
      this.emit(":ask", SHUTDOWN_MESSAGE);
      helperFunctions.printRequest(this.event.request);
    },

    "AMAZON.YesIntent": function() {
      this.emit("TellMeMoreIntent");
      helperFunctions.printRequest(this.event.request);
    },

    "AMAZON.RepeatIntent": function() {
      this.emit(":ask",this.attributes.lastSearch.lastSpeech, this.attributes.lastSearch.lastSpeech);
      helperFunctions.printRequest(this.event.request);
    },

    "AMAZON.StartOverIntent": function() {
      this.handler.state = states.SEARCHMODE;
      // Reset the search
      if (this.attributes.lastSearch) {
        this.attributes.lastSearch = null;
      }
      var output = "Ok, starting over. I can help you find a librarian, or our opening hours. " + speechGeneration.getGenericHelpMessage(constants.data);
      this.emit(":ask", output, repromptSpeech);
      helperFunctions.printRequest(this.event.request);
    },

    "SessionEndedRequest": function() {
      this.emit("AMAZON.StopIntent");
      helperFunctions.printRequest(this.event.request);
    },

    "Unhandled": function() {
      // console.log("Unhandled intent in DESCRIPTION state handler");
      this.emit(":ask", "Sorry, I don't know that request. Do you need help? You can say - help me. ");
      helperFunctions.printRequest(this.event.request);
    }
    })
};

module.exports = stateHandlers;
