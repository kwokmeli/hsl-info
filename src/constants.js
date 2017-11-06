"use strict";

var aa = "7:30:19:00";
var bb = "7:30:21:00";
var cc = "7:30:17:00";
var dd = "9:00:17:00";
var ee = "10:00:19:00";
var ff = "12:00:17:00";
var gg = "12:00:19:00";
var hh = "13:00:17:00";
var ii = "closed";

var autumnExtra = "The library is also closed on November 23rd, November 24th, and November 25th. The adjusted library hours for November 10th are 1:00pm to 5:00pm, and the hours for November 22nd are 7:30am to 5:00pm. ";
var autumnWinterExtra = "The library is also closed on December 25th, and January 1st. ";
var winterExtra = "The adjusted library hours for January 15th and February 19th are 1:00pm to 5:00pm. ";
var winterSpringExtra = "";
var springExtra = "The adjusted library hours for May 28th are 1:00pm to 5:00pm. ";
var springSummerExtra = "";
var summerExtra = "The library is also closed on July 4th. The adjusted library hours for July 3rd are 7:30am to 5:00pm. ";
var summerAutumnExtra = "The library is also closed on September 4th. The adjusted library hours for August 21st are 3:00pm - 7:00pm. The hours for September 19th are 10:00am to 7:00pm. And the hours for September 25th and September 26th are 7:30am to 9:00pm. ";

var autumnHours = "The opening hours for autumn quarter are: Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm. ";
var autumnWinterHours = "The opening hours for the autumn winter interim are: Monday through Friday, from 9:00am to 5:00pm. The library is closed on Saturdays and Sundays. ";
var winterHours = "The opening hours for winter quarter are: Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm. ";
var winterSpringHours = "The opening hours for the winter spring interim are: Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays. ";
var springHours = "The opening hours for spring quarter are: Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm. ";
var springSummerHours = "The opening hours for the spring summer interim are: Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays. ";
var summerHours = "The opening hours for summer quarter are: Monday through Friday, from 7:30am to 7:00pm - Sundays from 1:00pm to 5:00pm. The library is closed on Saturdays. ";
var summerAutumnHours = "The opening hours for the summer autumn interim are: Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays. ";

