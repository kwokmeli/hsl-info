"use strict";

const util = require("util");

var constants = require("./constants");
var helperFunctions = require("./helperFunctions");
var speechGeneration = require("./speechGeneration");

var states = {
  SEARCHMODE: "_SEARCHMODE",
  DESCRIPTION: "_DESCRIPTION",
  MULTIPLE_RESULTS: "_MULTIPLE_RESULTS"
};

function searchByNameIntentHandler() {
  var firstName = helperFunctions.isSlotValid(this.event.request, "firstName");
  var lastName = helperFunctions.isSlotValid(this.event.request, "lastName");
  var infoType = helperFunctions.isSlotValid(this.event.request, "infoType");
  var repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no. ";

  var canSearch = helperFunctions.figureOutWhichSlotToSearchBy(firstName,lastName);

  if (canSearch) {
    var searchQuery = this.event.request.intent.slots[canSearch].value;
    var searchResults = helperFunctions.searchDatabase(constants.data, searchQuery, canSearch);

    // Saving lastSearch results to the current session
    var lastSearch = this.attributes.lastSearch = searchResults;
    var output;

    if (searchResults.count > 1) { // Multiple results found
      var listOfPeopleFound = helperFunctions.loopThroughArrayOfObjects(lastSearch.results);
      output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
      this.handler.state = states.MULTIPLE_RESULTS; // Change state to MULTIPLE_RESULTS
      this.attributes.lastSearch.lastSpeech = output;
      this.emit(":ask", output, repromptSpeech);

      // Saving last intent to session attributes
      this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

    } else if (searchResults.count == 1) { // One result found
      this.handler.state = states.DESCRIPTION; // Change state to description
      if (infoType) {
        // If a specific infoType was requested, redirect to specificInfoIntent
        // infoType was provided
        this.emitWithState("TellMeThisIntent");
      } else { // No infoType was provided
        output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results);
        this.attributes.lastSearch.lastSpeech = output;
        this.emit(":ask", output,repromptSpeech);
      }

      // Saving last intent to session attributes
      this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

    } else { // No match found
      output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results);
// this.attributes.lastSearch.lastSpeech = output;
      this.emit(":ask", output,repromptSpeech);
    }
  } else { // No searchable slot was provided
    this.emit(":ask", speechGeneration.generateSearchResultsMessage(searchQuery,false), repromptSpeech);
  }
}

function searchBySpecialtyIntentHandler() {
  var specialty = helperFunctions.isSlotValid(this.event.request, "specialty");
  var results = [];
  var str = "";
  var matchFound = false;
  var subject;
  var repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no. ";

  if (specialty) {
    // For each entry
    for (var i = 0; i < constants.index.length; i++) {
      // For each synonym within each entry
      for (var j = 0; j < constants.index[i].subject.length; j++) {
        if (helperFunctions.sanitizeSearchQuery(specialty) == constants.index[i].subject[j]) {
          // For each person associated with an entry
          for (var k = 0; k < constants.index[i].person.length; k++) {
// results.push(index[i].person[k]);

            if (constants.index[i].pronounceLast.length != 0) {
              results.push(constants.index[i].first[k] + " " + constants.index[i].pronounceLast[k]);
            } else {
              results.push(constants.index[i].person[k]);
            }
          }
          matchFound = true;

          // Remember which index contains the queried value
          subject = i;

          if (results.length == 1) {
            var searchResults = helperFunctions.searchDatabase(constants.data, constants.index[subject].last[0], "lastName");

            // Saving lastSearch results to the current session
            // Follow-up questions (e.g. "what is her email") only apply if there is one result
            var lastSearch = this.attributes.lastSearch = searchResults;
            this.attributes.lastSearch.lastIntent = "SearchBySpecialtyIntent";
          }

          // List the liaison(s) for the requested topic
          for (var l = 0; l < results.length; l++) {
            if (l == results.length - 1) {
              str += results[l];
            } else if (l == results.length - 2) {
              str += results[l] + " and ";
            } else {
              str += results[l] + ", ";
            }
          }
        }
      }
    }

    if (matchFound == false) {
      this.emit(":ask", "Sorry, I couldn't find anyone who is a liaison for that topic. <break time=\"0.5s\"/> Please try again. " + speechGeneration.getLibrariansHelpMessage(constants.data, constants.index), repromptSpeech);
    } else {
      if (results.length > 1) {
        str += " are the liaisons for your requested topic of " + constants.index[subject].subject[0] + ". You can ask for their email, phone number, or contact information. Or, you can start a new search. " + speechGeneration.getGenericHelpMessage(constants.data);
        this.emit(":ask", str,repromptSpeech);
      } else {
        str += " is the liaison for your requested topic of " + constants.index[subject].subject[0] + ". You can ask for " + helperFunctions.genderize("his-her", constants.index[subject].gender) +
               " email, phone number, or contact information. Or, you can start a new search. " + speechGeneration.getGenericHelpMessage(constants.data);
        this.emit(":ask", str,repromptSpeech);
      }
    }
  } else {
    str = "I'm not sure what you're asking. Please ask me again. " + speechGeneration.getGenericHelpMessage(constants.data);
    this.emit(":ask", str,repromptSpeech);
  }
}

