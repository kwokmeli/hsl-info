const util = require("util");
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

var dateExample = {
  year: 2017,
  month: 12,
  date: 28,
  days: 35
}

var answer = returnDate(dateExample);
// console.log(util.inspect(answer, false, null));


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

var ISOtest = getDateOfISOWeek (34, 2017);
console.log(ISOtest);
