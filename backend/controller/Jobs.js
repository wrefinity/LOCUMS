import Job from "../model/Jobs.js";
import User from "../model/Users.js";

class JobRepo {
  editJob = async (req, res) => {
    const { id } = req.params;
    try {
      const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
      if (!job) {
        return res
          .status(400)
          .send({ status: false, msg: "Problem with the update query" });
      }

      return res.status(200).send({ status: true, data: job });
    } catch (err) {
      console.log(err);
      return res.json({ status: false, msg: err });
    }
  };

  addJob = async (req, res) => {
    try {
      const newJob = new Job(req.body);
      const job = await newJob.save();
      res.status(200).send({ status: true, data: job });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, msg: "Server Error" });
    }
  };
  getJobs = async (req, res) => {
    const { branchId, category, payFrequency, title, isActive, userId } =
      req.query;

    const query = {};
    if (branchId) {
      query.branchId = branchId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (payFrequency) {
      query.payFrequency = payFrequency;
    }
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (isActive) {
      query.isActive = isActive;
    }

    let current = (req.query.current || 1) - 1;
    let count = await Job.countDocuments(query);
    try {
      const jobs = await Job.find(query)
        .populate({
          path: "userId",
          select: "fullname",
        })
        .skip(current * 10)
        .limit(10)
        .exec();

      res.status(200).send({ status: true, data: jobs, count });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, msg: "Server Error" });
    }
  };

  getJobById = async (req, res) => {
    const { id } = req.params;

    try {
      const job = await Job.findById(id).populate({
        path: "userId",
        select: "fullname",
      });

      if (!job) {
        res.status(404).send({ status: false, msg: "Job not found" });
      } else {
        res.status(200).send({ status: true, data: job });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, msg: "Server Error" });
    }
  };

  getGroupedData = async (req, res) => {
    try {
      const result = await User.aggregate([
        { $group: { _id: "$occupation", count: { $sum: 1 } } },
      ]);
      const occupationCount = {};
      result.forEach((item) => {
        occupationCount[item._id] = item.count;
      });

      const jobsCount = await Job.countDocuments();
      const usersCount = await User.countDocuments();
      const verifiedUsersCount = await User.countDocuments({
        status: "verified",
      });

      res.status(200).send({
        status: true,
        grouped: occupationCount,
        count: { jobsCount, usersCount, verifiedUsersCount },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: "Server Error" });
    }
  };
  getGroupedData = async (req, res) => {
    try {
      const result = await User.aggregate([
        { $group: { _id: "$occupation", count: { $sum: 1 } } },
      ]);
      const occupationCount = {};
      result.forEach((item) => {
        occupationCount[item._id] = item.count;
      });

      const jobsCount = await Job.countDocuments();
      const usersCount = await User.countDocuments();
      const verifiedUsersCount = await User.countDocuments({
        status: "verified",
      });

      res.status(200).send({
        status: true,
        grouped: occupationCount,
        count: { jobsCount, usersCount, verifiedUsersCount },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: "Server Error" });
    }
  };

  getGraphData = async (req, res) => {
    let duration = req.params.duration;

    var startDate = new Date();
    var firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 2);
    var firstDayofYear = new Date(startDate.getFullYear(), 0, 2);

    var dates = {
      daily: {
        format: "%Y-%m-%d",
        startDate: new Date(startDate.setDate(startDate.getDate() - 7)),
        endDate: new Date(),
      },
      weekly: {
        format: "%Y-W%U",
        startDate: firstDay,
        endDate: new Date(),
      },
      monthly: {
        format: "%Y-%m",
        startDate: firstDayofYear,
        endDate: new Date(),
      },
    };
    let chartData = [];

    await Job.aggregate(
      [
        {
          $match: {
            publishedDate: {
              $gte: dates[duration].startDate,
              $lt: dates[duration].endDate,
            },
          },
        },
        // Group the documents by date
        {
          $group: {
            _id: {
              $dateToString: {
                format: dates[duration].format,
                date: "$publishedDate",
              },
            },
            count: {
              $sum: 1, // Use the $sum accumulator operator to count the number of documents for each group
            },
          },
        },
        // Sort the groups by date
        {
          $sort: {
            _id: 1,
          },
        },
      ],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          // The results will be an array of objects, with one object for each date
          // Each object will have properties for the date (_id) and the number of documents for that date (count)
          // console.log(results);
          chartData = results.map((result) => ({
            x: result._id, // The date (x-value)
            y: result.count, // The number of documents (y-value)
          }));
          chartData = addMissingDates(duration, chartData);
        }
      }
    );

    try {
      if (!chartData) {
        return res
          .status(400)
          .send({ status: false, error: "Problem with the query" });
      }

      res.status(200).send({
        status: true,
        data: chartData,
      });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  };
}

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
export default new JobRepo();
