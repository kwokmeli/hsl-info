"use strict";
const Alexa = require("alexa-sdk"); // import the library

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.7a8eca68-7c79-431b-865a-dc27ca4d0135";

// =====================================================================================================
// --------------------------------- Section 1. Data and Text strings  ---------------------------------
// =====================================================================================================

var data=[
    {firstName:"tania",lastName:"bardyn",title:"Associate Dean for University Libraries and Director of the Health Sciences Library",sayemail:slowSpell("bardyn"),email:"bardyn",phone:"206-543-0422",gender:"f",
    topics:["mobile app development","library and information services","technology support","informatics and education development"],liason:[]},

    {firstName:"andrea",lastName:"ball",title:"Care Management and Population Health Librarian",sayemail:slowSpell("alball"),email:"alball",phone:"206-616-6630",gender:"f",topics:[
    "allergies and infectious diseases","anesthesiology","pain medicine","cardiology","dermatology","emergency medicine","gastroenterology","general internal medicine","gerontology","geriatric medicine",
    "hematology","nephrology","oncology","orthopaedics","palliative care","pediatrics","physical therapy","pulmonary and critical care medicine",
    "radiation oncology","rheumatology","surgery","urology"],liason:["airlift northwest","harborview medical center","department of medicine","northwest hospital","u dub medical center"]},

    {firstName:"frances",lastName:"chu",title:"Health Sciences Clinical Liason and Content Librarian",sayemail:slowSpell("chuf"),email:"chuf",phone:"206-616-1106",gender:"f",topics:["critical care medicine",
    "laboratory medicine","medical laboratory science","metabolism","endocrinology and nutrition","neurology","ophthalmology","otolaryngology","pathology",
    "psychiatry and behavioral sciences","radiology"],liason:["hall health primary care center","harborview medical center","the school of nursing","u dub medical center"]},

    {firstName:"nicole",lastName:"dettmar",title:"Health Sciences Curriculum Design Librarian",sayemail:slowSpell("snydern"),email:"snydern",phone:"206-543-3409",gender:"f",topics:["oral health services",
    "oral medicine","oral and maxillofacial surgery","pediatric dentistry","periodontics","prosthodontics","restorative dentistry"],liason:["the school of dentistry","the school of medicine","ride",
    "the school of medicine","write","w.w.a.m.i"]},

    {firstName:"stephen",lastName:"gabrielson",title:"Instruction and Research Librarian",sayemail:slowSpell("gabeswg"),email:"gabeswg",phone:"206-543-3437",gender:"m",topics:[],liason:["the school of nursing",
    "the school of dentistry"]},

    {firstName:"diana",lastName:"louden",title:"Biomedical and Translational Sciences Librarian",sayemail:slowSpell("dknl"),email:"dknl",phone:"206-221-3480",gender:"f",topics:[
    "biochemistry","bioengineering","bioethics and humanities","biological structure","biomedical informatics and medical education","comparative medicine","genome sciences","immunology",
    "medical genetics","microbiology","molecular and cellular biology","molecular medicine","physiology and biophysics","public health genetics"],liason:["the office of animal welfare",
    "institute of translational health sciences","the molecular and cellular biology program","the graduate program in neuroscience","the school of pharmacy","the school of puclic health"]},

    {firstName:"emily",lastName:"patridge",title:"need to do",sayemail:slowSpell("ep001"),email:"ep001",phone:"206-221-3489",gender:"f",topics:["obstetrics and gynecology","occupational therapy"],
    liason:["harborview medical center","northwest hospital","u dub medical center","u dub neighborhood clinics"]},

    {firstName:"joanne",lastName:"rich",title:"need to do",sayemail:slowSpell("jrich"),email:"jrich",phone:"206-616-6601",gender:"f",topics:["pharmaceutics","psychosocial and community health"],
    liason:["pharmacy services","the school of pharmacy"]},

    {firstName:"sarah",lastName:"safranek",title:"Public Health and Primary Care Librarian",sayemail:slowSpell("safranek"),email:"safranek",phone:"206-543-3408",gender:"f",topics:["biostatistics",
    "environmental and occupational health sciences","epidemiology","family medicine","global health","health services","nutritional sciences"],liason:["health information administration program",
    "institute for health metrics and evaluation","i tech","maternal and child health program","medex northwest","pathobiology doctoral program","the school of public health","w.w.a.m.i"]}
];

