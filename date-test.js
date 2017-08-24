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

var year;
var yearIndex;
var status;

var test = "2017-W35";
var currentDate = new Date();

if (test == "PRESENT_REF") {
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
      console.log("Sorry, the library is not currently open.");
    } else if (status == "") {
      console.log("The library hours have not been determined yet.");
    } else {
      var currentStatus = libraryStatusGivenTime(status, currentDate.getHours(), currentDate.getMinutes());

      if (currentStatus == "open") {
        console.log("Yes, the library is currently open. Today's hours are " + returnHours(status));
      } else {
        console.log("Sorry, the library is not currently open.");
      }

    }

  } else {
    console.log("The library hours have not been determined yet.");
  }

} else {
  var date = test.split("-");

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
          console.log("Yes, the library is open on " + returnMonth(date[1]) + " " + date[2] + "th, from " + returnHours(status));
        }
      } else {
        console.log("The library hours have not been determined for that year.");
      }

    } else {
      // Library hours for a specific weekend have been requested
      if ((date[0] == YEAR1) || (date[0] == YEAR2)) {
        var week = date[1].replace("W", "");
        var ISODate = getDateOfISOWeek (week, date[0]);

        if (date[0] == YEAR1) {
          yearIndex = 0;
        } else {
          yearIndex = 1;
        }

        var sat = hours[yearIndex].month[ISODate.getMonth()][ISODate.getDate() + 4];
        var sun = hours[yearIndex].month[ISODate.getMonth()][ISODate.getDate() + 5];

        if (sat == "closed" && sun == "closed") {
          console.log("The library is not open this/that weekend.");
        } else if (sat == "closed") {
          console.log("The library is not open on Saturday, but it is open on Sunday from " + returnHours(sun) + ". ");
        } else if (sun == "closed") {
          console.log("The library is open on Saturday from " + returnHours(sat) + ", but it is not open on Sunday.");
        } else {
          if (sat == sun) {
            console.log("The library is open on Saturday and Sunday from " + returnHours(sat));
          } else {
            console.log("The library is open on Saturday from " + returnHours(sat) + ", and open on Sunday from " + returnHours(sun) + ". ");
          }
        }

      } else {
        console.log("The library hours have not been determined for that year.");
      }

    }

  } else if (date.length == 2) {
    if (!isNaN(date[1])) {
      // Asked for a month, e.g. "this month": 2017-08
      console.log("Yes, the library is open during the month of " + returnMonth(date[1]) + ". Please specify a date or week for more detailed opening hours.");

    } else if ((date[1] == "WI") || (date[1] == "SP") || (date[1] == "SU") || (date[1] == "FA")) {
      // Asked for a season, e.g. "next winter": 2017-WI
      if (date[0] == YEAR1 || date[0] == YEAR2) {
        if (date[1] == "WI") {
          var season = "winter";
        } else if (date[1] == "SP") {
          var season = "spring";
        } else if (date[1] == "SU") {
          var season = "summer";
        } else {
          var season = "fall";
        }

        console.log("Yes, the library will be open in the " + season + ". Please specify a date or week for more detailed opening hours.");

      } else {
        console.log("The library hours have not been determined for that year.");
      }
    } else {
      // Asked for a week, e.g. "next week": 2017-W44
      if ((date[0] == YEAR1) || (date[0] == YEAR2)) {
        if (date[0] == YEAR1) {
          yearIndex = 0;
        } else {
          yearIndex = 1;
        }

        var start;
        var week = date[1].replace("W", "");
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

        var str2 = "The library is closed on the follow days: ";
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

          console.log(str1 + str2);

        } else {
          console.log(str1);
        }

      } else {
        console.log("The library hours have not been determined for that year.");
      }

    }

  } else {
    if (date[0] == "201X") {
      // Asked for this decade
      console.log("")
    } else if (date[0] == "20XX") {
      // Asked for this century
      console.log("I don't have my crystal ball with me, but I'm pretty sure the library will be around for the next century. Will you?")
    } else {
      if (date[0] == YEAR1) {
        // Asked for this year
      } else if (date[0] == YEAR2) {
        // Asked for next year
      } else if (Number(date[0]) < YEAR1) {
        // Asked for years in the past
        console.log("Yes, the library was open last year. Are you a time traveler?")
      } else {
        // Asked for years in the future
        console.log()
      }
    }

  }

}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

// Given a date and a number of days, returns the date of the given date plus the given number of days
// Year should be a full year (e.g. 2017), month should be the actual month number (e.g. 8 if it's August),
// date should be the actual date number (e.g. 10 for August 10)

// All information should be passed in as an object
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
  if ((Math.floor((dateObject.date + dateObject.days) / daysInMonth) > 0) && ((dateObject.date + dateObject.days) / daysInMonth) != 1) {
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
    newDays = dateObject.days - (daysInMonth - dateObject.date + 1);

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
    newDate = dateObject.date + dateObject.days;
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
