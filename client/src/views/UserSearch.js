import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../data/api";
import Notifications from "components/Notification/Notification";
import { FaUserCircle } from "react-icons/fa";

import RPagination from "components/Pagination/Pagination";

// reactstrap components
import {
  Input,
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

function UserSearch({ selected, setSelected }) {
  const [users, setUsers] = useState([]);

  const [pagination, setPagination] = useState({ current: 1 });
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  const [sdata, setSdata] = useState({});

  async function fetchUsers() {
    let data = { params: { ...sdata, ...pagination } };

    await axios.get(user.showUsers + "/", data).then((response) => {
      if (response.data.status === true) {
        if (response.data.data) {
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

  return (
    <>
      {notificationStatus === true ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div className="content">
        <Row>
          <Col md="12">
            {Object.keys(selected).length === 0 ? (
              <div>
                <CardHeader>
                  <CardTitle tag="h4" style={{ marginTop: "-15px" }}>
                    Select user
                  </CardTitle>
                  <Row style={{ marginTop: "-20px" }}>
                    <Col className="pr-md-1" md={5}>
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

                    <Col className="px-md-1" md={5}>
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
                    <Col>
                      <Label>
                        {" "}
                        Records: <b>{pagination.count || 0}</b>
                      </Label>
                      <Button
                        onClick={() => fetchUsers()}
                        className="btn-fill"
                        color="primary"
                        type="submit"
                        size="sm"
                      >
                        Search
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
                              onClick={() => setSelected(userItem)}
                              className="btn-fill"
                              size="sm"
                              color="primary"
                              type="submit"
                            >
                              Select
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
              </div>
            ) : (
              <div style={{ padding: "15px" }}>
                Selected User:
                <tr
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <td>
                    <FaUserCircle
                      size="40px"
                      style={{ paddingRight: "10px" }}
                    />
                    {selected.fullname}
                  </td>
                  <td>{selected.email}</td>
                  <td>{selected.phone}</td>

                  <td>
                    <Button
                      onClick={() => setSelected({})}
                      className="btn-fill"
                      size="sm"
                      color="primary"
                      type="submit"
                    >
                      Change User
                    </Button>
                  </td>
                </tr>
                <hr />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserSearch;
