import Application from "../model/Application.js";

class ApplyRepo {
  applyForJob = async (req, res) => {
    const { userId, jobId, user_note } = req.body;
    try {
      const application = new Application({ userId, jobId, user_note });
      await application.save();
      res.status(201).send({ status: true, data: application });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err });
    }
  };

  editApplication = async (req, res) => {
    const { id } = req.params;
    try {
      const application = await Application.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!application) {
        return res
          .status(400)
          .send({ status: false, msg: "Problem with the update query" });
      }
      return res.status(200).send({ status: true, data: application });
    } catch (err) {
      console.log(err);
      res.json({ msg: err });
    }
  };

  getApplicationsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const applications = await Application.find({ userId });
      res.status(200).send({ status: true, data: applications });
    } catch (err) {
      console.log(err);
      res.json({ msg: err });
    }
  };

  getApplicationsByJob = async (req, res) => {
    const { jobId } = req.params;
    try {
      const applications = await Application.find({ jobId });
      res.status(200).send({ status: true, data: applications });
    } catch (err) {
      console.log(err);
      res.json({ msg: err });
    }
  };
  getFilteredApplications = async (req, res) => {
    const { start_date, end_date, user_id, job_id } = req.query;

    let filter = {};

    if (start_date && end_date) {
      filter.application_date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      };
    }

    if (user_id) {
      filter.userId = user_id;
    }

    if (job_id) {
      filter.jobId = job_id;
    }

    try {
      const applications = await Application.find(filter);
      res.status(200).send({ status: true, data: applications });
    } catch (err) {
      console.log(err);
      res.status(400).send({ status: false, msg: err });
    }
  };
}
export default new ApplyRepo();