var rawData = [
    {firstName:"tania",lastName:"bardyn",pronounceLast:"",title:"Associate Dean for University Libraries and Director of the Health Sciences Library",sayemail:slowSpell("bardyn"),email:"bardyn",phone:"206-543-0422",gender:"f",
    topics:["mobile app development","library and information services","technology support","informatics and education development"],liaison:[]},

    {firstName:"andrea",lastName:"ball",pronounceLast:"ball",title:"Care Management and Population Health Librarian",sayemail:slowSpell("alball"),email:"alball",phone:"206-616-6630",gender:"f",topics:[
    "allergies and infectious diseases","anesthesiology","pain medicine","cardiology","dermatology","emergency medicine","gastroenterology","general internal medicine","gerontology","geriatric medicine",
    "hematology","nephrology","oncology","orthopaedics","palliative care","pediatrics","physical therapy","pulmonary and critical care medicine",
    "radiation oncology","rheumatology","surgery","urology"],liaison:["airlift northwest","harborview medical center","the department of medicine","northwest hospital","u dub medical center"]},

    {firstName:"frances",lastName:"chu",pronounceLast:"chu",title:"Health Sciences Clinical Liaison and Content Librarian",sayemail:slowSpell("chuf"),email:"chuf",phone:"206-616-1106",gender:"f",topics:["critical care medicine",
    "laboratory medicine","medical laboratory science","metabolism","endocrinology and nutrition","neurology","ophthalmology","otolaryngology","pathology",
    "psychiatry and behavioral sciences","radiology"],liaison:["hall health primary care center","harborview medical center","the school of nursing","u dub medical center"]},

    {firstName:"nicole",lastName:"dettmar",pronounceLast:"",title:"Health Sciences Curriculum Design Librarian",sayemail:slowSpell("snydern"),email:"snydern",phone:"206-543-3409",gender:"f",topics:["oral health services",
    "oral medicine","oral and maxillofacial surgery","pediatric dentistry","periodontics","prosthodontics","restorative dentistry"],liaison:["the school of dentistry","the school of medicine","ride","write","w.w.a.m.i"]},

    {firstName:"stephen",lastName:"gabrielson",pronounceLast:"<phoneme alphabet='x-sampa' ph='geIbr\ilsun'>gabrielson</phoneme>",title:"Instruction and Research Librarian",sayemail:slowSpell("gabeswg"),email:"gabeswg",phone:"206-543-3437",gender:"m",topics:[],liaison:["the school of nursing",
    "the school of dentistry"]},

    {firstName:"diana",lastName:"louden",pronounceLast:"<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>",title:"Biomedical and Translational Sciences Librarian",sayemail:slowSpell("dknl"),email:"dknl",phone:"206-221-3480",gender:"f",topics:[
    "biochemistry","bioengineering","bioethics and humanities","biological structures","biomedical informatics and medical education","comparative medicine","genome sciences","immunology",
    "medical genetics","microbiology","molecular and cellular biology","molecular medicine","physiology and biophysics","public health genetics"],liaison:["the office of animal welfare",
    "the institute of translational health sciences","the molecular and cellular biology program","the graduate program in neuroscience","the school of pharmacy","the school of public health"]},

    {firstName:"emily",lastName:"patridge",pronounceLast:"",title:"Assistant Director of Clinical Research and Data Services - and Trail Program Manager",sayemail:slowSpell("ep001"),email:"ep001",phone:"206-221-3489",gender:"f",topics:["obstetrics and gynecology","occupational therapy"],
    liaison:["harborview medical center","northwest hospital","u dub medical center","u dub neighborhood clinics"]},

    {firstName:"joanne",lastName:"rich",pronounceLast:"rich",title:"Information Management Librarian",sayemail:slowSpell("jrich"),email:"jrich",phone:"206-616-6601",gender:"f",topics:["<prosody rate=\"fast\"><phoneme alphabet='x-sampa' ph='\"farm@\"sutIks'>pharmaceutics</phoneme></prosody>","psychosocial and community health"],
    liaison:["pharmacy services","the school of pharmacy"]},

    {firstName:"sarah",lastName:"safranek",pronounceLast:"<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>",title:"Public Health and Primary Care Librarian",sayemail:slowSpell("safranek"),email:"safranek",phone:"206-543-3408",gender:"f",topics:["biostatistics",
    "environmental and occupational health sciences","epidemiology","family medicine","global health","health services","nutritional sciences"],liaison:["the health information administration program",
    "the institute for health metrics and evaluation","i-tech","the maternal and child health program","medex northwest","the pathobiology doctoral program","the school of public health","w.w.a.m.i"]}
  ];

function slowSpell (str) {
  return "" + str.split("").join("<break time=\"0.05s\"/>");
}

