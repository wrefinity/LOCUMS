import React, { useState, useEffect } from "react";
import axios from "axios";
import { job } from "../data/api";
import Notifications from "components/Notification/Notification";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

import RPagination from "components/Pagination/Pagination";
import { saveAs } from "file-saver";
// import DateRange from "components/DateRange/DateRange";

// reactstrap components
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import { FaFileCsv } from "react-icons/fa";
import { Link } from "react-router-dom";
import JobCard from "./JobProfile";

function ShowJobs({ currentBranch, currentUser }) {
  const [jobs, setJobs] = useState([]);

  const [currentJob, setCurrentJob] = useState({});
  const [pagination, setPagination] = useState({ current: 1 });
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });
  const [sdata, setSdata] = useState({});

  const handleExport = (alljobs) => {
    if (!alljobs) return;

    let csvString =
      "BUYER NAME,BUYER PHONE,PAYMENT METHOD,SOLD BY,ITEMS(Name | Variation | Quantity | Price),DATE,AMOUNT\n";
    Object.entries(alljobs).forEach(([x, data]) => {
      let amount = 0;
      let items = "";
      for (var y = 0; y < data.items.length; y++) {
        let { price, quantity, product_name, variation } = data.items[y];

        amount += price * parseFloat(quantity || 0);
        items +=
          product_name +
          " : " +
          variation +
          " : " +
          quantity +
          " : " +
          price +
          " | ";
      }

      csvString += `${data.buyer_name || ""},${data.phone || ""},${
        data.payment_method || ""
      },${data.sold_by.fullname},${items},${new Date(
        data.date
      ).toLocaleDateString()},${amount}\n`;
    });

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `Jobs.csv`);
  };

  async function fetchJobs(file) {
    let data = { params: { ...sdata, ...pagination, file } };

    if (Object.keys(currentBranch || {}).length > 0) {
      data.params.branchId = currentBranch._id;
    }
    if (Object.keys(currentUser || {}).length > 0) {
      data.params.userId = currentUser._id;
    }

    await axios.get(job.showJobs, data).then((response) => {
      if (response.data.status === true) {
        if (response.data.data) {
          if (file) {
            handleExport(response.data.all);
          }
          setJobs(response.data.data);
          if (pagination.current === 1) {
            setPagination({ ...pagination, count: response.data.count });
          }
        }
      } else {
        setNotificationDetails({
          msg: "Error Loading Products, Please Referesh The Page",
          type: "danger",
        });
        setNotificationStatus(true);
      }
    });
  }

  useEffect(
    () => {
      fetchJobs();
    },
    // eslint-disable-next-line
    [pagination.current]
  );

  const [loading, setLoading] = useState(true);

  return (
    <>
      {notificationStatus === true ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div className="content">
        <Row>
          <Col md="12">
            {loading === true ? (
              <Card>
                <CardHeader>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardTitle tag="h4">
                      Jobs
                      {currentBranch ? ": (" + currentBranch.name + ")" : ""}
                      {currentUser ? ": (" + currentUser.fullname + ")" : ""}
                    </CardTitle>
                    <div style={{ marginBottom: "20px" }}>
                      <Link to="/admin/addjob">
                        <Button
                          className="btn-fill"
                          style={{ width: "100%" }}
                          color="primary"
                          type="submit"
                          size="sm"
                        >
                          Add Job
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <Row>
                    <Col className="pr-md-1">
                      <FormGroup>
                        <Label for="email">Job Title</Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Job Title..."
                          onChange={(e) =>
                            setSdata({ ...sdata, title: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>

                    <Col md="2">
                      <FormGroup>
                        <Label for="pay">Pay Frequency</Label>
                        <Input
                          id="pay_frequency"
                          type="select"
                          onChange={(e) =>
                            setSdata({
                              ...sdata,
                              payFrequency: e.target.value,
                            })
                          }
                        >
                          <option value="" hidden disabled selected>
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
                    <Col md="2">
                      <FormGroup>
                        <Label for="category">Category</Label>
                        <Input
                          id="category"
                          type="select"
                          onChange={(e) =>
                            setSdata({
                              ...sdata,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="" hidden disabled selected>
                            Select Category
                          </option>
                          {["doctor", "nurse"].map((item, key) => {
                            return (
                              <option key={key + item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label for="pay">Status</Label>
                        <Input
                          type="select"
                          onChange={(e) =>
                            setSdata({
                              ...sdata,
                              isActive: e.target.value,
                            })
                          }
                        >
                          <option value="" hidden disabled selected>
                            Select Status
                          </option>
                          {[true, false].map((item, key) => {
                            return (
                              <option key={key} value={item}>
                                {item ? "Active" : "Inactive"}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  Total Records: <b>{pagination.count || 0}</b>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => fetchJobs("csv")}
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      size="sm"
                    >
                      Export to CSV <FaFileCsv />
                    </Button>{" "}
                    <Button
                      onClick={() => fetchJobs()}
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      size="sm"
                    >
                      Search <FiSearch />
                    </Button>
                  </div>
                </CardHeader>

                <CardBody>
                  <Table
                    className="tablesorter"
                    responsive
                    style={{ overflow: "unset" }}
                  >
                    <thead className="text-primary">
                      <tr>
                        <th>Organization</th>
                        <th>Title</th>
                        <th>Frequency</th>
                        <th>Pattern</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((jobItem, key) => (
                        <tr key={key}>
                          <td>
                            <FaUserCircle
                              size="40px"
                              style={{ paddingRight: "10px" }}
                            />
                            {jobItem?.userId?.fullname}
                          </td>
                          <td>{jobItem.title}</td>
                          <td>{jobItem.payFrequency}</td>
                          <td>{jobItem.workPattern}</td>
                          <td>{jobItem.isActive ? "Active" : "False"}</td>

                          <td>
                            <Button
                              onClick={() => {
                                setCurrentJob(jobItem);
                                setLoading(false);
                              }}
                              className="btn-fill"
                              size="sm"
                              color="primary"
                              type="submit"
                            >
                              Show
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <RPagination
                    pagination={pagination}
                    setPagination={setPagination}
                  />
                </CardBody>
              </Card>
            ) : (
              <Button
                style={{ width: "100%", marginBottom: "15px" }}
                onClick={() => setLoading(!loading)}
                className="btn-fill"
                color="primary"
              >
                <FiArrowLeft size={20} />{" "}
                <font style={{ paddingLeft: "30px" }}>Back To Jobs </font>
              </Button>
            )}
          </Col>

          <Col md="12">
            {loading === false ? (
              <JobCard currentJob={currentJob} setCurrentJob={setCurrentJob} />
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ShowJobs;
