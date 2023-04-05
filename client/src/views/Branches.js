import React, { useState, useEffect } from "react";
import axios from "axios";
import { branch } from "../data/api";
import Notifications from "components/Notification/Notification";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

import RPagination from "components/Pagination/Pagination";

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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { Link } from "react-router-dom";
import AddBranch from "./AddBranch";
import BranchProfile from "./BranchProfile";
import BranchEdit from "./BranchEdit";

function ShowBranches({ currentUser }) {
  const [branches, setBranches] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [currentBranch, setCurrentBranch] = useState({});
  const [pagination, setPagination] = useState({ current: 1 });
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });
  const [sdata, setSdata] = useState({});
  const [mode, setMode] = useState("add");

  async function fetchBranches() {
    let data = { params: { ...sdata, ...pagination } };
    if (currentUser) {
      data.params.userId = currentUser._id;
    }

    await axios.get(branch.showBranches + "/", data).then((response) => {
      if (response.data.status === true) {
        if (response.data.data) {
          setBranches(response.data.data);
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
      fetchBranches();
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
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <CardTitle tag="h4">
                      Branches:{" "}
                      {currentUser ? "(" + currentUser.fullname + ")" : ""}
                    </CardTitle>
                    <Link>
                      <Button
                        className="btn-fill"
                        style={{ width: "100%" }}
                        color="primary"
                        type="submit"
                        size="sm"
                        onClick={() => {
                          setMode("add");
                          toggle();
                        }}
                      >
                        Add Branch
                      </Button>
                    </Link>
                  </div>
                  <Row>
                    <Col className="pr-md-1" md={5}>
                      <FormGroup>
                        <Label for="email">Search by User</Label>
                        <Input
                          id="phone"
                          type="text"
                          placeholder="johndoe@gmail.com"
                          onChange={(e) =>
                            setSdata({ ...sdata, user: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-md-1" md={5}>
                      <FormGroup>
                        <Label for="phonen">Search by Branch Name</Label>
                        <Input
                          id="phonen"
                          type="text"
                          placeholder="Branches Phone Number."
                          onChange={(e) =>
                            setSdata({ ...sdata, branch: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <Label for="phonen">
                        {" "}
                        Total Records: <b>{pagination.count || 0}</b>
                      </Label>
                      <Button
                        onClick={() => fetchBranches()}
                        className="btn-fill"
                        color="primary"
                        type="submit"
                        size="sm"
                        style={{ width: "100%" }}
                      >
                        Search <FiSearch />
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <Table
                    className="tablesorter"
                    responsive
                    style={{ overflow: "unset" }}
                  >
                    <thead className="text-primary">
                      <tr>
                        <th>Branch Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.map((branchItem, key) => (
                        <tr key={key}>
                          <td>
                            {branchItem.name}
                            <br />
                            <h5 style={{ margin: 0 }}>
                              User:
                              {branchItem.userId?.fullname}
                            </h5>
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                setCurrentBranch(branchItem);
                                setLoading(false);
                              }}
                              className="btn-fill"
                              size="sm"
                              color="primary"
                              type="submit"
                            >
                              Show
                            </Button>
                            <Button
                              style={{ marginLeft: "10px" }}
                              onClick={() => {
                                setCurrentBranch(branchItem);
                                setMode("edit");
                                toggle();
                              }}
                              className="btn-fill"
                              size="sm"
                              color="primary"
                              type="submit"
                            >
                              Edit
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
                <font style={{ paddingLeft: "30px" }}>Back To Branches </font>
              </Button>
            )}
          </Col>

          <Col md="12">
            {loading === false ? (
              <BranchProfile currentBranch={currentBranch} />
            ) : null}
          </Col>
        </Row>
      </div>

      <Modal isOpen={modal} size="lg">
        <ModalHeader toggle={toggle}>{mode.toUpperCase()} Branch</ModalHeader>
        <ModalBody>
          {mode === "add" ? (
            <AddBranch fetchBranches={fetchBranches} />
          ) : (
            <BranchEdit
              fetchBranches={fetchBranches}
              currentBranch={currentBranch}
              setCurrentBranch={setCurrentBranch}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

export default ShowBranches;