//======================================================================================================
//TODO: Replace these text strings to edit the welcome and help messages
//======================================================================================================

var skillName = "HSL Library Helper";

//This is the welcome message for when a user starts the skill without a specific intent.
// var WELCOME_MESSAGE = "Welcome to  " + skillName + "! I can help you find Alexa Evangelists and Solutions Architects. " + getGenericHelpMessage(data);

var WELCOME_MESSAGE = "Learn about the librarians of the Health Sciences Library, or search for a librarian by specialty. " + getGenericHelpMessage(data)

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I can help you find a librarian. "

//This is the message a user will hear when they begin a new search
var NEW_SEARCH_MESSAGE = "To start a new search, say the name of a librarian or a topic to search for. " + getGenericHelpMessage(data);

//This is the message a user will hear when they ask Alexa for help while in the SEARCH state
var SEARCH_STATE_HELP_MESSAGE = "Say the name of a librarian or a topic to search for. " + getGenericHelpMessage(data);

var DESCRIPTION_STATE_HELP_MESSAGE = "Here are some things you can say: Tell me more, or give me his or her contact info";

var MULTIPLE_RESULTS_STATE_HELP_MESSAGE = "Sorry, please say the first and last name of the person you'd like to learn more about";

// This is the message use when the decides to end the search
var SHUTDOWN_MESSAGE = "Ok.";

//This is the message a user will hear when they try to cancel or stop the skill.
var EXIT_SKILL_MESSAGE = "Ok. Have a nice day!";

// =====================================================================================================
// ------------------------------ Section 2. Skill Code - Intent Handlers  -----------------------------
// =====================================================================================================
// CAUTION: Editing anything below this line might break your skill.
//======================================================================================================

var states = {
    SEARCHMODE: "_SEARCHMODE",
    DESCRIPTION: "_DESCRIPTION",
    MULTIPLE_RESULTS: "_MULTIPLE_RESULTS"
};