function searchHoursIntentHandler() {
  var requestedDate = helperFunctions.isSlotValid(this.event.request, "date");

  if (requestedDate) {
    var year;
    var yearIndex;
    var status;
    var strEmit;
    var currentDate = new Date();
    var repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no";

    if ((requestedDate == "PRESENT_REF") || (requestedDate == "present_ref")) {
      // The user requested hours for now
      // Get current date and time
      year = currentDate.getFullYear();

      if ((year == constants.YEAR1) || (year == constants.YEAR2)) {
        if (year == constants.YEAR1) {
          yearIndex = 0;
        } else {
          yearIndex = 1;
        }

        status = constants.hours[yearIndex].month[currentDate.getMonth()][currentDate.getDate() - 1];

        if (status == "closed") {
          this.emit(":ask", "Sorry, the library is not currently open.", repromptSpeech);
        } else if (status == "") {
          strEmit = "The library hours for that date have not been determined yet. Would you like to find opening hours for other dates? " + speechGeneration.getHoursHelpMessage();
          this.emit(":ask", strEmit, repromptSpeech);
        } else {
          var currentStatus = helperFunctions.libraryStatusGivenTime(status, currentDate.getHours(), currentDate.getMinutes());

          if (currentStatus == "open") {
            strEmit = "The library is currently open. Today's hours are " + helperFunctions.returnHours(status);
            this.emit(":ask", strEmit, repromptSpeech);
          } else {
            this.emit(":ask", "Sorry, the library is not currently open.", repromptSpeech);
          }
        }
      } else {
        strEmit = "The current library hours have not been determined yet. Would you like to find opening hours for other dates? " + speechGeneration.getHoursHelpMessage();
        this.emit(":ask", strEmit, repromptSpeech);
      }
    } else {
      var date = requestedDate.split("-");

      if (date.length == 3) {
        if ((!isNaN(date[1])) && (!isNaN(date[2]))) {
          // Library hours for a specific date have been requested
          if ((date[0] == constants.YEAR1) || (date[0] == constants.YEAR2)) {
            if (date[0] == constants.YEAR1) {
              yearIndex = 0;
            } else {
              yearIndex = 1;
            }

            status = constants.hours[yearIndex].month[Number(date[1]) - 1][Number(date[2]) - 1];

            if (status == "closed") {
              strEmit = "The library is closed on " + helperFunctions.returnMonth(date[1]) + " " + parseInt(date[2]) + "th.";
              this.emit(":ask", strEmit, repromptSpeech);
            } else if (status == "") {
              strEmit = "The library hours have not been determined for that day. Would you like to find opening hours for other dates? " + speechGeneration.getHoursHelpMessage();
              this.emit(":ask", strEmit, repromptSpeech);
            } else {
              strEmit = "The library is open on " + helperFunctions.returnMonth(date[1]) + " " + parseInt(date[2]) + "th, from " + helperFunctions.returnHours(status);
              this.emit(":ask", strEmit, repromptSpeech);
            }
          } else {
            strEmit = "The library hours have not been determined for that year. Would you like to find opening hours for other dates? " + helperFunctions.getHoursHelpMessage();
            this.emit(":ask", strEmit,repromptSpeech);
          }

        } else {
          // Library hours for a specific weekend have been requested
          if ((date[0] == constants.YEAR1) || (date[0] == constants.YEAR2)) {
            var week = date[1].toUpperCase().replace("W", "");
            var ISODate = helperFunctions.getDateOfISOWeek (week, date[0]);

            if (date[0] == constants.YEAR1) {
              yearIndex = 0;
            } else {
              yearIndex = 1;
            }

            function newDate (days) {
              this.year = Number(date[0]);
              this.month = Number(ISODate.getMonth()) + 1;
              this.date = Number(ISODate.getDate());
              this.days = days;
            }

            var satDate = helperFunctions.returnDate(new newDate(5));
            var sunDate = helperFunctions.returnDate(new newDate(6));

            var sat = constants.hours[yearIndex].month[satDate.month - 1][satDate.date - 1];
            var sun = constants.hours[yearIndex].month[sunDate.month - 1][sunDate.date - 1];

            if (sat == "closed" && sun == "closed") {
              strEmit = "Sorry. The library is not open on the weekend of " + helperFunctions.returnMonth(satDate.month) + " " + parseInt(satDate.date) + "th and " +
                        helperFunctions.returnMonth(sunDate.month) + " " + parseInt(sunDate.date) + "th. ";
              this.emit(":ask", strEmit, repromptSpeech);
            } else if ((sat == "closed") && !(sun == "closed")) {
              strEmit = "The library is not open on Saturday, " + helperFunctions.returnMonth(satDate.month) + " " + parseInt(satDate.date) + "th, but it is open on Sunday, " +
                        helperFunctions.returnMonth(sunDate.month) + " " + parseInt(sunDate.date) + "th from " + helperFunctions.returnHours(sun) + ". ";
              this.emit(":ask", strEmit, repromptSpeech);
            } else if ((sun == "closed") && !(sat == "closed")) {
              strEmit = "The library is open on Saturday, " + helperFunctions.returnHours(satDate.month) + " " + parseInt(satDate.date) + "th, from " + helperFunctions.returnHours(sat) +
                        ". The library is not open on Sunday, " + helperFunctions.returnMonth(sunDate.month) + " " + parseInt(sunDate.date) + "th. ";
              this.emit(":ask", strEmit, repromptSpeech);
            } else if (sat == "" && sun == "") {
              this.emit(":ask", "The library hours for " + helperFunctions.returnMonth(satDate.month) + " " + parseInt(satDate.date) + ", " + satDate.year + " and " +
                                 helperFunctions.returnMonth(sunDate.month) + " " + parseInt(sunDate.date) + ", " + sunDate.year + " have not been determined yet. ", repromptSpeech);
            } else if ((sat == "") && !(sun == "")) {
              strEmit = "The library hours have not yet been determined for Saturday, " + helperFunctions.returnHours(satDate.month) + " " + parseInt(satDate.date) + ", " + satDate.year +
                        ". But the library is open on Sunday, " + helperFunctions.returnMonth(sunDate.month) + " " + parseInt(sunDate.date) + "th, from " + helperFunctions.returnHours(sun) + ". ";
              this.emit(":ask", strEmit, repromptSpeech);
            } else if ((sun == "") && !(sat == "")) {
              strEmit = "The library hours have not yet been determined for Sunday, " + helperFunctions.returnMonth(sunDate.month) + " " + parseInt(sunDate.date) + ", " + sunDate.year +
                        ". But the library is open on Saturday, " + helperFunctions.returnMonth(satDate.month) + " " + parseInt(satDate.date) + "th, from " + helperFunctions.returnHours(sat) + ". ";
              this.emit(":ask", strEmit, repromptSpeech);
            } else {
              if (sat == sun) {
                strEmit = "The library is open on Saturday and Sunday, " + helperFunctions.returnMonth(satDate.month) + " " + parseInt(satDate.date) + "th and " + helperFunctions.returnMonth(sunDate.month) +
                          " " + parseInt(sunDate.date) + "th, from " + helperFunctions.returnHours(sat); + ". ";
                this.emit(":ask", strEmit, repromptSpeech);
              } else {
                strEmit = "The library is open on Saturday, " + helperFunctions.returnMonth(satDate.month) + " " + parseInt(satDate.date) + "th, from " + helperFunctions.returnHours(sat) +
                          ". The library is also open on Sunday, " + helperFunctions.returnMonth(sunDate.month) + " " + parseInt(sunDate.date) + "th, from " + helperFunctions.returnHours(sun) + ". ";
                this.emit(":ask", strEmit, repromptSpeech);
              }
            }
          } else {
            strEmit = "The library hours have not been determined for that year. Would you like to find opening hours for other dates? " + speechGeneration.getHoursHelpMessage();
            this.emit(":ask", strEmit, repromptSpeech);
          }
        }
      } else if (date.length == 2) {
        if (!isNaN(date[1])) {
          // Asked for a month, e.g. "this month": 2017-08
          strEmit = "The library is open during the month of " + helperFunctions.returnMonth(date[1]) + ". <break time=\"0.25s\"/> Please specify a date or week for more detailed opening hours. " + speechGeneration.getHoursHelpMessage();
          this.emit(":ask", strEmit, repromptSpeech);

        } else if ((date[1].toUpperCase() == "WI") || (date[1].toUpperCase() == "SP") || (date[1].toUpperCase() == "SU") || (date[1].toUpperCase() == "FA")) {
          // Asked for a season, e.g. "next winter": 2017-WI
          var season, currentPeriod;

          if (date[0] == constants.YEAR1 || date[0] == constants.YEAR2) {
            if (date[1].toUpperCase() == "WI") {
              season = "winter";
              currentPeriod = 2;
            } else if (date[1].toUpperCase() == "SP") {
              season = "spring";
              currentPeriod = 4;
            } else if (date[1].toUpperCase() == "SU") {
              season = "summer";
              currentPeriod = 6;
            } else {
              season = "autumn";
              currentPeriod = 0;
            }

            strEmit = constants.periodHours[currentPeriod] + " <break time=\"0.5s\"/>" + constants.extraHours[currentPeriod];
            this.emit(":ask", strEmit, repromptSpeech);

          } else {
            this.emit(":ask", "The library hours have not yet been determined for that year.", repromptSpeech);
          }

        } else if ((date[1].toUpperCase() == "Q1") || (date[1].toUpperCase() == "Q2") || (date[1].toUpperCase() == "Q3") || (date[1].toUpperCase() == "Q4")) {
          // Asked for a calendar quarter
          strEmit = "The library will be open during ";

          if (date[1].toUpperCase() == "Q1") {
            // January 1 - March 31
            strEmit += "the first calendar quarter, from January 1st to March 31st. ";
          } else if (date[1].toUpperCase() == "Q2") {
            // April 1 - June 30
            strEmit += "the second calendar quarter, from April 1st to June 30th. ";
          } else if (date[1].toUpperCase() == "Q3") {
            // July 1 - September 30
            strEmit += "the third calendar quarter, from July 1st to September 30th. ";
          } else {
            // October 1 - December 31
            strEmit += "the fourth calendar quarter, from October 1st to December 31st. ";
          }

          strEmit += "For more detailed opening hours, please ask for the hours on a specific date. Or - for opening hours for school quarters, please ask for the hours of a season. ";
          this.emit(":ask", strEmit, repromptSpeech);

        } else {
          // Asked for a week, e.g. "next week": 2017-W44
          if ((date[0] == constants.YEAR1) || (date[0] == constants.YEAR2)) {
            if (date[0] == constants.YEAR1) {
              yearIndex = 0;
            } else {
              yearIndex = 1;
            }

            var start;
            var week = date[1].toUpperCase().replace("W", "");
            var ISODate = helperFunctions.getDateOfISOWeek(week, date[0]);

            var todayDate = currentDate.getDate();
            var todayMonth = Number(currentDate.getMonth()) + 1;
            var todayYear = currentDate.getFullYear();

            function newDate (days) {
              this.year = Number(date[0]);
              this.month = Number(ISODate.getMonth()) + 1;
              this.date = Number(ISODate.getDate());
              this.days = days;
            }

            var tueDate = helperFunctions.returnDate(new newDate(1));
            var wedDate = helperFunctions.returnDate(new newDate(2));
            var thuDate = helperFunctions.returnDate(new newDate(3));
            var friDate = helperFunctions.returnDate(new newDate(4));
            var satDate = helperFunctions.returnDate(new newDate(5));
            var sunDate = helperFunctions.returnDate(new newDate(6));

            // Dates of the requested week
            var days = [Number(ISODate.getDate()), tueDate.date, wedDate.date, thuDate.date,
                        friDate.date, satDate.date, sunDate.date];

            var months = [Number(ISODate.getMonth()) + 1, tueDate.month, wedDate.month, thuDate.month,
                          friDate.month, satDate.month, sunDate.month];

            var years = [Number(ISODate.getFullYear()), tueDate.year, wedDate.year, thuDate.year,
                         friDate.year, satDate.year, sunDate.year];

            // Compare today's date with the requested week's dates
            // Only tell the user the opening hours of the remainder of the week
            if (((Number(ISODate.getMonth()) + 1) == todayMonth) && (date[0] == todayYear)) {
              if (todayDate == days[0] || todayDate == days[1] || todayDate == days[2] ||
                  todayDate == days[3] || todayDate == days[4] || todayDate == days[5] ||
                  todayDate == days[6]) {

                // Check which day you should start listing hours for
                for (var i = 0; i < days.length; i++) {
                  if (todayDate == days[i]) {
                    // Found today's date
                    start = i;
                  }
                }

              } else {
                // List all opening hours for the entire week
                start = 0;
              }
            } else {
              // List all opening hours for the entire week
              start = 0;
            }

            var closed = [];
            // Find the opening hours for the requested week
            // Find any days that are closed
            if (constants.hours[yearIndex].month[months[0] - 1][days[0] - 1] == "closed") {
              closed.push(0);
            }
            if (constants.hours[yearIndex].month[months[1] - 1][days[1] - 1] == "closed") {
              closed.push(1);
            }
            if (constants.hours[yearIndex].month[months[2] - 1][days[2] - 1] == "closed") {
              closed.push(2);
            }
            if (constants.hours[yearIndex].month[months[3] - 1][days[3] - 1] == "closed") {
              closed.push(3);
            }
            if (constants.hours[yearIndex].month[months[4] - 1][days[4] - 1] == "closed") {
              closed.push(4);
            }
            if (constants.hours[yearIndex].month[months[5] - 1][days[5] - 1] == "closed") {
              closed.push(5);
            }
            if (constants.hours[yearIndex].month[months[6] - 1][days[6] - 1] == "closed") {
              closed.push(6);
            }

            var str1 = "The library is open on the following days and hours: ";

            for (var i = start; i < days.length; i++) {
              if (!(helperFunctions.isInArray(i, closed))) {
                // If the library isn't closed, list the open hours for that day
                str1 += helperFunctions.returnDay(i) + ", " + helperFunctions.returnMonth(months[i]) + " " + days[i] + "th, from " + helperFunctions.returnHours(constants.hours[yearIndex].month[months[i] - 1][days[i] - 1]) + " - ";
              }
            }

            var str2 = "The library is closed on the following days: ";
            if (closed.length != 0) {
              // If there are any days that are closed, state them
              for (var i = 0; i < closed.length; i++) {
                if (i == closed.length - 2) {
                  str2 += helperFunctions.returnDay(closed[i]) + ", " + helperFunctions.returnMonth(months[closed[i]]) + " " + days[closed[i]] + "th - and ";
                } else if (i == closed.length - 1) {
                  str2 += helperFunctions.returnDay(closed[i]) + ", " + helperFunctions.returnMonth(months[closed[i]]) + " " + days[closed[i]] + "th. ";
                } else {
                  str2 += helperFunctions.returnDay(closed[i]) + ", " + helperFunctions.returnMonth(months[closed[i]]) + " " + days[closed[i]] + "th - ";
                }
              }

              strEmit = str1 + str2;
              this.emit(":ask", strEmit, repromptSpeech);

            } else {
              this.emit(":ask", str1, repromptSpeech);
            }

          } else {
            strEmit = "The library hours have not been determined for that year. Would you like to find opening hours for other dates? " + speechGeneration.getHoursHelpMessage();
            this.emit(":ask", strEmit, repromptSpeech);
          }

        }

      } else {
        if (date[0] == "201X") {
          // Asked for this decade
          strEmit = "The library will most likely be open for the next decade. Future hours have yet to be decided. To get current hours, please specify a date, week, or weekend. " + speechGeneration.getHoursHelpMessage();
          this.emit(":ask", strEmit, repromptSpeech);
        } else if (date[0] == "20XX") {
          // Asked for this century
          strEmit = "The library will most likely be open for the next century. Future hours have yet to be decided. Please specify a date, week, or weekend for more detailed opening hours. " + speechGeneration.getHoursHelpMessage();
          this.emit(":ask", strEmit, repromptSpeech);
        } else {
          if (date[0] == constants.YEAR1) {
            // Asked for this year
            strEmit = "The library is open this year. Please specify a date, week, or weekend for more detailed opening hours. " + speechGeneration.getHoursHelpMessage();
            this.emit(":ask", strEmit, repromptSpeech);
          } else if (date[0] == constants.YEAR2) {
            // Asked for next year
            strEmit = "The library will be open next year. Please specify a date or week for more detailed opening hours. " + speechGeneration.getHoursHelpMessage();
            this.emit(":ask", strEmit, repromptSpeech);
          } else if (Number(date[0]) < constants.YEAR1) {
            // Asked for years in the past
            strEmit = "The library was open last year. Please specify a present or future date, week, or weekend for more detailed opening hours. " + speechGeneration.getHoursHelpMessage();
            this.emit(":ask", strEmit, repromptSpeech);
          } else {
            // Asked for other years in the future
            strEmit = "The library will most likely be open in the future. Future hours have yet to be decided. Please specify a date or week for more detailed opening hours. " + speechGeneration.getHoursHelpMessage();
            this.emit(":ask", strEmit, repromptSpeech);
          }
        }
      }
    }
  } else {
    strEmit = "I'm sorry. I couldn't understand the date you asked for. Please ask me again. " + speechGeneration.getHoursHelpMessage();
    this.emit(":ask", strEmit, repromptSpeech);
  }
}

