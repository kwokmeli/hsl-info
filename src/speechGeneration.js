"use strict";
const util = require("util");

var constants = require("./constants");
var helperFunctions = require("./helperFunctions");

// =====================================================================================================
// ------------------------------- Section 3. Generating Speech Messages -------------------------------
// =====================================================================================================

function generateNextPromptMessage(person, mode) {
  var infoTypes = ["e-mail","phone number"]
  var prompt;

  if (mode == "current"){
    // if the mode is current, we should give more informaiton about the current contact
    prompt = ". <break time=\"0.5s\"/> You can get more information by asking me - tell me more, or tell me " + helperFunctions.genderize("his-her", person.gender) + " " + infoTypes[helperFunctions.getRandom(0,infoTypes.length-1)];
  }
  //if the mode is general, we should provide general help information
  else if (mode == "general") {
    prompt = getGenericHelpMessage(constants.data);
  }
  return prompt;
}

function generateSendingCardToAlexaAppMessage(person, mode) {
  var sentence = "I have sent " + person.firstName + "'s contact card to your Alexa app. <break time=\"0.5s\"/> Would you like to do another search? " + generateNextPromptMessage(person,mode);
  return sentence;
}

function generateSearchResultsMessage(searchQuery, results) {
  var sentence;
  var details;
  var prompt;

  if (results) {
    switch (true) {
    case (results.length == 0):
        sentence = "Hmm. I couldn't find " + searchQuery + ". Please try again. " + getGenericHelpMessage(constants.data);
        break;
    case (results.length == 1):
        var person = results[0];

        // Alexa standard pronounciation of some last names is incorrect
        if (person.pronounceLast != "") {
          details = person.firstName + " " + person.pronounceLast + " is the " + person.title;
        } else {
          details = person.firstName + " " + person.lastName + " is the " + person.title;
        }

        prompt = generateNextPromptMessage(person,"current");
        sentence = details + prompt
        // console.log(sentence);
        break;
    case (results.length > 1):
        sentence = "I found " + results.length + " matching results";
        break;
    }
  } else {
    sentence = "Sorry, I didn't quite get that. Please try again. ";
  }
  return sentence;
}

// Returns general help messages about finding library hours and finding librarians
function getGenericHelpMessage(data) {
  var sentences = ["things you can ask include - who is " + helperFunctions.getRandomName(data) + "? ", "you can say the name of a librarian or say a topic of interest. ", "you can say - " +
                   "who is the liaison for " + helperFunctions.getRandomSubject(constants.index) + "? ", "you can ask me - what are the library's hours", "you can ask me - will the library be open next week? ",
                   "you can ask me - is the library open this weekend? ", "you can ask - will the library be open next week?", "you can say - tell me about " + helperFunctions.getRandomName(data) + ". ",
                   "you can ask me - give me " + helperFunctions.getRandomName(data) + "'s phone number. "
                  ];

  return "For example, " + sentences[helperFunctions.getRandom(0, sentences.length - 1)];
}

// Returns help messages that are specifically about finding library hours
function getHoursHelpMessage() {
  var sentences = [
    "when is the library open? ",
    "what are the library hours? ",
    "is the library open tomorrow? ",
    "is the library open this weekend? ",
    "is the library open this winter? ",
    "will the library be open next week? ",
    "is the library open on " + helperFunctions.returnMonth(helperFunctions.getRandom(1, 12)) + " " + helperFunctions.getRandom(1, 28) + "th? ",
    "what are the library hours? ",
    "is the library open right now?"
  ];

  return "For example, you can say - " + sentences[helperFunctions.getRandom(0, sentences.length - 1)];
}

// Returns help messages that are specifically about finding librarians
function getLibrariansHelpMessage(data, index) {
  var sentences = [
    "For example, you can say - give me " + helperFunctions.getRandomName(data) + "s phone number. ",
    "For example, you can say - give me " + helperFunctions.getRandomName(data) + "s email address.",
    "For example, you can say - what topics is " + helperFunctions.getRandomName(data) + " a liaison for?",
    "For example, you can ask - who is " + helperFunctions.getRandomName(data) + "? ",
    "For example, you can say - tell me about " + helperFunctions.getRandomName(data) + ". ",
    "For example, you can ask - who is the liaison for " + helperFunctions.getRandomSubject(index) + "? ",
    "For example, you can ask - tell me the contact information of " + helperFunctions.getRandomName(data) + ". "
  ];

  return sentences[helperFunctions.getRandom(0, sentences.length - 1)];
}

function generateSearchHelpMessage(gender){
  var sentence = "Sorry, I don't know that request. You can ask me - what's " + helperFunctions.genderize("his-her", gender) +" e-mail, or give me " + helperFunctions.genderize("his-her", gender) + " phone number";
  return sentence;
}