const newSessionHandlers = {
    "LaunchRequest": function() {
        this.handler.state = states.SEARCHMODE;
        this.emit(":ask", WELCOME_MESSAGE, getGenericHelpMessage(data));
    },
    "SearchByNameIntent": function() {
        console.log("SEARCH INTENT");
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("SearchByNameIntent");
    },
    "TellMeMoreIntent": function() {
        this.handler.state = states.SEARCHMODE;
        // this.emitWithState("SearchByNameIntent");
        this.emit(":ask", WELCOME_MESSAGE, getGenericHelpMessage(data));
    },
    "TellMeThisIntent": function() {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("SearchByNameIntent");
    },
    "SearchByInfoTypeIntent": function() {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("SearchByInfoTypeIntent");
    },
    "AMAZON.YesIntent": function() {
        this.emit(":ask", getGenericHelpMessage(data), getGenericHelpMessage(data));
    },
    "AMAZON.NoIntent": function() {
        this.emit(":tell", SHUTDOWN_MESSAGE);
    },
    "AMAZON.RepeatIntent": function() {
        this.emit(":ask", HELP_MESSAGE, getGenericHelpMessage(data));
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = states.SEARCHMODE;
        var output = "Ok, starting over. " + getGenericHelpMessage(data);
        this.emit(":ask", output, output);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE + getGenericHelpMessage(data), getGenericHelpMessage(data));
    },
    "SessionEndedRequest": function() {
        this.emit("AMAZON.StopIntent");
    },
    "Unhandled": function() {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("SearchByNameIntent");
    }
};
var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    "AMAZON.YesIntent": function() {
        this.emit(":ask", NEW_SEARCH_MESSAGE, NEW_SEARCH_MESSAGE);
    },
    "AMAZON.NoIntent": function() {
        this.emit(":tell", SHUTDOWN_MESSAGE);
    },
    "AMAZON.RepeatIntent": function() {
      var output;
      if(this.attributes.lastSearch){
        output = this.attributes.lastSearch.lastSpeech;
        console.log("repeating last speech");
      }
      else{
        output = getGenericHelpMessage(data);
        console.log("no last speech availble. outputting standard help message.");
      }
      this.emit(":ask",output, output);
    },
    "SearchByNameIntent": function() {
      searchByNameIntentHandler.call(this);
    },
    "SearchByInfoTypeIntent": function() {
      searchByInfoTypeIntentHandler.call(this);
    },
    "TellMeThisIntent": function() {
        this.handler.state = states.DESCRIPTION;
        this.emitWithState("TellMeThisIntent");
    },
    "TellMeMoreIntent": function() {
        this.handler.state = states.DESCRIPTION;
        this.emitWithState("TellMeMoreIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", getGenericHelpMessage(data), getGenericHelpMessage(data));
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = states.SEARCHMODE;
        var output = "Ok, starting over." + getGenericHelpMessage(data);
        this.emit(":ask", output, output);
    },
    "SessionEndedRequest": function() {
        this.emit("AMAZON.StopIntent");
    },
    "Unhandled": function() {
        console.log("Unhandled intent in startSearchHandlers");
        this.emit(":ask", SEARCH_STATE_HELP_MESSAGE, SEARCH_STATE_HELP_MESSAGE);
    }
});
var multipleSearchResultsHandlers = Alexa.CreateStateHandler(states.MULTIPLE_RESULTS, {

    "AMAZON.StartOverIntent": function() {
        this.handler.state = states.SEARCHMODE;
        var output = "Ok, starting over." + getGenericHelpMessage(data);
        this.emit(":ask", output, output);
    },
    "AMAZON.YesIntent": function() {
        var output = "Hmm. I think you said - yes, but can you please say the name of the person you'd like to learn more about?";
        this.emit(":ask", output, output);
    },
    "AMAZON.NoIntent": function() {
        this.emit(":tell", SHUTDOWN_MESSAGE);
    },
    "AMAZON.RepeatIntent": function() {
        this.emit(":ask",this.attributes.lastSearch.lastSpeech, this.attributes.lastSearch.lastSpeech);
    },
    "SearchByNameIntent": function() {
        var slots = this.event.request.intent.slots;
        var firstName = isSlotValid(this.event.request, "firstName");
        var lastName = isSlotValid(this.event.request, "lastName");
        var infoType = isSlotValid(this.event.request, "infoType");

        console.log("firstName:" + firstName);
        console.log("firstName:" + lastName);
        console.log("firstName:" + infoType);
        console.log("Intent Name:" + this.event.request.intent.name);

        var canSearch = figureOutWhichSlotToSearchBy(firstName,lastName);
        console.log("Multiple results found. canSearch is set to = " + canSearch);
        var speechOutput;

        if (canSearch)
            var searchQuery = slots[canSearch].value;
            var searchResults = searchDatabase(this.attributes.lastSearch.results, searchQuery, canSearch);
            var lastSearch;
            var output;

            if (searchResults.count > 1) { //multiple results found again
                console.log("multiple results were found again");
                this.handler.state = states.MULTIPLE_RESULTS;
                output = this.attributes.lastSearch.lastSpeech;
                this.emit(":ask",output);
            } else if (searchResults.count == 1) { //one result found
                this.attributes.lastSearch = searchResults;
                lastSearch = this.attributes.lastSearch;
                this.handler.state = states.DESCRIPTION;
                output = generateSearchResultsMessage(searchQuery,searchResults.results)
                this.attributes.lastSearch.lastSpeech = output;
                // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
                this.emit(":ask", output);

            } else { //no match found
                lastSearch = this.attributes.lastSearch;
                var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
                speechOutput = MULTIPLE_RESULTS_STATE_HELP_MESSAGE + ", " + listOfPeopleFound;
                this.emit(":ask", speechOutput);
            }
    },
    "SearchByCityIntent": function() {
      this.handler.state = states.SEARCHMODE;
      this.emitWithState("SearchByCityIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", MULTIPLE_RESULTS_STATE_HELP_MESSAGE, MULTIPLE_RESULTS_STATE_HELP_MESSAGE);
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "SessionEndedRequest": function() {
        this.emit("AMAZON.StopIntent");
    },
    "Unhandled": function() {
        console.log("Unhandled intent in multipleSearchResultsHandlers");
        this.emit(":ask", MULTIPLE_RESULTS_STATE_HELP_MESSAGE, MULTIPLE_RESULTS_STATE_HELP_MESSAGE);
    }
});
var descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTION, {
    "TellMeMoreIntent": function() {
      var person;
      var speechOutput;
      var repromptSpeech;
      var cardContent;

      if(this.attributes.lastSearch){
        person = this.attributes.lastSearch.results[0];
        cardContent = generateCard(person); //calling the helper function to generate the card content that will be sent to the Alexa app.
        speechOutput = generateTellMeMoreMessage(person);
        repromptSpeech = "Would you like more information? Say yes or no";

        console.log("the contact you're trying to find more info about is " + person.firstName);
        this.handler.state = states.SEARCHMODE;
        this.attributes.lastSearch.lastSpeech = speechOutput;
        this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
      }
      else{
        speechOutput = getGenericHelpMessage(data);
        repromptSpeech = getGenericHelpMessage(data);
        this.handler.state = states.SEARCHMODE;
        this.emit(":ask", speechOutput, repromptSpeech);
      }
    },
    "TellMeThisIntent": function() {
      var slots = this.event.request.intent.slots;
      var person = this.attributes.lastSearch.results[0];
      var infoType = isSlotValid(this.event.request, "infoType");
      var speechOutput;
      var repromptSpeech;
      var cardContent;

      if (this.attributes.lastSearch && isInfoTypeValid(infoType)) {
          person = this.attributes.lastSearch.results[0];
          cardContent = generateCard(person);
          speechOutput = generateSpecificInfoMessage(slots,person);
          repromptSpeech = "<break time=\"0.5s\"/> Would you like to find more information? Say yes or no";
          this.handler.state = states.SEARCHMODE;
          this.attributes.lastSearch.lastSpeech = speechOutput;
          this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
        } else {
          //not a valid slot. no card needs to be set up. respond with simply a voice response.
          speechOutput = generateSearchHelpMessage(person.gender);
          repromptSpeech = "You can ask me - what's " + genderize("his-her", person.gender) + " e-mail, or give me " + genderize("his-her", person.gender) + " phone number";
          this.attributes.lastSearch.lastSpeech = speechOutput;
          this.handler.state = states.SEARCHMODE;
          this.emit(":ask", speechOutput, repromptSpeech);
        }
    },
    "SearchByNameIntent": function() {
        searchByNameIntentHandler.call(this);
    },
    "AMAZON.HelpIntent": function() {
        var slots = this.event.request.intent.slots;
        var person = this.attributes.lastSearch.results[0];
        this.emit(":ask", generateNextPromptMessage(person,"current"), generateNextPromptMessage(person,"current"));
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.NoIntent": function() {
        this.emit(":tell", SHUTDOWN_MESSAGE);
    },
    "AMAZON.YesIntent": function() {
        this.emit("TellMeMoreIntent");
    },
    "AMAZON.RepeatIntent": function() {
        this.emit(":ask",this.attributes.lastSearch.lastSpeech, this.attributes.lastSearch.lastSpeech);
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = states.SEARCHMODE;
        var output = "Ok, starting over." + getGenericHelpMessage(data);
        this.emit(":ask", output, output);
    },
    "SessionEndedRequest": function() {
        this.emit("AMAZON.StopIntent");
    },
    "Unhandled": function() {
        var slots = this.event.request.intent.slots;
        var person = this.attributes.lastSearch.results[0];

        console.log("Unhandled intent in DESCRIPTION state handler");
        this.emit(":ask", "Sorry, I don't know that" + generateNextPromptMessage(person,"general"), "Sorry, I don't know that" + generateNextPromptMessage(person,"general"));
    }
});

