import { job } from "data/api";
import React, { useState } from "react";
import ReactSwitch from "react-switch";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import axios from "axios";
import Notifications from "components/Notification/Notification";
import JobEdit from "./JobEdit";

const JobProfile = ({ currentJob, setCurrentJob }) => {
  const {
    _id,
    title,
    description,
    payFrequency,
    workHour,
    workPattern,
    startDate,
    category,
    endDate,
    vacancies,
    salary,
    jobType,
    branchId,
    benefit,
    requirements,
    publishedDate,
    expiredDate,
    isActive,
  } = currentJob;

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  const [mode, setMode] = useState("view");
  async function editJob(status) {
    await axios
      .patch(job.editJob + "/" + _id, { isActive: status })
      .then((res) => {
        if (res.data.status) {
          setNotificationDetails({
            msg: "Job Updated Successfully",
            type: "success",
          });
          setCurrentJob(res.data.data);
        } else {
          setNotificationDetails({
            msg: "Error Updating Job Data.",
            type: "Danger",
          });
        }
        setNotificationStatus(true);
      });
  }

  return (
    <>
      {notificationStatus ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div
        style={{
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <CardTitle tag="h4">Title: {title}</CardTitle>
        <Button
          onClick={() => {
            setMode(mode === "edit" ? "view" : "edit");
          }}
          className="btn-fill"
          color="primary"
          type="submit"
          size="sm"
        >
          {mode === "view" ? "Edit Job Data" : "Back to Job Data"}
        </Button>
        <ReactSwitch
          onChange={(e) => editJob(isActive ? false : true)}
          checked={isActive}
        />
      </div>
      <hr />
      {mode === "view" ? (
        <Row style={{ marginTop: "-10px" }}>
          <Col md={6}>
            <Card>
              <CardBody>
                <CardSubtitle>Category: {category}</CardSubtitle>
                <p>{description}</p>
                <p>
                  <b>Pay Frequency:</b> {payFrequency}
                </p>
                <p>
                  <b>Work Hour:</b> {workHour}
                </p>
                <p>
                  <b>Work Pattern:</b> {workPattern}
                </p>
                <p>
                  <b>Start Date:</b> {new Date(startDate).toDateString()}
                </p>
                <p>
                  <b>End Date:</b> {new Date(endDate).toDateString()}
                </p>
                <p>
                  <b>Vacancies:</b> {vacancies}
                </p>
                <p>
                  <b>Salary:</b> {salary.toLocaleString()}
                </p>
                <p>
                  <b>Job Type:</b> {jobType}
                </p>
                <p>Branch: {branchId?.name}</p>
                <p>Published Date: {publishedDate}</p>
                <p>Expired Date: {expiredDate}</p>
                <p>Benefits: </p>
                <ul style={{ paddingLeft: "20px" }}>
                  {benefit.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p>Requirements: </p>
                <ul style={{ paddingLeft: "20px" }}>
                  {requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <p>Active: {isActive ? "Yes" : "No"}</p>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>Job Applications</Col>
        </Row>
      ) : (
        <JobEdit currentJob={currentJob} />
      )}
    </>
  );
};

export default JobProfile;
