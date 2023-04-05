import React, { useState, useEffect } from "react";
import axios from "axios";
import { user, categories_list } from "../data/api";
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
import UserProfile from "./UserProfile";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [pagination, setPagination] = useState({ current: 1 });
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });
  const [sdata, setSdata] = useState({});

  const handleExport = (allusers) => {
    if (!allusers) return;

    let csvString =
      "BUYER NAME,BUYER PHONE,PAYMENT METHOD,SOLD BY,ITEMS(Name | Variation | Quantity | Price),DATE,AMOUNT\n";
    Object.entries(allusers).forEach(([x, data]) => {
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
    saveAs(blob, `Users.csv`);
  };

  async function fetchUsers(file) {
    let data = { params: { ...sdata, ...pagination, file } };

    await axios.get(user.showUsers + "/", data).then((response) => {
      if (response.data.status === true) {
        if (response.data.data) {
          if (file) {
            handleExport(response.data.all);
          }
          setUsers(response.data.data);
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
      fetchUsers();
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
                  <CardTitle tag="h4">Users</CardTitle>
                  <Row>
                    <Col className="pr-md-1">
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          id="phone"
                          type="text"
                          placeholder="johndoe@gmail.com"
                          onChange={(e) =>
                            setSdata({ ...sdata, email: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-md-1">
                      <FormGroup>
                        <Label for="phonen">Phone</Label>
                        <Input
                          id="phonen"
                          type="text"
                          placeholder="Users Phone Number."
                          onChange={(e) =>
                            setSdata({ ...sdata, phone: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>

                    <Col md="2" className="px-md-1">
                      <FormGroup>
                        <Label for="pay">Gender</Label>
                        <Input
                          id="gender"
                          type="select"
                          onChange={(e) =>
                            setSdata({
                              ...sdata,
                              gender: e.target.value,
                            })
                          }
                        >
                          <option value="" hidden selected>
                            Select Gender
                          </option>
                          {["MALE", "FEMALE"].map((item, key) => {
                            return (
                              <option key={key + item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2" className="px-md-1">
                      <FormGroup>
                        <Label for="pay">Roles</Label>
                        <Input
                          id="role"
                          type="select"
                          onChange={(e) =>
                            setSdata({
                              ...sdata,
                              role: e.target.value,
                            })
                          }
                        >
                          <option value="" hidden selected>
                            Select Role
                          </option>
                          {["admin", "organization", "user"].map(
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
                    <Col md="2" className="px-md-1">
                      <FormGroup>
                        <Label for="pay">Occupation</Label>
                        <Input
                          id="role"
                          type="select"
                          onChange={(e) =>
                            setSdata({
                              ...sdata,
                              occupation: e.target.value,
                            })
                          }
                        >
                          <option value="" hidden selected>
                            Select Occupation
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
                  </Row>
                  Total Records: <b>{pagination.count || 0}</b>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => fetchUsers("csv")}
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      size="sm"
                    >
                      Export to CSV <FaFileCsv />
                    </Button>{" "}
                    <Button
                      onClick={() => fetchUsers()}
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userItem, key) => (
                        <tr key={key}>
                          <td>
                            <FaUserCircle
                              size="40px"
                              style={{ paddingRight: "10px" }}
                            />
                            {userItem.fullname}
                          </td>
                          <td>{userItem.email}</td>
                          <td>{userItem.phone}</td>
                          <td>{userItem.gender}</td>

                          <td>
                            <Button
                              onClick={() => {
                                setCurrentUser(userItem);
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
                <font style={{ paddingLeft: "30px" }}>Back To Users </font>
              </Button>
            )}
          </Col>
          {loading === false ? (
            <Col md="12">
              <Card className="card-user">
                {Object.keys(currentUser).length > 0 ? (
                  <UserProfile
                    userData={currentUser}
                    setUserData={setCurrentUser}
                  />
                ) : null}
              </Card>
            </Col>
          ) : null}
        </Row>
      </div>
    </>
  );
}

export default ShowUsers;