// ------------------------- END of Intent Handlers  ---------------------------------

function searchDatabase(dataset, searchQuery, searchType) {
  var matchFound = false;
  var results = [];

  //beginning search
  for (var i = 0; i < dataset.length; i++) {
    if (sanitizeSearchQuery(searchQuery) == dataset[i][searchType]) {
        results.push(dataset[i]);
        matchFound = true;
    }
    if ((i == dataset.length - 1) && (matchFound == false)) {
    //this means that we are on the last record, and no match was found
        matchFound = false;
        console.log("no match was found using " + searchType);
    //if more than searchable items were provided, set searchType to the next item, and set i=0
    //ideally you want to start search with lastName, then firstname, and then cityName
    }
  }
  return {
    count: results.length,
    results: results
  };
}

function figureOutWhichSlotToSearchBy(firstName,lastName) {
  if (lastName){
    console.log("search by lastName");
    return "lastName";
  }
  else if (!lastName && firstName){
    console.log("search by firstName")
    return "firstName";
  }
  else{
    return false;
    console.log("no valid slot provided. can't search.")
  }
}

function searchByNameIntentHandler(){
  var firstName = isSlotValid(this.event.request, "firstName");
  var lastName = isSlotValid(this.event.request, "lastName");
  var infoType = isSlotValid(this.event.request, "infoType");
  var testingThis = testingThisFunction.call(this,"hello");

  var canSearch = figureOutWhichSlotToSearchBy(firstName,lastName);
  console.log("canSearch is set to = " + canSearch);

    if (canSearch) {
      var searchQuery = this.event.request.intent.slots[canSearch].value;
      var searchResults = searchDatabase(data, searchQuery, canSearch);

      //saving lastSearch results to the current session
      var lastSearch = this.attributes.lastSearch = searchResults;
      var output;

      //saving last intent to session attributes
      this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

      if (searchResults.count > 1) { //multiple results found
        console.log("Search complete. Multiple results were found");
        var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
        output = generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
        this.handler.state = states.MULTIPLE_RESULTS; // change state to MULTIPLE_RESULTS
        this.attributes.lastSearch.lastSpeech = output;
        this.emit(":ask", output);
      } else if (searchResults.count == 1) { //one result found
          this.handler.state = states.DESCRIPTION; // change state to description
          console.log("one match was found");
          if (infoType) {
              //if a specific infoType was requested, redirect to specificInfoIntent
              console.log("infoType was provided as well")
              this.emitWithState("TellMeThisIntent");
          } else {
            console.log("no infoType was provided.")
            output = generateSearchResultsMessage(searchQuery,searchResults.results)
            this.attributes.lastSearch.lastSpeech = output;
            this.emit(":ask", output);
          }
      } else { //no match found
        console.log("no match found");
        console.log("searchQuery was  = " + searchQuery);
        console.log("searchResults.results was  = " + searchResults);
        output = generateSearchResultsMessage(searchQuery,searchResults.results)
        this.attributes.lastSearch.lastSpeech = output;
        // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
        this.emit(":ask", output);
      }
    } else {
        console.log("no searchable slot was provided");
        console.log("searchQuery was  = " + searchQuery);
        console.log("searchResults.results was  = " + searchResults);

        this.emit(":ask", generateSearchResultsMessage(searchQuery,false));
    }
}

