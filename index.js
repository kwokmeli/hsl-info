"use strict";
const Alexa = require("alexa-sdk");

// App ID for mkwok account
// var APP_ID = "amzn1.ask.skill.7a8eca68-7c79-431b-865a-dc27ca4d0135";

// App ID for trailq account
var APP_ID = "amzn1.ask.skill.f70210e4-4669-4528-8f58-89025d4723d0";
// =====================================================================================================
// --------------------------------- Section 1. Data and Text strings  ---------------------------------
// =====================================================================================================
// Current academic years
var YEAR1 = "2017";
var YEAR2 = "2018";

// Possible library opening hours for the academic calendar year of 2017-2018
var a = "7:30:19:00";
var b = "7:30:21:00";
var c = "7:30:17:00";
var d = "9:00:17:00";
var e = "10:00:19:00";
var f = "12:00:17:00";
var g = "12:00:19:00";
var h = "13:00:17:00";
var i = "closed";

var hours = [
  {year: YEAR1,
  month: [["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Feb
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Mar
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Apr
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // May
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Jun
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Jul
          [a,a,a,a,i,i,a,a,a,a,a,i,i,a,a,a,a,a,i,i,a,a,a,a,a,i,i,a,a,a,a], // Aug
          [a,i,i,i,a,a,a,a,i,i,a,a,a,a,a,i,i,a,e,a,a,a,i,i,b,b,b,b,a,f], // Sep
          [g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b], // Oct
          [b,b,a,f,g,b,b,b,b,h,f,g,b,b,b,b,a,f,g,b,b,c,i,i,i,g,b,b,b,b], // Nov
          [a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,i,i,d,d,d,d,d,i,i,i,d,d,d,d,i,i]] // Dec
  },

  {year: YEAR2,
  month: [[i,d,b,b,a,f,g,b,b,b,b,a,f,g,h,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b], // Jan
          [b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,h,b,b,b,a,f,g,b,b,b], // Feb
          [b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,i,i,a,a,a,a,a,i,i,b,b,b,b,a,f], // Mar
          [g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,b], // Apr
          [b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,f,g,h,b,b,b], // May
          [a,f,g,b,b,b,b,a,i,i,a,a,a,a,a,i,i,"","","","","","","","","","","","",""], // Jun
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Jul
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Aug
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Sep
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Oct
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Nov
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]] // Dec
  }
];

// NOTE: 2017-2018 quarter dates
// Dates are in form dd/mm/yyyy
var period = [
  ["27/9/2017","15/12/2017"],
  ["16/12/2017","2/1/2018"],
  ["3/1/2018","16/3/2018"],
  ["17/3/2018","25/3/2018"],
  ["26/3/2018","8/6/2018"],
  ["9/6/2018","17/6/2018"],
  ["19/6/2017","18/8/2017"],
  ["19/8/2017","26/9/2017"]
];

// NOTE: Update these dates for each new school year
var autumnHours = "The opening hours for autumn quarter are: <prosody rate=\"slow\"> Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm. </prosody>";
var autumnWinterHours = "The opening hours for the autumn winter interim are: <prosody rate=\"slow\"> Monday through Friday, from 9:00am to 5:00pm. The library is closed on Saturdays and Sundays. </prosody>";
var winterHours = "The opening hours for winter quarter are: <prosody rate=\"slow\"> Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm. </prosody>";
var winterSpringHours = "The opening hours for the winter spring interim are: <prosody rate=\"slow\"> Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays. </prosody>";
var springHours = "The opening hours for spring quarter are: <prosody rate=\"slow\"> Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm. </prosody>";
var springSummerHours = "The opening hours for the spring summer interim are: <prosody rate=\"slow\"> Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays. </prosody>";
var summerHours = "The opening hours for summer quarter are: <prosody rate=\"slow\"> Monday through Friday, from 7:30am to 7:00pm - Sundays from 1:00pm to 5:00pm. The library is closed on Saturdays. </prosody>";
var summerAutumnHours = "The opening hours for the summer autumn interim are: <prosody rate=\"slow\"> Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays. </prosody>";

// NOTE: Update these extra hours for each new school year
var autumnExtra = "The library is also closed on <prosody rate=\"slow\"> November 23rd, November 24th, and November 25th. The adjusted library hours for November 10th are 1:00pm to 5:00pm, and the hours for November 22nd are 7:30am to 5:00pm. </prosody>";
var autumnWinterExtra = "The library is also closed on <prosody rate=\"slow\"> December 25th, and January 1st. </prosody>";
var winterExtra = "The adjusted library hours for <prosody rate=\"slow\"> January 15th and February 19th are 1:00pm to 5:00pm. </prosody>";
var winterSpringExtra = "";
var springExtra = "The adjusted library hours for <prosody rate=\"slow\"> May 28th are 1:00pm to 5:00pm. </prosody>";
var springSummerExtra = "";
var summerExtra = "The library is also closed on <prosody rate=\"slow\"> July 4th. The adjusted library hours for July 3rd are 7:30am to 5:00pm. </prosody>";
var summerAutumnExtra = "The library is also closed on <prosody rate=\"slow\"> September 4th. The adjusted library hours for August 21st are 3:00pm - 7:00pm. The hours for September 19th are 10:00am to 7:00pm. And the hours for September 25th and September 26th are 7:30am to 9:00pm. </prosody>";

var extraHours = [
  autumnExtra,
  autumnWinterExtra,
  winterExtra,
  winterSpringExtra,
  springExtra,
  springSummerExtra,
  summerExtra,
  summerAutumnExtra
];

var periodHours = [
  autumnHours,
  autumnWinterHours,
  winterHours,
  winterSpringHours,
  springHours,
  springSummerHours,
  summerHours,
  summerAutumnHours
];

