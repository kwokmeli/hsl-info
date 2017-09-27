"use strict";
const util = require("util");

var constants = require("./constants");

// =====================================================================================================
// ------------------------------------ Section 4. Helper Functions  -----------------------------------
// =====================================================================================================

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomName (arrayOfStrings) {
  var randomNumber = getRandom(0, arrayOfStrings.length - 1)

  if (arrayOfStrings[randomNumber].lastName != "") {
    return arrayOfStrings[randomNumber].firstName + " " + arrayOfStrings[randomNumber].pronounceLast;
  } else {
    return arrayOfStrings[randomNumber].firstName + " " + arrayOfStrings[randomNumber].lastName;
  }

}

function getRandomSubject (arrayOfStrings) {
console.log("arrayOfStrings: " + arrayOfStrings);
  var randomNumber = getRandom(0, constants.index - 1)
console.log("randomNumber: " + randomNumber);
console.log("can i see data? : " + constants.data);
  return arrayOfStrings[randomNumber].subject[0];
}

function titleCase (str) {
  return str.replace(str[0], str[0].toUpperCase());
}

function generateCard (person) {
  var cardTitle = "Contact Info for " + titleCase(person.firstName) + " " + titleCase(person.lastName);
  var cardBody = "E-mail: " + person.email + "@uw.edu \n" + "Phone: " + person.phone + " \n";
  return {
      "title": cardTitle,
      "body": cardBody,
  };
}

function generateTopics (person) {
  var topic1;
  var topic2;
  var topic3;

  var result = "";

  if ((person.topics.length < 3) && (person.topics.length > 0)) {
    if (person.topics.length == 1) {
      result += person.topics[0] + ". ";
    } else {
      result += person.topics[0] + ", and " + person.topics[1] + ". ";
    }

  } else {
    for (var i = 0; i < 3; i++) {
      if (i == 2) {
        topic3 = person.topics[getRandom(0,person.topics.length - 1)];
        while ((topic3 == topic2) || (topic3 == topic1)) {
          topic3 = person.topics[getRandom(0,person.topics.length - 1)];
        }
        result += topic3 + ". ";
      } else if (i == 1) {
        topic2 = person.topics[getRandom(0,person.topics.length - 1)];
        while (topic2 == topic1) {
          topic2 = person.topics[getRandom(0,person.topics.length - 1)];
        }
        result += topic2 + ", and ";
      } else {
        topic1 = person.topics[getRandom(0,person.topics.length - 1)];
        result += topic1 + ", ";
      }
    }
  }

  return result;
}

function generateLiaisons (person) {
  var liaison1;
  var liaison2;
  var liaison3;

  var result = "";

  if ((person.liaison.length < 3) && (person.liaison.length > 0)) {
    if (person.liaison.length == 1) {
      result += person.liaison[0];
    } else {
      result += person.liaison[0] + " and " + person.liaison[1];
    }

  } else {
    for (var i = 0; i < 3; i++) {
      if (i == 2) {
        liaison3 = person.liaison[getRandom(0,person.liaison.length - 1)];
        while ((liaison3 == liaison2) || (liaison3 == liaison1)) {
          liaison3 = person.liaison[getRandom(0,person.liaison.length - 1)];
        }
        result += liaison3 + ". ";
      } else if (i == 1) {
        liaison2 = person.liaison[getRandom(0,person.liaison.length - 1)];
        while (liaison2 == liaison1) {
          liaison2 = person.liaison[getRandom(0,person.liaison.length - 1)];
        }
        result += liaison2 + ", and ";
      } else {
        liaison1 = person.liaison[getRandom(0,person.liaison.length - 1)];
        result += liaison1 + ", ";
      }
    }
  }

  return result;
}

function loopThroughArrayOfObjects (arrayOfStrings) {
  var joinedResult = "";
  // Looping through the each object in the array
  for (var i = 0; i < arrayOfStrings.length; i++) {
  // Concatenating names (firstName + lastName ) for each item
      joinedResult = joinedResult + ", " + arrayOfStrings[i].firstName + " " + arrayOfStrings[i].lastName;
  }
  return joinedResult;
}

function genderize (type, gender) {
  var pronouns = {
      "m":{"he-she":"he","his-her":"his","him-her":"him"},
      "f":{"he-she":"she","his-her":"her","him-her":"her"}
  };
  return pronouns[gender][type];
}