function searchByInfoTypeIntentHandler(){
  var slots = this.event.request.intent.slots;
  var firstName = isSlotValid(this.event.request, "firstName");
  var lastName = isSlotValid(this.event.request, "lastName");
  var infoType = isSlotValid(this.event.request, "infoType");

  var canSearch = figureOutWhichSlotToSearchBy(firstName,lastName);
  console.log("canSearch is set to = " + canSearch);

    if (canSearch){
      var searchQuery = slots[canSearch].value;
      var searchResults = searchDatabase(data, searchQuery, canSearch);

      //saving lastSearch results to the current session
      var lastSearch = this.attributes.lastSearch = searchResults;
      var output;

      //saving last intent to session attributes
      this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

      if (searchResults.count > 1) { //multiple results found
          console.log("multiple results were found");
          var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
          output = generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
          this.handler.state = states.MULTIPLE_RESULTS; // change state to MULTIPLE_RESULTS
          this.attributes.lastSearch.lastSpeech = output;
          this.emit(":ask", output);
      } else if (searchResults.count == 1) { //one result found
          this.handler.state = states.DESCRIPTION; // change state to description
          console.log("one match was found");
          if (infoType) {
            //if a specific infoType was requested, redirect to specificInfoIntent
            console.log("infoType was provided as well")
            var person = this.attributes.lastSearch.results[0];
            var cardContent = generateCard(person);
            var speechOutput = generateSpecificInfoMessage(slots,person);
            var repromptSpeech = "<break time=\"0.5s\"/> Would you like to find more information? Say yes or no";
            this.attributes.lastSearch.lastSpeech = speechOutput;
            this.handler.state = states.SEARCHMODE;
            this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
            // this.emitWithState("TellMeThisIntent");
          } else {
              console.log("no infoType was provided.")
              output = generateSearchResultsMessage(searchQuery,searchResults.results)
              this.attributes.lastSearch.lastSpeech = output;
              // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
              this.emit(":ask", output);
          }
      } else { //no match found
        console.log("no match found");
        console.log("searchQuery was  = " + searchQuery);
        console.log("searchResults.results was  = " + searchResults);
        output = generateSearchResultsMessage(searchQuery,searchResults.results)
        this.attributes.lastSearch.lastSpeech = output;
        // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
        this.emit(":ask", output);
      }
    }
      else {
        console.log("no searchable slot was provided");
        console.log("searchQuery was  = " + searchQuery);
        console.log("searchResults.results was  = " + searchResults);

        this.emit(":ask", generateSearchResultsMessage(searchQuery,false));
      }
}
// =====================================================================================================
// ------------------------------- Section 3. Generating Speech Messages -------------------------------
// =====================================================================================================

