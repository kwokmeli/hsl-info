var YEAR1 = "2017";
var YEAR2 = "2018";

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
  month: [
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""], // Jan
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
          [a,f,g,b,b,b,b,a,f,g,b,b,b,b,a,i,i,d,d,d,d,d,i,i,i,d,d,d,d,i,i] // Dec
          ]
  },

  {year: YEAR2,
  month: [
          [i,d,b,b,a,f,g,b,b,b,b,a,f,g,h,b,b,b,a,f,g,b,b,b,b,a,f,g,b,b,b], // Jan
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
          ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""] // Dec
        ]
  }
];

var year;
var yearIndex;
var status;

var test = "2017-W34-WE";
var currentDate = new Date();

test = test.toLowerCase();

if (test == "present_ref") {
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
      console.log("closed")
    } else if (status == "") {
      console.log("The library hours have not been determined yet.");
    } else {
      libraryStatusGivenTime(status, currentDate.getHours(), currentDate.getMinutes());
    }

  } else {
    console.log("The library hours have not been determined yet.");
  }

} else {
  var date = test.split("-");
console.log("date: " + date);
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
          console.log("closed");
        } else if (status == "") {
          console.log("The library hours have not been determined for that day.");
        } else {
          console.log("open: " + status);
        }
      } else {
        console.log("The library hours have not been determined for that year.");
      }

    } else {
      // Library hours for a specific weekend have been requested
      if ((date[0] == YEAR1) || (date[0] == YEAR2)) {
        var week = date[1].replace("w", "");
        var ISODate = getDateOfISOWeek (week, date[0]);

        if (date[0] == YEAR1) {
          yearIndex = 0;
        } else {
          yearIndex = 1;
        }

        var sat = hours[yearIndex].month[ISODate.getMonth()][ISODate.getDate() + 4];
        var sun = hours[yearIndex].month[ISODate.getMonth()][ISODate.getDate() + 5];

        console.log("sat: " + sat);
        console.log("sun: " + sun);
      } else {
        console.log("The library hours have not been determined for that year.");
      }

    }
  } else if (date.length == 2) {

  } else {

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

// Given a date, returns whether library is open or closed
function libraryStatusGivenDate () {

}

// Given a time and a range of opening times, returns whether library is open or closed
function libraryStatusGivenTime (constraints, hour, minutes) {
  var timeArray = constraints.split(":");
  var h1 = timeArray[0];
  var m1 = timeArray[1];
  var h2 = timeArray[2];
  var m2 = timeArray[3];

  if (h2 > h1) {
    if ((hour <= h2) && (hour >= h1)) {
      if (hour == h2) {
        if (minutes <= m2) {
          console.log("open");
        } else {
          console.log("closed");
        }
      } else if (hour == h1) {
        if (minutes >= m1) {
          console.log("open");
        } else {
          console.log("closed");
        }
      } else {
        console.log("open");
      }
    }
  } else if (h2 < h1) {
    if ((hour <= h1) && (hour >= h2)) {
      if (hour == h2) {
        if (minutes < m2) {
          console.log("open");
        } else {
          console.log("closed");
        }
      } else if (hour == h1) {
        if (minutes <= m1) {
          console.log("closed");
        } else {
          console.log("open");
        }
      } else {
        console.log("closed");
      }
    } else {
      console.log("open");
    }
  } else {
    // If the hours are the same, compare the minutes
    if (m2 > m1) {
      if ((hour == h1) && (minutes <= m2) && (minutes >= m1)) {
        console.log("open");
      } else {
        console.log("closed");
      }
    } else {
      if ((hour == h1) && (minutes <= m1) && (minutes >= m2)) {
        console.log("closed");
      } else {
        console.log("open");
      }

    }
  }
}