module.exports = Object.freeze({
  /******************************
  *           App IDs           *
  ******************************/
  APP_ID: "APP_ID HERE",

  /******************************
  *            Hours            *
  ******************************/
  // Current academic years
  // NOTE: Update these years for each new school year
  YEAR1: "2017",
  YEAR2: "2018",

  // Possible library opening hours for the academic calendar year of 2017-2018
  // NOTE: Update these times for each new school year
  a: aa,
  b: bb,
  c: cc,
  d: dd,
  e: ee,
  f: ff,
  g: gg,
  h: hh,
  i: ii,

  // NOTE: Update these dates for each new school year
  hours: [
    {year: "2017",
    month: [["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Feb
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Mar
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Apr
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // May
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Jun
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Jul
            [aa,aa,aa,aa,ii,ii,aa,aa,aa,aa,aa,ii,ii,aa,aa,aa,aa,aa,ii,ii,aa,aa,aa,aa,aa,ii,ii,aa,aa,aa,aa], // Aug
            [aa,ii,ii,ii,aa,aa,aa,aa,ii,ii,aa,aa,aa,aa,aa,ii,ii,aa,ee,aa,aa,aa,ii,ii,bb,bb,bb,bb,aa,ff], // Sep
            [gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb], // Oct
            [bb,bb,aa,ff,gg,bb,bb,bb,bb,hh,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,cc,ii,ii,ii,gg,bb,bb,bb,bb], // Nov
            [aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ii,ii,dd,dd,dd,dd,dd,ii,ii,ii,dd,dd,dd,dd,ii,ii]] // Dec
    },

    {year: "2018",
    month: [[ii,dd,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,hh,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb], // Jan
            [bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,hh,bb,bb,bb,aa,ff,gg,bb,bb,bb], // Feb
            [bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ii,ii,aa,aa,aa,aa,aa,ii,ii,bb,bb,bb,bb,aa,ff], // Mar
            [gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb], // Apr
            [bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,bb,bb,bb,bb,aa,ff,gg,hh,bb,bb,bb], // May
            [aa,ff,gg,bb,bb,bb,bb,aa,ii,ii,aa,aa,aa,aa,aa,ii,ii,"","","","","","","","","","","","",""], // Jun
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Jul
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Aug
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Sep
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Oct
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Nov
            ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]] // Dec
    }
  ],

  // NOTE: Update these dates for each new school year
  // Dates are in form dd/mm/yyyy
  period: [
    ["27/9/2017","15/12/2017"],
    ["16/12/2017","2/1/2018"],
    ["3/1/2018","16/3/2018"],
    ["17/3/2018","25/3/2018"],
    ["26/3/2018","8/6/2018"],
    ["9/6/2018","17/6/2018"],
    ["19/6/2017","18/8/2017"],
    ["19/8/2017","26/9/2017"]
  ],

  // NOTE: Update these dates for each new school year
  autumnHours: autumnHours,
  autumnWinterHours: autumnWinterHours,
  winterHours: winterHours,
  winterSpringHours: winterSpringHours,
  springHours: springHours,
  springSummerHours: springSummerHours,
  summerHours: summerHours,
  summerAutumnHours: summerAutumnHours,

  // NOTE: Update these extra hours for each new school year
  autumnExtra: autumnExtra,
  autumnWinterExtra: autumnWinterExtra,
  winterExtra: winterExtra,
  winterSpringExtra: "",
  springExtra: springExtra,
  springSummerExtra: "",
  summerExtra: summerExtra,
  summerAutumnExtra: summerAutumnExtra,

  extraHours: [
    autumnExtra,
    autumnWinterExtra,
    winterExtra,
    winterSpringExtra,
    springExtra,
    springSummerExtra,
    summerExtra,
    summerAutumnExtra
  ],

  periodHours: [
    autumnHours,
    autumnWinterHours,
    winterHours,
    winterSpringHours,
    springHours,
    springSummerHours,
    summerHours,
    summerAutumnHours
  ],

  /******************************
  *    Librarian Information    *
  ******************************/
  data: rawData,

  /* NOTE: Synonyms not currently supported within interaction model; manually addressed in arrays below */
  index: [
    {subject:["airlift northwest"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["allergy and infectious diseases","allergy","allergies","infectious diseases","infections"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["anesthesiology and pain medicine","anesthesiology","pain medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["the office of animal welfare","animal welfare","animal rights","office of animal welfare"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["biochemistry","biochem","bio chem"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["bioengineering","bio e"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["bioethics and humanities","bioethics","humanities","humanities and bioethics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["biological structures","structures","biological structure","structure"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["biomedical informatics and medical education","biomedical informatics","medical education","informatics","bio informatics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["biostatistics","biostatistic","statistics","statistic"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["cardiology","cardiologist","cardiologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["comparative medicine"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["critical care medicine","critical care","care","critical"],person:["frances chu","andrea ball"],first:["frances","andrea"],last:["chu","ball"],gender:"",pronounceLast:[]},
    {subject:["the school of dentistry","school of dentistry","dentistry","dentistry school"],person:["stephen gabrielson","nicole dettmar"],first:["stephen","nicole"],last:["gabrielson","dettmar"],gender:"",pronounceLast:["<phoneme alphabet='x-sampa' ph='geIbr\ilsun'>gabrielson</phoneme>","dettmar"]},
    {subject:["dermatology","dermatologist","dermatologists","skin doctor","skin"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["emergency medicine","emergencies","emergency"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["environmental and occupational health sciences","environmental health sciences","occupational health sciences","occupational health","environmental health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["epidemiology","epidemiologist","epidemiologists"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["family medicine","family doctor","family physician","family"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["gastroenterology","gastroenterologist","gastroenterologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["general internal medicine","internal medicine"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["genome sciences","genomics","genome"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["gerontology and geriatric medicine","gerontology","geriatric medicine","geriatrics","geriatric"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["global health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["hall health primary care center","hall health care center","hall health center","hall health"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["harborview medical center","harborview","harborview med center","harborview center"],person:["andrea ball","frances chu","emily patridge"],first:["andrea","frances","emily"],last:["ball","chu","patridge"],gender:"",pronounceLast:[]},
    {subject:["the health information administration program","health information administration program","health information","health information administration","health administration","health administration program","health information program"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["health services","health service"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["hematology","haematology","blood","hematologist","haematologist","hematologists","haematologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["immunology","immunologist","immunologists","the immunologist","the immunologists"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["the institute for health metrics and evaluation","institute for health metrics and evaluation","health metrics and evaluation","health metrics"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["the institute of translational health sciences","institute of translational health sciences","translational health sciences","translational health","translational health science"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["i-tech","the i-tech","i technology","the i technology"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["laboratory medicine","lab medicine"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["the maternal and child health program","maternal and child health program","maternal health program","child health program","maternal health","child health","children's health","childrens health","children health","maternal and child health","maternal and children's health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["medex northwest","the medex northwest","med x northwest","med ex northwest"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["medical genetics","genetics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["medical laboratory science","medical lab science","lab science","medical lab sciences","lab sciences","medical laboratory sciences","laboratory sciences"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["the department of medicine","department of medicine","medicine department","med department"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["the school of medicine","school of medicine","medicine school","med school","medicine","medical school"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["metabolism","metabolic process","metabolic processes","the metabolic process","the metabolic processes","metabolic"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["endocrinology","endocrinologist","endocrinologists","the endocrinology","the endocrinologist","the endocrinologists"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["nutrition","nutritionist","the nutrition","the nutritionist","nutritionists","the nutritionists"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["microbiology","micro bio","microbio","microbiologist","microbiologists"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["the molecular biology program","molecular biology program","molecular biology",],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["the cellular biology program","cellular biology program","cellular biology","the cellular bio program","cellular bio program","cellular bio"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["molecular medicine","molecular medicines","the molecular medicine","the molecular medicines"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["nephrology","nephrologist","nephrologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["the graduate program in neuroscience","graduate program in neuroscience","grad program in neuroscience","neuroscience graduate program","neuroscience grad program","neuroscience","the grad program in neuroscience","the neuroscience grad program","the neuroscience"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["neurology","the neurology","neurologist","neurologist"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["northwest hospital","the northwest hospital","northwest hospitals","the northwest hospitals"],person:["emily patridge","andrea ball"],first:["emily","andrea"],last:["patridge","ball"],gender:"",pronounceLast:[]},
    {subject:["the school of nursing","school of nursing","nursing school","nursing","the nursing school","nurse","the nursing","nursing schools","the nursing schools"],person:["frances chu","stephen gabrielson"],first:["frances","stephen"],last:["chu","gabrielson"],gender:"",pronounceLast:["chu","<phoneme alphabet='x-sampa' ph='geIbr\ilsun'>gabrielson</phoneme>"]},
    {subject:["nutritional sciences","nutritional science","the nutrition","the nutritional sciences","the nutritional science"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["obstetrics","obstetric","the obstetrics","the obstetric","child birth","childbirth"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f",pronounceLast:[]},
    {subject:["gynecology","gyneocologist","obgyn","the gynecology","the gyneocologist","the obgyn"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f",pronounceLast:[]},
    {subject:["occupational therapy","occupational therapist","occupational therapists","the occupational therapy","the occupational therapist","the occupational therapists"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f",pronounceLast:[]},
    {subject:["oncology","oncologist","the oncology","the oncologist","oncologists","the oncologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["ophthalmology","opthalmologist","opthalmologists","the ophthalmology","the opthalmologist","the opthalmologists"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["oral health services","oral health","the oral health services","mouth health","oral health service","the oral health service"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["oral medicine","mouth medicine","oral medicines","mouth medicines"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["oral surgery","mouth surgery","oral surgeries","mouth surgeries","oms"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["maxillofacial surgery","maxillofacial","omfs"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["orthodontics","orthodontist","orthodontists","the orthodontics","the orthodontist","the orthodontists"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["orthopaedics","orthopaedic","the orthopaedic","the orthopaedics"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["otolaryngology","otolaryngologist","otolaryngologists","the otolaryngology","the otolaryngologist","the otolaryngologists"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["palliative care","palliative","the palliative care","the palliative"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["the paramedic training program","paramedic training program","paramedic","paramedics","the paramedic","the paramedics","training program for paramedics","the training program for paramedics","training program for paramedic","training program for paramedics","training paramedics","the paramedics training program"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["the pathobiology doctoral program","pathobiology doctoral program","pathobiology","pathobiologist","the pathobiology","the pathobiologists"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["pathology","pathologist","the pathology","the pathologist","pathologists"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["pediatric dentistry","pediatric dentist","pediatric dentists"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["pediatrics","pediatric","pediatrician","the pediatrician","the pediatric","the pediatrics","pediatricians"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["periodontics","periodontic","periodontist","periodontists"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["<prosody rate=\"fast\"><phoneme alphabet='x-sampa' ph='\"farm@\"sutIks'>pharmaceutics</phoneme></prosody>","pharmaceutic"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f",pronounceLast:[]},
    {subject:["pharmacy services","pharmacy service"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f",pronounceLast:[]},
    {subject:["the school of pharmacy","school of pharmacy","pharmacy","pharmacy school","pharm school","farm school"],person:["joanne rich","diana louden"],first:["joanne","diana"],last:["rich","louden"],gender:"",pronounceLast:["rich","<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["physical therapy","physical therapies","physical therapist"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["physician assistant","physician's assistant","physicians assistant","physician assistants","physician's assistants","physicians assistants"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["physiology","mammalian physiology"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["biophysics"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["prosthodontics","prosthodontic","prosthodontist","prosthodontists"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["psychiatry","psychiatrist","psychiatrists"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["behavioral sciences"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["psychosocial health"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f",pronounceLast:[]},
    {subject:["community health","health of the community"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f",pronounceLast:[]},
    {subject:["the school of public health","school of public health","public health","public health school","the public health","the public health school","the public's health"],person:["sarah safranek"],first:["sarah"],last:["safranek"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]},
    {subject:["public health genetics","health genetics","genetics of health","genetics of public health"],person:["diana louden"],first:["diana"],last:["louden"],gender:"f",pronounceLast:["<phoneme alphabet='x-sampa' ph='\"laUden'>louden</phoneme>"]},
    {subject:["pulmonary medicine","pulmonary"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["radiation oncology","radiation oncologist","radiation oncologists","the radiation oncology","the radiation oncologist","the radiation oncologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["radiology","radiologist","radiologists","the radiology","the radiologist","the radiologists"],person:["frances chu"],first:["frances"],last:["chu"],gender:"f",pronounceLast:[]},
    {subject:["rehabilitation medicine","rehabilitation medicines"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["rehabilitation sciences","rehabilitation science"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["restorative dentistry","restorative dentist","restorative dentists","the restorative dentistry","the restorative dentist","the restorative dentists"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["rheumatology","rheumatologist","the rheumatology","the rheumatologist","rheumatologists","the rheumatologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["ride","the ride"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["the school of social work","school of social work","social work school"],person:["joanne rich"],first:["joanne"],last:["rich"],gender:"f",pronounceLast:[]},
    {subject:["social workers","social work","the social workers","the social work"],person:["emily patridge","andrea ball","frances chu"],first:["emily","andrea","frances"],last:["patridge","ball","chu"],gender:"",pronounceLast:[]},
    {subject:["surgery","surgeries","the surgery","the surgeries","surgeon","surgeons","the surgeon","the surgeons"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["urology","urologist","urologists","the urology","the urologist","the urologists"],person:["andrea ball"],first:["andrea"],last:["ball"],gender:"f",pronounceLast:[]},
    {subject:["university of washington medical center","the university of washington medical center","the u dub medical center","u dub medical center","university of washington med center","u dub med center","med center"],person:["emily patridge","andrea ball","frances chu"],first:["emily","andrea","frances"],last:["patridge","ball","chu"],gender:"",pronounceLast:[]},
    {subject:["university of washington neighborhood clinics","the university of washington neighborhood clinics","university of washington neighborhood clinic","the university of washington neighborhood clinics","u dub neighborhood clinics","the u dub neighborhood clinics","the u dub neighborhood clinic","u dub neighborhood clinic","neighborhood clinic","neighborhood clinics"],person:["emily patridge"],first:["emily"],last:["patridge"],gender:"f",pronounceLast:[]},
    {subject:["write","the write"],person:["nicole dettmar"],first:["nicole"],last:["dettmar"],gender:"f",pronounceLast:[]},
    {subject:["wwami","the wwami"],person:["nicole dettmar","sarah safranek"],first:["nicole","sarah"],last:["dettmar","safranek"],gender:"",pronounceLast:["dettmar","<phoneme alphabet='x-sampa' ph='s@\"fr{nek'>safranek</phoneme>"]}
  ],

  /******************************
  *          Messages           *
  ******************************/
  skillName: "HSL Library Helper",
  // This is the message a user will hear when they ask Alexa for help in your skill.
  WELCOME_MESSAGE: "Learn about the librarians of the Health Sciences Library, or search for a librarian by specialty. <break time=\"0.25s\"/> You can also ask about the opening hours of the library. <break time=\"0.25s\"/> If you ever need help, just say - I need help. ",

  // This is the message a user will hear when they begin a new search
  HELP_MESSAGE: "I can help you find a librarian, or find library hours for a specific date, week, or weekend. ",

  // This is the message a user will hear when they ask Alexa for help while in the SEARCH state
  NEW_SEARCH_MESSAGE: "To start a new search, say the name of a librarian or a topic to search for. ",

  // This is the message use when the decides to end the search
  SEARCH_STATE_HELP_MESSAGE: "Say the name of a librarian or a topic to search for. Or, you can ask for library hours. ",

  // This is the message a user will hear when they try to cancel or stop the skill.
  DESCRIPTION_STATE_HELP_MESSAGE: "Here are some things you can say: Tell me more, or give me his or her contact info",

  MULTIPLE_RESULTS_STATE_HELP_MESSAGE: "Sorry, please say the first and last name of the person you'd like to learn more about",
  SHUTDOWN_MESSAGE: "Ok. Have a nice day!",
  EXIT_SKILL_MESSAGE: "OK. "

});