function generateTellMeMoreMessage(person){
  var sentence = "Here are " + person.firstName + "'s contact details - " + helperFunctions.genderize("his-her", person.gender) +
  " e-mail address is " + person.sayemail + " <break time=\"0.5s\"/>at <break time=\"0.5s\"/> u<break time=\"0.025s\"/> w<break time=\"0.05s\"/> dot<break time=\"0.05s\"/> e <break time=\"0.04s\"/>d <break time=\"0.03s\"/>u.<break time=\"0.1s\"/>" +
  helperFunctions.genderize("his-her", person.gender) + " phone number is " + person.phone;

  if (person.topics.length == 0) {
    sentence += ". ";

  } else if ((person.topics.length < 3) && (person.topics.length > 0)) {
    sentence += ", and " + helperFunctions.genderize("his-her", person.gender) + " specialties are " + helperFunctions.generateTopics(person);

  } else {
    sentence += ", and some of " + helperFunctions.genderize("his-her", person.gender) + " specialties include " + helperFunctions.generateTopics(person);
  }

  if (person.liaison.length == 0) {

  } else if ((person.liaison.length) < 3 && (person.liaison.length > 0)) {
    sentence += helperFunctions.genderize("he-she", person.gender) + " is also a liaison for " + helperFunctions.generateLiaisons(person) + ". ";

  } else {
    sentence += "Some of the programs that " + helperFunctions.genderize("he-she", person.gender) + " is a liaison for are - " + helperFunctions.generateLiaisons(person);
  }

  return sentence;
}

function generateSpecificInfoMessage(slots,person){
  var infoTypeValue;
  var sentence;
  var info;
  var type;

  infoTypeValue = slots.infoType.value;

  if ((infoTypeValue == "email") || (infoTypeValue == "email address")) {
    info = person.email;
    type = "e-mail";
    sentence = person.firstName + "'s " + type + " is - " + person.sayemail + " <break time=\"0.5s\"/>at <break time=\"0.5s\"/> u<break time=\"0.025s\"/> w<break time=\"0.05s\"/> dot<break time=\"0.05s\"/> e <break time=\"0.04s\"/>d <break time=\"0.03s\"/>u. <break time=\"0.5s\"/> For more information about " +
               person.firstName + ", you can say - tell me more. To start a new search, say the name of a topic or a librarian. " + getLibrariansHelpMessage(constants.data, constants.index);

  } else if ((infoTypeValue == "phone") || (infoTypeValue == "phone number") || (infoTypeValue == "number")) {
    info = person.phone;
    type = "phone number";
    sentence = person.firstName + "'s " + type + " is - " + info + ". <break time=\"0.5s\"/> For more information about " + person.firstName +
               ", you can say - tell me more. To start a new search, say the name of a topic or a librarian. " + getLibrariansHelpMessage(constants.data, constants.index);

  } else if ((infoTypeValue == "specialty") || (infoTypeValue == "specialties") || (infoTypeValue == "topics") || (infoTypeValue == "topic") ||
             (infoTypeValue == "liaison") || (infoTypeValue == "specialize" || (infoTypeValue == "subject") || (infoTypeValue == "subjects") ||
             (infoTypeValue == "topics liaison"))) {
    if (person.topics.length == 0) {
      sentence = person.firstName + " does not specialize in any topic. ";

      if (person.liaison.length != 0) {
        sentence += "However, " + helperFunctions.genderize("he-she", person.gender) + " is a liaison for ";

        for (var i = 0; i < person.liaison.length; i++) {
          if (i == person.liaison.length - 2) {
            sentence += person.liaison[i] + ", and ";
          } else if (i == person.liaison.length - 1) {
            sentence += person.liaison[i] + ". ";
          } else {
            sentence += person.liaison[i] + ", ";
          }
        }
      }

      sentence += "<break time=\"0.5s\"/> For more information about " + person.firstName + ", you can say - tell me more.";

    } else if ((person.topics.length < 3) && (person.topics.length > 0)) {
      sentence = person.firstName + " specializes in the topics of - "  + helperFunctions.generateTopics(person);

      if (person.liaison.length != 0) {
        sentence += helperFunctions.genderize("he-she", person.gender) + " is also the liaison for ";

        for (var i = 0; i < person.liaison.length; i++) {
          if (i == person.liaison.length - 2) {
            sentence += person.liaison[i] + ", and ";
          } else if (i == person.liaison.length - 1) {
            sentence += person.liaison[i] + ". ";
          } else {
            sentence += person.liaison[i] + ", ";
          }
        }

      }

      sentence += "<break time=\"0.5s\"/> For more information about " + person.firstName + ", you can say - tell me more.";

    } else {
      sentence = "Some of the topics that " + person.firstName + " specializes in are - " + helperFunctions.generateTopics(person);

      if (person.liaison.length != 0) {
        sentence += helperFunctions.genderize("he-she", person.gender) + " is also the liaison for ";

        for (var i = 0; i < person.liaison.length; i++) {
          if (i == person.liaison.length - 2) {
            sentence += person.liaison[i] + ", and ";
          } else if (i == person.liaison.length - 1) {
            sentence += person.liaison[i] + ". ";
          } else {
            sentence += person.liaison[i] + ", ";
          }
        }
      }

      sentence += "<break time=\"0.5s\"/> For more information about " + person.firstName + ", you can say - tell me more.";

    }

  } else {
    sentence = "Sorry, I don't have that information about " + person.firstName + ". You can ask for " + helperFunctions.genderize("his-her", person.gender) + " phone number or email address instead. ";
  }

  return sentence;
}

module.exports = {
  generateNextPromptMessage,
  generateSendingCardToAlexaAppMessage,
  generateSearchResultsMessage,
  getGenericHelpMessage,
  getHoursHelpMessage,
  getLibrariansHelpMessage,
  generateSearchHelpMessage,
  generateTellMeMoreMessage,
  generateSpecificInfoMessage
}