var data = [
  {firstName:"tania",lastName:"bardyn",title:"Associate Dean for University Libraries and Director of the Health Sciences Library",sayemail:slowSpell("bardyn"),email:"bardyn",phone:"206-543-0422",gender:"f",
  topics:["mobile app development","library and information services","technology support","informatics and education development"],liaison:[]},

  {firstName:"andrea",lastName:"ball",title:"Care Management and Population Health Librarian",sayemail:slowSpell("alball"),email:"alball",phone:"206-616-6630",gender:"f",topics:[
  "allergies and infectious diseases","anesthesiology","pain medicine","cardiology","dermatology","emergency medicine","gastroenterology","general internal medicine","gerontology","geriatric medicine",
  "hematology","nephrology","oncology","orthopaedics","palliative care","pediatrics","physical therapy","pulmonary and critical care medicine",
  "radiation oncology","rheumatology","surgery","urology"],liaison:["airlift northwest","harborview medical center","the department of medicine","northwest hospital","u dub medical center"]},

  {firstName:"frances",lastName:"chu",title:"Health Sciences Clinical liaison and Content Librarian",sayemail:slowSpell("chuf"),email:"chuf",phone:"206-616-1106",gender:"f",topics:["critical care medicine",
  "laboratory medicine","medical laboratory science","metabolism","endocrinology and nutrition","neurology","ophthalmology","otolaryngology","pathology",
  "psychiatry and behavioral sciences","radiology"],liaison:["hall health primary care center","harborview medical center","the school of nursing","u dub medical center"]},

  {firstName:"nicole",lastName:"dettmar",title:"Health Sciences Curriculum Design Librarian",sayemail:slowSpell("snydern"),email:"snydern",phone:"206-543-3409",gender:"f",topics:["oral health services",
  "oral medicine","oral and maxillofacial surgery","pediatric dentistry","periodontics","prosthodontics","restorative dentistry"],liaison:["the school of dentistry","the school of medicine","ride",
  "the school of medicine","write","w.w.a.m.i"]},

  {firstName:"stephen",lastName:"gabrielson",title:"Instruction and Research Librarian",sayemail:slowSpell("gabeswg"),email:"gabeswg",phone:"206-543-3437",gender:"m",topics:[],liaison:["the school of nursing",
  "the school of dentistry"]},

  {firstName:"diana",lastName:"louden",title:"Biomedical and Translational Sciences Librarian",sayemail:slowSpell("dknl"),email:"dknl",phone:"206-221-3480",gender:"f",topics:[
  "biochemistry","bioengineering","bioethics and humanities","biological structures","biomedical informatics and medical education","comparative medicine","genome sciences","immunology",
  "medical genetics","microbiology","molecular and cellular biology","molecular medicine","physiology and biophysics","public health genetics"],liaison:["the office of animal welfare",
  "institute of translational health sciences","the molecular and cellular biology program","the graduate program in neuroscience","the school of pharmacy","the school of puclic health"]},

/* TODO: Find Emily's title */
  {firstName:"emily",lastName:"patridge",title:"need to do",sayemail:slowSpell("ep001"),email:"ep001",phone:"206-221-3489",gender:"f",topics:["obstetrics and gynecology","occupational therapy"],
  liaison:["harborview medical center","northwest hospital","u dub medical center","u dub neighborhood clinics"]},

/* TODO: Find Joanne's title */
  {firstName:"joanne",lastName:"rich",title:"need to do",sayemail:slowSpell("jrich"),email:"jrich",phone:"206-616-6601",gender:"f",topics:["pharmaceutics","psychosocial and community health"],
  liaison:["pharmacy services","the school of pharmacy"]},

  {firstName:"sarah",lastName:"safranek",title:"Public Health and Primary Care Librarian",sayemail:slowSpell("safranek"),email:"safranek",phone:"206-543-3408",gender:"f",topics:["biostatistics",
  "environmental and occupational health sciences","epidemiology","family medicine","global health","health services","nutritional sciences"],liaison:["the health information administration program",
  "the institute for health metrics and evaluation","i tech","the maternal and child health program","medex northwest","the pathobiology doctoral program","the school of public health","w.w.a.m.i"]}
];

