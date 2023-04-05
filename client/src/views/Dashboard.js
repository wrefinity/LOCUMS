import React, { useState, useEffect } from "react";

import { job } from "../data/api";
import axios from "axios";
import Notifications from "components/Notification/Notification";

// reactstrap components
import { Card, Row, Col } from "reactstrap";
import Chart from "components/DashboardComponents/Chart";

function Dashboard() {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  const [duration, setDuration] = useState("daily");
  const [createdJobsGraph, setCreatedJobsGraph] = useState({});
  const [groupedData, setGroupedData] = useState({});
  const [count, setCount] = useState({});
  const [dataload, setDataLoad] = useState(true);

  useEffect(
    () => {
      async function fetchGraphData() {
        await axios.get(job.graphData + "/" + duration).then((response) => {
          if (response.data.status === true) {
            setCreatedJobsGraph(response.data.data || []);
            setDataLoad(false);
          } else {
            setNotificationDetails({
              msg: "Error Loading Graph Data, Please Referesh The Page",
              type: "danger",
            });
            setNotificationStatus(true);
          }
        });
      }

      async function fetchGroupData() {
        await axios.get(job.groupedData).then((response) => {
          if (response.data.status === true) {
            setGroupedData(response.data.grouped || {});
            setCount(response.data.count || {});
            setDataLoad(false);
          } else {
            setNotificationDetails({
              msg: "Error Loading Graph Data, Please Referesh The Page",
              type: "danger",
            });
            setNotificationStatus(true);
          }
        });
      }
      fetchGroupData();
      fetchGraphData();
    },
    // eslint-disable-next-line
    []
  );
  // {date:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}}
  return (
    <>
      {notificationStatus === true ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div className="content">
        <Row>
          <Col md="3">
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div style={{ paddingTop: "20px" }}>
                  <h4 className="title d-inline">Doctors</h4>
                  <br />
                  <h5 className="title d-inline">{groupedData.doctor || 0}</h5>
                </div>
                <img src="img/icon/man.svg" alt="" style={{ width: "70px" }} />
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div style={{ paddingTop: "20px" }}>
                  <h4 className="title d-inline">Nurses</h4>
                  <br />
                  <h5 className="title d-inline">{groupedData.nurse || 0}</h5>
                </div>
                <img src="img/icon/cap.svg" alt="" style={{ width: "70px" }} />
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div style={{ paddingTop: "20px" }}>
                  <h4 className="title d-inline">Pharmacists</h4>
                  <br />
                  <h5 className="title d-inline">
                    {groupedData.pharmacist || 0}
                  </h5>
                </div>
                <img
                  src="img/icon/pharma.svg"
                  alt=""
                  style={{ width: "70px" }}
                />
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div style={{ paddingTop: "20px" }}>
                  <h4 className="title d-inline">Admins</h4>
                  <br />
                  <h5 className="title d-inline">---</h5>
                </div>
                <img
                  src="img/icon/profile.svg"
                  alt=""
                  style={{ width: "70px" }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="3">
            <Card>
              <div style={{ padding: "20px" }}>
                <h4 className="title d-inline">Jobs Created</h4>
                <br />
                <h5 className="title d-inline">{count.jobsCount || 0}</h5>
              </div>
            </Card>
          </Col>

          <Col md="3">
            <Card>
              <div style={{ padding: "20px" }}>
                <h4 className="title d-inline">Total Users</h4>
                <br />
                <h5 className="title d-inline">{count.usersCount || 0}</h5>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <div style={{ padding: "20px" }}>
                <h4 className="title d-inline">Verified Users</h4>
                <br />
                <h5 className="title d-inline">
                  {count.verifiedUsersCount || 0}
                </h5>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <div style={{ padding: "20px" }}>
                <h4 className="title d-inline">Job Applications</h4>
                <br />
                <h5 className="title d-inline">---</h5>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Chart
              graphType="line"
              data={createdJobsGraph}
              duration={duration}
              title="Created Jobs"
              setDuration={setDuration}
            />
          </Col>
          <Col md={6}>
            <Chart
              graphType="line"
              data={[]}
              duration={duration}
              title="Job Applications"
              setDuration={setDuration}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