function generateNextPromptMessage(person,mode){
  var infoTypes = ["e-mail","phone number"]
  var prompt;

  if (mode == "current"){
    // if the mode is current, we should give more informaiton about the current contact
    prompt = ". Would you like more information? For example, you can say - tell me more, or tell me " + genderize("his-her", person.gender) + " " + infoTypes[getRandom(0,infoTypes.length-1)];
  }
  //if the mode is general, we should provide general help information
  else if (mode == "general") {
    prompt = getGenericHelpMessage(data);
  }
  return prompt;
}

function generateSendingCardToAlexaAppMessage(person,mode){
  var sentence = "I have sent " + person.firstName + "'s contact card to your Alexa app. <break time=\"0.5s\"/> Would you like to do another search? " + generateNextPromptMessage(person,mode);
  return sentence;
}

function generateSearchResultsMessage(searchQuery,results){
  var sentence;
  var details;
  var prompt;

  if (results){
    switch (true) {
    case (results.length == 0):
        sentence = "Hmm. I couldn't find " + searchQuery + ". Please try again. " + getGenericHelpMessage(data);
        break;
    case (results.length == 1):
        var person = results[0];
        details = person.firstName + " " + person.lastName + " is the " + person.title
        prompt = generateNextPromptMessage(person,"current");
        sentence = details + prompt
        console.log(sentence);
        break;
    case (results.length > 1):
        sentence = "I found " + results.length + " matching results";
        break;
    }
  }
  else{
    sentence = "Sorry, I didn't quite get that. Please try again. " + getGenericHelpMessage(data);
  }
  return sentence;
}