/* NOTE: Synonyms not currently supported within interaction model; manually addressed in arrays below */
var index = [
  {subject:["airlift northwest"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["allergy and infectious diseases","allergy","allergies","infectious diseases","infections"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["anesthesiology and pain medicine","anesthesiology","pain medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["office of animal welfare","the office of animal welfare","animal welfare","animal rights"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["biochemistry"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["bioengineering","bio e"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["bioethics and humanities","bioethics","humanities","humanities and bioethics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["biological structures"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["biomedical informatics and medical education","biomedical informatics","medical education"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["biostatistics"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["cardiology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["comparative medicine"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["critical care medicine","critical care"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["school of dentistry","dentistry"],person:["stephen gabrielson","nicole dettmar"],first:["stephen","nicole"],last:["gabrielson","dettmar"],gender:""},
  {subject:["dermatology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["emergency medicine","emergencies","emergency"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["environmental and occupational health sciences","environmental health sciences","occupational health sciences","occupational health","environmental health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["epidemiology"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["family medicine"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["gastroenterology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["general internal medicine","internal medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["genome sciences","genomics","genome"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["gerontology and geriatric medicine","gerontology","geriatric medicine","geriatrics"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["global health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["hall health primary care center","hall health"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["harborview medical center"],person:["andrea ball","frances chu","emily patridge"],first:["andrea","frances","emily"],last:["ball","chu","patridge"],gender:""},
  {subject:["health information administration program"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["health services"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["hematology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["immunology"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["institute for health metrics and evaluation","health metrics and evaluation","health metrics"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["institute of translational health sciences","translational health sciences"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["i tech"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["laboratory medicine","lab medicine"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["maternal and child health program","maternal health program","child health program","maternal health","child health","children's health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["medex northwest"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["medical genetics","genetics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["medical laboratory science","medical lab science","lab science"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["department of medicine","medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["school of medicine","medicine school"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["metabolism"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["endocrinology"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["nutrition"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["microbiology"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["molecular biology program","molecular biology"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["cellular biology program","cellular biology"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["molecular medicine"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["nephrology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["graduate program in neuroscience","grad program in neuroscience"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["neurology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["northwest hospital"],person:["emily patridge","andrea ball"],first:["emily","andrea"],last:["patridge","ball"],gender:""},
  {subject:["school of nursing"],person:["frances chu","stephen gabrielson"],first:["frances","stephen"],last:["chu","gabrielson"],gender:""},
  {subject:["nutritional sciences"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["obstetrics"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f"},
  {subject:["gynecology"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f"},
  {subject:["occupational therapy"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f"},
  {subject:["oncology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["ophthalmology"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["oral health services","oral health"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["oral medicine"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["oral surgery"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["maxillofacial surgery"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["orthodontics"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["orthopaedics"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["otolaryngology"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["palliative care"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["paramedic training program"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["pathobiology doctoral program"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["pathology"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["pediatric dentistry"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["pediatrics"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["periodontics"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["pharmaceutics"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f"},
  {subject:["pharmacy services"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f"},
  {subject:["school of pharmacy","pharmacy"],person:["joanne rich","diana louden"],first:["joanne","diana"],last:["rich","louden"],gender:""},
  {subject:["physical therapy"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["physician assistant"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["physiology"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["biophysics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["prosthodontics"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["psychiatry"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["behavioral sciences"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["psychosocial health"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f"},
  {subject:["community health"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f"},
  {subject:["school of public health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f"},
  {subject:["public health genetics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f"},
  {subject:["pulmonary medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["critical care medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["radiation oncology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["radiology"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f"},
  {subject:["rehabilitation medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["rehabilitation sciences"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["restorative dentistry"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["rheumatology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["ride"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["school of social work"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f"},
  {subject:["social workers"],person:["emily patridge","andrea ball","frances chu"],first:["emily","andrea","frances"],last:["patridge","ball","chu"],gender:""},
  {subject:["surgery"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["urology"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f"},
  {subject:["university of washington medical center","u dub medical center"],person:["emily patridge","andrea ball","frances chu"],first:["emily","andrea","frances"],last:["patridge","ball","chu"],gender:""},
  {subject:["university of washington neighborhood clinics","u dub neighborhood clinics","university of washington neighborhood clinic","u dub neighborhood clinic"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f"},
  {subject:["write"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f"},
  {subject:["w.w.a.m.i."],person:["nicole dettmar","sarah safranek"],first:["nicole","sarah"],last:["dettmar","safranek"],gender:""}
];

var skillName = "HSL Library Helper";

// This is the welcome message for when a user starts the skill without a specific intent.
// var WELCOME_MESSAGE = "Welcome to  " + skillName + "! I can help you find Alexa Evangelists and Solutions Architects. " + getGenericHelpMessage(data);

var WELCOME_MESSAGE = "Learn about the librarians of the Health Sciences Library, or search for a librarian by specialty. You can also ask about the opening hours of the library. " + getGenericHelpMessage(data);

// This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I can help you find a librarian, or find library hours for a specific date, week, or weekend. ";

// This is the message a user will hear when they begin a new search
var NEW_SEARCH_MESSAGE = "To start a new search, say the name of a librarian or a topic to search for. " + getGenericHelpMessage(data);

// This is the message a user will hear when they ask Alexa for help while in the SEARCH state
var SEARCH_STATE_HELP_MESSAGE = "Say the name of a librarian or a topic to search for. Or, you can ask for library hours. " + getGenericHelpMessage(data);

var DESCRIPTION_STATE_HELP_MESSAGE = "Here are some things you can say: Tell me more, or give me his or her contact info";

var MULTIPLE_RESULTS_STATE_HELP_MESSAGE = "Sorry, please say the first and last name of the person you'd like to learn more about";

// This is the message use when the decides to end the search
var SHUTDOWN_MESSAGE = "Ok. ";

// This is the message a user will hear when they try to cancel or stop the skill.
var EXIT_SKILL_MESSAGE = "Ok. Have a nice day!";

// =====================================================================================================
// ------------------------------ Section 2. Skill Code - Intent Handlers  -----------------------------
// =====================================================================================================

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
        // console.log("SEARCH INTENT");
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("SearchByNameIntent");
    },
    "SearchBySpecialtyIntent": function() {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("SearchBySpecialtyIntent");
    },
    "SearchHoursIntent": function() {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("SearchHoursIntent");
    },
    "TellMeMoreIntent": function() {
        this.handler.state = states.SEARCHMODE;
        // this.emitWithState("SearchByNameIntent");
        this.emit(":ask", WELCOME_MESSAGE, getGenericHelpMessage(data));
    },
    "TellHoursIntent": function() {
      this.handler.state = states.SEARCHMODE;
      this.emitWithState("TellHoursIntent");
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
        var output = "Ok, starting over. Can I help you find a librarian, or our opening hours? " + getGenericHelpMessage(data);
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
        // console.log("repeating last speech");
      }
      else{
        output = getGenericHelpMessage(data);
        // console.log("no last speech availble. outputting standard help message.");
      }
      this.emit(":ask",output, output);
    },
    "SearchByNameIntent": function() {
      searchByNameIntentHandler.call(this);
    },
    "SearchBySpecialtyIntent": function() {
      searchBySpecialtyIntentHandler.call(this);
    },
    "SearchHoursIntent": function() {
      searchHoursIntentHandler.call(this);
    },
    "SearchByInfoTypeIntent": function() {
      searchByInfoTypeIntentHandler.call(this);
    },
    "TellHoursIntent" : function() {
      tellHoursIntentHandler.call(this);
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
        this.emit(":ask", HELP_MESSAGE + getGenericHelpMessage(data), getGenericHelpMessage(data));
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = states.SEARCHMODE;
        var output = "Ok, starting over. Can I help you find a librarian, or our opening hours? " + getGenericHelpMessage(data);
        this.emit(":ask", output, output);
    },
    "SessionEndedRequest": function() {
        this.emit("AMAZON.StopIntent");
    },
    "Unhandled": function() {
        // console.log("Unhandled intent in startSearchHandlers");
        this.emit(":ask", SEARCH_STATE_HELP_MESSAGE, SEARCH_STATE_HELP_MESSAGE);
    }
});

var multipleSearchResultsHandlers = Alexa.CreateStateHandler(states.MULTIPLE_RESULTS, {
    "AMAZON.StartOverIntent": function() {
        this.handler.state = states.SEARCHMODE;
        var output = "Ok, starting over. Can I help you find a librarian, or our opening hours? " + getGenericHelpMessage(data);
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

        // console.log("firstName:" + firstName);
        // console.log("firstName:" + lastName);
        // console.log("firstName:" + infoType);
        // console.log("Intent Name:" + this.event.request.intent.name);

        var canSearch = figureOutWhichSlotToSearchBy(firstName,lastName);
        // console.log("Multiple results found. canSearch is set to = " + canSearch);
        var speechOutput;

        if (canSearch)
            var searchQuery = slots[canSearch].value;
            var searchResults = searchDatabase(this.attributes.lastSearch.results, searchQuery, canSearch);
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
                output = generateSearchResultsMessage(searchQuery,searchResults.results);
                this.attributes.lastSearch.lastSpeech = output;
                // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
                this.emit(":ask", output);

            } else { // No match found
                lastSearch = this.attributes.lastSearch;
                var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
                speechOutput = MULTIPLE_RESULTS_STATE_HELP_MESSAGE + ", " + listOfPeopleFound;
                this.emit(":ask", speechOutput);
            }
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
        // console.log("Unhandled intent in multipleSearchResultsHandlers");
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
        cardContent = generateCard(person); // Calling the helper function to generate the card content that will be sent to the Alexa app.
        speechOutput = generateTellMeMoreMessage(person);
        repromptSpeech = "Would you like more information? Say yes or no";

        // console.log("the contact you're trying to find more info about is " + person.firstName);
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
          // Not a valid slot, no card needs to be set up, respond with simply a voice response
          speechOutput = generateSearchHelpMessage(person.gender);
          repromptSpeech = "You can ask me - what's " + genderize("his-her", person.gender) + " e-mail, or give me " + genderize("his-her", person.gender) + " phone number. ";
          this.attributes.lastSearch.lastSpeech = speechOutput;
          this.handler.state = states.SEARCHMODE;
          this.emit(":ask", speechOutput, repromptSpeech);
        }
    },
    "TellHoursIntent": function() {
      tellHoursIntentHandler.call(this);
    },

    "SearchByNameIntent": function() {
        searchByNameIntentHandler.call(this);
    },

    "SearchBySpecialtyIntent": function() {
        searchBySpecialtyIntentHandler.call(this);
    },

    "SearchHoursIntent": function() {
        searchHoursIntentHandler.call(this);
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
        var output = "Ok, starting over. Can I help you find a librarian, or our opening hours? " + getGenericHelpMessage(data);
        this.emit(":ask", output, output);
    },

    "SessionEndedRequest": function() {
        this.emit("AMAZON.StopIntent");
    },

    "Unhandled": function() {
        var slots = this.event.request.intent.slots;
        var person = this.attributes.lastSearch.results[0];

        // console.log("Unhandled intent in DESCRIPTION state handler");
        this.emit(":ask", "Sorry, I don't know that" + generateNextPromptMessage(person,"general"), "Sorry, I don't know that" + generateNextPromptMessage(person,"general"));
    }
});

// ------------------------- END of Intent Handlers  ---------------------------------

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

function searchByNameIntentHandler () {
  var firstName = isSlotValid(this.event.request, "firstName");
  var lastName = isSlotValid(this.event.request, "lastName");
  var infoType = isSlotValid(this.event.request, "infoType");

  var canSearch = figureOutWhichSlotToSearchBy(firstName,lastName);
  // console.log("canSearch is set to = " + canSearch);

    if (canSearch) {
      var searchQuery = this.event.request.intent.slots[canSearch].value;
      var searchResults = searchDatabase(data, searchQuery, canSearch);

      // Saving lastSearch results to the current session
      var lastSearch = this.attributes.lastSearch = searchResults;
      var output;

      // Saving last intent to session attributes
      this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

      if (searchResults.count > 1) { // Multiple results found
        var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
        output = generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
        this.handler.state = states.MULTIPLE_RESULTS; // Change state to MULTIPLE_RESULTS
        this.attributes.lastSearch.lastSpeech = output;
        this.emit(":ask", output);
      } else if (searchResults.count == 1) { // One result found
          this.handler.state = states.DESCRIPTION; // Change state to description
          if (infoType) {
              // If a specific infoType was requested, redirect to specificInfoIntent
              // infoType was provided
              this.emitWithState("TellMeThisIntent");
          } else { // No infoType was provided
            output = generateSearchResultsMessage(searchQuery,searchResults.results);
            this.attributes.lastSearch.lastSpeech = output;
            this.emit(":ask", output);
          }
      } else { // No match found
        // console.log("searchQuery was  = " + searchQuery);
        // console.log("searchResults.results was  = " + searchResults);
        output = generateSearchResultsMessage(searchQuery,searchResults.results);
        this.attributes.lastSearch.lastSpeech = output;
        // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
        this.emit(":ask", output);
      }
    } else { // No searchable slot was provided
        // console.log("searchQuery was  = " + searchQuery);
        // console.log("searchResults.results was  = " + searchResults);

        this.emit(":ask", generateSearchResultsMessage(searchQuery,false));
    }
}

/* REVIEW */
function searchBySpecialtyIntentHandler () {
  var specialty = isSlotValid(this.event.request, "specialty");
  var results = [];
  var str = "";
  var matchFound = false;
  var subject;

  if (specialty) {
    // For each entry
    for (var i = 0; i < index.length; i++) {
      // For each synonym within each entry
      for (var j = 0; j < index[i].subject.length; j++) {
        if (sanitizeSearchQuery(specialty) == index[i].subject[j]) {
          // For each person associated with an entry
          for (var k = 0; k < index[i].person.length; k++) {
            results.push(index[i].person[k]);
          }
          matchFound = true;

          // Remember which index contains the queried value
          subject = i;

          if (results.length == 1) {
            var searchResults = searchDatabase(data, index[subject].last[0], "lastName");

            // Saving lastSearch results to the current session
            // Follow-up questions (e.g. "what is her email") only apply if there is one result
            var lastSearch = this.attributes.lastSearch = searchResults;
            this.attributes.lastSearch.lastIntent = "SearchBySpecialtyIntent";
          }

          for (var l = 0; l < results.length; l++) {
            if (l != results.length - 1) {
              str += results[l] + ", ";
            } else if (l == results.length - 2) {
              str += results[l] + " and ";
            } else {
              str += results[l];
            }
          }

        }
      }
    }

    if (matchFound == false) {
      this.emit(":tell", "Sorry, I couldn't find anyone who is a liaison for that topic. <break time=\"0.5s\"/> Would you like to try again? " + getLibrariansHelpMessage(data, index));
    }

    if (results.length > 1) {
      str += " are the liaisons for your requested topic of " + index[subject].subject[0] + ". You can ask for their email, phone number, or contact information. Or, you can start a new search. " + getGenericHelpMessage(data);
      this.emit(":tell", str);
    } else {
      str += " is the liaison for your requested topic of " + index[subject].subject[0] + ". You can ask for " + genderize("his-her", index[subject].gender) +
             " email, phone number, or contact information. Or, you can start a new search. " + getGenericHelpMessage(data);
      this.emit(":tell", str);
    }

  } else {
    str = "I'm not sure what you're asking. Please ask me again. " + getGenericHelpMessage(data);
    this.emit(":tell", str);
  }

}

/* REVIEW */
function searchHoursIntentHandler() {
  var requestedDate = isSlotValid(this.event.request, "date");

  if (requestedDate) {
    var year;
    var yearIndex;
    var status;
    var strEmit;
    var currentDate = new Date();

    if ((requestedDate == "PRESENT_REF") || (requestedDate == "present_ref")) {
      // The user requested hours for now
      // Get current date and time
      year = currentDate.getFullYear();

      if ((year == YEAR1) || (year == YEAR2)) {

        if (year == YEAR1) {
          yearIndex = 0;
        } else {
          yearIndex = 1;
        }

        status = hours[yearIndex].month[currentDate.getMonth()][currentDate.getDate() - 1];

        if (status == "closed") {
          this.emit(":tell", "Sorry, the library is not currently open.");
        } else if (status == "") {
          strEmit = "The library hours for that date have not been determined yet. Would you like to find opening hours for other dates? " + getHoursHelpMessage();
          this.emit(":tell", strEmit);
        } else {
          var currentStatus = libraryStatusGivenTime(status, currentDate.getHours(), currentDate.getMinutes());

          if (currentStatus == "open") {
            strEmit = "Yes, the library is currently open. Today's hours are " + returnHours(status);
            this.emit(":tell", strEmit);
          } else {
            this.emit(":tell", "Sorry, the library is not currently open.");
          }

        }

      } else {
        strEmit = "The current library hours have not been determined yet. Would you like to find opening hours for other dates? " + getHoursHelpMessage();
        this.emit(":tell", strEmit);
      }

    } else {
      var date = requestedDate.split("-");

      if (date.length == 3) {
        if ((!isNaN(date[1])) && (!isNaN(date[2]))) {
          // Library hours for a specific date have been requested
          if ((date[0] == YEAR1) || (date[0] == YEAR2)) {
            if (date[0] == YEAR1) {
              yearIndex = 0;
            } else {
              yearIndex = 1;
            }

            status = hours[yearIndex].month[Number(date[1]) - 1][Number(date[2]) - 1];

            if (status == "closed") {
              strEmit = "The library is closed on " + returnMonth(date[1]) + " " + date[2] + "th.";
              this.emit(":tell", strEmit);
            } else if (status == "") {
              strEmit = "The library hours have not been determined for that day. Would you like to find opening hours for other dates? " + getHoursHelpMessage();
              this.emit(":tell", strEmit);
            } else {
              strEmit = "Yes, the library is open on " + returnMonth(date[1]) + " " + date[2] + "th, from " + returnHours(status);
              this.emit(":tell", strEmit);
            }
          } else {
            strEmit = "The library hours have not been determined for that year. Would you like to find opening hours for other dates? " + getHoursHelpMessage();
            this.emit(":tell", strEmit);
          }

        } else {
          // Library hours for a specific weekend have been requested
          if ((date[0] == YEAR1) || (date[0] == YEAR2)) {
            var week = date[1].toUpperCase().replace("W", "");
            var ISODate = getDateOfISOWeek (week, date[0]);

            if (date[0] == YEAR1) {
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

            var satDate = returnDate(new newDate(5));
            var sunDate = returnDate(new newDate(6));

            var sat = hours[yearIndex].month[satDate.month - 1][satDate.date];
            var sun = hours[yearIndex].month[sunDate.month - 1][sunDate.date];

            if (sat == "closed" && sun == "closed") {
              strEmit = "Sorry. The library is not open on the weekend of " + returnMonth(satDate.month) + " " + satDate.date + "th and " +
                        returnMonth(sunDate.month) + " " + sunDate.date + "th. ";
              this.emit(":tell", strEmit);
            } else if (sat == "closed") {
              strEmit = "The library is not open on Saturday, " + returnMonth(satDate.month) + " " + satDate.date + "th, but it is open on Sunday, " +
                        returnMonth(sunDate.month) + " " + sunDate.date + "th from " + returnHours(sun) + ". ";
              this.emit(":tell", strEmit);
            } else if (sun == "closed") {
              strEmit = "The library is open on Saturday, " + returnHours(satDate.month) + " " + satDate.date + "th, from " + returnHours(sat) +
                        ". The library is not open on Sunday, " + returnMonth(sunDate.month) + " " + sunDate.date + "th. ";
              this.emit(":tell", strEmit);
            } else if (sat == "" && sun == "") {
              this.emit(":tell", "The library hours for " + returnMonth(satDate.month) + " " + satDate.date + ", " + satDate.year + " and " +
                                 returnMonth(sunDate.month) + " " + sunDate.date + ", " + sunDate.year + " have not been determined yet. ");
            } else if (sat == "") {
              strEmit = "The library hours have not yet been determined for Saturday, " + returnHours(satDate.month) + " " + satDate.date + ", " + satDate.year +
                        ". But the library is open on Sunday, " + returnMonth(sunDate.month) + " " + sunDate.date + "th, from " + returnHours(sun) + ". ";
              this.emit(":tell", strEmit);
            } else if (sun == "") {
              strEmit = "The library hours have not yet been determined for Sunday, " + returnMonth(sunDate.month) + " " + sunDate.date + ", " + sunDate.year +
                        ". But the library is open on Saturday, " + returnMonth(satDate.month) + " " + satDate.date + "th, from " + returnHours(sat) + ". ";
              this.emit(":tell", strEmit);
            } else {
              if (sat == sun) {
                strEmit = "The library is open on Saturday and Sunday, " + returnMonth(satDate.month) + " " + satDate.date + "th and " + returnMonth(sunDate.month) +
                          " " + sunDate.date + "th, from " + returnHours(sat); + ". ";
                this.emit(":tell", strEmit);
              } else {
                strEmit = "The library is open on Saturday, " + returnMonth(satDate.month) + " " + satDate.date + "th, from " + returnHours(sat) +
                          ". The library is also open on Sunday, " + returnMonth(sunDate.month) + " " + sunDate.date + "th, from " + returnHours(sun) + ". ";
                this.emit(":tell", strEmit);
              }
            }

          } else {
            strEmit = "The library hours have not been determined for that year. Would you like to find opening hours for other dates? " + getHoursHelpMessage();
            this.emit(":tell", strEmit);
          }

        }

      } else if (date.length == 2) {
        if (!isNaN(date[1])) {
          // Asked for a month, e.g. "this month": 2017-08
          strEmit = "Yes, the library is open during the month of " + returnMonth(date[1]) + ". <break time=\"0.25s\"/> Please specify a date or week for more detailed opening hours." + getHoursHelpMessage();
          this.emit(":tell", strEmit);

        } else if ((date[1].toUpperCase() == "WI") || (date[1].toUpperCase() == "SP") || (date[1].toUpperCase() == "SU") || (date[1].toUpperCase() == "FA")) {
          // Asked for a season, e.g. "next winter": 2017-WI
          var season, currentPeriod;

          if (date[0] == YEAR1 || date[0] == YEAR2) {
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

            strEmit = "Yes, the library will be open during " + season + " quarter. " + periodHours[currentPeriod] + " <break time=\"0.5s\"/>" + extraHours[currentPeriod];
            this.emit(":tell", strEmit);

          } else {
            this.emit(":tell", "The library hours have not yet been determined for that year.");
          }

        } else if ((date[1].toUpperCase() == "Q1") || (date[1].toUpperCase() == "Q2") || (date[1].toUpperCase() == "Q3") || (date[1].toUpperCase() == "Q4")) {
          // Asked for a calendar quarter
          strEmit = "Yes, the library is open during ";

          if (date[1].toUpperCase() == "Q1") {
            // January 1 - March 31
            strEmit += " the first calendar quarter, from January 1st to March 31st. ";
          } else if (date[1].toUpperCase() == "Q2") {
            // April 1 - June 30
            strEmit += " the second calendar quarter, from April 1st to June 30th. ";
          } else if (date[1].toUpperCase() == "Q3") {
            // July 1 - September 30
            strEmit += " the third calendar quarter, from July 1st to September 30th. ";
          } else {
            // October 1 - December 31
            strEmit += " the fourth calendar quarter, from October 1st to December 31st. ";
          }

          strEmit += "For more detailed opening hours, please ask for the hours on a specific date. Or - for opening hours for school quarters, please ask for the hours of a season. ";
          this.emit(":tell", strEmit);

        } else {
          // Asked for a week, e.g. "next week": 2017-W44
          if ((date[0] == YEAR1) || (date[0] == YEAR2)) {
            if (date[0] == YEAR1) {
              yearIndex = 0;
            } else {
              yearIndex = 1;
            }

            var start;
            var week = date[1].toUpperCase().replace("W", "");
            var ISODate = getDateOfISOWeek(week, date[0]);

            var todayDate = currentDate.getDate();
            var todayMonth = Number(currentDate.getMonth()) + 1;
            var todayYear = currentDate.getFullYear();

            function newDate (days) {
              this.year = Number(date[0]);
              this.month = Number(ISODate.getMonth()) + 1;
              this.date = Number(ISODate.getDate());
              this.days = days;
            }

            var tueDate = returnDate(new newDate(1));
            var wedDate = returnDate(new newDate(2));
            var thuDate = returnDate(new newDate(3));
            var friDate = returnDate(new newDate(4));
            var satDate = returnDate(new newDate(5));
            var sunDate = returnDate(new newDate(6));

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
            if (hours[yearIndex].month[months[0] - 1][days[0] - 1] == "closed") {
              closed.push(0);
            }
            if (hours[yearIndex].month[months[1] - 1][days[1] - 1] == "closed") {
              closed.push(1);
            }
            if (hours[yearIndex].month[months[2] - 1][days[2] - 1] == "closed") {
              closed.push(2);
            }
            if (hours[yearIndex].month[months[3] - 1][days[3] - 1] == "closed") {
              closed.push(3);
            }
            if (hours[yearIndex].month[months[4] - 1][days[4] - 1] == "closed") {
              closed.push(4);
            }
            if (hours[yearIndex].month[months[5] - 1][days[5] - 1] == "closed") {
              closed.push(5);
            }
            if (hours[yearIndex].month[months[6] - 1][days[6] - 1] == "closed") {
              closed.push(6);
            }

            var str1 = "The library is open on the following days and hours: ";

            for (var i = start; i < days.length; i++) {
              if (!isInArray(i, closed)) {
                // If the library isn't closed, list the open hours for that day
                str1 += returnDay(i) + ", " + returnMonth(months[i]) + " " + days[i] + "th, from " + returnHours(hours[yearIndex].month[months[i] - 1][days[i] - 1]) + " - ";
              }
            }

            var str2 = "The library is closed on the following days: ";
            if (closed.length != 0) {
              // If there are any days that are closed, state them
              for (var i = 0; i < closed.length; i++) {
                if (i == closed.length - 2) {
                  str2 += returnDay(closed[i]) + ", " + returnMonth(months[closed[i]]) + " " + days[closed[i]] + "th - and ";
                } else if (i == closed.length - 1) {
                  str2 += returnDay(closed[i]) + ", " + returnMonth(months[closed[i]]) + " " + days[closed[i]] + "th. ";
                } else {
                  str2 += returnDay(closed[i]) + ", " + returnMonth(months[closed[i]]) + " " + days[closed[i]] + "th - ";
                }
              }

              strEmit = str1 + str2;
              this.emit(":tell", strEmit);

            } else {
              this.emit(":tell", str1);
            }

          } else {
            strEmit = "The library hours have not been determined for that year. Would you like to find opening hours for other dates? " + getHoursHelpMessage();
            this.emit(":tell", strEmit);
          }

        }

      } else {
        if (date[0] == "201X") {
          // Asked for this decade
          strEmit = "Yes, the library will most likely be open for the next decade. Future hours have yet to be decided. To get current hours, please specify a date, week, or weekend. " + getHoursHelpMessage();
          this.emit(":tell", strEmit);
        } else if (date[0] == "20XX") {
          // Asked for this century
          strEmit = "Yes, the library will most likely be open for the next century. Future hours have yet to be decided. Please specify a date, week, or weekend for more detailed opening hours. " + getHoursHelpMessage();
          this.emit(":tell", strEmit);
        } else {
          if (date[0] == YEAR1) {
            // Asked for this year
            strEmit = "Yes, the library is open this year. Please specify a date, week, or weekend for more detailed opening hours. " + getHoursHelpMessage();
            this.emit(":tell", strEmit);
          } else if (date[0] == YEAR2) {
            // Asked for next year
            strEmit = "Yes, the library will be open next year. Please specify a date or week for more detailed opening hours. " + getHoursHelpMessage();
            this.emit(":tell", strEmit);
          } else if (Number(date[0]) < YEAR1) {
            // Asked for years in the past
            strEmit = "Yes, the library was open last year. Please specify a present or future date, week, or weekend for more detailed opening hours. " + getHoursHelpMessage();
            this.emit(":tell", strEmit);
          } else {
            // Asked for other years in the future
            strEmit = "Yes, the library will most likely be open in the future. Future hours have yet to be decided. Please specify a date or week for more detailed opening hours. " + getHoursHelpMessage();
            this.emit(":tell", strEmit);
          }
        }

      }

    }

  } else {
    strEmit = "I'm sorry. I couldn't understand the date you asked for. Please ask me again. " + getHoursHelpMessage();
    this.emit(":tell", strEmit);
  }

}

function searchByInfoTypeIntentHandler(){
  var slots = this.event.request.intent.slots;
  var firstName = isSlotValid(this.event.request, "firstName");
  var lastName = isSlotValid(this.event.request, "lastName");
  var infoType = isSlotValid(this.event.request, "infoType");

  var canSearch = figureOutWhichSlotToSearchBy(firstName,lastName);
  // console.log("canSearch is set to = " + canSearch);

    if (canSearch) {
      var searchQuery = slots[canSearch].value;
      var searchResults = searchDatabase(data, searchQuery, canSearch);

      // Saving lastSearch results to the current session
      var lastSearch = this.attributes.lastSearch = searchResults;
      var output;

      // Saving last intent to session attributes
      this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

      if (searchResults.count > 1) { // Multiple results found
        var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
        output = generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
        this.handler.state = states.MULTIPLE_RESULTS; // Change state to MULTIPLE_RESULTS
        this.attributes.lastSearch.lastSpeech = output;
        this.emit(":ask", output);

      } else if (searchResults.count == 1) { // One result found
          this.handler.state = states.DESCRIPTION; // Change state to description
          if (infoType) {
            // If a specific infoType was requested, redirect to specificInfoIntent
            // infoType or specialty was provided as well
            var person = this.attributes.lastSearch.results[0];
            var cardContent = generateCard(person);
            var speechOutput = generateSpecificInfoMessage(slots,person);
            var repromptSpeech = "<break time=\"0.5s\"/> Would you like to find more information? Say yes or no";
            this.attributes.lastSearch.lastSpeech = speechOutput;
            this.handler.state = states.SEARCHMODE;
            this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.title, cardContent.body, cardContent.image);
            // this.emitWithState("TellMeThisIntent");

          } else { // No infoType was provided
            output = generateSearchResultsMessage(searchQuery,searchResults.results)
            this.attributes.lastSearch.lastSpeech = output;
            // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
            this.emit(":ask", output);
          }

      } else { // No match found
        // console.log("searchQuery was  = " + searchQuery);
        // console.log("searchResults.results was  = " + searchResults);
        output = generateSearchResultsMessage(searchQuery,searchResults.results)
        this.attributes.lastSearch.lastSpeech = output;
        // this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
        this.emit(":ask", output);
      }
    } else { // No searchable slot was provided
      // console.log("searchQuery was  = " + searchQuery);
      // console.log("searchResults.results was  = " + searchResults);

      this.emit(":ask", generateSearchResultsMessage(searchQuery,false));
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

  // Check date to see if it falls within one of the current school year's quarters/interims
  for (var i = 0; i < period.length; i++) {
    d1 = period[i][0].split("/");
    d2 = period[i][1].split("/");
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
    strEmit = periodHours[currentPeriod] + " <break time=\"0.25s\"/>" + extraHours[currentPeriod];
    this.emit(":tell", strEmit);
  } else {
    strEmit = "The hours for this quarter have not been determined yet. For current hours, please specify a date, week, or weekend. " + getHoursHelpMessage();
    this.emit(":tell", strEmit);
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
    prompt = ". <break time=\"0.5s\"/> Would you like more information? For example, things you can say are - tell me more, or tell me " + genderize("his-her", person.gender) + " " + infoTypes[getRandom(0,infoTypes.length-1)];
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
        // console.log(sentence);
        break;
    case (results.length > 1):
        sentence = "I found " + results.length + " matching results";
        break;
    }
  } else {
    sentence = "Sorry, I didn't quite get that. Please try again. " + getGenericHelpMessage(data);
  }
  return sentence;
}

// Returns general help messages about finding library hours and finding librarians
function getGenericHelpMessage(data){
  var sentences = ["things you can ask include - who is " + getRandomName(data), "you can say the name of a librarian or say a topic of interest.", "you can say - " +
                   " who is the liaison for " + getRandomSubject(index), "you can ask me - what are the library's hours"];

  return "For example, " + sentences[getRandom(0, sentences.length - 1)];
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
    "is the library open on " + returnMonth(getRandom(1, 12)) + getRandom(1, 28) + "th? ",
    "what are the library hours? ",
    "is the library open right now?"
  ];

  return "For example, you can say - " + sentences[getRandom(0, sentences.length - 1)];
}

// Returns help messages that are specifically about finding librarians
function getLibrariansHelpMessage(data, index) {
  var sentences = [
    "For example, you can say - give me " + getRandomName(data) + "'s phone number. ",
    "For example, you can say - give me " + getRandomName(data) + "'s email address.",
    "For example, you can say - what topics is " + getRandomName(data) + " a liaison for?",
    "For example, you can ask - who is " + getRandomName(data) + "? ",
    "For example, you can say - tell me about " + getRandomName(data) + ". ",
    "For example, you can ask - who is the liaison for " + getRandomSubject(index) + "? ",
    "For example, you can ask - tell me the contact information of " + getRandomName(data) + ". "
  ];

  return sentences[getRandom(0, sentences.length - 1)];
}

function generateSearchHelpMessage(gender){
  var sentence = "Sorry, I don't know that. You can ask me - what's " + genderize("his-her", gender) +" e-mail, or give me " + genderize("his-her", gender) + " phone number";
  return sentence;
}

function generateTellMeMoreMessage(person){
  var sentence = person.firstName
  + "'s e-mail address is " + person.sayemail + " <break time=\"0.5s\"/>at <break time=\"0.5s\"/> u<break time=\"0.025s\"/> w<break time=\"0.05s\"/> dot<break time=\"0.05s\"/> e <break time=\"0.04s\"/>d <break time=\"0.03s\"/>u.<break time=\"0.1s\"/>" +
  genderize("his-her", person.gender) + " phone number is " + person.phone;

  if (person.topics.length == 0) {
    sentence += ". ";

  } else if ((person.topics.length < 3) && (person.topics.length > 0)) {
    sentence += ", and " + genderize("his-her", person.gender) + " specialties are " + generateTopics(person) + ". ";

  } else {
    sentence += ", and some of " + genderize("his-her", person.gender) + " specialties include " + generateTopics(person);
  }

  if (person.liaison.length == 0) {

  } else if ((person.liaison.length) < 3 && (person.liaison.length > 0)) {
    sentence += genderize("he-she", person.gender) + " is also a liaison for " + generateLiaisons(person) + ". ";

  } else {
    sentence += "Some of the programs that " + genderize("he-she", person.gender) + " is a liaison for are - " + generateLiaisons(person) + generateSendingCardToAlexaAppMessage(person,"general");
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
    sentence = person.firstName + "'s " + type + " is - " + person.sayemail + " <break time=\"0.5s\"/>at <break time=\"0.5s\"/> u<break time=\"0.025s\"/> w<break time=\"0.05s\"/> dot<break time=\"0.05s\"/> e <break time=\"0.04s\"/>d <break time=\"0.03s\"/>u.<break time=\"0.1s\"/>. Would you like to find more information? " + getGenericHelpMessage(data);

  } else if ((infoTypeValue == "phone") || (infoTypeValue == "phone number") || (infoTypeValue == "number")) {
    info = person.phone;
    type = "phone number";
    sentence = person.firstName + "'s " + type + " is - " + info + ". <break time=\"0.5s\"/> Would you like to find more information? " + getLibrariansHelpMessage(data, index);

  } else if ((infoTypeValue == "specialty") || (infoTypeValue == "specialties") || (infoTypeValue == "topics") || (infoTypeValue == "topic") || (infoTypeValue == "liaison") || (infoTypeValue == "specialize")) {
    if (person.topics.length == 0) {
      sentence = person.firstName + " does not specialize in any topic. ";

      if (person.liaison.length != 0) {
        sentence += "However, they are a liaison for ";

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

      sentence += "<break time=\"0.5s\"/> Would you like to find more information? " + getLibrariansHelpMessage(data, index);

    } else if ((person.topics.length < 3) && (person.topics.length > 0)) {
      sentence = person.firstName + " specializes in the topics of - "  + generateTopics(person) + ". ";

      if (person.liaison.length != 0) {
        sentence += genderize("he-she", person.gender) + " is also the liaison for ";

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

      sentence += "<break time=\"0.5s\"/> Would you like to find more information? " + getLibrariansHelpMessage(data, index);

    } else {
      sentence = "Some of the topics that " + person.firstName + " specializes in are - " + generateTopics(person) + ". ";

      if (person.liaison.length != 0) {
        sentence += genderize("he-she", person.gender) + " is also the liaison for ";

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
    }

    sentence += "<break time=\"0.5s\"/> Would you like to find more information? " + getLibrariansHelpMessage(data, index);

  } else {
    sentence = "Sorry, I don't have that information about " + person.firstName + ". You can ask for " + genderize("his-her", person.gender) + " phone number or email address instead. ";
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

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomName (arrayOfStrings) {
  var randomNumber = getRandom(0, data.length - 1)
  return arrayOfStrings[randomNumber].firstName + " " + arrayOfStrings[randomNumber].lastName;
}

function getRandomSubject (arrayOfStrings) {
  var randomNumber = getRandom(0, index.length - 1)
  return arrayOfStrings[randomNumber].subject[0];
}

function titleCase (str) {
  return str.replace(str[0], str[0].toUpperCase());
}

function slowSpell (str) {
  return "" + str.split("").join("<break time=\"0.05s\"/>");
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
      result += person.topics[0];
    } else {
      result += person.topics[0] + ", and " + person.topics[1];
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
      slotValue = slot.value.toLowerCase();
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
  var validTypes = ["phone number","e-mail", "email", "e mail", "phone", "topics", "specialty", "specialties", "topic", "liaison", "specialize"];
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
