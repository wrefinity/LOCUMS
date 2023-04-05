const addMissingDates = (duration, date) => {
  let dates = date;
  // create a new array to hold the missing dates
  var missingDates = [];
  if (duration === "daily") {
    // loop through the sorted dates and find the missing ones
    for (var i = 0; i < dates.length - 1; i++) {
      var date1 = new Date(dates[i].x);
      var date2 = new Date(dates[i + 1].x);

      // calculate the number of days between the two dates
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      // if there is more than one day between the two dates,
      // add the missing dates to the array
      if (diffDays > 1) {
        for (var j = 1; j < diffDays; j++) {
          var missingDate = new Date(date1.getTime() + j * (1000 * 3600 * 24));
          missingDates.push({
            x: missingDate.toISOString().split("T")[0],
            y: 0,
          });
        }
      }
    }
  }
  if (duration === "weekly") {
    for (var i = 0; i < dates.length; i++) {
      // extract the year and week number from the x property
      var dateParts = dates[i].x.split("-W");
      var year = dateParts[0];
      var week = dateParts[1];

      // check if there are any missing dates between the current date and the next date in the array
      if (i < dates.length - 1) {
        var nextDateParts = dates[i + 1].x.split("-W");
        var nextYear = nextDateParts[0];
        var nextWeek = nextDateParts[1];

        if (year == nextYear && nextWeek - week > 1) {
          // there are missing dates, so add them to the array
          for (var j = week + 1; j < nextWeek; j++) {
            dates.splice(i + 1, 0, { x: year + "-W" + j, y: 0 });
            i++;
          }
        }
      }
    }
  }
  if (duration === "monthly") {
    for (var i = 1; i < dates.length; i++) {
      // get the current date and the previous date
      var currDate = new Date(dates[i].x);
      var prevDate = new Date(dates[i - 1].x);

      // calculate the difference between the two dates in days
      var diff = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));

      // if there are missing dates, add them to the datesay
      if (diff > 1) {
        for (var j = 1; j < diff; j++) {
          var newDate = new Date(prevDate);
          newDate.setDate(newDate.getDate() + j);
          dates.push({ x: newDate.toISOString().slice(0, 10), y: "0" });
        }
      }
    }
  }

  // add the missing dates to the original array
  dates = dates.concat(missingDates);

  // sort the dates in ascending order
  dates.sort((a, b) => new Date(a.x) - new Date(b.x));
  // print the updated array
  return dates;
};

export default { addMissingDates };