function sanitizeSearchQuery (searchQuery) {
  searchQuery = searchQuery.replace(/’s/g, "").toLowerCase();
  searchQuery = searchQuery.replace(/'s/g, "").toLowerCase();
  return searchQuery;
}

function isSlotValid (request, slotName) {
  var slot = request.intent.slots[slotName];
  // console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
  var slotValue;

  // If we have a slot, get the text and store it into speechOutput
  if (slot && slot.value) {
      // We have a value in the slot
      if ((slotName == "firstName") || (slotName == "lastName")) {
        slotValue = dePossessive(slot.value.toLowerCase());
      } else {
        slotValue = slot.value.toLowerCase();
      }
      return slotValue;
  } else {
      // We didn't get a value in the slot.
      return false;
  }
}

function isInArray (value, array) {
  return array.indexOf(value) > -1;
}

function isInfoTypeValid (infoType) {
  var validTypes = ["phone number","e-mail", "email", "e mail", "phone", "topics", "specialty",
                    "specialties", "topic", "liaison", "specialize","subject","subjects"
                   ];
  return isInArray(infoType,validTypes);
}

// Given a date and a number of days, returns the date of the given date plus the given number of days
// Year should be a full year (e.g. 2017), month should be the actual month number (e.g. 8 if it's August),
// date should be the actual date number (e.g. 10 for August 10)

// All information should be passed in as an object
// NOTE: Function is only meant for positive numbers of days
function returnDate (dateObject) {
  var isLeapYear;
  var newMonth, newDate, newYear, newDays;
  var daysInMonth;
  var newDateObject;

  // Check if it is a leap year
  if ((dateObject.year % 4) == 0) {
    if ((dateObject.year % 100) == 0) {
      if ((dateObject.year % 400) == 0) {
        // Leap year
        isLeapYear = true;
      } else {
        // Not a leap year
        isLeapYear = false;
      }
    } else {
      // Leap year
      isLeapYear = true;
    }
  } else {
    // Not a leap year
    isLeapYear = false;
  }

  // Determine number of days in the requested month
  switch (dateObject.month) {
    case 1:
      daysInMonth = 31;
      break;
    case 2:
      if (isLeapYear) {
        daysInMonth = 29;
      } else {
        daysInMonth = 28;
      }
      break;
    case 3:
      daysInMonth = 31;
      break;
    case 4:
      daysInMonth = 30;
      break;
    case 5:
      daysInMonth = 31;
      break;
    case 6:
      daysInMonth = 30;
      break;
    case 7:
      daysInMonth = 31;
      break;
    case 8:
      daysInMonth = 31;
      break;
    case 9:
      daysInMonth = 30;
      break;
    case 10:
      daysInMonth = 31;
      break;
    case 11:
      daysInMonth = 30;
      break;
    case 12:
      daysInMonth = 31;
      break;
    default:
      daysInMonth = null;
      break;
  }

  // Error checking
  if (daysInMonth == null) {
    return null;
  }

  // Check to see if the number of days exceeds the number of days in a month
  // e.g. Adding 10 days to March 31st
  if ((Math.floor((dateObject.date + Math.abs(dateObject.days)) / daysInMonth) > 0) && ((dateObject.date + Math.abs(dateObject.days)) / daysInMonth) != 1) {
    // Number of days exceeds number of days in a month
    // Advance one month, recursively call returnDate again
    if (dateObject.month != 12) {
      newYear = dateObject.year;
      newMonth = dateObject.month + 1;
    } else {
      // Next month is January; increment year
      newYear = dateObject.year + 1;
      newMonth = 1;
    }

    newDate = 1;
    newDays = Math.abs(dateObject.days) - (daysInMonth - dateObject.date + 1);

    newDateObject = {
      year: newYear,
      month: newMonth,
      date: newDate,
      days: newDays
    };

    return returnDate (newDateObject);

  } else {
    // Number of days won't exceed number of days in a month, can just add the days
    newYear = dateObject.year;
    newMonth = dateObject.month;
    newDate = dateObject.date + Math.abs(dateObject.days);
    newDays = 0;
  }

  return newDateObject = {
    year: newYear,
    month: newMonth,
    date: newDate,
    days: newDays
  };

}

// Given the numerical value of the day (0-6), returns the name of the day
function returnDay (num) {
  switch (Number(num)) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
    default:
      return null;
  }
}

// Given the numerical value of the month, returns the name of the month
function returnMonth (num) {
  switch (Number(num)) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return null;
  }

}

