var currentDate = new Date();

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
var autumnHours = "The opening hours for autumn quarter are: Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm.";
var autumnWinterHours = "The opening hours for the autumn winter interim are: Monday through Friday, from 9:00am to 5:00pm. The library is closed on Saturdays and Sundays.";
var winterHours = "The opening hours for winter quarter are: Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm.";
var winterSpringHours = "The opening hours for the winter spring interim are: Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays.";
var springHours = "The opening hours for spring quarter are: Monday through Thursday, from 7:30am to 9:00pm - Fridays from 7:30am to 7:00pm - Saturdays from 12:00pm to 5:00pm - and Sundays from 12:00pm to 7:00pm.";
var springSummerHours = "The opening hours for the spring summer interim are: Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays.";
var summerHours = "The opening hours for summer quarter are: Monday through Friday, from 7:30am to 7:00pm - Sundays from 1:00pm to 5:00pm. The library is closed on Saturdays.";
var summerAutumnHours = "The opening hours for the summer autumn interim are: Monday through Friday, from 7:30am to 7:00pm. The library is closed on Saturdays and Sundays.";

// NOTE: Update these extra hours for each new school year
var autumnExtra = "The library is also closed on November 23rd, November 24th, and November 25th. The adjusted library hours for November 10th are 1:00pm to 5:00pm, and the hours for November 22nd are 7:30am to 5:00pm.";
var autumnWinterExtra = "The library is also closed on December 25th, and January 1st.";
var winterExtra = "The adjusted library hours for January 15th and February 19th are 1:00pm to 5:00pm.";
var winterSpringExtra = "";
var springExtra = "The adjusted library hours for May 28th are 1:00pm to 5:00pm.";
var springSummerExtra = "";
var summerExtra = "The library is also closed on July 4th. The adjusted library hours for July 3rd are 7:30am to 5:00pm.";
var summerAutumnExtra = "The library is also closed on September 4th. The adjusted library hours for August 21st are 3:00pm - 7:00pm. The hours for September 19th are 10:00am to 7:00pm. And the hours for September 25th and September 26th are 7:30am to 9:00pm.";

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

var today = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
var d1, d2, c;
var date1, date2, check;
var currentPeriod;
var validDate = false;

// Check date to see if it falls within one of the current school year's quarters/interims
for (var i = 0; i < period.length; i++) {
  d1 = period[i][0].split("/");
  d2 = period[i][1].split("/");
  c = today.split("/");

  date1 = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
  date2 = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
  check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

  if ((check >= date1) && (check <= date2)) {
    console.log(today + " falls between " + period[i][0] + " and " + period[i][1]);
    currentPeriod = i;
    validDate = true;
  }
}

if (validDate) {
  console.log(periodHours[currentPeriod] + " " + extraHours[currentPeriod]);
} else {
  console.log("The hours for this quarter have not been determined yet.");
}