function getGenericHelpMessage(data){
var sentences = ["ask - who is " + getRandomName(data), "say the name of a librarian or say a topic of interest."];
return "For example, you can " + sentences[getRandom(0,sentences.length-1)];
}

function generateSearchHelpMessage(gender){
  var sentence = "Sorry, I don't know that. You can ask me - what's " + genderize("his-her", gender) +" e-mail, or give me " + genderize("his-her", gender) + " phone number";
  return sentence;
}

function generateTellMeMoreMessage(person){
  var sentence = person.firstName + "'s e-mail address is " + person.sayemail + " <break time=\"0.5s\"/>at <break time=\"0.5s\"/> u<break time=\"0.05s\"/> w<break time=\"0.05s\"/> dot<break time=\"0.05s\"/> e <break time=\"0.05s\"/>d <break time=\"0.05s\"/>u.<break time=\"0.1s\"/>" +
  genderize("his-her", person.gender) + " phone number is " + person.phone;

  if (person.topics.length == 0) {
    sentence += ". ";

  } else if ((person.topics.length < 3) && (person.topics.length > 0)) {
    sentence += ", and " + genderize("his-her", person.gender) + generateTopics(person) + ". ";

  } else {
    sentence += ", and some of " + genderize("his-her", person.gender) + " specialties include " + generateTopics(person);
  }

  if (person.liason.length == 0) {

  } else if ((person.liason.length) < 3 && (person.liason.length > 0)) {
    sentence += genderize("he-she", person.gender) + " is also a liason for " + generateLiasons(person) + ". ";

  } else {
    sentence += "Some of the programs that " + genderize("he-she", person.gender) + " is a liason for are - " + generateLiasons(person) + generateSendingCardToAlexaAppMessage(person,"general");
  }

  return sentence;
}

function generateSpecificInfoMessage(slots,person){
  var infoTypeValue;
  var sentence;
  var info;
  var type;

  if (slots.infoType.value == "git hub"){
    infoTypeValue = "github";
    console.log("resetting gith hub to github");
  }
  else{
    console.log("no reset required for github");
    infoTypeValue = slots.infoType.value;
  }

  // sentence = person.firstName + "'s " + infoTypeValue.toLowerCase() + " is - " + person["say" + infoTypeValue.toLowerCase()] + " . Would you like to find another librarian? " + getGenericHelpMessage(data);
  // return optimizeForSpeech(sentence);
  if (infoTypeValue == "email") {
    info = person.email;
    type = "e-mail";
    sentence = person.firstName + "'s " + type + " is - " + person.sayemail + " <break time=\"0.5s\"/>at <break time=\"0.5s\"/> u<break time=\"0.05s\"/> w<break time=\"0.05s\"/> dot<break time=\"0.05s\"/> e <break time=\"0.05s\"/>d <break time=\"0.05s\"/>u.<break time=\"0.1s\"/>. Would you like to find more information? " + getGenericHelpMessage(data);
  } else {
    info = person.phone;
    type = "phone number";
    sentence = person.firstName + "'s " + type + " is - " + info + ". Would you like to find more information? " + getGenericHelpMessage(data);
  }

  return sentence;
}

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(newSessionHandlers, startSearchHandlers, descriptionHandlers, multipleSearchResultsHandlers);
  alexa.execute();
};