function searchByInfoTypeIntentHandler() {
  var slots = this.event.request.intent.slots;
  var firstName = helperFunctions.isSlotValid(this.event.request, "firstName");
  var lastName = helperFunctions.isSlotValid(this.event.request, "lastName");
  var infoType = helperFunctions.isSlotValid(this.event.request, "infoType");
  var repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no";
  var canSearch = helperFunctions.figureOutWhichSlotToSearchBy(firstName,lastName);

  if (canSearch) {
    var searchQuery = slots[canSearch].value;
    var searchResults = helperFunctions.searchDatabase(constants.data, searchQuery, canSearch);

    // Saving lastSearch results to the current session
    var lastSearch = this.attributes.lastSearch = searchResults;
    var output;

    // Saving last intent to session attributes
    this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

    if (searchResults.count > 1) { // Multiple results found
      var listOfPeopleFound = helperFunctions.loopThroughArrayOfObjects(lastSearch.results);
      output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
      this.handler.state = states.MULTIPLE_RESULTS; // Change state to MULTIPLE_RESULTS
      this.attributes.lastSearch.lastSpeech = output;
      this.emit(":ask", output, repromptSpeech);

    } else if (searchResults.count == 1) { // One result found
      this.handler.state = states.DESCRIPTION; // Change state to description
      if (infoType) {
      // If a specific infoType was requested, redirect to specificInfoIntent
      // infoType or specialty was provided as well
      var person = this.attributes.lastSearch.results[0];
      var cardContent = helperFunctions.generateCard(person);
      var speechOutput = speechGeneration.generateSpecificInfoMessage(slots,person);
      this.attributes.lastSearch.lastSpeech = speechOutput;
      this.handler.state = states.SEARCHMODE;
      this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
      // this.emitWithState("TellMeThisIntent");

      } else { // No infoType was provided
        output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results)
        this.attributes.lastSearch.lastSpeech = output;
        // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
        this.emit(":ask", output, repromptSpeech);
      }

    } else { // No match found
      output = speechGeneration.generateSearchResultsMessage(searchQuery,searchResults.results)
      this.attributes.lastSearch.lastSpeech = output;
      // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
      this.emit(":ask", output, repromptSpeech);
    }
  } else { // No searchable slot was provided
    this.emit(":ask", speechGeneration.generateSearchResultsMessage(searchQuery,false), repromptSpeech);
  }
}