// Given the raw opening hours, returns dialogue for opening hours
function returnHours (raw) {
  var str;

  if (raw == "7:30:19:00") {
    str = "7:30am to 7:00pm";
  } else if (raw == "7:30:21:00") {
    str = "7:30am to 9:00pm";
  } else if (raw == "7:30:17:00") {
    str = "7:30am to 5:00pm";
  } else if (raw == "9:00:17:00") {
    str = "9:00am to 5:00pm";
  } else if (raw == "10:00:19:00") {
    str = "10:00am to 7:00pm";
  } else if (raw == "12:00:17:00") {
    str = "12:00pm to 5:00pm";
  } else if (raw == "12:00:19:00") {
    str = "12:00pm to 7:00pm";
  } else if (raw == "13:00:17:00") {
    str = "1:00pm to 5:00pm";
  } else {
    str = "invalid input";
  }

  return str;
}

// Given a week number and year, returns the date of the start of that week
function getDateOfISOWeek (week, year) {
  var date = new Date(year, 0, 1 + (week - 1) * 7);
  var ISOWeekStart = date;
  if (date.getDay() <= 4) {
    ISOWeekStart.setDate(date.getDate() - date.getDay() + 1);
  } else {
    ISOWeekStart.setDate(date.getDate() + 8 - date.getDay());
  }

  return ISOWeekStart;
}

// Given a time and a range of opening times, returns whether library is open
// or closed
function libraryStatusGivenTime (constraints, hour, minutes) {
  var timeArray = constraints.split(":");
  var h1 = timeArray[0];
  var m1 = timeArray[1];
  var h2 = timeArray[2];
  var m2 = timeArray[3];

  var status;

  if (h2 > h1) {
    if ((hour <= h2) && (hour >= h1)) {
      if (hour == h2) {
        if (minutes <= m2) {
          status = "open";
        } else {
          status = "closed";
        }
      } else if (hour == h1) {
        if (minutes >= m1) {
          status = "open";
        } else {
          status = "closed";
        }
      } else {
        status = "open";
      }
    }
  } else if (h2 < h1) {
    if ((hour <= h1) && (hour >= h2)) {
      if (hour == h2) {
        if (minutes < m2) {
          status = "open";
        } else {
          status = "closed";
        }
      } else if (hour == h1) {
        if (minutes <= m1) {
          status = "closed";
        } else {
          status = "open";
        }
      } else {
        status = "closed";
      }
    } else {
      status = "open";
    }
  } else {
    // If the hours are the same, compare the minutes
    if (m2 > m1) {
      if ((hour == h1) && (minutes <= m2) && (minutes >= m1)) {
        status = "open";
      } else {
        status = "closed";
      }
    } else {
      if ((hour == h1) && (minutes <= m1) && (minutes >= m2)) {
        status = "closed";
      } else {
        status = "open";
      }
    }
  }

  return status;

}

function dePossessive (possessiveName) {
  return possessiveName.replace("'s","");
}

function printRequest (request) {
  console.log("REQUEST: " + JSON.stringify(request));
}

function searchDatabase(dataset, searchQuery, searchType) {
  var matchFound = false;
  var results = [];

  // Beginning search
  for (var i = 0; i < dataset.length; i++) {
    if (sanitizeSearchQuery(searchQuery) == dataset[i][searchType]) {
        results.push(dataset[i]);
        matchFound = true;
    }
    if ((i == dataset.length - 1) && (matchFound == false)) {
    // This means that we are on the last record, and no match was found
        matchFound = false;
        // console.log("no match was found using " + searchType);
    // If more than searchable items were provided, set searchType to the next item, and set i=0
    }
  }
  return {
    count: results.length,
    results: results
  };
}

function figureOutWhichSlotToSearchBy(firstName,lastName) {
  if (lastName){
    // console.log("search by lastName");
    return "lastName";
  }
  else if (!lastName && firstName){
    // console.log("search by firstName")
    return "firstName";
  }
  else{
    return false;
    // console.log("no valid slot provided. can't search.")
  }
}


module.exports = {
  getRandom,
  getRandomName,
  getRandomSubject,
  titleCase,
  generateCard,
  generateTopics,
  generateLiaisons,
  loopThroughArrayOfObjects,
  genderize,
  sanitizeSearchQuery,
  isSlotValid,
  isInArray,
  isInfoTypeValid,
  returnDate,
  returnDay,
  returnMonth,
  returnHours,
  getDateOfISOWeek,
  libraryStatusGivenTime,
  dePossessive,
  printRequest,
  searchDatabase,
  figureOutWhichSlotToSearchBy
}