// =====================================================================================================
// ------------------------------------ Section 4. Helper Functions  -----------------------------------
// =====================================================================================================
// For more helper functions, visit the Alexa cookbook at https://github.com/alexa/alexa-cookbook
//======================================================================================================

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCity(arrayOfStrings) {
  return arrayOfStrings[getRandom(0, data.length - 1)].cityName;
}

function getRandomName(arrayOfStrings) {
  var randomNumber = getRandom(0, data.length - 1)
  return arrayOfStrings[randomNumber].firstName + " " + arrayOfStrings[randomNumber].lastName;
}

function titleCase(str) {
  return str.replace(str[0], str[0].toUpperCase());
}

function slowSpell(str) {
  return "" + str.split("").join("<break time=\"0.05s\"/>");
}

function generateCard(person) {
  var cardTitle = "Contact Info for " + titleCase(person.firstName) + " " + titleCase(person.lastName);
  var cardBody = "E-mail: " + person.email + "@uw.edu \n" + "Phone: " + person.phone + " \n";
  return {
      "title": cardTitle,
      "body": cardBody,
  };
}

function generateTopics(person) {
  var topic1;
  var topic2;
  var topic3;

  var result = "";

  if ((person.topics.length < 3) && (person.topics.length > 0)) {
    if (person.topics.length == 1) {
      result += person.topics[0];
    } else {
      result += " specialties are " + person.topics[0] + " and " + person.topics[1];
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

function generateLiasons(person) {
  var liason1;
  var liason2;
  var liason3;

  var result = "";

  if ((person.liason.length < 3) && (person.liason.length > 0)) {
    if (person.liason.length == 1) {
      result += person.liason[0];
    } else {
      result += person.liason[0] + " and " + person.liason[1];
    }

  } else {
    for (var i = 0; i < 3; i++) {
      if (i == 2) {
        liason3 = person.liason[getRandom(0,person.liason.length - 1)];
        while ((liason3 == liason2) || (liason3 == liason1)) {
          liason3 = person.liason[getRandom(0,person.liason.length - 1)];
        }
        result += liason3 + ". ";
      } else if (i == 1) {
        liason2 = person.liason[getRandom(0,person.liason.length - 1)];
        while (liason2 == liason1) {
          liason2 = person.liason[getRandom(0,person.liason.length - 1)];
        }
        result += liason2 + ", and ";
      } else {
        liason1 = person.liason[getRandom(0,person.liason.length - 1)];
        result += liason1 + ", ";
      }
    }
  }

  return result;
}

function loopThroughArrayOfObjects(arrayOfStrings) {
  var joinedResult = "";
  // Looping through the each object in the array
  for (var i = 0; i < arrayOfStrings.length; i++) {
  //concatenating names (firstName + lastName ) for each item
      joinedResult = joinedResult + ", " + arrayOfStrings[i].firstName + " " + arrayOfStrings[i].lastName;
  }
  return joinedResult;
}

function genderize(type, gender) {
  var pronouns ={
      "m":{"he-she":"he","his-her":"his","him-her":"him"},
      "f":{"he-she":"she","his-her":"her","him-her":"her"}
  };
  return pronouns[gender][type];
}

function sanitizeSearchQuery(searchQuery){
  searchQuery = searchQuery.replace(/’s/g, "").toLowerCase();
  searchQuery = searchQuery.replace(/'s/g, "").toLowerCase();
  return searchQuery;
}

function isSlotValid(request, slotName){
  var slot = request.intent.slots[slotName];
  //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
  var slotValue;

  //if we have a slot, get the text and store it into speechOutput
  if (slot && slot.value) {
      //we have a value in the slot
      slotValue = slot.value.toLowerCase();
      return slotValue;
  } else {
      //we didn't get a value in the slot.
      return false;
  }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function isInfoTypeValid(infoType){
  var validTypes = ["phone number","e-mail", "email", "e mail", "phone"];
  return isInArray(infoType,validTypes);
}

function testingThisFunction(str){
  console.log("printing " + str);
}
