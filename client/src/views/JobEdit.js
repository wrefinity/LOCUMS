import React, { useState, useEffect } from "react";
import axios from "axios";
import Notifications from "components/Notification/Notification";
import { job, branch, categories_list } from "../data/api";
import { FaTrashAlt } from "react-icons/fa";
import LoadingOverlay from "react-loading-overlay";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";

function JobEdit({ currentJob }) {
  const [jobData, setJobData] = useState(currentJob);
  const [benefits, setBenefits] = useState(currentJob.benefit || []);
  const [requirements, setRequirements] = useState(
    currentJob.requirements || []
  );

  const [branches, setBranches] = useState([]);

  const [nbenefit, setNBenefit] = useState("");
  const [nrequirement, setNRequirement] = useState("");

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  const [requestLoading, setRequestLoading] = useState(false);

  async function fetchBranches() {
    setRequestLoading(true);
    await axios.get(branch.showAllBranches).then((response) => {
      if (response.data.status === true) {
        if (response.data.data) {
          setBranches(response.data.data);
        }
      } else {
        setNotificationDetails({
          msg: "Error Loading Branches, Please Referesh The Page",
          type: "danger",
        });
        setNotificationStatus(true);
      }
    });
    setRequestLoading(false);
  }

  async function editJob() {
    setRequestLoading(true);

    await axios
      .patch(job.editJob + "/" + jobData._id, {
        ...jobData,
        benefit: benefits,
        requirements,
      })
      .then((res) => {
        if (res.data.status) {
          setNotificationDetails({
            msg: "Job Updated Successfully",
            type: "success",
          });
        } else {
          setNotificationDetails({
            msg: "Error Updating Job, make sure all fields are filled or try refreshing page.",
            type: "danger",
          });
        }
        setNotificationStatus(true);
      });
    setRequestLoading(false);
  }

  const handleRemoveItem = (location, x) => {
    if (location === "benefit") {
      setBenefits(benefits.filter((item) => item !== x));
    } else if (location === "requirement") {
      setRequirements(requirements.filter((item) => item !== x));
    }

    setNotificationDetails({
      msg: "Item Removed Successfully",
      type: "success",
    });
    setNotificationStatus(true);
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  return (
    <>
      {notificationStatus ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div className="content">
        {" "}
        <LoadingOverlay
          active={requestLoading}
          spinner
          text="Loading your request..."
        >
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit a Job </h5>
                </CardHeader>{" "}
                <CardBody style={{ marginTop: "-30px" }}>
                  <Form onSubmit={() => {}}>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Job Title</label>
                          <Input
                            placeholder="Chiropractor Needed"
                            defaultValue={jobData.title}
                            type="text"
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                title: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Category</label>
                          <Input
                            type="select"
                            defaultValue={jobData.category}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="" hidden disabled>
                              Select Category
                            </option>
                            {categories_list.map((item, key) => {
                              return (
                                <option key={key + item} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Branch</label>
                          <Input
                            type="select"
                            defaultValue={jobData.branch}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                branchId: e.target.value,
                              })
                            }
                          >
                            <option value="" hidden disabled>
                              Select Branch
                            </option>
                            {branches.map((item, key) => {
                              return (
                                <option key={key + item._id} value={item._id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <label>Job Description</label>
                          <Input
                            cols="80"
                            placeholder="This job is a ..."
                            rows="4"
                            type="textarea"
                            defaultValue={jobData.description}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                description: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Pay Frequency</label>
                          <Input
                            type="select"
                            defaultValue={jobData.payFrequency}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                payFrequency: e.target.value,
                              })
                            }
                          >
                            <option value="" disabled hidden>
                              Select Pay Frequency
                            </option>
                            {["Monthly", "Daily", "Weekly", "Yearly"].map(
                              (item, key) => {
                                return (
                                  <option key={key + item} value={item}>
                                    {item}
                                  </option>
                                );
                              }
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Work Hour</label>
                          <Input
                            type="select"
                            defaultValue={jobData.workHour}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                workHour: e.target.value,
                              })
                            }
                          >
                            <option value="" disabled selected>
                              Select work hour
                            </option>
                            {["Part Time", "Full Time"].map((item, key) => {
                              return (
                                <option key={key + item} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Work Pattern</label>
                          <Input
                            type="select"
                            defaultValue={jobData.workPattern}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                workPattern: e.target.value,
                              })
                            }
                          >
                            <option value="" disabled hidden>
                              Select Pay Pattern
                            </option>
                            {["Morning", "Day", "Night"].map((item, key) => {
                              return (
                                <option key={key + item} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Start Date</label>
                          <Input
                            type="date"
                            defaultValue={jobData.startDate}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                startDate: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label for="pay">End Date</label>
                          <Input
                            type="date"
                            defaultValue={jobData.endDate}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Vacancies</label>
                          <Input
                            placeholder="E.g 10"
                            type="number"
                            defaultValue={jobData.vacancies}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                vacancies: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Salary/Pay</label>
                          <Input
                            placeholder="E.g 100"
                            type="number"
                            defaultValue={jobData.salary}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                salary: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Job Type</label>
                          <Input
                            type="select"
                            defaultValue={jobData.jobType}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                jobType: e.target.value,
                              })
                            }
                          >
                            <option value="" disabled selected hidden>
                              Select Job Type
                            </option>

                            {["Temporary", "Permanent"].map((item, key) => {
                              return (
                                <option key={key + item} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label for="pay">Expiry Date</label>
                          <Input
                            type="date"
                            defaultValue={jobData.expiredDate}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                expiredDate: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" style={{ textAlign: "center" }}>
                        <FormGroup>
                          <label>Benefits</label>
                          <Input
                            placeholder="E.g Pension"
                            type="text"
                            value={nbenefit}
                            onChange={(e) => setNBenefit(e.target.value)}
                          />
                          <Button
                            className="btn-fill"
                            color="primary"
                            type="submit"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setBenefits([...benefits, nbenefit]);
                              setNBenefit("");
                            }}
                          >
                            Add Benefit +
                          </Button>
                        </FormGroup>
                      </Col>

                      <Col md="6" style={{ textAlign: "center" }}>
                        <FormGroup>
                          <label>Requirements</label>
                          <Input
                            placeholder="E.g 3 Years Experience"
                            type="text"
                            value={nrequirement}
                            onChange={(e) => setNRequirement(e.target.value)}
                          />
                          <Button
                            className="btn-fill"
                            color="primary"
                            type="submit"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setRequirements([...requirements, nrequirement]);
                              setNRequirement("");
                            }}
                          >
                            Add Requirement +
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <hr />
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <div className="card-description">
                    <Row>
                      <Col md={12}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Job Title:
                        </b>{" "}
                        {jobData.title}
                      </Col>

                      <Col md={12}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Description:
                        </b>{" "}
                        {jobData.description}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Pay Frequency:
                        </b>{" "}
                        {jobData.payFrequency}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Work Hour:
                        </b>{" "}
                        {jobData.workHour}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Work Pattern:
                        </b>{" "}
                        {jobData.workPattern}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Start Date:
                        </b>{" "}
                        {jobData.startDate}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          End Date:
                        </b>{" "}
                        {jobData.endDate}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Vacancies:
                        </b>{" "}
                        {jobData.vacancies}
                      </Col>

                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Job Type:
                        </b>{" "}
                        {jobData.jobType}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Salary/Pay:
                        </b>{" "}
                        {jobData.salary}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Publish Date:
                        </b>{" "}
                        {jobData.publishedDate}
                      </Col>
                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Expiry Date:
                        </b>{" "}
                        {jobData.expiredDate}
                      </Col>

                      <Col md={6}>
                        <b style={{ fontSize: "+1", fontWeight: "600" }}>
                          Branch:
                        </b>{" "}
                        {jobData.branchId}
                      </Col>
                    </Row>

                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Benefit</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benefits.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <p>{item}</p>
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              className="text-center"
                            >
                              <FaTrashAlt
                                onClick={() =>
                                  handleRemoveItem("benefit", item)
                                }
                                color="red"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Requirements</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirements.map((item, key) => (
                          <tr key={key}>
                            <td>
                              <p>{item}</p>
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              className="text-center"
                            >
                              <FaTrashAlt
                                onClick={() =>
                                  handleRemoveItem("requirement", item)
                                }
                                color="red"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <Button
                    onClick={() => {
                      editJob();
                    }}
                    className="btn-fill"
                    color="primary"
                    type="submit"
                  >
                    Update Job Details
                  </Button>
                </CardBody>
              </Card>
            </Col>{" "}
          </Row>{" "}
        </LoadingOverlay>
      </div>
    </>
  );
}

export default JobEdit;