function tellHoursIntentHandler() {
  var currentDate = new Date();
  var d1, d2, c;
  var date1, date2, check;
  var currentPeriod;
  var strEmit;
  var validDate = false;
  var today = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
  var repromptSpeech = "<break time=\"0.5s\"/> Do you still want to find more information? Say yes or no";

  // Check date to see if it falls within one of the current school year's quarters/interims
  for (var i = 0; i < constants.period.length; i++) {
    d1 = constants.period[i][0].split("/");
    d2 = constants.period[i][1].split("/");
    c = today.split("/");

    date1 = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
    date2 = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    if ((check >= date1) && (check <= date2)) {
      currentPeriod = i;
      validDate = true;
    }
  }

  if (validDate) {
    strEmit = constants.periodHours[currentPeriod] + " <break time=\"0.25s\"/>" + constants.extraHours[currentPeriod];
    this.emit(":ask", strEmit, repromptSpeech);
  } else {
    strEmit = "The hours for this quarter have not been determined yet. For current hours, please specify a date, week, or weekend. " + speechGeneration.getHoursHelpMessage();
    this.emit(":ask", strEmit, repromptSpeech);
  }

}

module.exports = {
  searchByNameIntentHandler,
  searchBySpecialtyIntentHandler,
  searchHoursIntentHandler,
  searchByInfoTypeIntentHandler,
  tellHoursIntentHandler
}
